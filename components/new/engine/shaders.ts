/** GLSL for the particle stage, ported unchanged from public/site-preview.html. */

export const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec3 aS;                                              // phase, size, rotation
in vec3 aHomeA; in vec4 aNormA; in vec3 aCellA; in float aColA;   // the shape for the section we are leaving
in vec3 aHomeB; in vec4 aNormB; in vec3 aCellB; in float aColB;   // the shape for the section we are entering
uniform mat4 uMV, uP;
uniform float uMorph, uFormA, uFormB;
uniform vec3 uMove;                                      // cube turn: axis index, layer coordinate, angle
uniform float uTime, uDpr, uSize, uFocus, uMotion, uAspect;
uniform vec2 uPointer;
uniform float uPush, uRadius, uAmt;
uniform vec3 uStar, uAccent, uDeep;
out vec3 vCol; out float vAlpha, vSoft, vRot;
const vec3 PAL[7] = vec3[7](vec3(0.482,0.910,0.796), vec3(0.918,0.941,0.925), vec3(0.169,0.620,0.560), vec3(0.36,0.69,0.91), vec3(0.78,0.945,0.41), vec3(0.95,0.77,0.43), vec3(0.14,0.24,0.28));
bool isCube(float id){ return abs(id - 3.0) < 0.5; }
vec3 rotAxis(vec3 v, float ax, float a){
  float c = cos(a), sn = sin(a);
  if (ax < 0.5) return vec3(v.x, c*v.y - sn*v.z, sn*v.y + c*v.z);
  if (ax < 1.5) return vec3(c*v.x + sn*v.z, v.y, -sn*v.x + c*v.z);
  return vec3(c*v.x - sn*v.y, sn*v.x + c*v.y, v.z);
}
void turn(inout vec3 h, inout vec3 n, vec3 cell){
  float ac = uMove.x < 0.5 ? cell.x : (uMove.x < 1.5 ? cell.y : cell.z);
  if (abs(ac - uMove.y) < 0.2) { h = rotAxis(h, uMove.x, uMove.z); n = rotAxis(n, uMove.x, uMove.z); }
}
// Lighting for one shape: x = brightness, y = size, z = sweeping band, w = blur scale.
vec4 shadeForm(vec3 h, vec3 n, float fold, bool surf, float formId, float depth){
  if (surf) {
    float cubeF = isCube(formId) ? 1.0 : 0.0;
    vec3 nv = normalize(mat3(uMV) * n);
    float rim = pow(1.0 - abs(nv.z), 1.5);
    float back = smoothstep(uFocus - 0.15, uFocus + 1.5, depth);
    float sweep = mod(uTime * 0.45, 5.0) - 2.5;
    float band = exp(-pow((h.x - sweep) / 0.22, 2.0)) * uMotion * (1.0 - cubeF);
    float lit = (0.12 + 0.55 * rim + 1.0 * pow(1.0 - fold, 1.6)) * mix(1.0, 0.28, back) * (1.0 + 1.2 * band);
    return vec4(lit, 1.0 - 0.35 * fold, band, 0.6);
  }
  return formId > 0.5 ? vec4(0.5, 0.6, 0.0, 1.0) : vec4(1.0, 1.0, 0.0, 1.0);   // dust round a shape stays quiet; the sky is full strength
}
vec3 colorFor(float col, bool surf, float formId, float lit, float band){
  vec3 c = col > 0.8 ? uAccent : uStar;
  if (surf) {
    vec3 cc = mix(uDeep, uStar, smoothstep(0.1, 0.65, lit));
    c = mix(cc, uAccent, clamp(smoothstep(0.9, 1.6, lit) * 0.3 + band * 0.75, 0.0, 1.0));
    if (isCube(formId)) c = PAL[min(int(col * 7.0), 6)];     // cube: col holds the sticker colour id
  }
  return c;
}
void main(){
  float ph = aS.x * 6.2831853;
  float e = 0.0;                                         // this particle's own progress, staggered so the change flows
  if (uMorph > 0.0) { float k = clamp((uMorph - aS.x * 0.45) / 0.55, 0.0, 1.0); e = k * k * (3.0 - 2.0 * k); }
  vec3 hA = aHomeA, nA = aNormA.xyz, hB = aHomeB, nB = aNormB.xyz;
  bool sA = dot(nA, nA) > 0.01, sB = dot(nB, nB) > 0.01;
  if (abs(uMove.z) > 1e-5) {
    if (isCube(uFormA) && sA) turn(hA, nA, aCellA);
    if (isCube(uFormB) && sB) turn(hB, nB, aCellB);
  }
  float arc = sin(e * 3.14159265);
  vec3 home = mix(hA, hB, e) + arc * 0.55 * vec3(sin(ph*3.0 + uTime*0.6), cos(ph*2.0 - uTime*0.5), sin(ph*5.0 + uTime*0.4));
  float cubeAmt = mix(isCube(uFormA) ? 1.0 : 0.0, isCube(uFormB) ? 1.0 : 0.0, e);
  vec3 p = home + uMotion * (1.0 - 0.75 * cubeAmt) * 0.055 * vec3(
    sin(uTime*0.35 + ph*3.0 + home.y*1.7),
    cos(uTime*0.31 + ph*2.0 + home.z*1.3),
    sin(uTime*0.27 + ph     + home.x*1.9));
  vec4 mv = uMV * vec4(p, 1.0);
  vec4 clip = uP * mv;
  vec2 ndc = clip.xy / clip.w;
  vec2 d = ndc - uPointer; d.x *= uAspect;
  float dist = length(d);
  float push = smoothstep(uRadius, 0.0, dist) * uMotion * uPush;
  vec2 dir = d / (dist + 1e-4); dir.x /= uAspect;
  ndc += dir * push * uAmt;
  gl_Position = vec4(ndc * clip.w, clip.z, clip.w);
  float depth = max(-mv.z, 0.5);
  float blur = clamp(abs(depth - uFocus) / uFocus * 1.3, 0.0, 1.0);
  vec4 shA = shadeForm(hA, nA, aNormA.w, sA, uFormA, depth);
  vec4 shB = shadeForm(hB, nB, aNormB.w, sB, uFormB, depth);
  vec4 sh = mix(shA, shB, e);
  float lit = sh.x * (1.0 + 0.6 * arc);
  float soft = blur * sh.w;
  gl_PointSize = clamp(uSize * uDpr * sh.y * aS.y * (uFocus / depth) * (1.0 + soft * 1.5), 1.0, 64.0);
  vSoft = soft;
  float tw = 0.8 + 0.2 * sin(uTime * (0.8 + aS.x * 2.0) * uMotion + ph * 5.0);
  vAlpha = mix(0.95, 0.30, soft) * (0.65 + 0.35 * aS.y) * (1.0 + push * 0.8) * lit * tw;
  vCol = mix(colorFor(aColA, sA, uFormA, shA.x, shA.z), colorFor(aColB, sB, uFormB, shB.x, shB.z), e);
  vRot = aS.z * 6.2831853;
  }`

export const FRAGMENT_SHADER = `#version 300 es
precision mediump float;
in vec3 vCol; in float vAlpha, vSoft, vRot;
out vec4 o;
float sdTri(vec2 p){ const float k = 1.7320508; p.x = abs(p.x) - 1.0; p.y = p.y + 1.0/k;
  if (p.x + k*p.y > 0.0) p = vec2(p.x - k*p.y, -k*p.x - p.y) * 0.5;
  p.x -= clamp(p.x, -2.0, 0.0); return -length(p) * sign(p.y); }
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float c = cos(vRot), s = sin(vRot);
  q = mat2(c, -s, s, c) * q;
  float d = sdTri(q * 1.9) / 1.9;
  float soft = mix(0.07, 0.6, vSoft);
  float a = (1.0 - smoothstep(-soft, soft, d)) * vAlpha;
  if (a < 0.01) discard;
  o = vec4(vCol * a, a);
  }`

/**
 * Shared contract for the new particle site (routes under /new). Built alongside the current site; nothing in the
 * current site imports from here and nothing here may change the current site's files.
 *
 * Conventions every file in the new site follows
 * - All new CSS is scoped under `.np` and uses `np-` class names. The old site's global rules (body, h1-h3, p, a, button)
 *   still apply, so any heading or paragraph the new site renders sets its own font, size, weight, line-height, colour and margin.
 * - Colours come from CSS variables set on the `.np` wrapper by NewPrefsProvider: --np-bg, --np-star, --np-accent, --np-deep.
 * - Words follow the word rule in DESIGN.md: a big line of 8 words or fewer, a small line of 15 or fewer, no small labels
 *   above headlines, no paragraphs. Honest notes about what was and was not tested stay, in small plain text.
 */

export type SceneId = 'sky' | 'brain' | 'agent' | 'cube' | 'bulb'

export type PaletteId = 'forest' | 'ink'

export interface Palette {
  id: PaletteId
  name: string
  /** Page background and the colour the canvas is cleared to. */
  bg: string
  /** Most particles and all body text. */
  star: string
  /** Highlights, links, the spark, one particle in five. */
  accent: string
}

export const PALETTES: readonly Palette[] = [
  { id: 'forest', name: 'Forest, cream, gold', bg: '#10291D', star: '#F4ECD6', accent: '#D9B04A' },
  { id: 'ink', name: 'Aeolus ink and mint', bg: '#0A1116', star: '#EAF0EC', accent: '#7BE8CB' },
]

/**
 * DOM contract between the page content and <ParticleStage>.
 *
 *   <Story>                                    -> <div data-np-story class="np-story">
 *     <Panel>...</Panel>                       -> <section data-np-panel="story"> <div data-np-copy>...</div> </section>
 *     <Panel flow>...</Panel>                  -> <section data-np-panel="flow">  <div class="np-flow">...</div> </section>
 *   </Story>
 *   <ParticleStage scenes={[...]} />           one scene per panel, in order
 *
 * - A "story" panel is a full section whose words fade in and out and sit opposite (desktop) or below (phone) the shape.
 * - A "flow" panel is ordinary scrolling content (cards, images, lists). The stage does not fade or measure it; the
 *   shape stays where the previous panel's scene left it, so give flow panels the scene 'sky'.
 * - The stage measures the real top of every panel, so panels may have different heights.
 * - ParticleStage with scenes={['sky']} and no <Story> is an ambient sky for plain pages (contact, privacy, case studies).
 */
export const STORY_ATTR = 'data-np-story'
export const PANEL_ATTR = 'data-np-panel'
export const COPY_ATTR = 'data-np-copy'

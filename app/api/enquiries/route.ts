import { NextResponse } from 'next/server'
import { email as recipient } from '@/lib/content'
export async function POST(request:Request) {
 const origin=request.headers.get('origin'); const host=request.headers.get('host')||new URL(request.url).host
 if(origin){try{if(new URL(origin).host!==host)return NextResponse.json({error:'Please submit the form from this website.'},{status:403})}catch{return NextResponse.json({error:'Invalid request origin.'},{status:403})}}
 if(Number(request.headers.get('content-length')||0)>20000)return NextResponse.json({error:'Your enquiry is too long.'},{status:413})
 let data;try{const raw=await request.text();if(raw.length>20000)return NextResponse.json({error:'Your enquiry is too long.'},{status:413});data=JSON.parse(raw)}catch{return NextResponse.json({error:'Please check your enquiry and try again.'},{status:400})}
 if(!data||typeof data!=='object')return NextResponse.json({error:'Invalid enquiry.'},{status:400})
 if(data.website)return NextResponse.json({error:'Unable to submit this enquiry.'},{status:400})
 const field=(key:string,max:number)=>typeof data[key]==='string'?data[key].trim().slice(0,max):''
 const name=field('name',100),email=field('email',254),organization=field('organization',150),need=field('need',150),challenge=field('challenge',5000)
 if(!name||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(email)||challenge.length<20||data.consent!=='yes')return NextResponse.json({error:'Please provide your name, a valid email, at least 20 characters about your challenge, and consent to be contacted.'},{status:400})
 const subject='New project enquiry — AeolusLabs';const text=`Name: ${name}\nEmail: ${email}\nOrganisation: ${organization||'Not provided'}\nNeed: ${need}\n\n${challenge}`
 if(!process.env.RESEND_API_KEY||!process.env.ENQUIRY_FROM_EMAIL)return NextResponse.json({mode:'prepared',mailto:`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`})
 try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.ENQUIRY_FROM_EMAIL,to:[recipient],reply_to:email,subject,text}),signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('Email delivery failed');return NextResponse.json({mode:'sent'})}catch{return NextResponse.json({error:`Your enquiry could not be delivered. Please try again or email ${recipient}.`},{status:502})}
}

import type { Project } from '../content'

/** Honest notes per project. Evidence: DESIGN.md "Product truth", public/projects/<slug>/README.md and the old case-study components. */
export const caseNotes: Record<Project['slug'], readonly string[]> = {
  tikvah: [
    'The picture is a real public page of Tikvah, captured on 25 October 2026.',
    'Private account flows were not tested. A picture does not prove the backend works.',
    'Delivery scope was confirmed by the AeolusLabs founders. Shown with the client’s permission.',
  ],
  'tlc-beauty-shop': [
    'The picture is a real public page, captured on 8 November 2026. The public brand is TheLashCode.',
    'No booking, payment or WhatsApp message was submitted. Payments, bookings and business results were not tested or claimed.',
    'Delivery scope was confirmed by the AeolusLabs founders.',
  ],
  vib3pulse: [
    'The picture is the real public landing page, captured on 8 November 2026.',
    'The ticket and event shown are samples, not a real purchase.',
    'No account was used. Chats, safety tools, live Rooms and payments were not tested.',
  ],
}

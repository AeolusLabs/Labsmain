export const needOptions = [
  'I’m not sure yet',
  'Website or web application',
  'Mobile application',
  'Backend or integrations',
  'AI solution or autonomous workflow',
  'Maintenance and support',
] as const

export type Need = (typeof needOptions)[number]

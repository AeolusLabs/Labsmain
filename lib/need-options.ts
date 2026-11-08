export const needOptions = [
  'I’m not sure yet',
  'AI-powered product',
  'Automation system or workflow',
  'Backend or integrations',
  'Website or application',
  'Maintenance and support',
] as const

export type Need = (typeof needOptions)[number]

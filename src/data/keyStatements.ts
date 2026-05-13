export type KeyStatement = {
  title: string
  question: string
  body: string
}

/** Order matches hero pillars: Definition → Purpose → Proposition */
export const keyStatements: KeyStatement[] = [
  {
    title: 'Definition',
    question: 'What is the Florida Digital Twin?',
    body:
      'The Florida Digital Twin (FLDT) advances the scientific, technical, commercial and educational potential of geospatial digital twins for understanding and managing complex social, urban and environmental systems.',
  },
  {
    title: 'Purpose',
    question: 'What is the change we seek?',
    body:
      'To Transform Florida from the most at-risk state to the most prepared state in one generation through resilient and regenerative design, investment, and development.',
  },
  {
    title: 'Proposition',
    question: 'What does FLDT offer Florida?',
    body:
      'FLDT equips investors, civic leaders, students and residents with a customizable digital toolkit to promote high quality growth, build environmental resilience, and strengthen long-term community well-being all in the face of deepening future uncertainty.',
  },
]

export type NavMegaMenuIconId =
  | 'platform'
  | 'tools'
  | 'interfaces'
  | 'community'
  | 'pillars'
  | 'team'
  | 'partners'
  | 'news'

export type NavMegaMenuLink = {
  label: string
  to: string
  description?: string
  icon?: NavMegaMenuIconId
}

export type NavMegaMenuSection = {
  title: string
  items: NavMegaMenuLink[]
}

export type NavMegaMenuIntroCta = {
  label: string
  to: string
}

export type NavMegaMenuGroup = {
  id: string
  label: string
  to: string
  /** DeepMind-style headline row above the link grid */
  intro?: string
  introCta?: NavMegaMenuIntroCta
  sections: NavMegaMenuSection[]
}

export const NAV_MEGA_MENUS: NavMegaMenuGroup[] = [
  {
    id: 'products',
    label: 'Products',
    to: '/products',
    intro:
      'We create geospatial digital twins to help communities make better decisions.',
    introCta: { label: 'Explore products', to: '/products' },
    sections: [
      {
        title: 'Platform',
        items: [
          {
            label: 'Platform',
            to: '/products#platforms',
            description: 'Core geospatial digital twin platform.',
            icon: 'platform',
          },
        ],
      },
      {
        title: 'Tools',
        items: [
          {
            label: 'Tools',
            to: '/products#tools',
            description: 'Analysis and planning utilities.',
            icon: 'tools',
          },
        ],
      },
      {
        title: 'Interfaces',
        items: [
          {
            label: 'Interfaces',
            to: '/products#interfaces',
            description: 'Web, desktop, and field experiences.',
            icon: 'interfaces',
          },
        ],
      },
    ],
  },
  {
    id: 'communities',
    label: 'Communities',
    to: '/communities',
    intro:
      'Partnering with cities and counties to plan for resilience, growth, and environmental change.',
    introCta: { label: 'Explore communities', to: '/communities' },
    sections: [
      {
        title: 'Partner communities',
        items: [
          {
            label: 'Jacksonville',
            to: '/communities#jacksonville',
            description: 'Urban flood risk and twin pilots.',
            icon: 'community',
          },
          {
            label: 'Cedar Key',
            to: '/communities#cedar-key',
            description: 'Coastal resilience and planning.',
            icon: 'community',
          },
          {
            label: 'Port St. Joe',
            to: '/communities#port-st-joe',
            description: 'Recovery and long-term planning.',
            icon: 'community',
          },
        ],
      },
      {
        title: 'Across Florida',
        items: [
          {
            label: 'Broward County',
            to: '/communities#broward-county',
            description: 'Regional hazard and growth analysis.',
            icon: 'community',
          },
          {
            label: 'Fort Myers',
            to: '/communities#fort-myers',
            description: 'Storm impacts and adaptation.',
            icon: 'community',
          },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    intro:
      'Research, people, and partnerships powering the Florida Digital Twin.',
    introCta: { label: 'About FLDT', to: '/about' },
    sections: [
      {
        title: 'Who we are',
        items: [
          {
            label: 'Institutional Pillars',
            to: '/about#pillars',
            description: 'Mission, values, and institutional focus.',
            icon: 'pillars',
          },
          {
            label: 'Team',
            to: '/people',
            description: 'Researchers, engineers, and planners.',
            icon: 'team',
          },
        ],
      },
      {
        title: 'Stay connected',
        items: [
          {
            label: 'Partners',
            to: '/about#partners',
            description: 'Universities, agencies, and industry.',
            icon: 'partners',
          },
          {
            label: 'News',
            to: '/blogs',
            description: 'Updates, research, and case studies.',
            icon: 'news',
          },
        ],
      },
    ],
  },
]

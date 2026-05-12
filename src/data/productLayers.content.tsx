import type { ReactNode } from 'react'

export const PRODUCT_LAYER_ORDER = ['Platforms', 'Tools', 'Interfaces'] as const
export type ProductLayer = (typeof PRODUCT_LAYER_ORDER)[number]

export const PRODUCT_LAYER_COPY: Record<
  ProductLayer,
  { headline: string; body: ReactNode }
> = {
  Platforms: {
    headline: 'Platforms',
    body: (
      <>
        A reusable, extensible <strong>foundation</strong> designed to support multiple products,
        tools, and future uses. This is FLDT&apos;s <strong>Technical Core</strong>. It enables many
        tools and products to be built, deployed, and sustained.
      </>
    ),
  },
  Tools: {
    headline: 'Tools',
    body: (
      <>
        <strong>Packaged</strong> software modules that perform a <strong>specific task</strong>{' '}
        dealing with a <strong>real-world</strong> use case and problem. These are individual
        analytical components with <em>minimal UI</em> (if any).
      </>
    ),
  },
  Interfaces: {
    headline: 'Interfaces',
    body: (
      <>
        Applications designed for <strong>specific usage modes</strong> that enable users to engage
        tools in different circumstances including desktop, web-based, phone-based, and VR, AR.
      </>
    ),
  },
}

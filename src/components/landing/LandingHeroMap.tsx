import { useEffect, useRef, useState } from 'react'

const STATIC_MAP_URL =
  'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export' +
  '?bbox=-88,24,-79,32&bboxSR=4326&size=1920,1080&format=jpg&f=image'

const CITY_POINTS = [
  { name: 'Miami', longitude: -80.1918, latitude: 25.7617 },
  { name: 'Jacksonville', longitude: -81.6557, latitude: 30.3322 },
  { name: 'Tampa', longitude: -82.4572, latitude: 27.9506 },
  { name: 'Orlando', longitude: -81.3792, latitude: 28.5383 },
  { name: 'Tallahassee', longitude: -84.2807, latitude: 30.4383 },
]

type LandingHeroMapProps = {
  activeCityIndex?: number
  activeCityName?: string
}

function getLeftPadding() {
  const base = Math.round(window.innerWidth * 0.32)
  return Math.max(240, Math.min(440, base))
}

export function LandingHeroMap({ activeCityIndex = 0, activeCityName }: LandingHeroMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef<__esri.MapView | null>(null)
  const pointClassRef = useRef<typeof import('@arcgis/core/geometry/Point').default | null>(null)
  const resizeCleanupRef = useRef<(() => void) | null>(null)
  const [mapReady, setMapReady] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0, visible: false })
  const [clickKey, setClickKey] = useState(0)

  useEffect(() => {
    if (!mapRef.current) return undefined

    let destroyed = false

    const initMap = async () => {
      const [
        { default: esriConfig },
        { default: Map },
        { default: MapView },
        { default: GraphicsLayer },
        { default: Graphic },
        { default: Point },
        { default: SimpleMarkerSymbol },
      ] = await Promise.all([
        import('@arcgis/core/config'),
        import('@arcgis/core/Map'),
        import('@arcgis/core/views/MapView'),
        import('@arcgis/core/layers/GraphicsLayer'),
        import('@arcgis/core/Graphic'),
        import('@arcgis/core/geometry/Point'),
        import('@arcgis/core/symbols/SimpleMarkerSymbol'),
      ])

      if (destroyed) return

      esriConfig.assetsPath = '/arcgis-assets'

      const graphicsLayer = new GraphicsLayer()
      const map = new Map({
        basemap: 'hybrid',
        layers: [graphicsLayer],
      })

      const view = new MapView({
        container: mapRef.current!,
        map,
        center: [-82.5, 28.1],
        zoom: 9.5,
        ui: { components: [] },
        constraints: { rotationEnabled: false },
        popup: { dockEnabled: false },
      })
      view.padding = { left: getLeftPadding(), right: 0, top: 0, bottom: 0 }

      const markerSymbol = new SimpleMarkerSymbol({
        color: [251, 191, 36, 0.9],
        size: 10,
        outline: { color: [255, 255, 255, 0.85], width: 1 },
      })

      CITY_POINTS.forEach((city) => {
        const point = new Point({ longitude: city.longitude, latitude: city.latitude })
        const graphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
          attributes: city,
          popupTemplate: { title: city.name, content: 'Priority resilience zone' },
        })
        graphicsLayer.add(graphic)
      })

      viewRef.current = view
      pointClassRef.current = Point

      const handleResize = () => {
        view.padding = { left: getLeftPadding(), right: 0, top: 0, bottom: 0 }
      }
      window.addEventListener('resize', handleResize)
      resizeCleanupRef.current = () => window.removeEventListener('resize', handleResize)

      await view.when()
      if (!destroyed) setMapReady(true)
    }

    initMap().catch(() => undefined)

    return () => {
      destroyed = true
      resizeCleanupRef.current?.()
      viewRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    const view = viewRef.current
    const PointClass = pointClassRef.current
    const city = CITY_POINTS[activeCityIndex % CITY_POINTS.length]
    if (!view || !city || !PointClass) return

    const point = new PointClass({ longitude: city.longitude, latitude: city.latitude })

    view
      .when()
      .then(() =>
        view.goTo(
          { center: [city.longitude, city.latitude], zoom: 7.2 },
          { duration: 1600, easing: 'ease-in-out' },
        ),
      )
      .then(() => {
        const screenPoint = view.toScreen(point)
        if (!screenPoint) return
        setCursorPosition({ x: screenPoint.x, y: screenPoint.y, visible: true })
        setClickKey((key) => key + 1)
      })
      .catch(() => undefined)
  }, [activeCityIndex])

  return (
    <div className="hero-map-wrap">
      <div
        className={`hero-map-placeholder${mapReady ? ' is-hidden' : ''}`}
        style={{ backgroundImage: `url(${STATIC_MAP_URL})` }}
      />
      <div className={`hero-map${mapReady ? ' is-ready' : ''}`} ref={mapRef} />
      <div className="hero-map-interaction-layer" aria-hidden="true">
        {cursorPosition.visible && (
          <>
            <span
              className="hero-map-cursor"
              style={{ left: cursorPosition.x, top: cursorPosition.y }}
            />
            <span
              key={clickKey}
              className="hero-map-click"
              style={{ left: cursorPosition.x, top: cursorPosition.y }}
            />
            {activeCityName && (
              <div
                key={`${activeCityName}-${clickKey}`}
                className="hero-map-tooltip"
                style={{ left: cursorPosition.x, top: cursorPosition.y }}
              >
                {activeCityName}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

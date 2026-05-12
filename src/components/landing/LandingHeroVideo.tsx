import { useEffect, useRef, useState } from 'react'

const HERO_VIDEO_SRC = '/AdobeStock_310942613.mov'
/** H.264/AAC export in `public/` (same clip) — Chrome/Firefox usually need this; .mov alone often fails. */
const HERO_VIDEO_MP4 = '/AdobeStock_310942613.mp4'
/** Bundled basemap — ArcGIS export from the browser often fails (blocked / offline); this always paints. */
const HERO_BASEMAP = '/images/hero-florida-basemap.jpg'

/**
 * Full-bleed hero video with a real map fallback so the hero never stays blank.
 * Many browsers do not decode QuickTime (.mov); add a H.264 .mp4 alongside and list it first in <source>.
 */
export function LandingHeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [videoVisible, setVideoVisible] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return undefined

    const show = () => setVideoVisible(true)
    const hide = () => setVideoVisible(false)

    const onPlaying = () => show()
    const onError = () => hide()

    video.addEventListener('playing', onPlaying)
    video.addEventListener('error', onError)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (mq.matches) {
        video.pause()
        video.removeAttribute('autoplay')
        hide()
      } else {
        video.setAttribute('autoplay', '')
        void video.play().catch(() => hide())
      }
    }

    apply()
    mq.addEventListener('change', apply)
    return () => {
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('error', onError)
      mq.removeEventListener('change', apply)
    }
  }, [])

  return (
    <div className="hero-video-wrap">
      <div className="hero-video-fallback" aria-hidden>
        <img
          className="hero-video-fallback__img"
          src={HERO_BASEMAP}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-video-fallback__veil" />
      </div>
      <video
        ref={ref}
        className={`hero-video${videoVisible ? ' hero-video--visible' : ''}`}
        poster={HERO_BASEMAP}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
        <source src={HERO_VIDEO_SRC} type="video/quicktime" />
      </video>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

/** Must match files in `public/frames/` (`frame_0001.jpg` … `frame_0600.jpg`). */
const FRAME_COUNT = 600
const FPS = 24

function frameSrc(frameIndex: number) {
  const n = ((frameIndex % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT
  const file = String(n + 1).padStart(4, '0')
  return `/frames/frame_${file}.jpg`
}

function whenDecoded(img: HTMLImageElement, onReady: () => void) {
  const done = () => {
    void img.decode?.().then(
      () => onReady(),
      () => onReady(),
    )
  }
  if (img.complete && img.naturalWidth > 0) {
    queueMicrotask(done)
  } else {
    img.addEventListener('load', done, { once: true })
    img.addEventListener('error', done, { once: true })
  }
}

/**
 * Full-bleed hero background from an image sequence in `public/frames/` only.
 * Uses two stacked img elements and decode-before-show to avoid flicker from single-layer src swaps.
 */
export function LandingHeroFrameSequence() {
  const bufferARef = useRef<HTMLImageElement | null>(null)
  const bufferBRef = useRef<HTMLImageElement | null>(null)
  const [visible, setVisible] = useState(false)
  /** Sync with reduced-motion on first paint so we don’t swap hero markup after mount (avoids a flash). */
  const [motionOk, setMotionOk] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotionOk(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const a = bufferARef.current
    const b = bufferBRef.current
    if (!a || !b || !motionOk) return undefined

    let cancelled = false
    let rafId = 0
    let idx = 0
    let frontIsA = true
    let loading = false
    let lastTime = 0
    const frameMs = 1000 / FPS
    const preloadImg = new Image()

    a.style.opacity = '1'
    b.style.opacity = '0'
    a.style.zIndex = '2'
    b.style.zIndex = '1'

    const finalizeSwap = (incoming: HTMLImageElement, outgoing: HTMLImageElement, nextIdx: number) => {
      if (cancelled) return
      /* Incoming on top at full opacity first, then hide outgoing — avoids a dark flash between buffers. */
      incoming.style.zIndex = '2'
      outgoing.style.zIndex = '1'
      incoming.style.opacity = '1'
      outgoing.style.opacity = '0'

      frontIsA = !frontIsA
      idx = nextIdx
      loading = false
      lastTime = performance.now()

      /* Warm cache for the following frame (next swap loads this on the other buffer). */
      preloadImg.src = frameSrc((nextIdx + 1) % FRAME_COUNT)
    }

    const beginSwap = () => {
      if (cancelled || loading) return
      loading = true
      const nextIdx = (idx + 1) % FRAME_COUNT
      const hidden = frontIsA ? b : a
      const visibleEl = frontIsA ? a : b

      const finish = () => {
        if (cancelled) return
        /* Wait until the compositor can paint the decoded bitmap before swapping (reduces residual flicker). */
        requestAnimationFrame(() => {
          if (cancelled) return
          requestAnimationFrame(() => {
            if (cancelled) return
            finalizeSwap(hidden, visibleEl, nextIdx)
          })
        })
      }

      /* Re-use cached buffer when the sequence loops: same URL may not fire `load` again. */
      if (hidden.dataset.frame === String(nextIdx)) {
        queueMicrotask(finish)
        return
      }

      hidden.dataset.frame = String(nextIdx)
      hidden.src = frameSrc(nextIdx)
      whenDecoded(hidden, finish)
    }

    const loop = (t: number) => {
      if (cancelled) return
      if (!loading) {
        const elapsed = t - lastTime
        if (elapsed >= frameMs) {
          beginSwap()
        }
      }
      rafId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (cancelled) return
      setVisible(true)
      lastTime = performance.now()
      rafId = requestAnimationFrame(loop)
    }

    a.dataset.frame = '0'
    a.src = frameSrc(0)
    whenDecoded(a, start)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [motionOk])

  return (
    <div className="hero-video-wrap">
      <div className="hero-video-fallback" aria-hidden>
        <div className="hero-video-fallback__veil" />
      </div>
      {motionOk ? (
        <div className={`hero-frame-seq${visible ? ' hero-frame-seq--visible' : ''}`}>
          <img
            ref={bufferARef}
            className="hero-frame-seq__layer"
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
          <img
            ref={bufferBRef}
            className="hero-frame-seq__layer"
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="low"
          />
        </div>
      ) : (
        <img
          className="hero-video hero-video--visible hero-video--reduced-static"
          src={frameSrc(0)}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
      )}
    </div>
  )
}

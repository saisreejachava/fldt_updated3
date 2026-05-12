import { useEffect, useRef, useState } from 'react'
import '../../styles/jax-scroll-sequence.css'

/** Must match files in `public/jax-sequence` (frame_0001.jpg …). */
const FRAME_COUNT = 130

const PROGRESS_EASE = 0.085

const getFrameSrc = (index: number) =>
  `/jax-sequence/frame_${String(index + 1).padStart(4, '0')}.jpg`

type CoverDims = { x: number; y: number; w: number; h: number }

function getCoverDims(
  canvasW: number,
  canvasH: number,
  img: HTMLImageElement,
): CoverDims | null {
  if (!img.complete || img.naturalWidth === 0) return null
  const ratio = img.naturalWidth / img.naturalHeight || 1
  const h = canvasH
  const w = h * ratio
  const x = (canvasW - w) / 2
  return { x, y: 0, w, h }
}

/**
 * Scroll-scrubbed Jacksonville aerial frame sequence (sticky full-viewport canvas).
 * Copy / “dock” UI intentionally omitted — use on Communities (and elsewhere) as motion only.
 */
export function JaxScrollSequence() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [images] = useState<HTMLImageElement[]>(() =>
    Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.src = getFrameSrc(i)
      return img
    }),
  )

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    let targetProgress = 0
    let shownProgress = 0
    let rafId = 0
    let inView = false
    let dprCss = 1

    const readScrollProgress = (): number => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const totalScrollable = rect.height - viewportHeight
      if (totalScrollable <= 0) return 0
      const clamped = Math.min(Math.max(-rect.top, 0), totalScrollable)
      return clamped / totalScrollable
    }

    const clearCanvasBitmap = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dprCss, 0, 0, dprCss, 0, 0)
    }

    const drawAtProgress = (progress: number) => {
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      if (cw < 1 || ch < 1) return

      const floatIdx = Math.min(FRAME_COUNT - 1, Math.max(0, progress * (FRAME_COUNT - 1)))
      const lower = Math.floor(floatIdx)
      const upper = Math.min(lower + 1, FRAME_COUNT - 1)
      const t = floatIdx - lower

      const imgLo = images[lower]
      const imgHi = images[upper]

      const dimsLo = getCoverDims(cw, ch, imgLo)
      const dimsHi = getCoverDims(cw, ch, imgHi)
      const ref = dimsLo ?? dimsHi
      if (!ref) {
        clearCanvasBitmap()
        return
      }

      clearCanvasBitmap()

      if (lower === upper || t < 0.0005) {
        const src = dimsLo ? imgLo : imgHi
        if (src) {
          ctx.globalAlpha = 1
          ctx.drawImage(src, ref.x, ref.y, ref.w, ref.h)
        }
        return
      }

      if (dimsLo) {
        ctx.globalAlpha = 1 - t
        ctx.drawImage(imgLo, ref.x, ref.y, ref.w, ref.h)
      }
      if (dimsHi) {
        ctx.globalAlpha = Math.max(0, Math.min(1, t))
        ctx.drawImage(imgHi, ref.x, ref.y, ref.w, ref.h)
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      dprCss = dpr
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      drawAtProgress(shownProgress)
    }

    const tick = () => {
      if (!inView) {
        rafId = 0
        return
      }
      targetProgress = readScrollProgress()
      shownProgress += (targetProgress - shownProgress) * PROGRESS_EASE
      if (Math.abs(targetProgress - shownProgress) < 1e-5) {
        shownProgress = targetProgress
      }
      drawAtProgress(shownProgress)
      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (!inView || rafId !== 0) return
      rafId = requestAnimationFrame(tick)
    }

    const stopLoop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const init = () => {
      targetProgress = readScrollProgress()
      shownProgress = targetProgress
      resize()
    }

    const primeVisibility = () => {
      const r = section.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      inView = r.bottom > 0 && r.top < vh
      if (inView) startLoop()
    }

    const onAnyFrameLoad = () => {
      drawAtProgress(shownProgress)
    }

    images.forEach((img) => img.addEventListener('load', onAnyFrameLoad))

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e?.isIntersecting ?? false
        if (inView) startLoop()
        else stopLoop()
      },
      { root: null, rootMargin: '80px 0px', threshold: 0 },
    )
    io.observe(section)

    if (images[0]?.complete && images[0].naturalWidth > 0) {
      init()
      primeVisibility()
    } else if (images[0]) {
      images[0].addEventListener(
        'load',
        () => {
          init()
          primeVisibility()
        },
        { once: true },
      )
    }

    window.addEventListener('resize', resize)

    return () => {
      io.disconnect()
      images.forEach((img) => img.removeEventListener('load', onAnyFrameLoad))
      stopLoop()
      window.removeEventListener('resize', resize)
    }
  }, [images])

  return (
    <section className="jax-scroll-section" ref={sectionRef} aria-label="Jacksonville aerial scroll sequence">
      <div className="jax-scroll-inner">
        <canvas ref={canvasRef} className="jax-scroll-canvas" />
        <div className="jax-scroll-overlay">
          <div className="container jax-scroll-minimal">
            <header className="jax-scroll-hero" aria-label="Sequence context">
              <div className="jax-scroll-hero__row">
                <div className="jax-scroll-hero__brand">
                  <span className="jax-scroll-hero__beacon" aria-hidden />
                  <span className="jax-scroll-hero__brand-text">Florida Digital Twin</span>
                </div>
                <p className="jax-scroll-hero__title">Jacksonville · aerial sequence</p>
                <div className="jax-scroll-hero__cue" aria-hidden>
                  <span className="jax-scroll-hero__cue-line" />
                  <span className="jax-scroll-hero__cue-label">Scroll</span>
                </div>
              </div>
              <p className="jax-scroll-hero__sub">Scroll the page to glide through the strip.</p>
            </header>
          </div>
        </div>
      </div>
    </section>
  )
}

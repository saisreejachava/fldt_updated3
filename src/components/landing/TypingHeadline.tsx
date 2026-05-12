import { useEffect, useState, useRef, useMemo } from 'react'

/** Slight per-step variance so cadence reads more like real typing. */
function humanizedMs(base: number) {
  if (base <= 0) {
    return base
  }
  const spread = Math.max(10, Math.round(base * 0.24))
  return Math.max(14, base + Math.round((Math.random() * 2 - 1) * spread))
}

type TypingHeadlineProps = {
  staticText: string
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
  onPhraseChange?: (index: number) => void
}

export function TypingHeadline({
  staticText,
  phrases,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseMs = 1400,
  className,
  onPhraseChange,
}: TypingHeadlineProps) {
  /** Reserve width for longest city so typing short vs long names doesn’t jitter the layout. */
  const phraseSlotCh = useMemo(
    () => Math.max(1, ...phrases.map((p) => p.length)) + 0.35,
    [phrases],
  )

  const [displayText, setDisplayText] = useState(() => phrases[0] ?? '')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const onPhraseChangeRef = useRef(onPhraseChange)
  onPhraseChangeRef.current = onPhraseChange

  useEffect(() => {
    onPhraseChangeRef.current?.(phraseIndex)
  }, [phraseIndex])

  useEffect(() => {
    if (!phrases.length) {
      return undefined
    }

    const currentPhrase = phrases[phraseIndex % phrases.length]
    const isComplete = displayText === currentPhrase
    const isEmpty = displayText.length === 0

    let timeoutId: number

    if (!isDeleting && isComplete) {
      const hold =
        pauseMs + Math.round((Math.random() - 0.5) * Math.min(220, Math.max(80, pauseMs * 0.12)))
      timeoutId = window.setTimeout(() => setIsDeleting(true), hold)
    } else if (isDeleting && isEmpty) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((index) => (index + 1) % phrases.length)
      }, humanizedMs(300))
    } else {
      const step = isDeleting ? deletingSpeed : typingSpeed
      timeoutId = window.setTimeout(() => {
        const nextLength = isDeleting ? displayText.length - 1 : displayText.length + 1
        setDisplayText(currentPhrase.slice(0, nextLength))
      }, humanizedMs(step))
    }

    return () => window.clearTimeout(timeoutId)
  }, [phrases, phraseIndex, displayText, isDeleting, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={className}>
      <span className="typing-static">{staticText}</span>
      <span className="typing-phrase-slot" style={{ minWidth: `${phraseSlotCh}ch` }}>
        <span className="typing-text" aria-live="polite">
          {displayText}
        </span>
        <span className="typing-cursor" aria-hidden="true">
          |
        </span>
      </span>
    </span>
  )
}

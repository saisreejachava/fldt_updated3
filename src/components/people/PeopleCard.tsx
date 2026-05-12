export interface Person {
  name: string
  title: string
  location: string
  imageUrl: string
}

interface PeopleCardProps {
  person: Person
}

/**
 * Profile card with consistent backgrounds via CSS variables:
 * - Image area: --people-card-image-bg (light blue-gray)
 * - Text area: --people-card-text-bg (white)
 * All cards share the same look without per-card overrides.
 */
export function PeopleCard({ person }: PeopleCardProps) {
  return (
    <article className="people-card">
      <div className="people-card__image-wrap">
        <span className="people-card__location" aria-hidden="true">
          {person.location}
        </span>
        <img
          src={person.imageUrl}
          alt={person.name}
          loading="lazy"
          width={260}
          height={347}
        />
      </div>
      <div className="people-card__text">
        <h3 className="people-card__name">{person.name}</h3>
        <p className="people-card__title">{person.title}</p>
      </div>
    </article>
  )
}

export default PeopleCard

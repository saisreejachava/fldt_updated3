import { Link } from 'react-router-dom'
import { PeopleCard } from '../components/people'
import type { Person } from '../components/people'

const SAMPLE_PEOPLE: Person[] = [
  {
    name: 'Polina Polikakhina',
    title: 'Engineering Associate',
    location: 'Portland',
    imageUrl: 'https://picsum.photos/seed/team1/520/693',
  },
  {
    name: 'Alex Chen',
    title: 'Transportation Analyst',
    location: 'Orlando',
    imageUrl: 'https://picsum.photos/seed/team2/520/693',
  },
  {
    name: 'Jordan Williams',
    title: 'Senior Planner',
    location: 'Miami',
    imageUrl: 'https://picsum.photos/seed/team3/520/693',
  },
  {
    name: 'Sam Rivera',
    title: 'Data Analyst',
    location: 'Jacksonville',
    imageUrl: 'https://picsum.photos/seed/team4/520/693',
  },
  {
    name: 'Casey Moore',
    title: 'GIS Specialist',
    location: 'Tampa',
    imageUrl: 'https://picsum.photos/seed/team5/520/693',
  },
  {
    name: 'Riley Foster',
    title: 'Research Associate',
    location: 'Tallahassee',
    imageUrl: 'https://picsum.photos/seed/team6/520/693',
  },
]

export default function PeoplePage() {
  return (
    <div className="people-page">
      <header className="people-header">
        <div className="container">
          <Link to="/" className="people-back-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1>Meet the Team</h1>
          <p>
            The people behind the Florida Digital Twin—researchers, engineers, and planners
            building resilience insights for Florida.
          </p>
        </div>
      </header>

      <div className="people-content">
        <div className="people-grid" role="list">
          {SAMPLE_PEOPLE.map((person) => (
            <div key={`${person.name}-${person.location}`} role="listitem">
              <PeopleCard person={person} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import '../../styles/fldt-sections.css'

const COLUMNS: { uf: string[]; external: string[] }[] = [
  {
    uf: ['Faculty researcher', 'Student researchers', 'UFIT', 'HiPerGator', 'UF AIIRI'],
    external: ['NVIDIA', 'ESRI'],
  },
  {
    uf: ['Faculty Researchers', 'Digital Worlds'],
    external: [
      'Private investors',
      'Communities',
      'State/Federal Agencies',
      'Software Developers',
    ],
  },
  {
    uf: ['Computer Science'],
    external: ['Users', 'Software/app developers'],
  },
  {
    uf: ['Students', 'Professionals'],
    external: ['Community partners', 'Elected officials'],
  },
  {
    uf: [],
    external: [
      'Private investors',
      'Cities',
      'Agencies',
      'Federal funders',
      'Foundation funders',
    ],
  },
]

export function HomePartners() {
  return (
    <section className="landing-section home-partners-section" id="partners">
      <div className="container">
        <header className="home-partners__header">
          <h2>Partners</h2>
          <p className="sub">Who are the people and organizations to partner with to make this possible?</p>
        </header>

        <div className="home-partners__grid">
          {COLUMNS.map((col, idx) => (
            <div key={idx} className="home-partners__col">
              {col.uf.length > 0 ? (
                <>
                  <h4>UF</h4>
                  <ul>
                    {col.uf.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {col.external.length > 0 ? (
                <>
                  <h4>External</h4>
                  <ul>
                    {col.external.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>

        <p style={{ marginTop: 18, marginBottom: 0, color: 'var(--muted)', fontSize: 14 }}>
          Want to collaborate?{' '}
          <Link to="/blogs" style={{ fontWeight: 650, color: 'var(--fldt-violet, #4b4ba0)' }}>
            Read recent updates
          </Link>{' '}
          or reach out via the contact link in the footer.
        </p>
      </div>
    </section>
  )
}

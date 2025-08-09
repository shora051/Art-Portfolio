import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home({ projects }) {
  return (
    <>
      <Head>
        <title>Saanvi • Art Portfolio</title>
        <meta name="description" content="A bright, poppy artist portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="hero">
        <h1>Hi, I’m Saanvi</h1>
        <p>Welcome to my bright, poppy art world ✨</p>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I’m an artist who loves vibrant colors, playful shapes, and expressive
          stories. This is a living collection of my experiments and projects.
        </p>
      </section>

      <section id="skills" className="section">
        <h2>Skills</h2>
        <ul className="chipRow">
          <li className="chip">Illustration</li>
          <li className="chip">Digital Painting</li>
          <li className="chip">Brand Visuals</li>
          <li className="chip">Motion Sketches</li>
        </ul>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="grid">
          {projects.map((p) => (
            <Link key={p._id} href={`/projects/${p.slug}`} className="tile">
              <div className="thumbWrap">
                {p.images?.[0]?.url && (
                  <Image
                    src={p.images[0].url}
                    alt={p.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                )}
              </div>
              <div className="tileText">
                <h3>{p.title}</h3>
                {p.blurb && <p>{p.blurb}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Saanvi</footer>

      <style jsx>{`
        .hero {
          padding: 3rem 1.5rem 2rem;
          text-align: center;
          background: radial-gradient(60% 60% at 50% 0%, #fff0fb 0%, #ffffff 70%);
        }
        .nav { display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; }
        .nav a { font-weight: 700; color: #ff00a8; }

        .section { padding: 2rem 1.5rem; max-width: 1100px; margin: 0 auto; }
        h2 { margin-bottom: 1rem; }
        .chipRow { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .chip { background: #ffe5f7; border: 2px solid #ff8bd1; border-radius: 999px; padding: 0.5rem 0.9rem; font-weight: 700; }

        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
        .tile { background: #ffffff; border: 2px solid #ffd1f3; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(255,0,128,0.08); display: flex; flex-direction: column; }
        .thumbWrap { position: relative; width: 100%; aspect-ratio: 4/3; background: #fff6fb; }
        .tileText { padding: 0.9rem; }
        .tile h3 { margin-bottom: 0.25rem; }

        .footer { text-align: center; padding: 2rem 1.5rem; color: #999; }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const baseUrl = `${proto}://${host}`;
  try {
    const res = await fetch(`${baseUrl}/api/projects`);
    if (!res.ok) return { props: { projects: [] } };
    const projects = await res.json();
    return { props: { projects: Array.isArray(projects) ? projects : [] } };
  } catch (e) {
    return { props: { projects: [] } };
  }
}

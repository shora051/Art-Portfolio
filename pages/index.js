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
        <div className="heroInner">
          <div className="heroText">
            <h1 className="heroTitle">
              <span className="titleLine">Hi, I’m</span>
              <span className="titleName">Saanvi Hora.</span>
            </h1>
            <p>✨ Welcome to my art world - my way of storytelling ✨</p>
          </div>
          <div className="heroImageWrap">
            <Image
              src="/Saanvi-Profile-2.png"
              alt="A playful, colorful hero illustration"
              fill
              priority
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
        </div>
      </header>

      <section id="about" className="section">
        <div className="aboutWrap">
          <div className="aboutImage">
            <Image
              src="/AboutMe.jpeg"
              alt="Saanvi portrait"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="aboutText">
            <h2 className="aboutTitle">About Me</h2>
            <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
            Hi, my name is Saanvi Hora and I am a rising senior at Heritage High School in Frisco, Texas. In honor of being a part of AP Art class, I was able to create a photography 
            portfolio with 10 fully developed sustained investigations lingering the same theme: How can I show the juxtaposition of true identity and false realities that teenage girls 
            make from watching American media using images of comfort? Through my camera lens, I capture moments that tell compelling stories, translating my creative vision into visual narratives.
            </p>

            <p style={{ fontSize: '0.9rem' }}>
            Additionally, I have worked closely with the staff at my high school, and many middle schools in the DFW metroplex area to add a fine arts column in respective weekly school newsletters. Each week, this column would be dedicated to a different fine arts department, enhancing their visibility and engagement within the school community. Outside of art, I am involved in many clubs at my very own school, and currently serve as an officer for three of them, showcasing leadership skills at my school: I am the Business Professionals of America President, a language ambassador of the French Honors Society, and the secretary chair for the National Honor Society.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="skillsCard">
          <h2>Skills</h2>
          <p className="aboutParagraph">
          Throughout high school, I have taken Art I Advanced, Art II Advanced, and AP Art 2D, which have honed my technical skills across various media and strengthened my ability to develop and execute a cohesive artistic vision.
          Through these classes and my experiences, I have not only learned a variety of art techniques, but also how to go about building a full-scale project with others to create a meaningful final piece.
          </p>
          <ul className="chipRow">
            <li className="chip">Composition</li>
            <li className="chip">Lighting</li>
            <li className="chip">Juxtaposition</li>
            <li className="chip">Perspective</li>
            <li className="chip">Storytelling</li>
            <li className="chip">Detail</li>
            <li className="chip">Focus</li>
            <li className="chip">Contrast</li>
            <li className="chip">Conceptualization</li>
            <li className="chip">Editing</li>
            <li className="chip">Rule of Thirds</li>
            <li className="chip">Patterns</li>
            <li className="chip">Negative Space</li>
            <li className="chip">Emphasis</li>
            <li className="chip">Color Schemes</li>
          </ul>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="projectsWrap">
          <h2 className="projectsTitle">Projects</h2>
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
                {p.blurb && (
                  <div className="thumbOverlay">
                    <p>{p.blurb}</p>
                  </div>
                )}
              </div>
              <div className="tileText">
                <span>{p.title}</span>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerInner">
          <h2 className="footerTitle">Contact</h2>
          <p className="aboutParagraph" style={{ marginBottom: '1rem' }}>
            Let’s collaborate or just say hi. I love chatting about art, stories, and new ideas.
          </p>
          <div className="contactActions">
            <a className="contactBtn primary" href="mailto:saanvihora26@gmail.com" aria-label="Email Saanvi">Email Me</a>
            <a className="contactBtn secondary" href="https://www.instagram.com/saanvihora26/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="contactBtn secondary" href="https://www.linkedin.com/in/saanvi-hora-209783339/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="copyright">© {new Date().getFullYear()} Saanvi's Art Portfolio.</div>
        </div>
      </footer>

      <style jsx>{`
        .hero {
          padding: 3rem 1.5rem 2rem;
          text-align: left;
          background: radial-gradient(60% 60% at 50% 0%, var(--blue-50) 0%, var(--pink-50) 80%);
        }
        .heroInner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2rem; align-items: center; }
        .heroTitle { margin-bottom: 0.5rem; font-size: clamp(2.4rem, 5.5vw, 4.25rem); line-height: 1.05; font-weight: 900; letter-spacing: -0.02em; }
        .titleLine { display: block; color: var(--text); font-weight: 800; opacity: 0.85; }
        .titleName { display: inline-block; position: relative; background: linear-gradient(90deg, var(--pink-400), var(--blue-400)); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 10px 35px rgba(255,141,195,0.45), 0 4px 14px rgba(132,202,255,0.35); transition: transform 300ms ease; }
        .titleName::before { content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.65) 30%, transparent 60%); transform: translateX(-120%); animation: sheen 2400ms ease-in-out infinite; pointer-events: none; }
        .titleName::after { content: ""; display: block; height: 8px; border-radius: 8px; margin-top: 10px; background: linear-gradient(90deg, var(--pink-200), var(--blue-200)); transform-origin: left center; transform: scaleX(0.7); transition: transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1); }
        .heroTitle:hover .titleName { transform: translateY(-2px); }
        .heroTitle:hover .titleName::after { transform: scaleX(1); }
        @keyframes sheen { 0% { transform: translateX(-120%); } 60% { transform: translateX(120%); } 100% { transform: translateX(120%); } }
        .heroText p { color: #555; font-size: clamp(1.05rem, 2.1vw, 1.45rem); line-height: 1.5; }
        .heroImageWrap { position: relative; width: 100%; aspect-ratio: 4/3; border: 2px solid var(--blue-200); border-radius: 16px; overflow: hidden; background: linear-gradient(135deg, var(--blue-50), var(--pink-50)); box-shadow: 0 20px 50px rgba(132,202,255,0.18); }
        .heroImageWrap::before { content: ""; position: absolute; inset: -10%; background:
          radial-gradient(closest-side at 80% 20%, rgba(255,141,195,0.28), transparent 70%),
          radial-gradient(closest-side at 15% 85%, rgba(132,202,255,0.28), transparent 70%);
          filter: blur(22px); z-index: 0; }
        .heroImageWrap::after { content: ""; position: absolute; inset: 0; background:
          radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 1px);
          background-size: 22px 22px; opacity: 0.25; z-index: 0; }
        .heroImageWrap :global(img) { position: relative; z-index: 1; }
        @media (max-width: 800px) {
          .heroInner { grid-template-columns: 1fr; }
          .heroImageWrap { aspect-ratio: 3/2; margin-top: 1rem; }
        }
        .nav { display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; }
        .nav a { font-weight: 700; color: var(--accent); }

        .section { padding: 2rem 1.5rem; max-width: 1100px; margin: 0 auto; }
        h2 { margin-bottom: 1rem; }
        .aboutWrap { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 2rem; align-items: center; }
        .aboutImage { position: relative; width: 100%; aspect-ratio: 4/5; border-radius: 18px; overflow: hidden; border: 2px solid var(--pink-200); background: linear-gradient(135deg, var(--pink-50), var(--blue-50)); box-shadow: 0 16px 40px rgba(255, 141, 195, 0.18); }
        .aboutText { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; }
        .aboutTitle { font-weight: 700; font-size: clamp(1.8rem, 3.4vw, 2.4rem); letter-spacing: 0.2px; background: linear-gradient(90deg, var(--pink-400), var(--blue-400)); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 0.5rem; }
        .aboutText p { font-size: clamp(1.05rem, 2vw, 1.25rem); line-height: 1.75; color: #3a3a3a; }
        .aboutParagraph { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 0.9rem; line-height: 1.75; color: #3a3a3a; margin-bottom: 2rem; }
        @media (max-width: 900px) {
          .aboutWrap { grid-template-columns: 1fr; }
          .aboutImage { aspect-ratio: 3/4; }
        }
        /* Skills */
        .skillsCard { position: relative; overflow: hidden; padding: 1.25rem 1.25rem 1.1rem; border-radius: 20px; border: 2px solid var(--blue-200); background:
            linear-gradient(140deg, var(--blue-50) 0%, #ffffff 55%, var(--pink-50) 100%);
            box-shadow: 0 16px 40px rgba(132, 202, 255, 0.12);
        }
        .skillsCard::after { content: ""; position: absolute; inset: 0; background:
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 1px);
            background-size: 22px 22px; opacity: 0.25; pointer-events: none; }
        #skills h2 { 
          background: linear-gradient(90deg, var(--pink-400), var(--blue-400));
          -webkit-background-clip: text; background-clip: text; color: transparent;
          margin-bottom: 0.75rem;
        }
        .chipRow { display: flex; flex-wrap: wrap; gap: 0.8rem 0.8rem; }
        .chip {
          display: inline-flex; align-items: center; justify-content: center;
          background: 
            linear-gradient(#ffffff, #ffffff) padding-box,
            linear-gradient(90deg, var(--pink-200), var(--blue-200)) border-box;
          border: 2px solid transparent;
          border-radius: 999px;
          padding: 0.6rem 1rem;
          font-weight: 700;
          color: #2a2a2a;
          box-shadow: 0 6px 18px rgba(132, 202, 255, 0.12);
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .chip:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(132, 202, 255, 0.18); }
        .chip:focus-visible { outline: 3px solid var(--blue-200); outline-offset: 2px; }

        .projectsWrap { position: relative; overflow: hidden; padding: 1.25rem; border-radius: 20px; border: 2px solid var(--pink-200); background: #ffffff; box-shadow: 0 16px 38px rgba(255,141,195,0.12); }
        .projectsWrap::after { content: ""; position: absolute; inset: 0; background:
          repeating-linear-gradient(45deg, rgba(255,141,195,0.06), rgba(255,141,195,0.06) 14px, rgba(132,202,255,0.06) 14px, rgba(132,202,255,0.06) 28px);
          pointer-events: none; }
        .projectsTitle { margin-bottom: 0.85rem; background: linear-gradient(90deg, var(--blue-400), var(--pink-400)); -webkit-background-clip: text; background-clip: text; color: transparent; display: flex; align-items: center; gap: 0.75rem; }
        .projectsTitle::after { content: ""; height: 2px; flex: 1; background: linear-gradient(90deg, var(--pink-200), var(--blue-200)); border-radius: 2px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
        .tile { background: #ffffff; border: 2px solid var(--blue-200); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(132,202,255,0.12); display: flex; flex-direction: column; transition: transform 200ms ease, box-shadow 200ms ease; }
        .tile:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(132,202,255,0.18); }
        .thumbWrap { position: relative; width: 100%; aspect-ratio: 4/3; background: linear-gradient(135deg, var(--blue-50), var(--pink-50)); overflow: hidden; }
        .thumbWrap :global(img) { position: absolute; inset: 0; z-index: 0; transition: transform 320ms ease, filter 320ms ease; will-change: transform, filter; }
        .thumbOverlay { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; text-align: center; opacity: 0; transform: translateY(16px); padding: 1rem; pointer-events: none; will-change: opacity, transform; 
          background:
            linear-gradient(to top, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.68) 38%, rgba(255,255,255,0.28) 70%, rgba(255,255,255,0.18) 100%),
            radial-gradient(closest-side at 85% 15%, rgba(255,141,195,0.16), transparent 70%),
            radial-gradient(closest-side at 10% 90%, rgba(132,202,255,0.16), transparent 70%);
          backdrop-filter: blur(3px) saturate(1.02);
          transition: opacity 320ms ease, transform 320ms ease;
        }
        .thumbOverlay p { margin: 0; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; color: #3a3a3a; font-weight: 400; font-size: 0.9rem; line-height: 1.5; max-width: 90%;
          opacity: 0; transform: translateY(10px); transition: opacity 360ms ease 60ms, transform 360ms ease 60ms; }
        .thumbWrap:hover .thumbOverlay, .tile:focus-within .thumbOverlay { opacity: 1; transform: translateY(0); }
        .thumbWrap:hover .thumbOverlay p, .tile:focus-within .thumbOverlay p { opacity: 1; transform: translateY(0); }
        .thumbWrap:hover :global(img) { transform: scale(1.05); filter: brightness(1) saturate(0.98); }
        .tileText { padding: 0.9rem; text-align: center; }
        .tile h3 { margin-bottom: 0.25rem; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; color: #3a3a3a; font-weight: 600; }

        .footer { position: relative; padding: 3rem 1.5rem 3.5rem; }
        .footer::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 160px; pointer-events: none; 
          background: radial-gradient(80% 140px at 50% 0%, rgba(255,141,195,0.14) 0%, rgba(132,202,255,0.12) 45%, transparent 70%); }
        .footerInner { max-width: 1100px; margin: 0 auto; text-align: center; position: relative; }
        .footerInner::before { content: ""; display: block; height: 2px; max-width: 900px; margin: 0 auto 1rem; border-radius: 2px; opacity: 0.9;
          background: linear-gradient(90deg, var(--pink-200), var(--blue-200)); }
        .footerTitle { margin-bottom: 0.6rem; background: linear-gradient(90deg, var(--pink-400), var(--blue-400)); -webkit-background-clip: text; background-clip: text; color: transparent; text-align: center; }
        .footerInner :global(.aboutParagraph) { text-align: center; max-width: 800px; margin-left: auto; margin-right: auto; }
        .contactActions { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; margin-bottom: 0.4rem; }
        .contactBtn { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 0.6rem 1rem; font-weight: 700; text-decoration: none; transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease; }
        .contactBtn.primary { color: #fff; background: linear-gradient(90deg, var(--pink-400), var(--blue-400)); box-shadow: 0 8px 22px rgba(132,202,255,0.25); }
        .contactBtn.secondary { background: linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(90deg, var(--pink-200), var(--blue-200)) border-box; border: 2px solid transparent; color: #2a2a2a; }
        .contactBtn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(132,202,255,0.22); }
        .contactBtn.secondary:hover, .contactBtn.secondary:focus-visible { color: #fff; background: linear-gradient(90deg, var(--pink-400), var(--blue-400)); border-color: transparent; box-shadow: 0 10px 26px rgba(132,202,255,0.22); }
        .copyright { text-align: center; color: #777; margin-top: 0.9rem; font-weight: 600; }
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

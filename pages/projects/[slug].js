import Head from 'next/head';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProjectDetail({ project }) {
  if (!project) return <p style={{ padding: '2rem' }}>Not found</p>;

  return (
    <>
      <Head>
        <title>{project.title} • Saanvi</title>
      </Head>
      <div className="container projectPage">
        <div className="projectHeader">
          <h1 className="projectTitle">{project.title}</h1>
        </div>

        <div className="galleryCard">
          <Swiper modules={[Navigation, Pagination, A11y]} navigation pagination={{ clickable: true }}>
            {project.images?.map((img) => (
              <SwiperSlide key={img.url}>
                <div className="slideImg">
                  <Image src={img.url} alt={project.title} fill style={{ objectFit: 'contain' }} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
         <div style={{ height: '50px' }}></div>
        <article className="projectBody">{project.description}</article>
      </div>

      <style jsx>{`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; }
        .projectHeader { display: flex; justify-content: center; }
        .projectTitle { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-weight: 800; font-size: clamp(1.8rem, 4.5vw, 2.8rem); letter-spacing: 0.2px; margin-bottom: 0.75rem; 
          background: linear-gradient(90deg, var(--pink-400), var(--blue-400)); -webkit-background-clip: text; background-clip: text; color: transparent; }

        .galleryCard { position: relative; overflow: hidden; border-radius: 18px; border: 2px solid var(--blue-200); padding: 0.5rem; background:
          linear-gradient(135deg, var(--blue-50), #ffffff 60%, var(--pink-50)); box-shadow: 0 14px 34px rgba(132,202,255,0.14); }
        .galleryCard :global(.swiper) { width: 100%; height: auto; }
        .slideImg { position: relative; width: 100%; aspect-ratio: 16/9; background: #fff; border-radius: 12px; }
        @media (max-width: 800px) { .slideImg { aspect-ratio: 4/3; } }

        .projectBody { margin-top: 1.25rem; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 1.05rem; line-height: 1.75; color: #3a3a3a; text-align: center; max-width: 900px; margin-left: auto; margin-right: auto; }
      `}</style>
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const req = context.req;
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const baseUrl = `${proto}://${host}`;
  try {
    const res = await fetch(`${baseUrl}/api/projects?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) return { props: { project: null } };
    const project = await res.json();
    return { props: { project } };
  } catch (e) {
    return { props: { project: null } };
  }
}



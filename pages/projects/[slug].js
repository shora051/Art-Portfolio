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
      <div className="container">
        <h1>{project.title}</h1>
        <div className="carousel">
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
        <article className="desc">{project.description}</article>
      </div>

      <style jsx>{`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem 1rem; }
        h1 { margin-bottom: 1rem; }
        .carousel { background: #fff; border: 2px solid #ffd1f3; border-radius: 16px; padding: 0.5rem; box-shadow: 0 10px 30px rgba(255,0,128,0.08); }
        .slideImg { position: relative; width: 100%; height: 60vh; }
        .desc { margin-top: 1.25rem; line-height: 1.7; background: #fff8ff; border: 2px solid #ff8bd1; border-radius: 12px; padding: 1rem; }
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



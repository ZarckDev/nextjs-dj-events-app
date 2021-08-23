import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log('delete');
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Modifier
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Supprimer
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}

        <h3>Artistes :</h3>
        <p>{evt.performers}</p>
        <h3>Détails :</h3>
        <p>{evt.description}</p>
        <h3>Lieu : {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Retour</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true, // false : 404 if not found
  };
}

export async function getStaticProps({ params: { slug } }) {
  // params from getStaticPaths
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }

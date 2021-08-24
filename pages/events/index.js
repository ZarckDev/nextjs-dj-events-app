import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import EventItem from '@/components/EventItem';
import { API_URL, PER_PAGE } from '@/config/index';

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Concerts</h1>
      {events.length === 0 && <h3>Pas de concerts pour l'instant</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // get page from url query

  //Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE; // + convert to Int

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`); // Strapi default endpoint https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-endpoints
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: {
      events,
      page: +page, // return page as Int
      total,
    },
  };
}

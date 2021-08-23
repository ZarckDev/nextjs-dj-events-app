import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css';
import { useRouter } from 'next/router';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />
      {/* Just showcase on Home */}
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'DJ Events | Trouvez votre soirée',
  description: 'Trouvez les derniers événements et concerts',
  keywords: 'musique, dj, electro, evenement',
};

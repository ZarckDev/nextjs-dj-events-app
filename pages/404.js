import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';

export default function NotFoundPage() {
  return (
    <Layout title='Page Non trouvée'>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Désolé, il n'y a rien ici</h4>
        <Link href='/'>Retour</Link>
      </div>
    </Layout>
  );
}

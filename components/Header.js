import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import Search from './Search';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import styles from '@/styles/Header.module.css';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Concerts</a>
            </Link>
          </li>
          {user ? (
            // If logged In
            <>
              <li>
                <Link href='/events/add'>
                  <a>Ajouter Concert</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Mon compte</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()} // logout() coming from Context
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt /> Deconnexion
                </button>
              </li>
            </>
          ) : (
            // If logged Out
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Connexion
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

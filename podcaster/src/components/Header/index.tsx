import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import Link from 'next/link';

import styles from './styles.module.scss';

export function Header(){

  const currentDate = format(new Date(), 'E, MMMM do', {locale: enUS});

  return(
    <header className={styles.headerContainer}>
      <a href="/">
       <img src="/logo.svg" alt="Podcaster"/>
      </a>

      <p>The podcast for you to listen all the time</p>
      <span>{currentDate}</span>
    </header>
  );
}
import { SignInButton } from '../SignInButton';
import Link from 'next/link';

import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ActiveLink } from '../ActiveLink';

export function Header() {
    const { asPath } = useRouter();

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/'}>
                    <a>
                        <Image
                            src="/images/logo.svg"
                            alt="ig.news"
                            height={31}
                            width={110}
                        />
                    </a>
                </Link>

                <nav>
                    <ActiveLink activeClassName={styles.active} href={'/'}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink
                        activeClassName={styles.active}
                        prefetch
                        href={'/posts'}
                    >
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
}

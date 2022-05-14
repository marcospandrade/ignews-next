import Head from 'next/head';
import styles from './styles.module.scss';
export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de agosto de 2022</time>
                        <strong>Create a Monorep Angular</strong>
                        <p>
                            In this guide you will learn how to create a
                            monorepo using nx for angular projects
                        </p>
                    </a>
                    <a>
                        <time>12 de agosto de 2022</time>
                        <strong>Create a Monorep Angular</strong>
                        <p>
                            In this guide you will learn how to create a
                            monorepo using nx for angular projects
                        </p>
                    </a>
                    <a>
                        <time>12 de agosto de 2022</time>
                        <strong>Create a Monorep Angular</strong>
                        <p>
                            In this guide you will learn how to create a
                            monorepo using nx for angular projects
                        </p>
                    </a>
                </div>
            </main>
        </>
    );
}

import { useEffect } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { asHTML } from '@prismicio/helpers';
import { asText } from '@prismicio/richtext';

import { getPrismicClient } from '../../../services/prismic';

import styles from '../post.module.scss';

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    };
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [post.slug, router, session]);

    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>

                    <div
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href={'/'}>
                            <a href="">Subscribe now</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

// Quais rotas eu gostaria de gerar estáticamente durante o processo de build
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            //     {
            //         params: {
            //             slug: '5-ferramentas-em-alta-para-desenvolvedores-react'
            //         }
            //     }
        ],
        fallback: 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('post-id', slug.toString(), {});

    const post = {
        slug,
        title: asText(response.data.title),
        content: asHTML(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString(
            'pt-BR',
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }
        )
    };

    return {
        props: {
            post
        },
        redirect: 60 * 30 // 30 minutes
    };
};
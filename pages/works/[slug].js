import { useRouter } from 'next/router'
import { getWorkBySlug, getAllWorks } from '../../lib/api'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml';
import formatDate from '../../lib/formatDate';

import Header from '../../parts/header';

function Work({ work }) {

    console.log(work);

    const router = useRouter();

    if (!router.isFallback && !work?.slug) {
        return <p>404</p>
    }

    return (
        <>
            <Head>
                <title>{work.title}</title>
            </Head>

            <Header />

            <h1>{work.title}</h1>
            <p>{formatDate(work.date)}</p>

            <div dangerouslySetInnerHTML={{ __html: work.content }}></div>
        </>
    )
}

export async function getStaticProps({ params }) {

    const work = getWorkBySlug(params.slug, [
        'title',
        'coverImage',
        'date',
        'content',
    ])
    const content = await markdownToHtml(work.content || '')

    return {
        props: {
            work: {
                ...work,
                content,
            }
        }
    }
}

export async function getStaticPaths() {

    const works = getAllWorks(['slug'])

    return {
        paths: works.map((work) => {
            return {
                params: {
                    slug: work.slug,
                }
            }
        }),
        fallback: false,
    }
}

export default Work;
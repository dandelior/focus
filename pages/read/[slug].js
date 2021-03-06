import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import Head from 'next/head'
import Image from 'next/image'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import formatDate from '../../lib/formatDate';

import Header from '../../parts/header';

function Post({ post, morePosts, preview }) {

    const router = useRouter();

    if (!router.isFallback && !post?.slug) {
        return <p>404</p>
    }

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>

            <Header />
            
            <h1>{post.title}</h1>

            <Image
                src={post.coverImage} 
                alt={post.title}
                width="1200"
                height="720"
                layout="intrinsic"
            />

            <p>{formatDate(post.date)} - {post.author.name}</p>

            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </>
    )

}

// This also gets called at build time
export async function getStaticProps({ params }) {

    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
    ])
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}


// This function gets called at build time
export async function getStaticPaths() {

    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}

  
export default Post;
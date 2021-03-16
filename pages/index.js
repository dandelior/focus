
import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
// import styles from '../styles/Home.module.css'

export default function Home({ allPosts }) {

  const heroPost = allPosts[0];
  const lastPosts = allPosts;

  return (
    <div>
      <Head>
        <title>Create Next App with {CMS_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {lastPosts.map((post) => (
        <>
          <h1>{post.title}</h1>
          <p>{post.date}</p>
          <Link as={`${post.slug}`} href="/[slug]">
            <a>{post.title}</a>
          </Link>
        </>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}

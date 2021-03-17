
import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/api'
import formatDate from '../lib/formatDate';
import { CMS_NAME } from '../lib/constants'
// import styles from '../styles/Home.module.css'
import Header from '../parts/header';

export default function Home({ allPosts }) {

  const heroPost = allPosts[0];
  const lastPosts = allPosts;

  return (
    <div>
      <Head>
        <title>Create Next App with {CMS_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {lastPosts.map((post) => (
        <>
          <Link as={`${post.slug}`} href="/[slug]">
            <a>
              <h1>{post.title}</h1>
            </a>
          </Link>
          <p>
            {formatDate(post.date)}
          </p>
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

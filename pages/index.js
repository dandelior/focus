
import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts, getAllWorks } from '../lib/api'
import formatDate from '../lib/formatDate';
import { CMS_NAME } from '../lib/constants'
// import styles from '../styles/Home.module.css'
import Header from '../parts/header';

export default function Home({ posts }) {

  const allPosts = posts.allPosts;
  const allWorks = posts.allWorks;

  const heroPost = allPosts[0];
  const lastPosts = allPosts;

  return (
    <div>
      <Head>
        <title>Create Next App with {CMS_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <h1>Posts</h1>

      {allWorks.map((work) => (
        <>
          <Link as={`/works/${work.slug}`} href="/works/[slug]">
            <a>
              <h3>{work.title}</h3>
            </a>
          </Link>
        </>
      ))}

      <h1>Works</h1>
      
      {lastPosts.map((post) => (
        <>
          <Link as={`/read/${post.slug}`} href="/read/[slug]">
            <a>
              <h3>{post.title}</h3>
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

  const allWorks = getAllWorks([
    'title',
    'slug',
  ])

  return {
    props: { 
      posts: {
        allPosts,
        allWorks,
      }
    },
  }
}

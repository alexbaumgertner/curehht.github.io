// import gql from 'graphql-tag'
import { notFound } from 'next/navigation'

// import { getClient } from '@/components/Apollo/ServerProvider'

// const GET_PAGES_SLUG = gql`
//   query GetPages {
//     pages {
//       slug
//     }
//   }
// `
// const GET_PAGE = gql`
//   query GetPage($slug: String!) {
//     page(slug: $slug) {
//       id
//       slug
//       title
//       summary
//       content
//       created_at
//       updated_at
//     }
//   }
// `

// async function fetchSlugsFromDB() {
//   // const client = getClient()
//   //   const { data } = await client.query({
//   //     query: GET_PAGES_SLUG,
//   //   })

//   // return data.pages.map((page: { slug: string }) => page.slug)
//   return []
// }

export async function generateStaticParams() {
  //const slugs = await fetchSlugsFromDB()

  // return slugs.map((slug: string) => ({
  //   slug,
  // }))

  return []
}

async function fetchPageBySlug(slug: string) {
  // const client = getClient()
  // const { data } = await client.query({
  //   query: GET_PAGE,
  //   variables: {
  //     slug,
  //   },
  // })
  // return data.page
  console.log('_______fetchPageBySlug', { slug })
  return null
}

export default async function SlugPage({ params }) {
  const { slug } = params
  const page = await fetchPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  )
}

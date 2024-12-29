'use client'

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'

const GET_PAGES = gql`
  query GetPages {
    pages {
      id
      slug
      title
      summary
      content
      created_at
      updated_at
    }
  }
`

export default function AdminPages() {
  const { data, loading, error } = useQuery(GET_PAGES)
  return (
    <div>
      <h2>Pages</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <Link href="/admin/pages/new">Create Page</Link>
      {data && (
        <ul>
          {data.pages.map((page) => (
            <li key={page.id}>
              <Link href={`/admin/pages/${page.id}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

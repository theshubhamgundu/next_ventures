import React from "react"

import StartupCard, { StartupTypeCard } from "@/components/startup-card"
import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"

const UserStartups = async ({ id }: { id: string }) => {
  // Handle case when Sanity is not configured
  if (!client) {
    return (
      <div className="text-center text-gray-600">
        <p>No startups available at the moment.</p>
      </div>
    )
  }

  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

  return (
    <>
      {startups.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {startups.map((post: StartupTypeCard) => (
            <StartupCard key={post?._id} post={post} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl text-gray-600">
          No startups found
        </p>
      )}
    </>
  )
}

export default UserStartups

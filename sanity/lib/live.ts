import "server-only"

import { defineLive } from "next-sanity"

import { client } from "@/sanity/lib/client"

// Only define live components if client exists
export const { sanityFetch, SanityLive } = client ? defineLive({ client }) : {
  sanityFetch: () => Promise.resolve(null),
  SanityLive: () => null,
}

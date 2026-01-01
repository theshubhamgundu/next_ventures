import "server-only"

import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, token } from "../env"

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

// Only throw error if we're not in a dummy environment
if (!writeClient.config().token && projectId !== "dummy") {
  throw new Error("Write token not found.")
}

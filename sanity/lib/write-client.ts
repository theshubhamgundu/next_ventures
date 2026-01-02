import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, token } from "../env"

// Only create client if we have a real project ID (not dummy)
export const writeClient = projectId && projectId !== "dummy" ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
}) : null

// Only throw error if we're not in a dummy environment and have a real project ID
if (writeClient && !writeClient.config().token && projectId !== "dummy") {
  if (typeof window === "undefined") {
    throw new Error("Write token not found.")
  }
}

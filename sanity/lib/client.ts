import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "../env"

// Only create client if we have a real project ID (not dummy)
export const client = projectId && projectId !== "dummy" ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
}) : null

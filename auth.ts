import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"
import { projectId, dataset } from "@/sanity/env"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      // Skip database operations if Sanity is not configured or client is null
      if (!projectId || projectId === "dummy" || !dataset || !client) {
        return true
      }

      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id,
          })

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name,
            username: login,
            email,
            image,
            bio: bio || "",
          })
        }
      } catch (error) {
        console.warn("Sanity operations skipped:", error)
      }
      
      return true
    },
    async jwt({ token, account, profile }) {
      // Skip database operations if Sanity is not configured or client is null
      if (!projectId || projectId === "dummy" || !dataset || !client) {
        return token
      }

      try {
        if (account && profile) {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: profile?.id,
            })

          token.id = user?._id
        }
      } catch (error) {
        console.warn("Sanity operations skipped:", error)
      }

      return token
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id })
      return session
    },
  },
})

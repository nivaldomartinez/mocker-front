import type { APIRoute } from "astro"

const API_URL = import.meta.env.API_URL

export const POST: APIRoute = async ({request}) => {
    const body = await request.json()
    const response = await fetch(
        `${API_URL}/sources`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(body)
        }
      )

      return new Response(await response.arrayBuffer())
}
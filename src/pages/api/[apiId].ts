import type { APIRoute } from "astro";

const API_URL = import.meta.env.API_URL

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { apiId } = params

    const response = await fetch(`${API_URL}/sources/${apiId}`)

    if (!response.ok) {
        return new Response(null, {
            status: 404,
            statusText: 'API not found'
        }) 
    }
    return new Response(await response.arrayBuffer())
}
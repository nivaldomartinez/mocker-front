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
    const json = await response.json()
    return new Response(JSON.stringify(json.data), {
        status: json.statusCode,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
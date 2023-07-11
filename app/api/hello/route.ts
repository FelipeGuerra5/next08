import { NextResponse } from "next/server"
import { limiter } from "../config/limiter"

export async function GET(request: Request) {

    const origin = request.headers.get('origin')
    const remaining = await limiter.removeTokens(1)
    console.log(`Remaining: ${remaining} Tokens`)

    if (remaining < 0) {
        return new NextResponse(null, {
            status: 429,
            statusText: "Too Many Requests",
            headers: {
                'Acess-Control-Allow-Origin': origin || '*',
                'Content-Type': 'text/plain',
            }
        })
    }
    return new Response('Hello, next.js')
}
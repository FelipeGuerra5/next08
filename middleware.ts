import { NextResponse } from "next/server"

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000']

export function middleware(request: Request) {
    const origin = request.headers.get('origin') //If existis
    console.log(origin)

    if (origin && !allowedOrigins.includes(origin)) { // || !origin t-> to block the postman, insomnia etc.
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    console.log("Middleware")

    console.log(request.method)
    console.log(request.url)


    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}
import { NextResponse } from "next/server"
import { text } from "stream/consumers"

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"
const API_KEY: string = process.env.DATA_API_KEY!

export async function GET(request: Request) {
    const origin = request.headers.get('origin')
    const res = await fetch(DATA_SOURCE_URL)
    const todos: Todo[] = await res.json()

    return new NextResponse(JSON.stringify(todos), {
        headers: {
            'Acess-Control-Allow-Origin': origin || "*",
            'Content-Type': "application/json"
        }
    })
}

export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json()

    if (!id) return NextResponse.json({ "message": "Method Requires ID" })

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            'content-Type': 'application/json',
            'API-Key': API_KEY
        }
    })

    return NextResponse.json({ "message": `Todo ${id} Deleted` })
}

export async function POST(request: Request) {
    const { userId, title }: Partial<Todo> = await request.json()

    if (!userId || !title) return NextResponse.json({ "message": "Missing required data" })

    const res = await fetch(DATA_SOURCE_URL, {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed: false
        })
    })
    const newTodo: Todo = await res.json()

    return NextResponse.json(newTodo)
}

export async function PUT(request: Request) {
    const { userId, id, title, completed }: Partial<Todo> = await request.json()

    if (!userId || !title || !id || typeof (completed) !== 'boolean') return NextResponse.json({ "message": "Missing required data" })

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "PUT",
        headers: {
            'content-Type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed
        })
    })
    const updated: Todo = await res.json()

    return NextResponse.json(updated)
}

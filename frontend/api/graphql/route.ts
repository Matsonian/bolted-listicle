import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // Add authorization header if user is authenticated
    if ((session as any)?.accessToken) {
      headers.Authorization = `Bearer ${(session as any).accessToken}`
    }

    const response = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("GraphQL proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

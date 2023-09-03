import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    revalidatePath("/")
    revalidatePath("/shop")
    console.log("revalidating ...")
    return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 })
}
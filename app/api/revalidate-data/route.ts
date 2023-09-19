import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    try {
        revalidatePath("/")
        revalidatePath("/shop")
        revalidateTag('mainData')
        console.log("revalidating ...")
        return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ revalidated: false, now: Date.now() }, { status: 500 })
    }
}

import { NextResponse, NextRequest } from "next/server";
import prismadb from "../../../dashboard/_lib/prismadb";


export async function POST(req: NextRequest) {
    console.log('receievd')
    const { question, answer } = await req.json();
    try {
        await prismadb.fAQ.create({
            data: {
                answer: answer,
                question: question,

            }
        })
        return NextResponse.json('created succesfully', { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ "message": "server error" }, { status: 500 })
    }
}
export async function PATCH(req: NextRequest, { params }: { params: { faqId: Array<string> } }) {
    const { answer, question } = await req.json();
    const [id] = params.faqId
    console.log(question, answer)
    try {
        const newfaq = await prismadb.fAQ.update({
            where: {
                id: id
            },
            data: {
                answer: answer,
                question: question,
            }
        })
        return NextResponse.json('created succesfully', { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ "message": "server error" }, { status: 500 })
    }
}
export async function DELETE(req: NextRequest, { params }: { params: { faqId: Array<string> } }) {
    const [id] = params.faqId
    try {
        const newfaq = await prismadb.fAQ.delete({
            where: {
                id: id
            },
        })
        return NextResponse.json('deleted ', { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ "message": "server error" }, { status: 500 })
    }
}

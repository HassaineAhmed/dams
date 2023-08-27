import { NextResponse, NextRequest } from "next/server";
import prismadb from "../../../dashboard/_lib/prismadb";

function parseStringToNumber(input: any): number | null {
    const parsedNumber = parseFloat(input);
    return isNaN(parsedNumber) ? null : parsedNumber;
}

export async function POST(req: NextRequest) {
    console.log('receievd')
    const { name, email, phone_number, message } = await req.json();
    console.log(name, email, message)
    try {
        await prismadb.feedback.create({
            data: {
                name: name,
                email: email,
                message: message,
                phoneNumber: parseStringToNumber(phone_number),
                date: new Date()

            }
        })
        return NextResponse.json('created succesfully', { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ "message": "server error" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { feedbackId: Array<string> } }) {
    const [id] = params.feedbackId
    try {
        const deletedfeeeeeeeeeeedback = await prismadb.feedback.delete({
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

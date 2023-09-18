import { NextResponse, NextRequest } from "next/server"
import prismadb from "../../../dashboard/_lib/prismadb";


type formData = {
    productId: string,
    productName: string,
    name: string,
    phoneNumber: number,
    wilaya: string,
    size: string,
    quantity: number,
    address: string,
}

export async function PATCH(req: NextRequest) {
    try {
        const { stage, orderId } = await req.json();
        console.log(orderId)
        await prismadb.order.update({ where: { id: orderId }, data: { stage: stage } })
        return NextResponse.json("order staged updated succesffuly", { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json("server error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { orderId: Array<number> } }) {
    try {
        const [orderId] = params.orderId
        if (orderId && !isNaN(Number(orderId))) {
            await prismadb.order.delete({ where: { id: Number(orderId) } })
        }
        return NextResponse.json("order deleted updated succesffuly", { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json("server error", { status: 500 })
    }
}


export async function POST(req: NextRequest) {
    try {
        const {
            productId,
            name,
            phoneNumber,
            wilaya,
            size,
            quantity,
            address,
        }: formData
            = await req.json();
        await prismadb.order.create({
            data: {
                product: { connect: { id: productId } },
                fullName: name,
                phoneNumber: phoneNumber,
                wilaya: wilaya,
                size: size,
                quantity: quantity,
                fullAdress: address,
                createdAt: new Date(),
                stage: "preparing"
            }
        })
        return NextResponse.json("finished", { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json("server error", { status: 500 })
    }
}

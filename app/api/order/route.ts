import { NextResponse, NextRequest } from "next/server"
import prismadb from "../../dashboard/_lib/prismadb";


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
            productName
        }: formData
            = await req.json();
        console.log(productName);
        const product = await prismadb.product.findUnique({ where: { name: productName } })
        const allProducts = await prismadb.product.findMany();
        console.log("all prroducts ", allProducts);

        console.log("I found the product:", product)
        await prismadb.order.create({
            data: {
                product: { connect: { name: productName } },
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

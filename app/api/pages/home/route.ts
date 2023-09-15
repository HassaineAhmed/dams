import { NextResponse, NextRequest } from "next/server";
import prismadb from "next/font/app/dashboard/_lib/prismadb";
import { Product, Category, FAQ } from "@prisma/client"
type TProducts = Array<Product & { imagesNames: { imageName: string }[] }>

export async function GET() {
    try {
        const start = performance.now();
        const categories: Array<Category & { imageName: Array<{ imageName: string }> }> = await prismadb.category.findMany({
            include:
                { imageName: { select: { imageName: true } }, Product: { include: { imagesNames: { select: { imageName: true } } } } }
        });

        const faqs: Array<FAQ> = await prismadb.fAQ.findMany();
        const tabs_products: TProducts = await prismadb.product.findMany({
            where: { OR: [{ isTrending: true }, { isNewArrival: true }, { isComingSoon: true }] },
            include: {
                imagesNames: { select: { imageName: true } }
            }
        })
        const products = await prismadb.product.findMany({ include: { imagesNames: { select: { imageName: true } } } });
        const finish = performance.now();

        console.log("time taken : ", finish - start);
        return NextResponse.json({ categories, faqs, tabs_products, products }, { status: 200 })
    } catch {
        return NextResponse.json("server error", { status: 500 })
    }
}

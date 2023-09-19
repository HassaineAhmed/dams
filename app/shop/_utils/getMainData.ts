import { Product, Category, FAQ } from "@prisma/client"
import prismadb from "next/font/app/dashboard/_lib/prismadb";
type TProducts = Array<Product & { imagesNames: { imageName: string }[] }>

type TReturn = {
    tabs_products?: TProducts,
    categories?: Array<Category & { imageName: Array<{ imageName: string }> }>,
    faqs?: Array<FAQ>,
    products?: any,
}

export async function getCategories() {
    const categories = await prismadb.category.findMany({
        include:
            { imageName: { select: { imageName: true } }, Product: { include: { imagesNames: { select: { imageName: true } } } } }
    });
    return categories
}

export async function getProducts() {
    const products = await prismadb.product.findMany({ include: { imagesNames: { select: { imageName: true } } } });
    return products
}

export async function getTabsProducts() {
    const tabs_products: TProducts = await prismadb.product.findMany({
        where: { OR: [{ isTrending: true }, { isNewArrival: true }, { isComingSoon: true }] },
        include: {
            imagesNames: { select: { imageName: true } }
        }
    })
    return tabs_products
}

export async function getFAQs() {
    const faqs: Array<FAQ> = await prismadb.fAQ.findMany();
    return faqs
}
export function getMainData(whichData: Array<string>): TReturn | null {
    let data: TReturn = {};
    try {
        whichData.forEach(async (i) => {
            if (i == "products") {
                data.products = getProducts();
            } else if (i == "tabs_products") {
                data.tabs_products = await getTabsProducts();
            } else if (i == "categories") {
                data.categories = await getCategories();
            } else if (i == "faqs") {
                data.faqs = await getFAQs();
            }
        })
        return data;
    } catch (e) {
        return null;
    }
}

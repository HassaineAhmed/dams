import { NextRequest, NextResponse } from "next/font/node_modules/next/server";
import prismadb from "@/_lib/prismadb";
import { auth } from "@clerk/nextjs";
import * as fs from 'fs-extra';

export type ReceivedData = {
    name: string,
    price: number,
    categoryId: string,
    categoryName: string,
    isAvailable: boolean,
    isNewArrival: boolean,
    isForMen: boolean,
    isForWomen: boolean,
    isComingSoon: boolean,
    isTrending: boolean,
    howManyOrders: number,
    imagesNames: Array<{ imageName: string }>
    model: string,
    design: string,
    fit: string,
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json("Unauthenticated!", { status: 400 });
        }

        let {
            name,
            price,
            categoryId,
            categoryName,
            isAvailable,
            isNewArrival,
            isForMen,
            isForWomen,
            isComingSoon,
            isTrending,
            imagesNames,
            model,
            design,
            fit,
        }: ReceivedData = await req.json();

        await prismadb.product.create({
            data: {
                name: name,
                imagesNames: { create: imagesNames },
                price: price,
                isAvailable: isAvailable,
                isTrending: isTrending,
                isNewArrival: isNewArrival,
                isForMen: isForMen,
                isForWomen: isForWomen,
                isComingSoon: isComingSoon,
                model: model ? model : "",
                fit: fit ? fit : "",
                design: design ? design : "",
                productType: { connect: { id: categoryId } }
            },
        })

        // handling images
        await createFolder(`./public/images/${categoryName}/${name}`);
        imagesNames.forEach(async ({ imageName }: { imageName: string }) => {
            await moveImage(`./public/images/temp/${imageName}`, `./public/images/${categoryName}/${name}/${imageName}`)
        })
        return NextResponse.json("category created successfully", { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ msg: "server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { categoryId: Array<string> } }) {
    try {
        const [id] = params.categoryId;
        if (!id) {
            return NextResponse.json("problem indentifiying the id", { status: 404 });
        } else {
            const productType = await prismadb.productType.delete({ where: { id: id } })
            const isFolderDeleted = await deleteFolder(`./public/images/${productType.name}`);
            if (!isFolderDeleted) {
                return NextResponse.json("category deleted, but couldn't delete folder", { status: 500 });
            }
            return NextResponse.json("Category Deleted Successfuly", { status: 202 });
        }
    } catch (e) {
        console.log("there was an error deleting a category");
        return NextResponse.json("internal server error", { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { categoryId: Array<string> } }) {
    console.log('hello');
    try {
        const { data, initialData } = await req.json();
        const { name, imageName, sizingSystem }: ReceivedData = data;
        const imageNameStr = imageName[0].imageName;
        const categoryId = params.categoryId[0]
        const newCategory = await prismadb.productType.update({
            where: { id: categoryId },
            data: {
                name: name,
                sizingSystem: sizingSystem == "numbers" ? "numbers" : "letters",
                imageName: {
                    upsert: {
                        where: { id: initialData.imageName[0].id, imageName: initialData.imageName[0].imageName },
                        update: { imageName: imageNameStr },
                        create: { imageName: imageNameStr }
                    },
                },
            },
            include: {
                imageName: { select: { imageName: true } }
            }
        })
        console.log(newCategory)
        if (name != initialData.name) {
            console.log('moving folder');
            await moveImage(`./public/images/${initialData.name}`, `./public/images/${name}`)
            if (imageNameStr != initialData.imageName[0].imageName) {
                console.log('moving image');
                await moveImage(`./public/images/temp/${imageNameStr}`, `./public/images/${name}/${imageNameStr}`)
                console.log('deleting the old picutre')
                await deleteFolder(`./public/temp/${imageNameStr}`);
                await deleteFolder(`./public/images/${name}/${initialData.imageName[0].imageName}`)
            }

        } else if (imageNameStr != initialData.imageName[0].imageName) {
            console.log('moving image');
            await moveImage(`./public/images/${initialData.name}/${imageNameStr}`, `./public/images/${initialData.name}/${newCategory.imageName[0].imageName}`)
        }

        return NextResponse.json('You are the best programmer in the world', { status: 200 });
    } catch (e) {
        console.log("server error : ", e);
        return NextResponse.json('server error', { status: 500 });
    }
}


async function createFolder(folderPath: string) {
    try {
        await fs.ensureDir(folderPath);
        console.log('Folder created successfully');
        return true
    } catch (error) {
        console.error('Error creating folder:', error);
        return false
    }
}

async function moveImage(sourcePath: string, destinationPath: string) {
    try {
        await fs.move(sourcePath, destinationPath);
        await fs.remove(sourcePath);
        console.log('Image moved successfully');
        return true
    } catch (error) {
        console.error('Error moving image:', error);
        return false
    }
}

async function deleteFolder(folderToDelete: string) {
    try {
        await fs.remove(folderToDelete);
        console.log('Folder deleted successfully');
        return true
    } catch (error) {
        console.error('Error deleting folder:', error);
        return false
    }
}


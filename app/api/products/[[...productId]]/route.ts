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
                imagesNames: { create: imagesNames.map(image => ({ imageName: image.imageName })) },
                price: price,
                isAvailable: isAvailable,
                isTrending: isTrending,
                isNewArrival: isNewArrival,
                isForMen: isForMen,
                isForWomen: isForWomen,
                isComingSoon: isComingSoon,
                model: model ? model : "",
                fit: fit ? fit : "",
                category: { connect: { name: categoryName } },
                design: design ? design : "",
            },
        })

        // handling images
        await createFolder(`./public/images/${categoryName}/${name}`);
        imagesNames.forEach(async ({ imageName }: { imageName: string }) => {
            console.log(imageName);
            await moveImage(`./public/images/temp/${imageName}`, `./public/images/${categoryName}/${name}/${imageName}`)
        })
        return NextResponse.json("category created successfully", { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ msg: "server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { productId: Array<string> } }) {
    try {
        const [id] = params.productId;
        if (!id) {
            return NextResponse.json("problem indentifiying the id", { status: 404 });
        } else {
            const product = await prismadb.product.delete({ where: { id: id } })
            const isFolderDeleted = await deleteFolder(`./public/images/${product.categoryName}/${product.name}`);
            if (!isFolderDeleted) {
                return NextResponse.json("product deleted, but couldn't delete folder", { status: 500 });
            }
            return NextResponse.json("Product Deleted Successfuly", { status: 200 });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json("internal server error", { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { productId: Array<string> } }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json("Unauthenticated!", { status: 400 });
        }
        const [id] = params.productId;
        if (!id) {
            return NextResponse.json("problem indentifiying the id", { status: 404 });
        }

        let { data, initialData } = await req.json();
        let {
            name,
            price,
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
        }: ReceivedData = data;

        console.log('initial data', initialData)
        console.log("new data", data)
        // look for deletd images to tell prisma to delete them from the database
        async function findDeletedImages() {
            let deletedImages: Array<{ imageName: string }> = [];
            let found = false;
            for (let initialImageName in initialData.imagesNames) {
                found = false;
                for (let newImageName in imagesNames) {
                    if (initialData.imagesNames[initialImageName].imageName == imagesNames[newImageName].imageName) {
                        found = true;
                    }
                }
                if (!found) {
                    console.log(`./public/images/${categoryName}/${name}/${initialData.imagesNames[initialImageName].imageName}`)
                    await deleteFolder(`./public/images/${categoryName}/${name}/${initialData.imagesNames[initialImageName].imageName}`)
                    deletedImages.push({ imageName: initialData.imagesNames[initialImageName].imageName })
                }
            }
            return deletedImages;
        }
        const deletedImages = await findDeletedImages()
        console.log('the final result: ', deletedImages)
        await prismadb.product.update({
            where: { id: id },
            data: {
                name: name,
                imagesNames: {
                    connectOrCreate:
                        imagesNames.map(image => ({ create: { imageName: image.imageName }, where: { imageName: image.imageName } })),
                    delete: deletedImages,
                },
                price: price,
                isAvailable: isAvailable,
                isTrending: isTrending,
                isNewArrival: isNewArrival,
                isForMen: isForMen,
                isForWomen: isForWomen,
                isComingSoon: isComingSoon,
                model: model ? model : "",
                fit: fit ? fit : "",
                category: { connect: { name: categoryName } },
                design: design ? design : "",
            },
        })

        if (categoryName != initialData.categoryName) {
            await moveImage(`./public/images/${initialData.categoryName}/${initialData.name}`, `./public/images/${categoryName}/${initialData.name}`)
        }

        if (name != initialData.name) {
            await moveImage(`./public/images/${categoryName}/${initialData.name}`, `./public/images/${categoryName}/${name}`)
        }

        imagesNames.forEach(({ imageName }: { imageName: string }) => {
            initialData.imagesNames.forEach(async ({ initialImageName }: { initialImageName: string }) => {
                if (initialImageName == imageName) {
                    await moveImage(`./public/images/temp/${initialImageName}`, `./public/images/${categoryName}/${name}/${imageName}`)
                    await deleteFolder(`./public/images/temp/${initialImageName}`)
                }
            })
        })
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


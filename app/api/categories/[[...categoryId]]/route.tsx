import { NextRequest, NextResponse } from "next/font/node_modules/next/server";
import prismadb from "@/_lib/prismadb";
import { deleteImage } from "@/_lib/utils";
import { auth } from "@clerk/nextjs";
import * as fs from 'fs-extra';

interface ReceivedData {
  name: string;
  sizingSystem: string;
  imageName: Array<{ imageName: string }>
}


export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) { return NextResponse.json("Unauthenticated!", { status: 400 }); }
    let { name, imageName, sizingSystem }: ReceivedData = await req.json();
    const imageNameStr: string = imageName[0].imageName;
    if (!name || !imageNameStr || !sizingSystem) {
      return NextResponse.json("invalid input data", { status: 400 });
    }
    await prismadb.category.create({
      data: {
        name: name,
        imageName: { create: { imageName: imageNameStr } },
        sizingSystem: sizingSystem == "letters" ? "letters" : sizingSystem == "numbers" ? "numbers" : "letters"
      }
    })
    /*
        const isFolderCreated: boolean = await createFolder(`./public/images/${name}`);
        if (isFolderCreated) {
          const isImageMoved: boolean = await moveImage(`./public/images/temp/${imageNameStr}`, `./public/images/${name}/${imageNameStr}`)
          if (isImageMoved) {
            return NextResponse.json("category created successfully", { status: 200 });
          } else {
            return NextResponse.json("server error", { status: 500 });
          }
  } else {
    return NextResponse.json("server error", { status: 500 });
  }
          */
  } catch (e) {
    console.log("error creating the category : ", e);
    return NextResponse.json({ msg: "server error" }, { status: 500 });
  }
  return NextResponse.json('success', { status: 200 });

}

export async function DELETE(req: NextRequest, { params }: { params: { categoryId: Array<string> } }) {
  try {
    const [id] = params.categoryId;
    if (!id) {
      return NextResponse.json("problem indentifiying the id", { status: 404 });
    } else {
      const category = await prismadb.category.delete({ where: { id: id }, include: { imageName: { select: { imageName: true } } } })
      deleteImage(category.imageName[0].imageName);
      /*
      const isFolderDeleted = await deleteFolder(`./public/images/${category.name}`);
      if (!isFolderDeleted) {
        return NextResponse.json("category deleted, but couldn't delete folder", { status: 500 });
      }
      return NextResponse.json("Category Deleted Successfuly", { status: 202 });
    */
    }
  } catch (e) {
    console.log("there was an error deleting a category", e);
    return NextResponse.json("internal server error", { status: 500 });
  }
  return NextResponse.json("success", { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: { params: { categoryId: Array<string> } }) {
  try {
    const { userId } = auth();
    if (!userId) { return NextResponse.json("Unauthenticated!", { status: 400 }); }
    const { data, initialData } = await req.json();
    const { name, imageName, sizingSystem }: ReceivedData = data;
    const imageNameStr = imageName[0].imageName;
    const categoryId = params.categoryId[0]
    await prismadb.category.update({
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
    /*
        if (name != initialData.name) {
          await moveImage(`./public/images/${initialData.name}`, `./public/images/${name}`)
          if (imageNameStr != initialData.imageName[0].imageName) {
            await moveImage(`./public/images/temp/${imageNameStr}`, `./public/images/${name}/${imageNameStr}`)
    
            await deleteFolder(`./public/temp/${imageNameStr}`);
            await deleteFolder(`./public/images/${name}/${initialData.imageName[0].imageName}`)
          }
    
        } else if (imageNameStr != initialData.imageName[0].imageName) {
          await moveImage(`./public/images/${initialData.name}/${imageNameStr}`, `./public/images/${initialData.name}/${newCategory.imageName[0].imageName}`)
        }
        */

    return NextResponse.json('You are the best programmer in the world', { status: 200 });
  } catch (e) {
    console.log("server error : ", e);
    return NextResponse.json('server error', { status: 500 });
  }
}


async function createFolder(folderPath: string) {
  try {
    await fs.ensureDir(folderPath);
    return true
  } catch (error) {
    return false
  }
}

async function moveImage(sourcePath: string, destinationPath: string) {
  try {
    await fs.move(sourcePath, destinationPath);
    await fs.remove(sourcePath);
    return true
  } catch (error) {
    console.error('Error moving image:', error);
    return false
  }
}

async function deleteFolder(folderToDelete: string) {
  try {
    await fs.remove(folderToDelete);
    return true
  } catch (error) {
    console.error('Error deleting folder:', error);
    return false
  }
}


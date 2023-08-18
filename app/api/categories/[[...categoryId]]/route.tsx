import { NextRequest, NextResponse } from "next/font/node_modules/next/server";
import prismadb from "@/_lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { name, images, sizingSystem } = await req.json();
    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 400 });
    }
    if (!name || !images || !sizingSystem) {
      return NextResponse.json("invalid input data", { status: 400 });
    }
    console.log("data recieved successfully");
    console.log("name :", name);
    console.log("name :", name);
    console.log("images :", images[0].url.split("/")[2]);
    await prismadb.productType.create({
      data: {
        name: name,
        imageName: images[0].url.split("/")[2],
        sizingSystem: sizingSystem == "letters" ? "letters" : sizingSystem == "numbers" ? "numbers" : "letters"
      }
    })
    return NextResponse.json("category created successfully", { status: 200 });

  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({ msg: "unable to insert data" }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { categoryId: Array<string> } }) {
  try {
    const [id] = params.categoryId;
    if (!id) {
      return NextResponse.json("problem indentifiying the id", { status: 404 });
    } else {
      await prismadb.productType.delete({ where: { id: id } })
      return NextResponse.json("Category Deleted Successfuly", { status: 202 });
    }
  } catch (e) {
    console.log("there was an error deleting a category");
    return NextResponse.json("internal server error", { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/font/node_modules/next/server";
import prismadb from "@/_lib/prismadb";
import { auth } from "@clerk/nextjs";



export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) { return NextResponse.json("Unauthenticated!", { status: 400 }); }
    let { title } = await req.json();
    if (!title) {
      return NextResponse.json("invalid input data", { status: 400 });
    }
    console.log("title : ", title)
    await prismadb.formationCategory.create({
      data: { title: title, }
    })
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
      await prismadb.formationCategory.delete({ where: { id: id } })
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
    const { name } = data;
    const categoryId = params.categoryId[0]
    await prismadb.formationCategory.update({
      where: { id: categoryId },
      data: { title: name, },
    })
    return NextResponse.json('You are the best programmer in the world', { status: 200 });
  } catch (e) {
    console.log("server error : ", e);
    return NextResponse.json('server error', { status: 500 });
  }
}

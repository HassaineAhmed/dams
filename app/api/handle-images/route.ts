import { NextResponse, NextRequest } from "next/server";
import * as fs from "fs"


export async function POST(req: NextRequest) {
    try {
        const { image } = await req.json();
        const buffer = Buffer.from(image.split(",")[1], "base64");
        const fileName = Math.random().toString(16).slice(2)
        let fileType: string;
        const startIndex = image.indexOf("/") + 1;
        const endIndex = image.indexOf(";");
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            fileType = image.substring(startIndex, endIndex);
        } else {
            fileType = "jpeg"
        }
        fs.writeFileSync(`./public/images/temp/${fileName}.${fileType}`, buffer);
        return NextResponse.json({ fileName: `${fileName}.${fileType}` }, { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ "message": "server error" }, { status: 500 })
    }
}

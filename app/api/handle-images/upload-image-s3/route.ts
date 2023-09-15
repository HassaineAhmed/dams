import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    // handle the iamge and file type
    const { image }: { image: string } = await req.json();
    const buffer = Buffer.from(image.split(",")[1], "base64");
    let fileType: string;
    const startIndex = image.indexOf("/") + 1;
    const endIndex = image.indexOf(";");
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        fileType = image.substring(startIndex, endIndex);
    } else {
        fileType = "jpeg"
    }

    // upload to s3
    const fileName = uuidv4() + "." + fileType
    try {
        const client = new S3Client({
            region: "eu-central-1",
            credentials: {
                accessKeyId: "AKIA2AT3OT7I3KI6J5AK",
                secretAccessKey: "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"
            }
        });
        const bucket = await client.send(
            new PutObjectCommand({
                Bucket: "dams-images",
                Key: fileName,
                Body: buffer,
            }))
        return NextResponse.json({ fileName }, { status: 200 })
    } catch (e) {
        console.log("error uploading image to s3 bucket", e);
        return NextResponse.json({ response: "server error" }, { status: 500 })
    }
}




import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function DELETE(req: NextRequest, { params }: { params: { imageName: string } }) {
    const imageName = params.imageName;
    console.log(imageName);
    try {
        const client = new S3Client({
            region: "eu-central-1",
            credentials: {
                accessKeyId: "AKIA2AT3OT7I3KI6J5AK",
                secretAccessKey: "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"
            }
        });
        await client.send(
            new DeleteObjectCommand({
                Bucket: "dams-images",
                Key: imageName,
            }))
        return NextResponse.json("deleted succesfully", { status: 200 });
    } catch (e) {
        return NextResponse.json("can't delete the picture", { status: 500 });
    }
}



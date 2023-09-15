import { NextRequest, NextResponse } from "next/server";
import {
    GetObjectCommand,
    ListBucketsCommand
} from "@aws-sdk/client-s3";



import https from "https";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl, S3RequestPresigner } from "@aws-sdk/s3-request-presigner";

export async function POST(req: NextRequest) {
    const { fileName } = await req.json();
    const bucketName = "dams-images"
    console.log(fileName);
    const listBucketsCommand = new ListBucketsCommand({});
    const client = new S3Client({
        region: "eu-central-1",
        credentials: {
            accessKeyId: "AKIA2AT3OT7I3KI6J5AK",
            secretAccessKey: "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"
        }
    });

    const buckets = await client.send(listBucketsCommand)

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
    });

    const image = await client.send(command)
    console.log("image : ", image);
    return NextResponse.json({ buckets: image }, { status: 200 })
}

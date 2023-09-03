import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuidv4 } from "uuid";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { NextRequest, NextResponse } from "next/server";


const credentials = {
    accessKeyId: "cIHglHEHBpu446Bn",
    secretAccessKey: "SOtrhlcmOfNgsVaqiva3xoEUgPmqCkDye5ZPYWTQ"
};
const s3Client = new S3Client({
    endpoint: "https://s3.tebi.io",
    credentials: credentials,
    region: "global"
})

const UPLOAD_MAX_FILE_SIZE = 1_000_000_000;

export async function GET(req: NextRequest) {

    const imageId = uuidv4()
    try {
        const get_command = new GetObjectCommand({
            Bucket: "dams-images",
            Key: imageId,
        });
        //const res = await getSignedUrl(s3Client, get_command, { expiresIn: 3600 });
        const res = await createPresignedPost(s3Client, {
            Bucket: "dams-images",
            Key: imageId,
            Fields: {
                key: imageId,
            },
            Conditions: [
                ["starts-with", "$Content-Type", "image/"],
                ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
            ],
        })
        console.log(res)

        return NextResponse.json({ url: res }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ response: "server error" }, { status: 500 })
    }

}




import { NextRequest, NextResponse } from "next/server";


import https from "https";
import { HttpRequest } from "@smithy/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@smithy/url-parser";
import { formatUrl } from "@aws-sdk/util-format-url";
import { Hash } from "@smithy/hash-node";


export async function GET(req: NextRequest) {

    const createPresignedUrlWithoutClient = async ({ region, bucket, key }: any) => {
        const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
        const presigner = new S3RequestPresigner({
            credentials: {
                accessKeyId: "AKIA2AT3OT7I3KI6J5AK",
                secretAccessKey: "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"
            },
            region,
            sha256: Hash.bind(null, "sha256"),
        });

        try {
            const signedUrlObject = await presigner.presign(
                new HttpRequest({ ...url, method: "PUT" })
            );
            return formatUrl(signedUrlObject);
        } catch (e) {
            console.log("cound not get url: ");
            return "norul"
        }
    };


    function put(url: any, data: any) {
        return new Promise((resolve, reject) => {
            const req = https.request(
                url,
                { method: "PUT", headers: { "Content-Length": new Blob([data]).size } },
                (res) => {
                    let responseBody = "";
                    res.on("data", (chunk) => {
                        responseBody += chunk;
                    });
                    res.on("end", () => {
                        resolve(responseBody);
                    });
                }
            );
            req.on("error", (err) => {
                reject(err);
            });
            req.write(data);
            req.end();
        });
    }

    const REGION = "eu-central-1";
    const BUCKET = "dams-images";
    const KEY = "example_file.txt";
    try {
        const noClientUrl = await createPresignedUrlWithoutClient({
            region: REGION,
            bucket: BUCKET,
            key: KEY,
        });
        return NextResponse.json({ url: noClientUrl }, { status: 200 });

    } catch (e) {
        return NextResponse.json("server error!!!", { status: 501 });
    }

}




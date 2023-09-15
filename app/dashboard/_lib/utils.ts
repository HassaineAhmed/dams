import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function deleteImage(imageName: string) {
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
    return "200"
  } catch (e) {
    return "500"
  }
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'DZD',
});

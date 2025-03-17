import { Client } from "minio";

const minioClient = new Client({
    endPoint: (process.env.S3_ENDPOINT || "")
        .replace("http://", "")
        .replace("https://", "")
        .split("/")[0],
    port: 443,
    useSSL: true,
    accessKey: process.env.S3_ACCESS_KEY || "",
    secretKey: process.env.S3_SECRET_KEY || "",
});

export const put = async (fileName: string, buffer: Buffer) => {
    try {
        await minioClient.putObject(
            process.env.S3_BUCKET_NAME || "",
            fileName,
            buffer,
            buffer.length,
            {
                "Content-Type": "image/webp",
            }
        );
        return true;
    } catch (error) {
        console.error("Erreur MinIO:", error);
        throw error;
    }
}; 
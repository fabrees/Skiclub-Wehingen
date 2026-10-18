import { S3Client } from "@aws-sdk/client-s3"
import { ImageUploadStrategy } from "./image-upload.strategy"


export interface FileUploadStrategy {
    validate(file: File): void
    generateFileName(file: File): string
    upload(file: File): Promise<UploadResult>
}

export interface UploadResult {
    success?: boolean
    fileUrl?: string
    status: number
    errorMessage?: string
}

export class UploadStrategyFactory {

    static createStrategy(
        fileType: string,
        s3Client: S3Client,
        bucketName: string,
        region: string
    ): FileUploadStrategy {
        switch (fileType) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/JPG':
                return new ImageUploadStrategy(s3Client, bucketName, region)
            default:
                throw new Error(`Unsupported file type: ${fileType}`)
        }
    }
}
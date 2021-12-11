import S3 from 'aws-sdk/clients/s3';
import { AWS_ID, AWS_SECRET, BUCKET_NAME } from '../utils/constants';

class Storage {
    private S3;
    private bucket;

    constructor() {
        if (!BUCKET_NAME || !AWS_ID || !AWS_SECRET) {
            throw new Error('wrong s3 credentials');
        }
        this.S3 = new S3({ credentials: { accessKeyId: AWS_ID, secretAccessKey: AWS_SECRET } });
        this.bucket = BUCKET_NAME;
    }

    async upload(key: string, ContentType: string, body: S3.Body) {
        const { bucket } = this;
        return this.S3.putObject({
            Bucket: bucket,
            Key: key,
            Body: body,
            ACL: 'public-read',
            ContentType,
        })
            .promise()
            .then(function (data) {
                const downloadUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
                // console.log('Successfully uploaded data to: ' + downloadUrl);
                return downloadUrl;
            });
    }
}

export default Storage;

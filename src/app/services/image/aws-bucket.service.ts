import { Injectable } from '@angular/core';
import {S3} from "aws-sdk";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class S3Handler {
    constructor() { }
    async upload(folder: string, file: any): Promise<any> {
      const { originalname } = file.name;
      const bucketS3 = environment.AWS_KEYS.AWS_BUCKET;
      return await this.uploadS3(file, bucketS3, folder, file.name);
    }
    async uploadS3(file: any, bucket: string, folder: string, name: string) {
      console.log('file: ', file)
      console.log('name: ', name)
        const s3 = this.getS3();
        // const timestamp = Date.now();
        const params = {
            Bucket: bucket,
            Key: folder + '/' + name,
            Body: file
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, (err: any, data: any) => {
              console.log('data response: ', data);
                if (err) {
                    console.log("S3 error: ", err);
                    reject(err.message);
                }
                return resolve(data);
            });
        });
    }
    private getS3() {
      return new S3({
          accessKeyId: environment.AWS_KEYS.AWS_ACCESS_KEY_ID,
          secretAccessKey: environment.AWS_KEYS.AWS_SECRET_ACCESS_KEY,
      });
  }
  }


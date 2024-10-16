

export interface I_S3Bucket{
    uploadCompanyLogo(imageName:string,buffer:Buffer,contentType:string):Promise<void>;
}
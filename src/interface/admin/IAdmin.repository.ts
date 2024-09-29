


export interface IAdminRepository{
    verifyAdmin(email:string,password:string):Promise<{_id:string,email:string}>
}
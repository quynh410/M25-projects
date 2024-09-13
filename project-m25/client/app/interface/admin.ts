export interface Admin{
    id:number,
    user_id:number,
    username:string,
    email:string,
    fullName:string,
    status:number,
    password:string,
    role:boolean,
    avatar:string,
    phoneNumber:string,
    address:string,
    created_at:string
    updated_at:string
    isBlocked:boolean
}

export interface Account{
    name: string,
    email: string,
    address: string
    created_at: string
    phone:string
    fullname:string
    status:boolean
}
export interface Accounts{
    email:string,
    password:string
}
export interface AccountRe{
    id:number,
    name: string,
    email: string,
    password: string
    address: string
    card:[],
}
export interface IPersonSignUp{
email:string;
password:string;
name:string;
}
export interface IPersonSignIn{
    email:string;
    password:string;
    }
export interface IPersonDB{
    email:string;
password:string;
name:string;
_id:string;
token:string
}
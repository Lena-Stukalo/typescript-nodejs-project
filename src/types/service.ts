export interface Iservice {
    init (): Promise<boolean>
}
export interface IEnv{
    DB_HOST:string,
    PORT:string,
    SECRET_KEY :string
}
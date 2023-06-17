interface IError extends Error{
    status: number
}
export const hendleSave = (error:IError, data:object, next:Function) => {
    const { name, status } = error;
    error.status = name === "MongoServerError" && status === 11000 ? 409 : 400;
   
  };

  
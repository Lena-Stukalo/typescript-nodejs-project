import { List } from "models/List";
import { Todos } from "models/Todo";
import { CustomRequest } from "middlewares/authenticate";
import { IList } from "./ListType";
import { RequestError } from 'helpers/RequestError';
export class ListService{

async create(req:CustomRequest,body:IList ){
    const { _id: owner } = req.user;
    const result = await List.create({ ...body, owner });
    return result
}
async getAll (page:number=1, limit:number=10,req:CustomRequest){
    const skip = (page - 1) * limit;
  const {_id}= req.user

    const result = await List.find({owner:_id}, "-createdAt -updatedAt", {
        skip,
        limit,
      })
if (!result) {
    throw RequestError(404, "Not found");
  }
  return result
}
async getOne(param:string){
    const result = await List.findById(param);
        if (!result) {
          throw RequestError(404, "Not found");
        }
        return result
}
async update(id:string, data:IList){
    const result = await List.findByIdAndUpdate(
        id,
        data,
        { new: true })
        if (!result) {
            throw RequestError(404, "Not found");
          }
          return result
}
async delete(id:string){
    const result = await List.findByIdAndRemove(id);
    await Todos.deleteMany({listId:id})
    if (!result) {
      throw RequestError(404, "Not found");
    }
    return(result);
}
}
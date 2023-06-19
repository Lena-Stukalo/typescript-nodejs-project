import {RequestError}from '../../../helpers/RequestError'
import {Todos} from '../../../models/Todo'
import {ITodo, IListId}from './TodoTypes'


export class TodoService{

async create(data :ITodo){
const result = await Todos.create(data)
return result
}
async getAll (page:number,limit:number, body:IListId){
  const skip = (page - 1) * limit;
  const {listId}= body
    const result = await Todos.find({listId}, "-createdAt -updatedAt", {
        skip,
        limit,
      })
if (!result) {
    throw RequestError(404, "Not found");
  }
  return result
}
async getOne(Id:string){
    const result = await Todos.findById(Id)
if (!result) {
    throw RequestError(404, "Not found");
  }
  return result
}
async update(Id:string,data:ITodo){
    const result = await Todos.findByIdAndUpdate(
        Id,
        data,
        { new: true })
        if (!result) {
            throw RequestError(404, "Not found");
          }
          return result
}
async delete(Id:string){
    const result = await Todos.findByIdAndRemove(Id)
if (!result) {
    throw RequestError(404, "Not found");
  }
  return result
}
}
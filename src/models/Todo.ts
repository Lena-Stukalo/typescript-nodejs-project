import { Schema, model} from 'mongoose';
//import{hendleSave}from '../helpers/handleSave'

interface ITodo {
    task: string;
    state: boolean,
    listId:string
  }
  const todoSchema = new Schema<ITodo>(
    {
        task:{ type: String,
            required: [true, "Set task for todo"],},
            state:{type: Boolean,
            default: false},
            listId:{ type: String,
                required: [true, "Set list id for todo"],}
    },
    { versionKey: false, timestamps: true }
  );

  export const Todos = model<ITodo>('todo',todoSchema);

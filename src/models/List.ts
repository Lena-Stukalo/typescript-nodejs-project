import { Schema, model} from 'mongoose';

interface IList {
    name: string;
    owner: object,
  }
  const listSchema = new Schema<IList>(
    {
        name:{ type: String,
            required: [true, "Set name for user"],},
            owner: {
                type: Schema.Types.ObjectId,
                ref: "user",
              },
    },
    { versionKey: false, timestamps: true }
  );
  export const List = model<IList>('list',listSchema);

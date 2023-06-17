import { Schema, model} from 'mongoose';

interface IPerson {
    name: string;
    email: string;
    password:string;
    token:string;
  }
  const personSchema = new Schema<IPerson>(
    {
        name:{ type: String,
            required: [true, "Set name for user"],},
      password: {
        type: String,
        required: [true, "Set password for user"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
     
      token: { type: String },
    },
    { versionKey: false, timestamps: true }
  );
  export const Person = model<IPerson>('user', personSchema);

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {RequestError}from '../../../helpers/RequestError'
import {Person} from '../../../models/Person'
import {IPersonSignUp,IPersonSignIn}from './PersonType'


export class PersonService{

async signUp(data :IPersonSignUp){
    const {email, password, name}=data;
    const user = await Person.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const payload = {
    id: name
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: "24h" });
const result = await Person.create({
    ...data,
    password: hashPassword,
    token
  });

return result
}
async signIn(data:IPersonSignIn){
    const {email, password}=data;
    const user = await Person.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: "24h" });
  await Person.findByIdAndUpdate(user._id, { token });
  return token
}

}
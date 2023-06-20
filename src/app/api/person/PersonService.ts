import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {RequestError}from '../../../helpers/RequestError'
import {Person} from '../../../models/Person'
import {IPersonSignUp,IPersonSignIn}from './PersonType'
import{CustomRequest}from '../../../middlewares/authenticate'

export class PersonService{

async signUp(data :IPersonSignUp){
    const {email, password}=data;
    const user = await Person.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const payload = {
    email:email
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
    email:email
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: "24h" });
  await Person.findByIdAndUpdate(user._id, { token });
  return token
}
async current (req:CustomRequest){
    const { email, name } = req.user;
    return {name,email}
}
async logout(req:CustomRequest){
    const { _id } = req.user;
    await Person.findByIdAndUpdate(_id, { token: "" });
    return {
      message: "Logout success",
    };
}
}
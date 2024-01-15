import UserModel from "../../../../models/userModel.js";
import type { MutationResolvers } from "../../../types.generated.js";
import generateToken from "../../../../utils/generateToken.js";
import generateHashedString from "../../../../utils/generateHashedString.js";

export const register: NonNullable<MutationResolvers['register']> = async (_parent, _arg, _ctx) => {
  const hashedPassword = await generateHashedString(_arg.password);
  const { id } = await UserModel.create({
    fullName: _arg.fullName,
    email: _arg.email,
    password: hashedPassword,
  });

  const user = await UserModel.findOne({ _id: id });

  user.set("token", generateToken({ id }));

  return user;
};

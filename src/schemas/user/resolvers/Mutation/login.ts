import UserModel from "../../../../models/userModel.js";
import type { MutationResolvers } from "../../../types.generated.js";
import generateToken from "../../../../utils/generateToken.js";

export const login: NonNullable<MutationResolvers['login']> = async (_parent, _arg, _ctx) => {
  const user = await UserModel.findOne({ email: _arg.email });

  if (!user || !(await user.comparePassword(_arg.password)))
    throw new Error("Email or password is incorrect");

  user.set("token", generateToken({ id: user._id }));

  return user;
};

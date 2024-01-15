import { MyContext } from "index.js";
import UserModel from "../../../../models/userModel.js";
import type { QueryResolvers } from "../../../types.generated.js";

export const user: NonNullable<QueryResolvers['user']> = async (_parent, _arg, _ctx: MyContext) => {
  if (_arg.id) return await UserModel.findOne({ _id: _arg.id });

  if (!_ctx.user) throw new Error("Unauthorized access");

  return _ctx.user;
};

import type { MutationResolvers } from "./../../../types.generated.js";

export const addBook: NonNullable<MutationResolvers['addBook']> = async (_parent, _arg, _ctx) => {
  return _ctx.dataSources.booksAPI.addBook({ title: _arg.title, author: _arg.author });
};

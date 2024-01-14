import type { QueryResolvers } from "./../../../types.generated.js";

export const books: NonNullable<QueryResolvers['books']> = async (_parent, _arg, _ctx) => {
  return _ctx.dataSources.booksAPI.getBooks();
};

// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { Book } from "./schema/types.generated.js";

const BooksDB: Omit<Required<Book>, "__typename">[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export class BooksDataSource {
  getBooks(): Book[] {
    // simulate fetching a list of books
    return BooksDB;
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  async addBook(book: Book): Promise<Book> {
    if (book.title && book.author) {
      BooksDB.push({ title: book.title, author: book.author });

      return book;
    } else {
      return null;
    }
  }
}

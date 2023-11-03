// this will basically be like a controller. like when bookById query is called from client then it will be handled here
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Book } from './schema/book.schema';
import { BookService } from './book.service';
import { Query } from '@nestjs/graphql';
import { AddBookArgs } from './args/addBook.args';
import { UpdateBookArgs } from './args/updatebook.args';

//  The @Resolver((of) => Book) annotation in a GraphQL resolver file indicates that the code or resolver is related to handling queries or mutations associated with the Book schema type. Way to organize the resolver files.
@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  // make sure that the Query is being imported from @nestjs/graphql and not @nestjs/common(it will be auto imported from common so change it)
  @Query((returns) => [Book], { name: 'books' }) // books will be the name of the graphql query. if it is not provided then by default it will be method name, here it will be getAllBooks
  getAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Query((returns) => Book, { name: 'bookById' })
  getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return this.bookService.findBookById(id);
  }

  @Mutation((returns) => String, { name: 'deleteBook' })
  deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return this.bookService.deleteBook(id);
  }

  @Mutation((returns) => String, { name: 'addBook' })
  addBook(@Args('addBookArgs') addBookArgs: AddBookArgs) {
    return this.bookService.addBook(addBookArgs);
  }

  @Mutation((returns) => String, { name: 'updateBook' })
  updateBook(@Args('updateBookArgs') updateBookArgs: UpdateBookArgs) {
    return this.bookService.updateBook(updateBookArgs);
  }
}

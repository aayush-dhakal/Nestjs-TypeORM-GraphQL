// in rest api there is dto to check the input fields required from client for making update in the database
// similarly in graphql we create args for that. This is basically for validating the request parameter

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddBookArgs {
  @Field()
  title: string;

  @Field((type) => Int) // integer type for graphql
  price: number; // number type is for typeorm db
}

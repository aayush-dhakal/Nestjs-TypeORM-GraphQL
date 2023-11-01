import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      database: 'book_db',
      password: 'SuperSecret!23',
      // entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      // https://github.com/nestjs/nest/issues/4283 check here for the issue and solution and why this below line is used instead of top one
      entities: ['dist/**/*.entity.js'], // I'll go ahead and answer this with a rehash of my answer on the StackOverflow question you linked: you are trying to load Typescript files while running JavaScript, which will fail 100% of the time. Your entities array of your TypeOrmModule.forRoot() configuration is looking for js and ts files in the src directory, which should be only where your ts files live. Your js files should exist solely in dist (at least the ones created from compilation), and you shouldn't really look for the ts files in the first place. If you want to be able to load ts or js files, you should use __dirname instead of src. In the end though, as you should be using node to run the server, and so long as you aren't using ts-node for development, you should replace the line completely with dist/**/*.entity.js
      synchronize: true,
    }),
    BookModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [],
  providers: [],
})
export class BookModule {}

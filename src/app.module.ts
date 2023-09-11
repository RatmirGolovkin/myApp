import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.zbzcg3y.mongodb.net/?retryWrites=true&w=majority',
    ),
    CatsModule,
  ],
})
export class AppModule {}

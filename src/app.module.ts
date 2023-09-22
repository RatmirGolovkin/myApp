import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { FileModule } from './fs/fs.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.zbzcg3y.mongodb.net/?retryWrites=true&w=majority',
    ),
    CatsModule,
    UserModule,
    FileModule,
  ],
})
export class AppModule {}

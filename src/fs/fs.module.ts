import { Module } from '@nestjs/common';
import { FileService } from './fs.service';
import { FileController } from './fs.controller';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}

import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Delete,
  Get,
  Param,
  UploadedFiles,
} from '@nestjs/common';
import { FileService } from './fs.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.fileService.uploadFile(files);
  }

  @Get('get/:name')
  async readFile(@Param('name') name: string) {
    return this.fileService.readFile(name);
  }

  @Delete('delete')
  async delete(@Body() request: FileDto) {
    return this.fileService.delete(request);
  }
}

//Сделать get запрос через параметр для с выводом файла

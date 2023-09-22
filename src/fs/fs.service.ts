import * as fs from 'fs';
import { FileDto } from './dto/file.dto';
import { join } from 'path';
import { Injectable, StreamableFile } from '@nestjs/common';

@Injectable()
export class FileService {
  async uploadFile(files: Express.Multer.File[]) {
    if (!files) {
      return 'Upload files!';
    }

    const urls = [];

    //Реализовать запись файлов по одномк через цикл for()

    for (const file of files) {
      const uploadedFile = fs.writeFile(
        `../my-app/files/${file.originalname}`,
        file.buffer,
        () => {},
      );
      const url = `http://localhost:3000/file/get/${file.originalname}`;
      urls.push(url);
      console.log(uploadedFile);
    }

    return urls;
  }

  async readFile(name: string) {
    const checkFile = fs.existsSync(`../my-app/files/${name}`);

    if (!checkFile) {
      return 'File not found';
    }
    const readFile = fs.createReadStream(
      join(process.cwd(), `../my-app/files/${name}`),
    );

    return new StreamableFile(readFile);
  }

  async delete(request: FileDto) {
    const deleteFile = fs.unlink(`../my-app/files/${request.name}`, (err) => {
      if (err) console.log(err);
      else console.log(`${request.name} was deleted`);
    });

    return deleteFile;
  }
}

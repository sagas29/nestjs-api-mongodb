import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BasicAuthGuard } from 'src/guards/basic.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './files',
        filename: (_req, file, cb) => cb(null, `${v4()}-${file.originalname}`),
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    const path = file?.filename ? `files/${file.filename}` : null;
    console.log(path);
    return this.usersService.create(createUserDto, path);
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './files',
        filename: (_req, file, cb) => cb(null, `${v4()}-${file.originalname}`),
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const path = file?.filename ? `files/${file.filename}` : null;
    return this.usersService.update(id, updateUserDto, path);
  }
}

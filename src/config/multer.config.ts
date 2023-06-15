import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid4 } from 'uuid';

export function multerConfig(): MulterModuleOptions {
  return {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, cb) => cb(null, `${uuid4()}-${file.originalname}`),
    }),
  };
}

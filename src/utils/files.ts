import * as fs from 'fs';

export async function deleteFile(file: string): Promise<void> {
  try {
    await fs.promises.unlink(file);
    console.log(`File ${file} deleted`);
  } catch (error) {
    console.log(`Error deleting file ${file}`);
    throw console.error();
  }
}

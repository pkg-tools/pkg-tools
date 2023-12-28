import shelljs from 'shelljs';

export function rm(directory: string) {
  shelljs.rm('-rf', directory);
}

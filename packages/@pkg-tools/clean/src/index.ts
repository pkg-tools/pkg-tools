import shelljs from 'shelljs';

export function rm(directory: string) {
  return shelljs.rm('-rf', directory);
}

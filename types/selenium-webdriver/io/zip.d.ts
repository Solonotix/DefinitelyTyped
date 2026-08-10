import type { default as JSZip, JSZipObjectOptions } from 'jszip';

type Compression = JSZipObjectOptions['compression'];
export function load(path: string): Promise<Zip>;

export function unzip(src: string, dst: string): Promise<string>;

export class Zip {
  private readonly pendingAdds_: Set<Promise<unknown>>;
  private readonly z_: JSZip;

  constructor();

  addFile(filePath: string, zipPath?: string): Promise<unknown>;

  addDir(dirPath: string, zipPath?: string): Promise<unknown>;

  has(path: string): boolean;

  getFile(path: string): Promise<Buffer>;

  toBuffer(compression?: Compression): Promise<Buffer>;
}

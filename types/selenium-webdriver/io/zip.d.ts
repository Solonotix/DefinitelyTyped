export type Compression = 'STORE' | 'DEFLATE';
export function load(path: string): Promise<Zip>;

export function unzip(src: string, dst: string): Promise<string>;

export class Zip {
    constructor();

    addFile(filePath: string, zipPath?: string): Promise<boolean>;

    addDir(dirPath: string, zipPath?: string): Promise<boolean[]>;

    has(path: string): boolean;

    getFile(path: string): Promise<Buffer>;

    toBuffer(compression?: Compression): Promise<Buffer>;
}

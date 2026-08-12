import { Compression, load, unzip, Zip } from "selenium-webdriver/io/zip";

const compression: Compression = "DEFLATE";
const zip = new Zip();

// $ExpectType Promise<Zip>
load("archive.zip");
// $ExpectType Promise<string>
unzip("archive.zip", "destination");
// $ExpectType Promise<boolean>
zip.addFile("source.txt", "target.txt");
// $ExpectType Promise<boolean[]>
zip.addDir("source", "target");
// $ExpectType boolean
zip.has("target.txt");
// $ExpectType Promise<Buffer> || Promise<Buffer<ArrayBufferLike>>
zip.getFile("target.txt");
// $ExpectType Promise<Buffer> || Promise<Buffer<ArrayBufferLike>>
zip.toBuffer(compression);

// @ts-expect-error
zip.toBuffer("GZIP");

import { createGzip } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { pipeline } from "node:stream/promises";

const distDir = "dist";
const minSize = 1024;
const gzipExtensions = new Set([
	".css",
	".html",
	".js",
	".json",
	".map",
	".svg",
	".txt",
	".xml",
]);

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const filePath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...await walk(filePath));
		} else {
			files.push(filePath);
		}
	}

	return files;
}

async function gzipFile(filePath) {
	const outputPath = `${filePath}.gz`;
	await mkdir(dirname(outputPath), { recursive: true });
	await pipeline(
		createReadStream(filePath),
		createGzip({ level: 9 }),
		createWriteStream(outputPath),
	);
}

const files = await walk(distDir);
let compressedCount = 0;

for (const filePath of files) {
	if (filePath.endsWith(".gz")) continue;
	if (!gzipExtensions.has(extname(filePath))) continue;

	const fileStat = await stat(filePath);
	if (fileStat.size < minSize) continue;

	await gzipFile(filePath);
	compressedCount += 1;
}

console.log(`Generated ${compressedCount} gzip files in ${distDir}.`);

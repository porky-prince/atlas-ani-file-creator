const path = require('path');
const fs = require('fs-extra');
const run = require('../src/main');
const { Types } = require('../src/const');

const ASSETS = path.join(__dirname, 'assets');
const OUTPUT = path.join(__dirname, 'output');

function buildOpt(type, isMulti, isProject, filename, overwrite) {
	let src = path.join(ASSETS, isMulti ? '' : 'ani1');
	let dest = path.join(OUTPUT, type);
	if (isProject) {
		src = path.join(__dirname, type, 'assets', isMulti ? '' : 'ani1');
		dest = path.join(OUTPUT, type + 'Project');
	}

	return {
		type,
		src,
		dest,
		filename,
		overwrite,
	};
}

describe('Test laya export', () => {
	const type = Types.laya;
	const filename = 'layaFilename';
	const extName = '.ani';

	test('Test single', async () => {
		const opt = buildOpt(type, false, false, filename);
		await run(opt);
		expect(await fs.exists(path.join(opt.dest, filename + extName))).toBe(true);
	});

	test('Test multi', async () => {
		const opt = buildOpt(type, true);
		await run(opt);
		const files = await fs.readdir(opt.src);
		for (let i = 0; i < files.length; i++) {
			/* eslint no-await-in-loop: "off" */
			expect(await fs.exists(path.join(opt.dest, files[i] + extName))).toBe(true);
		}
	});

	test('Test single in project', async () => {
		const opt = buildOpt(type, false, true, filename);
		await run(opt);
		expect(await fs.exists(path.join(opt.dest, filename + extName))).toBe(true);
	});

	test('Test multi in project', async () => {
		const opt = buildOpt(type, true, true);
		await run(opt);
		const files = await fs.readdir(opt.src);
		for (let i = 0; i < files.length; i++) {
			/* eslint no-await-in-loop: "off" */
			expect(await fs.exists(path.join(opt.dest, files[i] + extName))).toBe(true);
		}
	});
});

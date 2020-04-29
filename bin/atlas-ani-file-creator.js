#! /usr/bin/env node

'use strict';

const run = require('../src/main');
const argv = require('yargs')
	.version()
	.option('t', {
		alias: 'type',
		demand: true,
		describe: 'The game type.',
		type: 'string',
		choices: ['laya'],
	})
	.option('s', {
		alias: 'src',
		demand: true,
		describe: 'The images resources directory.',
		type: 'string',
	})
	.option('d', {
		alias: 'dest',
		describe: 'The output directory.',
		type: 'string',
	})
	.option('f', {
		alias: 'filename',
		describe: 'The atlas-ani filename.',
		type: 'string',
	})
	.option('o', {
		alias: 'overwrite',
		default: false,
		describe: 'Whether to overwrite when the file already exists.',
		type: 'boolean',
	})
	.usage('atlas-ani-file-creator [options]')
	.example('atlas-ani-file-creator -t laya -s ./testDir')
	.help('h')
	.alias('h', 'help')
	.epilog('MIT license').argv;

run({
	type: argv.type,
	src: argv.src,
	dest: argv.dest,
	filename: argv.filename,
	overwrite: argv.overwrite,
});

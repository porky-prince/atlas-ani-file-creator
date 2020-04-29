const path = require('path');

const SRC = __dirname;

const ROOT = path.join(SRC, '..');

const Types = {
	laya: 'laya',
	// Egret: 'egret',
	// cocos: 'cocos',
};

module.exports = {
	SRC,
	ROOT,
	Types,
};

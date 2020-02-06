const path = require('path');

const SRC = __dirname;

const ROOT = path.join(SRC, '..');

const Types = {
    laya: 'laya',
    // egret: 'egret',TODO
    // cocos: 'cocos',TODO
};

module.exports = {
    SRC,
    ROOT,
    Types,
};

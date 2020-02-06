const path = require('path');
const fs = require('fs-extra');

const abstractFn = function() {
    throw new Error('Abstract method.');
};

const TEMP_PATH = './temp.json';

class AbstractCreator {
    constructor() {
        this._tempJson = null;
        this._tempFrame = null;
        this.extName = 'json';
    }

    async init() {
        this._tempJson = await fs.readJson(TEMP_PATH);
        this._tempFrame = this.extractTempFrame();
        return this;
    }

    getTempJson() {
        return this._tempJson;
    }

    size(width, height) {}

    count() {
        abstractFn();
    }

    getFrames() {
        abstractFn();
    }

    extractTempFrame() {
        abstractFn();
    }

    //TODO other game type temp item
    getFrame() {
        const copy = {};
        const item = this._tempFrame;
        for (let attr in item) {
            if (item.hasOwnProperty(attr)) {
                copy[attr] = item[attr];
            }
        }
        return copy;
    }

    addFrame(url, dealFrame) {
        abstractFn();
    }

    async save2File(option, src) {
        let filename = option.filename;
        if (src !== option.src) {
            filename = path.parse(src).name;
            src = path.join(src.replace(option.src, ''), '..');
        }
        const file = path.join(option.dest, src, filename + this.extName);
        await fs.writeJson(file, this._tempJson);
    }
}

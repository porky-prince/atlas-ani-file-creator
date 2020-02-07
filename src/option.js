const path = require('path');
const { Types } = require('./const');
const { isStr, isBool, isExist, isDir, merge } = require('./utils');

class Option {
    constructor(opt) {
        this._type = '';
        this._src = '';
        this._dest = process.cwd();
        this._filename = '';
        this._overwrite = false;
        this._dealFrame = null;
        this._dealPath = null;
        merge(this, opt);
    }

    get type() {
        let type = this._type;
        if (type !== '') {
            return type;
        } else {
            type = '[';
            for (let Type in Types) {
                type += ' ' + Type;
            }
            type += ' ]';
            throw new Error('The "type" is necessary.Option value: ' + type);
        }
    }

    set type(value) {
        if (Types.hasOwnProperty(value)) {
            this._type = value;
        }
    }

    get src() {
        const src = this._src;
        if (isExist(src) && isDir(src)) {
            return src;
        } else {
            throw new Error(`The "${src}" must be a directory and exist.`);
        }
    }

    set src(value) {
        if (value && isStr(value)) {
            this._src = value = path.normalize(value);
            if (value[value.length - 1] !== path.sep) {
                this._src = value + path.sep;
            }
        }
    }

    get dest() {
        return this._dest;
    }

    set dest(value) {
        if (value && isStr(value)) {
            this._dest = value;
        }
    }

    get filename() {
        let filename = this._filename;
        if (filename === '') {
            filename = path.parse(this._src).name;
            if (filename === '' || filename[0] === '.') {
                filename =
                    'ani' +
                    Math.random()
                        .toString()
                        .slice(2);
            }
            this._filename = filename;
        }
        return filename;
    }

    set filename(value) {
        if (value && isStr(value)) {
            this._filename = value;
        }
    }

    get overwrite() {
        return this._overwrite;
    }

    set overwrite(value) {
        if (isBool(value)) {
            this._overwrite = value;
        }
    }

    get dealFrame() {
        return this._dealFrame;
    }

    set dealFrame(value) {
        this._dealFrame = value;
    }

    get dealPath() {
        return this._dealPath;
    }

    set dealPath(value) {
        this._dealPath = value;
    }
}

module.exports = Option;

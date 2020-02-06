const fs = require('fs-extra');

module.exports = {
    isStr(any) {
        return typeof any === 'string';
    },

    isBool(any) {
        return typeof any === 'boolean';
    },

    isObj(any) {
        return typeof any === 'object';
    },

    isDir(url) {
        return fs.statSync(url).isDirectory();
    },

    isExist(url) {
        return fs.existsSync(url);
    },

    merge(src, opt) {
        if (opt && this.isObj(opt)) {
            for (let attr in opt) {
                if (opt.hasOwnProperty(attr) && attr in src) {
                    src[attr] = opt[attr];
                }
            }
        }
        return src;
    },
};

const fs = require('fs-extra');

module.exports = {
	isStr(any) {
		return typeof any === 'string';
	},

	isBool(any) {
		return typeof any === 'boolean';
	},

	isDir(url) {
		return fs.statSync(url).isDirectory();
	},

	isExist(url) {
		return fs.existsSync(url);
	},

	merge(src, opt) {
		if (opt && typeof opt === 'object') {
			Object.keys(opt).forEach((attr) => {
				if (attr in src) {
					src[attr] = opt[attr];
				}
			});
		}

		return src;
	},
};

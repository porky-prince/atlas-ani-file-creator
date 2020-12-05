const path = require('path');
const fs = require('fs-extra');

const abstractFn = function () {
	throw new Error('Abstract method.');
};

class AbstractCreator {
	constructor() {
		this._tempJson = null;
		this._tempFrame = null;
		this.extName = 'json';
	}

	async init() {
		this._tempJson = await fs.readJson(path.join(__dirname, this.type, 'temp.json'));
		this._tempFrame = this.extractTempFrame();
		return this;
	}

	get type() {
		abstractFn();
		return 0;
	}

	getTempJson() {
		return this._tempJson;
	}

	size(width, height) {
		console.log(width, height);
	}

	count() {
		abstractFn();
		return 0;
	}

	getFrames() {
		abstractFn();
	}

	extractTempFrame() {
		abstractFn();
	}

	// TODO other game type temp item
	getFrame() {
		const copy = {};
		const item = this._tempFrame;
		Object.keys(item).forEach((attr) => {
			copy[attr] = item[attr];
		});

		return copy;
	}

	addFrame(url, dealFrame) {
		abstractFn(url, dealFrame);
	}

	async save2File(option, src) {
		if (this.count() === 0) return;
		let filename = option.filename;
		let file = option.dealPath && option.dealPath(option.dest, filename + this.extName, src);
		if (!file) {
			if (src && src !== option.src) {
				filename = path.parse(src).name;
				src = path.join(src.replace(option.src, ''), '..');
			} else {
				src = '';
			}

			file = path.join(option.dest, src, filename + this.extName);
		}

		if (!option.overwrite && fs.existsSync(file)) {
			console.warn(
				`The "${file}" already exists,If you want to overwrite it,Please set [option.overwrite=true].`
			);
			return;
		}

		if (option.dealAni) {
			this._tempJson = option.dealAni(this._tempJson, file);
		}

		await fs
			.outputJson(file, this._tempJson, { spaces: 4 })
			.then(() => {
				console.log(`The "${file}" was created successfully.`);
			})
			.catch((err) => {
				console.error(err);
			});
	}
}

module.exports = AbstractCreator;

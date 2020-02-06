const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const getImgSize = promisify(require('image-size'));
const readdir = promisify(fs.readdir);
const Option = require('./option');
const { isDir } = require('./utils');

async function runTask(src, Creator, option) {
    const creator = await new Creator().init();
    const files = await readdir(src);
    const tasks = [];
    let maxWidth = 0;
    let maxHeight = 0;
    for (let i = 0, length = files.length; i < length; i++) {
        const url = path.join(src, files[i]);
        if (isDir(url)) {
            tasks.push(runTask(url, Creator, option));
        } else {
            await getImgSize(url)
                .then((size) => {
                    maxWidth = Math.max(maxWidth, size.width);
                    maxHeight = Math.max(maxHeight, size.height);
                    creator.addFrame(url, option.dealFrame);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
    creator.size(maxWidth, maxHeight);
    tasks.push(creator.save2File(option, src));
    await Promise.all(tasks);
}

async function runTasks(option) {
    const Creator = require(`./creators/${option.type}/creator`);
    await runTask(option.src, Creator, option);
}

module.exports = {
    async run(opt) {
        await runTasks(new Option(opt));
    },

    async exec() {},
};

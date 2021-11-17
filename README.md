# atlas-ani-file-creator

#### 介绍

这是一个根据图片资源快速生成图集动画文件的简单工具。

### 安装

使用 npm 安装：

```shell
$ npm install atlas-ani-file-creator --save-dev
```

或者使用 yarn 安装：

```shell
$ yarn add atlas-ani-file-creator --dev
```

### 使用

可经过全局安装通过命令行使用：

```shell
$ npm install -g atlas-ani-file-creator
```

#### 命令行使用

```shell
atlas-ani-file-creator [options]

Options:
  --version        Show version number                                 [boolean]
  -t, --type       The game type.          [string] [required] [choices: "laya"]
  -s, --src        The images resources directory.           [string] [required]
  -d, --dest       The output directory.                                [string]
  -f, --filename   The atlas-ani filename.                              [string]
  -o, --overwrite  Whether to overwrite when the file already exists.
                                                      [boolean] [default: false]
  -h, --help       Show help                                           [boolean]

Examples:
  atlas-ani-file-creator -t laya -s ./testDir
```

#### 在代码中使用

也可局部安装在代码中使用：

```js
const run = require('atlas-ani-file-creator');

run({
	type: 'laya', // 暂时只有laya类型
	src: './images', // 图集图片目录
	dest: './ani_files', // 输出目录
	filename: 'ani_file', // 可选，输出文件名，不传则以目录名命名
	overwrite: true, // 可选，输出文件是否覆盖已有文件，默认不覆盖
	// 可选，处理每一张图的数据
	dealFrame(frame, src) {
		/*frame => {
        	"value": "./images/image.png",
        	"tweenMethod": "linearNone",
        	"tween": false,
        	"target": 3,
        	"key": "skin",
        	"index": 0
        }*/
		// src => "./images/image.png"
	},
	// 可选，修改输出路径
	dealPath(dest, filename, src) {
		// dest => "./ani_files"
		// filename => "ani_file.ani"
		// src => "./images"
	},
	// 可选，处理输出的动画json文件的数据
	dealAni(aniJson, destFile) {
		// aniJson => ani file json
		// destFile => "./ani_files/ani_file.ani"
	},
});
```

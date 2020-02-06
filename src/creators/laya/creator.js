const AbstractCreator = require('../abstractCreator');

const LAYA_ASSETS = 'laya/assets/';

class Creator extends AbstractCreator {
    constructor() {
        super();
        this.extName = 'ani';
    }

    size(width, height) {
        const props = this._tempJson.props;
        props.sceneWidth = width;
        props.sceneHeight = height;
    }

    count() {
        return this.getFrames().length;
    }

    getFrames() {
        return this._tempJson.animations[0].nodes[0].keyframes.skin;
    }

    extractTempFrame() {
        return this.getFrames().pop();
    }

    addFrame(src, dealFrame) {
        let url = (src = src.replace('\\', '/'));
        let frame = this.getFrame();
        const index = url.indexOf(LAYA_ASSETS);
        if (index !== -1) {
            url = url.slice(index + LAYA_ASSETS.length);
        }
        frame.value = url;
        frame.index = this.count();
        this.getFrames().push(dealFrame ? dealFrame(frame, src) : frame);
    }
}

module.exports = Creator;

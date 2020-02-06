const path = require('path');
const getImgSize = require('image-size');
const { isDir, isExist } = require('../src/utils');

test('Test path.parse', () => {
    expect(path.parse(__dirname).name).toBe('test');
});

describe('Test utils.js', () => {
    test('Test isExist', () => {
        expect(isExist(undefined)).toBe(false);
        expect(isExist(null)).toBe(false);
        expect(isExist('')).toBe(false);
    });

    test('Test isDir', () => {
        try {
            isDir('./aDir');
        } catch (e) {
            expect(!!e).toBe(true);
        }

        expect(isDir('./')).toBe(true);
        expect(isDir('.')).toBe(true);
        expect(isDir(__dirname)).toBe(true);
    });
});

describe('Test image-size', () => {
    test('Test argument is not a image path', (done) => {
        getImgSize(path.join(__dirname, '../package.json'), (err) => {
            expect(!!err).toBe(true);
            done();
        });
    });
});

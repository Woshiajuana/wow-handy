import './Promise'
import path             from './path.plugin';
import Defer            from './../utils/defer.util';

const transition = weex.requireModule('transitionModule');
const defer = new Defer(1000);

export default {
    show: pagename => new Promise((resolve, reject) => {
        if (!defer.do(pagename)) return null; // 过滤连续点击
        path.page(pagename).then(nativepath => {
            transition.present({ url: nativepath, animated : 'true' }, e => {
                resolve();
            });
        });
    }).handle(),
    close: () => new Promise((resolve, reject) => {
        transition.dismiss({}, e => {
            resolve();
        });
    }).handle(),
};

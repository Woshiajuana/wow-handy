import regular          from './../utils/regular.util';
import _                from './../utils/lodash.util';
import store            from './../plugins/store.plugin';

const keyname = 'USERS_HISTORY';

export default {
    get: () => store.get(keyname),

    set: info => store.get(keyname).then(e => Promise.resolve(e)).catch(() => Promise.resolve([])).then(e => {
        let history = _.isArray(e) ? e : [];
        history.forEach((item, i) => {
            if (_.isObject(item) && regular.isPhone(item.mobileNo)) {
                if (item.mobileNo === info.mobileNo) {
                    history.splice(i, 1);
                }
            } else {
                history.splice(i, 1);
            }
        });
        history.unshift(info);
        return store.set(keyname, history);
    })
};

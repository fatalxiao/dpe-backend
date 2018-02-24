import _ from 'lodash';

function doVerify(data, excludes) {

    for (let key in data) {

        if (excludes && excludes.includes(key)) {
            continue;
        }

        data[key] = data[key] || null;

    }

}

function verify(data, excludes) {

    if (excludes && _.isString(excludes)) {
        excludes = [excludes];
    }

    if (_.isArray(data)) {
        data.forEach(item => doVerify(item, excludes));
    } else {
        doVerify(data, excludes);
    }

}

export default {
    verify
};
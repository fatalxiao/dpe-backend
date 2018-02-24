import _ from 'lodash';

function verify(data, excludes) {

    if (excludes && _.isString(excludes)) {
        excludes = [excludes];
    }

    for (let key in data) {

        if (excludes && excludes.includes(key)) {
            continue;
        }

        data[key] = data[key] || null;

    }

}

export default {
    verify
};
import _ from 'lodash';
import moment from 'moment';

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

function number(data, fields) {

    if (!data || !fields) {
        return;
    }

    for (let field of fields) {
        data[field] = data[field] === '' || data[field] === undefined ? data[field] : null;
    }

}

function date(data, fields) {

    if (!data || !fields) {
        return;
    }

    for (let field of fields) {
        data[field] = moment(data[field]).isValid() ? data[field] : null;
    }

}

function formatNumberField(value) {
    return value !== '' && value !== undefined ? value : null;
}

export default {
    verify,
    number,
    date,
    formatNumberField
};
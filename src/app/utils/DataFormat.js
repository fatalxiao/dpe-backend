import _ from 'lodash';
import moment from 'moment';

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

function formatResDateTime(value) {

    if (!value) {
        return '';
    }

    const time = moment(value);

    if (!time.isValid()) {
        return '';
    }

    return moment(time).format('YYYY-MM-DD HH:mm:ss');

}

export default {
    formatNumberField,
    formatResDateTime
};
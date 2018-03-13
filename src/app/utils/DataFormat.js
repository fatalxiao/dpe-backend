import moment from 'moment';

function formatNumberField(value) {
    return value !== '' && value !== undefined ? value : null;
}

function formatDateTimeField(value) {
    return moment(value).isValid() ? value : null;
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

function formatBooleanToNumber(value) {
    return value ? 1 : 0;
}

function formatString(value) {
    return value || '';
}

export default {
    formatNumberField,
    formatDateTimeField,
    formatResDateTime,
    formatBooleanToNumber,
    formatString
};
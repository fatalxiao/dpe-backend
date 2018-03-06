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

export default {
    formatNumberField,
    formatDateTimeField,
    formatResDateTime
};
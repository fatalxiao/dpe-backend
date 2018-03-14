import moment from 'moment';

function formatBoolean(value) {
    return value ? '1' : '0';
}

function formatNumber(value) {
    return isNaN(value) ? null : '' + value;
}

function formatString(value) {
    return value || '';
}

export default {
    formatBoolean,
    formatNumber,
    formatString
};
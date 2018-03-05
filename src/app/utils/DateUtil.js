import moment from 'moment';

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
    formatResDateTime
};
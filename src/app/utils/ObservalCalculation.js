import Time from '../utils/Time.js';

function durationOfAnalgesia(observalData) {
    return ~~(Time.duration(observalData.initialTime, observalData.birthTime) / 1000 / 60) + 60;
}

export default {
    durationOfAnalgesia
};
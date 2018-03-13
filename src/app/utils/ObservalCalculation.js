import Time from '../utils/Time.js';

function durationOfAnalgesia(observalData) {
    return ~~(Time.duration(observalData.initialTime, observalData.birthTime) / 1000 / 60) + 60;
}

function anestheticsConsumption(observalData) {

    let result = 0;

    if (!isNaN(observalData.pumpConsumption)) {
        result += +observalData.pumpConsumption;
    }

    if (!isNaN(observalData.bolus)) {
        result += +observalData.bolus;
    }

    return result;

}

export default {
    durationOfAnalgesia,
    anestheticsConsumption
};
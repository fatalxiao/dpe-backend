import Time from '../utils/Time.js';

function durationOfAnalgesia(observalData) {
    return ~~(Time.duration(observalData.initialTime, observalData.birthTime) / 1000 / 60) + 60;
}

function anestheticsConsumption(observalData) {

    let result;

    if (!isNaN(observalData.pumpConsumption)) {
        if (!result) {
            result = 0;
        }
        result += +observalData.pumpConsumption;
    }

    if (!isNaN(observalData.bolus)) {
        if (!result) {
            result = 0;
        }
        result += +observalData.bolus;
    }

    return result;

}

export default {
    durationOfAnalgesia,
    anestheticsConsumption
};
import Time from '../utils/Time.js';

function durationOfFirstPcaTime(observalData) {

    if (!observalData || !observalData.initialTime || !observalData.firstPcaTime) {
        return null;
    }

    return '' + (~~(Time.duration(observalData.initialTime, observalData.firstPcaTime) / 1000 / 60) + 60);

}

function durationOfAnalgesia(observalData) {

    if (!observalData || !observalData.initialTime || !observalData.birthTime) {
        return null;
    }

    return '' + (~~(Time.duration(observalData.initialTime, observalData.birthTime) / 1000 / 60) + 60);

}

function anestheticsConsumption(observalData) {

    if (!observalData) {
        return null;
    }

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

    return '' + result;

}

export default {
    durationOfFirstPcaTime,
    durationOfAnalgesia,
    anestheticsConsumption
};
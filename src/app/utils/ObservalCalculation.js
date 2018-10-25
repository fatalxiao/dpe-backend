import Time from '../utils/Time.js';

function durationOfFirstPcaTime(observalData) {

    if (!observalData || !observalData.initialTime || !observalData.firstPcaTime) {
        return null;
    }

    return '' + (~~(Time.duration(observalData.initialTime, observalData.firstPcaTime) / 1000 / 60));

}

function durationOfFirstManualBolusTime(observalData) {

    if (!observalData || !observalData.initialTime || !observalData.firstManualBolusTime) {
        return null;
    }

    return '' + (~~(Time.duration(observalData.initialTime, observalData.firstManualBolusTime) / 1000 / 60));

}

/**
 * 单位分钟
 * @param observalData
 * @returns {*}
 */
function durationOfAnalgesia(observalData) {

    if (!observalData || !observalData.initialTime || !observalData.birthTime) {
        return null;
    }

    // 总镇痛时间+60分钟
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
    durationOfFirstManualBolusTime,
    durationOfAnalgesia,
    anestheticsConsumption
};
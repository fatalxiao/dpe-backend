const BASE_DATA = {
        hasContraction: false,
        vasScore: '',
        thoracicSensoryBlockLeft: null,
        thoracicSensoryBlockRight: null,
        sacralSensoryBlockLeft: null,
        sacralSensoryBlockRight: null,
        bromageScore: '',
        systolicBloodPressure: '',
        diastolicBloodPressure: '',
        heartRate: '',
        pulseOxygenSaturation: '',
        fetalHeartRate: ''
    },
    DEFAULT_TIMEPOINTS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18,
        20, 30, 2 * 60, 3.5 * 60, 5 * 60, 6.5 * 60, 8 * 60];

function getDefaultData(timePoints = DEFAULT_TIMEPOINTS) {
    return timePoints.map(timePoint => ({
        ...BASE_DATA,
        timePoint
    }));
}

function fullFillAnalgesiaData(analgesiaData) {

    const data = getDefaultData();
    analgesiaData.sort((a, b) => a.timePoint - b.timePoint);

    if (analgesiaData && analgesiaData.length > 0) {

        for (let resItem of analgesiaData) {

            const item = data.find(a => a.timePoint === resItem.timePoint);

            if (item) {
                Object.assign(item, resItem);
            } else {

                let timePoint = DEFAULT_TIMEPOINTS[DEFAULT_TIMEPOINTS.length - 1];

                while (timePoint < resItem.timePoint) {

                    timePoint += 1.5 * 60;

                    if (timePoint >= resItem.timePoint) {
                        data.push(Object.assign({...BASE_DATA, timePoint}, resItem));
                    } else {
                        const i = data.findIndex(a => a.timePoint === timePoint);
                        if (i < 0) {
                            data.push({...BASE_DATA, timePoint});
                        }
                    }
                }
            }
        }
    }

    return data;

}

function isVasLessThan1(analgesiaData, timePoint) {

    for (let item of analgesiaData) {

        if (item > timePoint) {
            break;
        }

        if (item.vasScore !== null && item.vasScore <= 1) {
            return true;
        }

    }

    return false;

}

function timePointOfVasLessThan1(analgesiaData) {

    let index;

    for (let i = 0, len = analgesiaData.length; i < len; i++) {

        const item = analgesiaData[i];

        if (item.hasContraction && item.vasScore !== null && item.vasScore <= 1) {
            index = i;
            break;
        }

    }

    if (index === undefined) {
        return '';
    }

    if (index === 0) {
        return 0;
    }

    const prevItem = analgesiaData[index - 1];
    if (prevItem.vasScore === 0) {
        return prevItem.timePoint;
    }

    return analgesiaData[index].timePoint;

}

function isS1In20(analgesiaData, timePoint) {

}

export default {
    fullFillAnalgesiaData,
    isVasLessThan1,
    timePointOfVasLessThan1,
    isS1In20
};
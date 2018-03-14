const

    Position = {
        LEFT: 'Left',
        RIGHT: 'Right'
    },

    BASE_DATA = {
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

            const index = data.findIndex(a => a.timePoint === resItem.timePoint);

            if (index > -1) {
                data[index] = resItem;
            } else {

                let timePoint = DEFAULT_TIMEPOINTS[DEFAULT_TIMEPOINTS.length - 1];

                while (timePoint < resItem.timePoint) {

                    timePoint += 1.5 * 60;

                    if (timePoint >= resItem.timePoint) {
                        data.push(resItem);
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

    if (!analgesiaData || analgesiaData.length < 1) {
        return false;
    }

    for (let item of analgesiaData) {

        if (item > timePoint) {
            return false;
        }

        if (item.vasScore !== null && item.vasScore <= 1) {
            return true;
        }

    }

}

function timePointOfVasLessThan1(analgesiaData) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return null;
    }

    let index;

    for (let i = 0, len = analgesiaData.length; i < len; i++) {

        const item = analgesiaData[i];

        if (item.hasContraction && item.vasScore !== null && item.vasScore <= 1) {
            index = i;
            break;
        }

    }

    if (index === undefined) {
        return null;
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

function isSacralSensoryInTime(analgesiaData, sensory, timePoint, position) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return false;
    }

    for (let item of analgesiaData) {

        if (item.timePoint > timePoint) {
            return false;
        }

        if (item[`sacralSensoryBlock${position}Value`] >= sensory) {
            return true;
        }

    }

}

function maxThoracicSensoryBlock(analgesiaData, position) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return null;
    }

    const data = analgesiaData.map(item => item[`thoracicSensoryBlock${position}Value`]).filter(item => item);

    return data.length > 0 ? Math.max(...data) : null;

}

function minSacralSensoryBlock(analgesiaData, position) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return null;
    }

    const data = analgesiaData.map(item => item[`sacralSensoryBlock${position}Value`]).filter(item => item);

    return data.length > 0 ? Math.min(...data) : null;

}

function isUnilateralSensoryBlock(analgesiaData) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return false;
    }

    for (let item of analgesiaData) {
        if (Math.abs(item.sacralSensoryBlockLeftValue - item.sacralSensoryBlockRightValue) > 2
            || Math.abs(item.thoracicSensoryBlockLeftValue - item.thoracicSensoryBlockRightValue) > 2) {
            return true;
        }
    }

    return false;

}

function timePointOfThoracicSensoryBlock(analgesiaData, sensoryBlock) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return null;
    }

    for (let item of analgesiaData) {
        if (item.thoracicSensoryBlockLeftValue >= sensoryBlock && item.thoracicSensoryBlockRightValue >= sensoryBlock) {
            return item.timePoint;
        }
    }

    return null;

}

function timePointOfSacralSensoryBlock(analgesiaData, sensoryBlock) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return null;
    }

    for (let item of analgesiaData) {
        if (item.sacralSensoryBlockLeftValue >= sensoryBlock && item.sacralSensoryBlockRightValue >= sensoryBlock) {
            return item.timePoint;
        }
    }

    return null;

}

function isFetalHeartRateDecreased(analgesiaData) {

    if (!analgesiaData || analgesiaData.length < 1) {
        return false;
    }

    for (let item of analgesiaData) {
        if (item.fetalHeartRate !== null && item.fetalHeartRate < 110) {
            return true;
        }
    }

    return false;

}

export default {

    Position,

    fullFillAnalgesiaData,
    isVasLessThan1,
    timePointOfVasLessThan1,
    isSacralSensoryInTime,
    maxThoracicSensoryBlock,
    minSacralSensoryBlock,
    isUnilateralSensoryBlock,
    timePointOfThoracicSensoryBlock,
    timePointOfSacralSensoryBlock,
    isFetalHeartRateDecreased

};
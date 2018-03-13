import PatientDao from '../dao/PatientDao.js';
import SensoryBlockDao from '../dao/SensoryBlockDao.js';

import Response from '../utils/Response.js';
import AC from '../utils/AnalgesiaCalculation.js';
import OC from '../utils/ObservalCalculation.js';
import Time from '../utils/Time.js';
import DataFormat from '../utils/DataFormat.js';

async function exportPatients() {

    const header = [{
            header: '组别', key: 'groupName'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '住院号', key: 'name'
        }, {
            header: '年龄', key: 'name'
        }, {
            header: '身高', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, {
            header: '姓名', key: 'name'
        }, '住院号', '年龄', '身高', '体重', 'BMI', '孕周', '镇痛前VAS评分 ', '镇痛前宫口大小',
            '基础收缩压', '基础舒张压', '基础心率', '基础氧饱和度', '基础胎心率', '镇痛前缩宫素使用', '20min内VAS≤1',
            '30min内VAS≤1', 'VAS≤1的时间', '20min内左侧是否达到S1', '20min内右侧是否达到S1', '20min内是否双侧是否达到S1',
            '20min内左侧是否达到S2', '20min内右侧是否达到S2', '20min内是否双侧是否达到S2', '30min内左侧是否达到S1',
            '30min内右侧是否达到S1', '30min内是否双侧是否达到S1', '30min内左侧是否达到S2', '30min内右侧是否达到S2',
            '30min内是否双侧是否达到S2', '左侧最高头端阻滞平面', '右侧最高头端阻滞平面', '左侧尾端最低阻滞平面',
            '右侧尾端最低阻滞平面', '是否单侧阻滞', '达到T8时间', '到达T10时间', '到达S1时间', '到达S2时间', 'PCA次数',
            '首次PCA时间', 'bolus次数', '首次bolus时间', '硬膜外导管重置', '硬膜外导管调整', 'DPE未见脑脊液', '血性置管',
            '蛛网膜下腔置管', '镇痛时长', '局麻药消耗量(Pump + Bolus)', '第一产程时长', '第二产程时长', '单位时间局麻药消耗',
            '出血量', '是否胎心下降', '是否转剖宫产', '剖宫产原因', '是否器械助产', '是否侧切', '侧切时的VAS评分', '产前发热',
            '低血压的发生', '血管活性药物使用', '恶心', '呕吐 ', '瘙痒', '头痛', '背痛', '感觉异常', '镇痛满意度评分',
            '其他不适', '总出血量', '新生儿体重', '新生儿身高', '性别', '1minapgar评分', '5minapgar评分', '是否去儿科观察室',
            '儿科观察室原因', '脐动脉PH', '脐动脉BE', '脐静脉PH', '脐静脉BE'],

        boolHandler = DataFormat.formatBooleanToNumber,

        data = await PatientDao.getFullPatients(),
        sensoryBlocks = await SensoryBlockDao.getSensoryBlocks(),

        s1Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S1').value,
        s2Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S2').value,
        t8Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T8').value,
        t10Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T10').value;

    data.map(item => {

        const result = {
            groupName: item.group ? item.group.name : '',
            name: item.name,
            id: item.id,
            age: item.age,
            height: item.height,
            weight: item.weight,
            bmi: item.weight / ((item.height / 100) ** 2),
            gestationalDays: item.gestationalDays,
            initialVasScore: item.initialVasScore,
            cervicalDilationAtTimeOfEA: item.cervicalDilationAtTimeOfEA,
            systolicBloodPressure: item.systolicBloodPressure,
            diastolicBloodPressure: item.diastolicBloodPressure,
            heartRate: item.heartRate,
            pulseOxygenSaturation: item.pulseOxygenSaturation,
            fetalHeartRate: item.fetalHeartRate,
            hasOxytocinAtTimeOfEA: boolHandler(item.hasOxytocinAtTimeOfEA)
        };

        if (item.analgesia) {

            const analgesiaData = AC.fullFillAnalgesiaData(item.analgesia),

                isS1In20Left = AC.isSacralSensoryInTime(analgesiaData, s1Value, 20, AC.Position.LEFT),
                isS1In20Right = AC.isSacralSensoryInTime(analgesiaData, s1Value, 20, AC.Position.RIGHT),

                isS2In20Left = AC.isSacralSensoryInTime(analgesiaData, s2Value, 20, AC.Position.LEFT),
                isS2In20Right = AC.isSacralSensoryInTime(analgesiaData, s2Value, 20, AC.Position.RIGHT),

                isS1In30Left = AC.isSacralSensoryInTime(analgesiaData, s1Value, 30, AC.Position.LEFT),
                isS1In30Right = AC.isSacralSensoryInTime(analgesiaData, s1Value, 30, AC.Position.RIGHT),

                isS2In30Left = AC.isSacralSensoryInTime(analgesiaData, s2Value, 30, AC.Position.LEFT),
                isS2In30Right = AC.isSacralSensoryInTime(analgesiaData, s2Value, 30, AC.Position.RIGHT);

            result.isVasLessThan1In20 = boolHandler(AC.isVasLessThan1(analgesiaData, 20));
            result.isVasLessThan1In30 = boolHandler(AC.isVasLessThan1(analgesiaData, 30));
            result.timePointOfVasLessThan1 = AC.timePointOfVasLessThan1(analgesiaData);
            result.isS1In20Left = boolHandler(isS1In20Left);
            result.isS1In20Right = boolHandler(isS1In20Right);
            result.isS1In20Both = boolHandler(isS1In20Left && isS1In20Right);
            result.isS2In20Left = boolHandler(isS2In20Left);
            result.isS2In20Right = boolHandler(isS2In20Right);
            result.isS2In20Both = boolHandler(isS2In20Left && isS2In20Right);
            result.isS1In30Left = boolHandler(isS1In30Left);
            result.isS1In30Right = boolHandler(isS1In30Right);
            result.isS1In30Both = boolHandler(isS1In30Left && isS1In30Right);
            result.isS2In30Left = boolHandler(isS2In30Left);
            result.isS2In30Right = boolHandler(isS2In30Right);
            result.isS2In30Both = boolHandler(isS2In30Left && isS2In30Right);
            result.maxThoracicSensoryBlockLeft = AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.LEFT);
            result.maxThoracicSensoryBlockRight = AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.RIGHT);
            result.minSacralSensoryBlockLeft = AC.minSacralSensoryBlock(analgesiaData, AC.Position.LEFT);
            result.minSacralSensoryBlockRight = AC.minSacralSensoryBlock(analgesiaData, AC.Position.RIGHT);
            result.isUnilateralSensoryBlock = boolHandler(AC.isUnilateralSensoryBlock(analgesiaData));
            result.timePointOfT8 = AC.timePointOfThoracicSensoryBlock(analgesiaData, t8Value);
            result.timePointOfT10 = AC.timePointOfThoracicSensoryBlock(analgesiaData, t10Value);
            result.timePointOfS1 = AC.timePointOfSacralSensoryBlock(analgesiaData, s1Value);
            result.timePointOfS2 = AC.timePointOfSacralSensoryBlock(analgesiaData, s2Value);

        }

        if (item.observal) {
            result.pcaCount = item.observal.pcaCount;
            result.firstPcaTime = item.observal.firstPcaTime;
            result.manualBolusCount = item.observal.manualBolusCount;
            result.firstManualBolusTime = item.observal.firstManualBolusTime;
            result.hasEpiduralCatheterAdjuestment = boolHandler(item.observal.hasEpiduralCatheterAdjuestment);
            result.hasEpiduralCatheterReplacement = boolHandler(item.observal.hasEpiduralCatheterReplacement);
            result.isUnabledToPunctureDura = boolHandler(item.observal.isUnabledToPunctureDura);
            result.isIVEpiduralCatheterInsertion = boolHandler(item.observal.isIVEpiduralCatheterInsertion);
            result.isIntrathecalEpiduralCatheterInsertion = boolHandler(item.observal.isIntrathecalEpiduralCatheterInsertion);
            result.durationOfAnalgesia = OC.durationOfAnalgesia(item.observal);
            result.anestheticsConsumption = OC.anestheticsConsumption(item.observal);
            result.durationOfFirstStageOfLabor = item.observal.durationOfFirstStageOfLabor;
            result.durationOfSecondStageOfLabor = item.observal.durationOfSecondStageOfLabor;
            // 单位时间局麻药消耗
            result.blood_lose = item.observal.blood_lose;
            // 是否胎心下降
        }

    });

    return data;

};

export default {
    exportPatients
};
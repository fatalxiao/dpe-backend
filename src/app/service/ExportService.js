import PatientDao from '../dao/PatientDao.js';
import SensoryBlockDao from '../dao/SensoryBlockDao.js';

import Response from '../utils/Response.js';
import AC from '../utils/AnalgesiaCalculation.js';
import OC from '../utils/ObservalCalculation.js';
import Time from '../utils/Time.js';
import DataFormat from '../utils/DataFormat.js';

async function exportPatients() {

    const header = [{name: '组别', key: 'groupName'},
            {name: '姓名', key: 'name'},
            {name: '住院号', key: 'id'},
            {name: '年龄', key: 'age'},
            {name: '身高', key: 'height'},
            {name: '体重', key: 'weight'},
            {name: 'BMI', key: 'bmi'},
            {name: '孕周', key: 'gestationalDays'},
            {name: '镇痛前VAS评分', key: 'initialVasScore'},
            {name: '镇痛前宫口大小', key: 'cervicalDilationAtTimeOfEA'},
            {name: '基础收缩压', key: 'systolicBloodPressure'},
            {name: '基础舒张压', key: 'diastolicBloodPressure'},
            {name: '基础心率', key: 'heartRate'},
            {name: '基础氧饱和度', key: 'pulseOxygenSaturation'},
            {name: '基础胎心率', key: 'fetalHeartRate'},
            {name: '镇痛前缩宫素使用', key: 'hasOxytocinAtTimeOfEA'},
            {name: '20min内VAS≤1', key: 'isVasLessThan1In20'},
            {name: '30min内VAS≤1', key: 'isVasLessThan1In30'},
            {name: 'VAS≤1的时间', key: 'timePointOfVasLessThan1'},
            {name: '20min内左侧是否达到S1', key: 'isS1In20Left'},
            {name: '20min内右侧是否达到S1', key: 'isS1In20Right'},
            {name: '20min内是否双侧是否达到S1', key: 'isS1In20Both'},
            {name: '20min内左侧是否达到S2', key: 'isS2In20Left'},
            {name: '20min内右侧是否达到S2', key: 'isS2In20Right'},
            {name: '20min内是否双侧是否达到S2', key: 'isS2In20Both'},
            {name: '30min内左侧是否达到S1', key: 'isS1In30Left'},
            {name: '30min内右侧是否达到S1', key: 'isS1In30Right'},
            {name: '30min内是否双侧是否达到S1', key: 'isS1In30Both'},
            {name: '30min内左侧是否达到S2', key: 'isS2In30Left'},
            {name: '30min内右侧是否达到S2', key: 'isS2In30Right'},
            {name: '30min内是否双侧是否达到S2', key: 'isS2In30Both'},
            {name: '左侧最高头端阻滞平面', key: 'maxThoracicSensoryBlockLeft'},
            {name: '右侧最高头端阻滞平面', key: 'maxThoracicSensoryBlockRight'},
            {name: '左侧尾端最低阻滞平面', key: 'minSacralSensoryBlockLeft'},
            {name: '右侧尾端最低阻滞平面', key: 'minSacralSensoryBlockRight'},
            {name: '是否单侧阻滞', key: 'isUnilateralSensoryBlock'},
            {name: '达到T8时间', key: 'timePointOfT8'},
            {name: '到达T10时间', key: 'timePointOfT10'},
            {name: '到达S1时间', key: 'timePointOfS1'},
            {name: '到达S2时间', key: 'timePointOfS2'},
            {name: 'PCA次数', key: 'pcaCount'},
            {name: '首次PCA时间', key: 'firstPcaTime'},
            {name: 'bolus次数', key: 'manualBolusCount'},
            {name: '首次bolus时间', key: 'firstManualBolusTime'},
            {name: '硬膜外导管重置', key: 'hasEpiduralCatheterAdjuestment'},
            {name: '硬膜外导管调整', key: 'hasEpiduralCatheterReplacement'},
            {name: 'DPE未见脑脊液', key: 'isUnabledToPunctureDura'},
            {name: '血性置管', key: 'isIVEpiduralCatheterInsertion'},
            {name: '蛛网膜下腔置管', key: 'isIntrathecalEpiduralCatheterInsertion'},
            {name: '镇痛时长', key: 'durationOfAnalgesia'},
            {name: '局麻药消耗量', key: 'anestheticsConsumption'},
            {name: '第一产程时长', key: 'durationOfFirstStageOfLabor'},
            {name: '第二产程时长', key: 'durationOfSecondStageOfLabor'},
            {name: '单位时间局麻药消耗', key: 'anestheticsConsumptionPerTime'},
            {name: '是否胎心下降', key: 'isFetalHeartRateDecreased'},
            {name: '是否转剖宫产', key: 'hasCaesareanSection'},
            {name: '剖宫产原因', key: 'caesareanSectionReason'},
            {name: '是否器械助产', key: 'hasInstrumental'},
            {name: '是否侧切', key: 'hasLateralEpisiotomy'},
            {name: '侧切时的VAS评分', key: 'lateralEpisiotomyVasScore'},
            {name: '产前发热', key: 'hasPrenatalFever'},
            {name: '低血压的发生', key: 'hasHypotension'},
            {name: '血管活性药物使用', key: 'hasVasoactiveAgent'},
            {name: '恶心', key: 'hasNausea'},
            {name: '呕吐', key: 'hasVomit'},
            {name: '瘙痒', key: 'hasPruritus'},
            {name: '头痛', key: 'hasPostduralPunctureHeadache'},
            {name: '背痛', key: 'hasBackPain'},
            {name: '感觉异常', key: 'hasParesthesia'},
            {name: '镇痛满意度评分', key: 'patientSatisfactionScore'},
            {name: '其他不适', key: 'otherdiscomfort'},
            {name: '总出血量', key: 'bloodLose'},
            {name: '新生儿体重', key: 'foetalWeight'},
            {name: '新生儿身高', key: 'foetalHeight'},
            {name: '性别', key: ''},
            {name: '1minapgar评分', key: ''},
            {name: '5minapgar评分', key: ''},
            {name: '是否去儿科观察室', key: ''},
            {name: '儿科观察室原因', key: ''},
            {name: '脐动脉PH', key: ''},
            {name: '脐动脉BE', key: ''},
            {name: '脐静脉PH', key: ''},
            {name: '脐静脉BE', key: ''}],

        boolHandler = DataFormat.formatBooleanToNumber,

        data = await PatientDao.getFullPatients(),
        sensoryBlocks = await SensoryBlockDao.getSensoryBlocks(),

        s1Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S1').value,
        s2Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S2').value,
        t8Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T8').value,
        t10Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T10').value,

        excelData = data.map(item => {

            const result = {
                groupName: item.group ? item.group.name : '',
                name: item.name,
                id: item.id,
                age: item.age,
                height: item.height,
                weight: item.weight,
                bmi: item.weight && item.height ? (item.weight / ((item.height / 100) ** 2)).toFixed(2) : null,
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
                result.isFetalHeartRateDecreased = boolHandler(AC.isFetalHeartRateDecreased(analgesiaData));

            }

            if (item.observal) {

                const durationOfAnalgesia = OC.durationOfAnalgesia(item.observal),
                    anestheticsConsumption = OC.anestheticsConsumption(item.observal);

                result.pcaCount = item.observal.pcaCount;
                result.firstPcaTime = item.observal.firstPcaTime;
                result.manualBolusCount = item.observal.manualBolusCount;
                result.firstManualBolusTime = item.observal.firstManualBolusTime;
                result.hasEpiduralCatheterAdjuestment = boolHandler(item.observal.hasEpiduralCatheterAdjuestment);
                result.hasEpiduralCatheterReplacement = boolHandler(item.observal.hasEpiduralCatheterReplacement);
                result.isUnabledToPunctureDura = boolHandler(item.observal.isUnabledToPunctureDura);
                result.isIVEpiduralCatheterInsertion = boolHandler(item.observal.isIVEpiduralCatheterInsertion);
                result.isIntrathecalEpiduralCatheterInsertion = boolHandler(item.observal.isIntrathecalEpiduralCatheterInsertion);
                result.durationOfAnalgesia = durationOfAnalgesia;
                result.anestheticsConsumption = anestheticsConsumption;
                result.durationOfFirstStageOfLabor = item.observal.durationOfFirstStageOfLabor;
                result.durationOfSecondStageOfLabor = item.observal.durationOfSecondStageOfLabor;
                result.anestheticsConsumptionPerTime = anestheticsConsumption !== null && durationOfAnalgesia !== null ? anestheticsConsumption / durationOfAnalgesia : null;
                result.hasCaesareanSection = boolHandler(item.observal.hasCaesareanSection);
                result.hasInstrumental = boolHandler(item.observal.hasInstrumental);
                result.hasLateralEpisiotomy = boolHandler(item.observal.hasLateralEpisiotomy);
                result.lateralEpisiotomyVasScore = item.observal.lateralEpisiotomyVasScore;
                result.hasPrenatalFever = boolHandler(item.observal.hasPrenatalFever);
                result.hasHypotension = boolHandler(item.observal.hasHypotension);
                result.hasVasoactiveAgent = boolHandler(item.observal.hasVasoactiveAgent);
                result.hasNausea = boolHandler(item.observal.hasNausea);
                result.hasVomit = boolHandler(item.observal.hasVomit);
                result.hasPruritus = boolHandler(item.observal.hasPruritus);
                result.hasPostduralPunctureHeadache = boolHandler(item.observal.hasPostduralPunctureHeadache);
                result.hasBackPain = boolHandler(item.observal.hasBackPain);
                result.hasParesthesia = boolHandler(item.observal.hasParesthesia);
                result.patientSatisfactionScore = item.observal.patientSatisfactionScore;
                result.bloodLose = item.observal.bloodLose;
                result.foetalWeight = item.observal.foetalWeight;
                result.foetalHeight = item.observal.foetalHeight;
            }

            return header.map(item => result[item.key] || null);

        });

    excelData.unshift(header.map(item => item.name));

    return excelData;

};

export default {
    exportPatients
};
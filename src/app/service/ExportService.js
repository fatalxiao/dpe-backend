import PatientDao from '../dao/PatientDao.js';
import SensoryBlockDao from '../dao/SensoryBlockDao.js';

import AC from '../utils/AnalgesiaCalculation.js';
import OC from '../utils/ObservalCalculation.js';
import ExportFormat from '../utils/ExportFormat.js';

const boolHandler = ExportFormat.formatBoolean,
    numHandler = ExportFormat.formatNumber;

async function getExportDPEData(data, sensoryBlocks) {

    data = data || await PatientDao.getFullPatients();
    sensoryBlocks = sensoryBlocks || await SensoryBlockDao.getSensoryBlocks();

    const header = [
            {name: '组别', key: 'groupName'},
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
            {name: '是否引产', key: 'hasInduction'},
            {name: '20min内VAS≤1', key: 'isVasLessThan1In20'},
            {name: '30min内VAS≤1', key: 'isVasLessThan1In30'},
            {name: 'VAS≤1的时间', key: 'timePointOfVasLessThan1'},
            {name: '0min时是否达到满意镇痛', key: 'isAdequatePainReliefIn0'},
            {name: '2min时是否达到满意镇痛', key: 'isAdequatePainReliefIn2'},
            {name: '4min时是否达到满意镇痛', key: 'isAdequatePainReliefIn4'},
            {name: '6min时是否达到满意镇痛', key: 'isAdequatePainReliefIn6'},
            {name: '8min时是否达到满意镇痛', key: 'isAdequatePainReliefIn8'},
            {name: '10min时是否达到满意镇痛', key: 'isAdequatePainReliefIn10'},
            {name: '12min时是否达到满意镇痛', key: 'isAdequatePainReliefIn12'},
            {name: '14min时是否达到满意镇痛', key: 'isAdequatePainReliefIn14'},
            {name: '16min时是否达到满意镇痛', key: 'isAdequatePainReliefIn16'},
            {name: '18min时是否达到满意镇痛', key: 'isAdequatePainReliefIn18'},
            {name: '20min时是否达到满意镇痛', key: 'isAdequatePainReliefIn20'},
            {name: '30min时是否达到满意镇痛', key: 'isAdequatePainReliefIn30'},
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
            {name: '2h时VAS评分', key: 'vasIn120'},
            {name: '3.5h时VAS评分', key: 'vasIn210'},
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
            {name: '首次PCA时间', key: 'durationOfFirstPcaTime'},
            {name: 'bolus次数', key: 'manualBolusCount'},
            {name: '首次bolus时间', key: 'durationOfFirstManualBolusTime'},
            {name: '硬膜外导管重置', key: 'hasEpiduralCatheterAdjuestment'},
            {name: '硬膜外导管调整', key: 'hasEpiduralCatheterReplacement'},
            {name: 'DPE未见脑脊液', key: 'isUnabledToPunctureDura'},
            {name: '血性置管', key: 'isIVEpiduralCatheterInsertion'},
            {name: '蛛网膜下腔置管', key: 'isIntrathecalEpiduralCatheterInsertion'},
            {name: '镇痛时长', key: 'durationOfAnalgesia'},
            {name: '局麻药消耗量', key: 'anestheticsConsumption'},
            {name: '罗哌卡因总消耗量', key: 'ropivacaineConsumption'},
            {name: '舒芬太尼总消耗量', key: 'sufentanilConsumption'},
            {name: '第一产程时长', key: 'durationOfFirstStageOfLabor'},
            {name: '第二产程时长', key: 'durationOfSecondStageOfLabor'},
            {name: '每小时局麻药消耗量', key: 'anestheticsConsumptionPerTime'},
            {name: '每小时罗哌卡因总消耗量', key: 'ropivacaineConsumptionPerTime'},
            {name: '每小时舒芬太尼总消耗量', key: 'sufentanilConsumptionPerTime'},
            {name: '是否胎心下降', key: 'isFetalHeartRateDecreased'},
            {name: '是否转剖宫产', key: 'hasCaesareanSection'},
            {name: '剖宫产原因', key: 'caesareanSectionReason'},
            {name: '是否器械助产', key: 'hasInstrumental'},
            {name: '是否侧切', key: 'hasLateralEpisiotomy'},
            {name: '侧切时的VAS评分', key: 'lateralEpisiotomyVasScore'},
            {name: '是否产前发热', key: 'hasPrenatalFever'},
            {name: '产前发热体温', key: 'prenatalFeverTemperature'},
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
            {name: '性别', key: 'foetalGender'},
            {name: '1minapgar评分', key: 'oneMinuteApgarScore'},
            {name: '5minapgar评分', key: 'fiveMinuteApgarScore'},
            {name: '是否去儿科观察室', key: 'hasNicu'},
            {name: '儿科观察室原因', key: 'nicuReason'},
            {name: '脐动脉PH', key: 'arterialPh'},
            {name: '脐动脉BE', key: 'arterialBe'},
            {name: '脐静脉PH', key: 'venousPh'},
            {name: '脐静脉BE', key: 'venousBe'},
            {name: '备注', key: 'desc'}
        ],

        s1Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S1').value,
        s2Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S2').value,
        t8Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T8').value,
        t10Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T10').value,

        excelData = data.filter(item => item.status).map(item => {

            const result = {
                groupName: item.group ? item.group.name : '',
                name: item.name,
                id: item.id,
                age: numHandler(item.age),
                height: numHandler(item.height),
                weight: numHandler(item.weight),
                bmi: item.weight && item.height ? (item.weight / ((item.height / 100) ** 2)).toFixed(2) : null,
                gestationalDays: numHandler(item.gestationalDays),
                initialVasScore: numHandler(item.initialVasScore * 10),
                cervicalDilationAtTimeOfEA: numHandler(item.cervicalDilationAtTimeOfEA),
                systolicBloodPressure: numHandler(item.systolicBloodPressure),
                diastolicBloodPressure: numHandler(item.diastolicBloodPressure),
                heartRate: numHandler(item.heartRate),
                pulseOxygenSaturation: numHandler(item.pulseOxygenSaturation),
                fetalHeartRate: numHandler(item.fetalHeartRate),
                hasOxytocinAtTimeOfEA: boolHandler(item.hasOxytocinAtTimeOfEA),
                hasInduction: boolHandler(item.hasInduction),
                desc: item.description ? [item.description] : []
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
                result.timePointOfVasLessThan1 = numHandler(AC.timePointOfVasLessThan1(analgesiaData));
                result.isAdequatePainReliefIn0 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 0));
                result.isAdequatePainReliefIn2 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 2));
                result.isAdequatePainReliefIn4 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 4));
                result.isAdequatePainReliefIn6 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 6));
                result.isAdequatePainReliefIn8 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 8));
                result.isAdequatePainReliefIn10 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 10));
                result.isAdequatePainReliefIn12 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 12));
                result.isAdequatePainReliefIn14 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 14));
                result.isAdequatePainReliefIn16 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 16));
                result.isAdequatePainReliefIn18 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 18));
                result.isAdequatePainReliefIn20 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 20));
                result.isAdequatePainReliefIn30 = boolHandler(AC.isAdequatePainRelief(analgesiaData, 30));
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
                result.vasIn120 = numHandler(AC.getVasScore(analgesiaData, 120));
                result.vasIn210 = numHandler(AC.getVasScore(analgesiaData, 210));
                result.maxThoracicSensoryBlockLeft = numHandler(AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.LEFT));
                result.maxThoracicSensoryBlockRight = numHandler(AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.RIGHT));
                result.minSacralSensoryBlockLeft = numHandler(AC.minSacralSensoryBlock(analgesiaData, AC.Position.LEFT));
                result.minSacralSensoryBlockRight = numHandler(AC.minSacralSensoryBlock(analgesiaData, AC.Position.RIGHT));
                result.isUnilateralSensoryBlock = boolHandler(AC.isUnilateralSensoryBlock(analgesiaData));
                result.timePointOfT8 = numHandler(AC.timePointOfThoracicSensoryBlock(analgesiaData, t8Value));
                result.timePointOfT10 = numHandler(AC.timePointOfThoracicSensoryBlock(analgesiaData, t10Value));
                result.timePointOfS1 = numHandler(AC.timePointOfSacralSensoryBlock(analgesiaData, s1Value));
                result.timePointOfS2 = numHandler(AC.timePointOfSacralSensoryBlock(analgesiaData, s2Value));
                result.isFetalHeartRateDecreased = boolHandler(AC.isFetalHeartRateDecreased(analgesiaData));

            }

            if (item.observal) {

                const durationOfFirstPcaTime = OC.durationOfFirstPcaTime(item.observal),
                    durationOfFirstManualBolusTime = OC.durationOfFirstManualBolusTime(item.observal),
                    durationOfAnalgesia = OC.durationOfAnalgesia(item.observal),
                    anestheticsConsumption = OC.anestheticsConsumption(item.observal),
                    ropivacaineConsumption = OC.ropivacaineConsumption(item.observal),
                    sufentanilConsumption = OC.sufentanilConsumption(item.observal);

                result.pcaCount = numHandler(item.observal.pcaCount);
                result.durationOfFirstPcaTime = numHandler(durationOfFirstPcaTime);
                result.manualBolusCount = numHandler(item.observal.manualBolusCount);
                result.durationOfFirstManualBolusTime = numHandler(durationOfFirstManualBolusTime);
                result.hasEpiduralCatheterAdjuestment = boolHandler(item.observal.hasEpiduralCatheterAdjuestment);
                result.hasEpiduralCatheterReplacement = boolHandler(item.observal.hasEpiduralCatheterReplacement);
                result.isUnabledToPunctureDura = boolHandler(item.observal.isUnabledToPunctureDura);
                result.isIVEpiduralCatheterInsertion = boolHandler(item.observal.isIVEpiduralCatheterInsertion);
                result.isIntrathecalEpiduralCatheterInsertion = boolHandler(item.observal.isIntrathecalEpiduralCatheterInsertion);
                result.durationOfAnalgesia = numHandler(durationOfAnalgesia);
                result.anestheticsConsumption = numHandler(anestheticsConsumption !== null ? anestheticsConsumption.toFixed(2) : null);
                result.ropivacaineConsumption = numHandler(ropivacaineConsumption !== null ? ropivacaineConsumption.toFixed(2) : null);
                result.sufentanilConsumption = numHandler(sufentanilConsumption !== null ? sufentanilConsumption.toFixed(2) : null);
                result.durationOfFirstStageOfLabor = numHandler(item.observal.durationOfFirstStageOfLabor);
                result.durationOfSecondStageOfLabor = numHandler(item.observal.durationOfSecondStageOfLabor);
                result.anestheticsConsumptionPerTime = anestheticsConsumption !== null && durationOfAnalgesia !== null ?
                    (anestheticsConsumption / durationOfAnalgesia * 60).toFixed(1) : null;
                result.ropivacaineConsumptionPerTime = ropivacaineConsumption !== null && durationOfAnalgesia !== null ?
                    (ropivacaineConsumption / durationOfAnalgesia * 60).toFixed(1) : null;
                result.sufentanilConsumptionPerTime = sufentanilConsumption !== null && durationOfAnalgesia !== null ?
                    (sufentanilConsumption / durationOfAnalgesia * 60).toFixed(1) : null;
                result.hasCaesareanSection = boolHandler(item.observal.hasCaesareanSection);
                result.hasInstrumental = boolHandler(item.observal.hasInstrumental);
                result.hasLateralEpisiotomy = boolHandler(item.observal.hasLateralEpisiotomy);
                result.lateralEpisiotomyVasScore = numHandler(item.observal.lateralEpisiotomyVasScore);
                result.hasPrenatalFever = boolHandler(item.observal.hasPrenatalFever);
                result.prenatalFeverTemperature = numHandler(item.observal.prenatalFeverTemperature);
                result.hasHypotension = boolHandler(item.observal.hasHypotension);
                result.hasVasoactiveAgent = boolHandler(item.observal.hasVasoactiveAgent);
                result.hasNausea = boolHandler(item.observal.hasNausea);
                result.hasVomit = boolHandler(item.observal.hasVomit);
                result.hasPruritus = boolHandler(item.observal.hasPruritus);
                result.hasPostduralPunctureHeadache = boolHandler(item.observal.hasPostduralPunctureHeadache);
                result.hasBackPain = boolHandler(item.observal.hasBackPain);
                result.hasParesthesia = boolHandler(item.observal.hasParesthesia);
                result.patientSatisfactionScore = numHandler(item.observal.patientSatisfactionScore !== null ?
                    item.observal.patientSatisfactionScore * 10 : '');
                result.bloodLose = numHandler(item.observal.bloodLose);
                result.foetalWeight = numHandler(item.observal.foetalWeight);
                result.foetalHeight = numHandler(item.observal.foetalHeight);
                result.foetalGender = numHandler(item.observal.foetalGender);
                result.oneMinuteApgarScore = numHandler(item.observal.oneMinuteApgarScore);
                result.fiveMinuteApgarScore = numHandler(item.observal.fiveMinuteApgarScore);
                result.hasNicu = boolHandler(item.observal.hasNicu);
                result.nicuReason = item.observal.nicuReason;
                result.arterialPh = numHandler(item.observal.arterialPh);
                result.arterialBe = numHandler(item.observal.arterialBe);
                result.venousPh = numHandler(item.observal.venousPh);
                result.venousBe = numHandler(item.observal.venousBe);
                item.observal.description && result.desc.push(item.observal.description);
            }

            result.desc = result.desc.join('，');

            return header.map(item => result[item.key] || null);

        });

    excelData.unshift(header.map(item => item.name));

    return excelData;

};

async function getExportMeanVAS(data) {

    data = data || await PatientDao.getFullPatients();

    const header = [
            {name: '组别', key: 'groupName'},
            {name: '姓名', key: 'name'},
            {name: '住院号', key: 'id'},
            {name: '0min时VAS评分', key: 'vasIn0'},
            {name: '2min时VAS评分', key: 'vasIn2'},
            {name: '4min时VAS评分', key: 'vasIn4'},
            {name: '6min时VAS评分', key: 'vasIn6'},
            {name: '8min时VAS评分', key: 'vasIn8'},
            {name: '10min时VAS评分', key: 'vasIn10'},
            {name: '12min时VAS评分', key: 'vasIn12'},
            {name: '14min时VAS评分', key: 'vasIn14'},
            {name: '16min时VAS评分', key: 'vasIn16'},
            {name: '18min时VAS评分', key: 'vasIn18'},
            {name: '20min时VAS评分', key: 'vasIn20'},
            {name: '30min时VAS评分', key: 'vasIn30'}
        ],

        excelData = data.filter(item => item.status).map(item => {

            const result = {
                groupName: item.group ? item.group.name : '',
                name: item.name,
                id: item.id
            };

            if (item.analgesia) {

                const analgesiaData = AC.fullFillAnalgesiaData(item.analgesia);

                result.vasIn0 = numHandler(AC.getVasScore(analgesiaData, 0));
                result.vasIn2 = numHandler(AC.getVasScore(analgesiaData, 2));
                result.vasIn4 = numHandler(AC.getVasScore(analgesiaData, 4));
                result.vasIn6 = numHandler(AC.getVasScore(analgesiaData, 6));
                result.vasIn8 = numHandler(AC.getVasScore(analgesiaData, 8));
                result.vasIn10 = numHandler(AC.getVasScore(analgesiaData, 10));
                result.vasIn12 = numHandler(AC.getVasScore(analgesiaData, 12));
                result.vasIn14 = numHandler(AC.getVasScore(analgesiaData, 14));
                result.vasIn16 = numHandler(AC.getVasScore(analgesiaData, 16));
                result.vasIn18 = numHandler(AC.getVasScore(analgesiaData, 18));
                result.vasIn20 = numHandler(AC.getVasScore(analgesiaData, 20));
                result.vasIn30 = numHandler(AC.getVasScore(analgesiaData, 30));

            }

            return header.map(item => result[item.key] || null);

        });

    excelData.unshift(header.map(item => item.name));

    return excelData;

};

async function getExportMeanVASWithContraction(data) {

    data = data || await PatientDao.getFullPatients();

    const header = [
            {name: '组别', key: 'groupName'},
            {name: '姓名', key: 'name'},
            {name: '住院号', key: 'id'},
            {name: '0min时有宫缩的VAS评分', key: 'vasIn0'},
            {name: '2min时有宫缩的VAS评分', key: 'vasIn2'},
            {name: '4min时有宫缩的VAS评分', key: 'vasIn4'},
            {name: '6min时有宫缩的VAS评分', key: 'vasIn6'},
            {name: '8min时有宫缩的VAS评分', key: 'vasIn8'},
            {name: '10min时有宫缩的VAS评分', key: 'vasIn10'},
            {name: '12min时有宫缩的VAS评分', key: 'vasIn12'},
            {name: '14min时有宫缩的VAS评分', key: 'vasIn14'},
            {name: '16min时有宫缩的VAS评分', key: 'vasIn16'},
            {name: '18min时有宫缩的VAS评分', key: 'vasIn18'},
            {name: '20min时有宫缩的VAS评分', key: 'vasIn20'},
            {name: '30min时有宫缩的VAS评分', key: 'vasIn30'}
        ],

        excelData = data.filter(item => item.status).map(item => {

            const result = {
                groupName: item.group ? item.group.name : '',
                name: item.name,
                id: item.id
            };

            if (item.analgesia) {

                const analgesiaData = AC.fullFillAnalgesiaData(item.analgesia);

                result.vasIn0 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 0));
                result.vasIn2 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 2));
                result.vasIn4 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 4));
                result.vasIn6 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 6));
                result.vasIn8 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 8));
                result.vasIn10 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 10));
                result.vasIn12 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 12));
                result.vasIn14 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 14));
                result.vasIn16 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 16));
                result.vasIn18 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 18));
                result.vasIn20 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 20));
                result.vasIn30 = numHandler(AC.getVasScoreWithContraction(analgesiaData, 30));

            }

            return header.map(item => result[item.key] || null);

        });

    excelData.unshift(header.map(item => item.name));

    return excelData;

};

async function getExportLaterMeanVAS(data) {

    data = data || await PatientDao.getFullPatients();

    const header = [
            {name: '组别', key: 'groupName'},
            {name: '姓名', key: 'name'},
            {name: '住院号', key: 'id'},
            {name: '30min时VAS评分', key: 'vasIn30'},
            {name: '2h时VAS评分', key: 'vasIn120'},
            {name: '3.5h时VAS评分', key: 'vasIn210'},
            {name: '5h时VAS评分', key: 'vasIn300'}
        ],

        excelData = data.filter(item => item.status).map(item => {

            const result = {
                groupName: item.group ? item.group.name : '',
                name: item.name,
                id: item.id
            };

            if (item.analgesia) {

                const analgesiaData = AC.fullFillAnalgesiaData(item.analgesia);

                result.vasIn30 = numHandler(AC.getVasScore(analgesiaData, 30));
                result.vasIn120 = numHandler(AC.getVasScore(analgesiaData, 120));
                result.vasIn210 = numHandler(AC.getVasScore(analgesiaData, 210));
                result.vasIn300 = numHandler(AC.getVasScore(analgesiaData, 300));

            }

            return header.map(item => result[item.key] || null);

        });

    excelData.unshift(header.map(item => item.name));

    return excelData;

};

async function getExportData(data, sensoryBlocks) {

    data = data || await PatientDao.getFullPatients();
    sensoryBlocks = sensoryBlocks || await SensoryBlockDao.getSensoryBlocks();

    return {
        dpeData: await getExportDPEData(data, sensoryBlocks),
        meanVASData: await getExportMeanVAS(data),
        meanVASWithContractionData: await getExportMeanVASWithContraction(data),
        laterMeanVASData: await getExportLaterMeanVAS(data)
    };

};

export default {
    getExportDPEData,
    getExportMeanVAS,
    getExportMeanVASWithContraction,
    getExportData
};

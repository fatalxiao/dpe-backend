create table observal_data
(
  id                                         int auto_increment
    primary key,
  patient_id                                 varchar(10)            null
  comment '孕妇住院号',
  initial_time                               datetime               null
  comment '麻醉开始时间',
  test_dose                                  int                    null
  comment '试验剂量(ml)',
  initial_dose                               int                    null
  comment '负荷剂量(ml)',
  pump_consumption                           int                    null
  comment '泵消耗(ml)',
  bolus                                      int                    null
  comment '人工负荷量(ml)',
  has_carbetocin                             tinyint(1) default '0' null
  comment '是否使用巧特欣',
  has_hemabate                               tinyint(1) default '0' null
  comment '是否使用欣母沛',
  pca_count                                  int                    null
  comment 'PCA次数',
  manual_bolus_count                         int                    null
  comment '人工硬膜外追加次数',
  first_pca_time                             datetime               null
  comment '首次PCA时间',
  duration_of_first_stage_of_labor           int                    null
  comment '第一产程时长',
  duration_of_second_stage_of_labor          int                    null
  comment '第二产程时长',
  blood_lose                                 int                    null
  comment '总出血量',
  has_epidural_catheter_adjuestment          tinyint(1) default '0' null
  comment '是否有硬膜外导管调整',
  has_epidural_catheter_replacement          tinyint(1) default '0' null
  comment '是否有硬膜外导管重置',
  has_prenatal_fever                         tinyint(1) default '0' null
  comment '是否有产前发热',
  prenatal_fever_temperature                 float                  null
  comment '产前发热体温',
  has_vasoactive_agent                       tinyint(1) default '0' null
  comment '是否使用血管活性药物',
  is_unabled_to_puncture_dura                tinyint(1) default '0' null
  comment '是否穿刺未见脑脊液',
  first_manual_bolus_time                    datetime               null
  comment '首次人工硬膜外追加时间',
  has_nausea                                 tinyint(1) default '0' null
  comment '是否有恶心',
  has_vomit                                  tinyint(1) default '0' null
  comment '是否有呕吐',
  has_pruritus                               tinyint(1) default '0' null
  comment '是否有瘙痒',
  has_hypotension                            tinyint(1) default '0' null
  comment '是否有血压过低',
  has_caesarean_section                      tinyint(1) default '0' null
  comment '是否有剖宫产',
  has_instrumental                           tinyint(1) default '0' null
  comment '是否有器械助产',
  has_postdural_puncture_headache            tinyint(1) default '0' null
  comment '是否有硬脊膜穿破后头痛',
  has_back_pain                              tinyint(1) default '0' null
  comment '是否有背痛',
  has_paresthesia                            tinyint(1) default '0' null
  comment '是否有感觉异常',
  is_iv_epidural_catheter_insertion          tinyint(1) default '0' null
  comment '硬膜外导管是否入血管',
  is_intrathecal_epidural_catheter_insertion tinyint(1)             null
  comment '是否蛛网膜下腔置管',
  patient_satisfaction_score                 float                  null
  comment '孕妇满意度',
  has_accidental_dural_punture               tinyint(1) default '0' null
  comment '是否有意外硬脊膜穿破',
  lateral_episiotomy_vas_score               int                    null
  comment '侧切时VAS评分',
  has_lateral_episiotomy                     tinyint(1) default '0' null
  comment '是否有侧切',
  birth_time                                 datetime               null
  comment '分娩时间',
  foetal_gender                              int                    null
  comment '新生儿性别，1：男，2：女',
  foetal_height                              int                    null
  comment '胎儿身长',
  foetal_weight                              int                    null
  comment '胎儿体重',
  one_minute_apgar_score                     int                    null
  comment '1分钟APGAR评分',
  five_minute_apgar_score                    int                    null
  comment '5分钟APGAR评分',
  has_nicu                                   tinyint(1) default '0' null
  comment '是否去NICU',
  nicu_reason                                varchar(255)           null
  comment '去NICU的原因',
  arterial_ph                                float                  null
  comment '动脉PH值',
  arterial_be                                float                  null
  comment '动脉BE值',
  venous_ph                                  float                  null
  comment '静脉PH值',
  venous_be                                  float                  null
  comment '静脉BE值',
  description                                varchar(1000)          null
  comment '备注',
  ctime                                      datetime               null,
  utime                                      datetime               null,
  dtime                                      datetime               null,
  constraint observal_data_id_uindex
  unique (id)
)
  comment '观察数据';


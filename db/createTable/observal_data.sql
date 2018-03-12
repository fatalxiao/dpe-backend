CREATE TABLE observal_data
(
  id                                         INT AUTO_INCREMENT
    PRIMARY KEY,
  patient_id                                 VARCHAR(10)            NULL
  COMMENT '孕妇住院号',
  initial_time                               DATETIME               NULL
  COMMENT '麻醉开始时间',
  test_dose                                  INT                    NULL
  COMMENT '试验剂量(ml)',
  initial_dose                               INT                    NULL
  COMMENT '负荷剂量(ml)',
  pump_consumption                           INT                    NULL
  COMMENT '泵消耗(ml)',
  bolus                                      INT                    NULL
  COMMENT '人工负荷量(ml)',
  has_carbetocin                             TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否使用巧特欣',
  has_hemabate                               TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否使用欣母沛',
  pca_count                                  INT                    NULL
  COMMENT 'PCA次数',
  manual_bolus_count                         INT                    NULL
  COMMENT '人工硬膜外追加次数',
  first_pca_time                             DATETIME               NULL
  COMMENT '首次PCA时间',
  duration_of_first_stage_of_labor           INT                    NULL
  COMMENT '第一产程时长',
  duration_of_second_stage_of_labor          INT                    NULL
  COMMENT '第二产程时长',
  blood_lose                                 INT                    NULL
  COMMENT '总出血量',
  has_epidural_catheter_adjuestment          TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有硬膜外导管调整',
  has_epidural_catheter_replacement          TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有硬膜外导管重置',
  has_prenatal_fever                         TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有产前发热',
  has_vasoactive_agent                       TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否使用血管活性药物',
  is_unabled_to_puncture_dura                TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否穿刺未见脑脊液',
  first_manual_bolus_time                    DATETIME               NULL
  COMMENT '首次人工硬膜外追加时间',
  has_nausea                                 TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有恶心',
  has_vomit                                  TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有呕吐',
  has_pruritus                               TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有瘙痒',
  has_hypotension                            TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有血压过低',
  has_caesarean_section                      TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有剖宫产',
  has_instrumental                           TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有器械助产',
  has_postdural_puncture_headache            TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有硬脊膜穿破后头痛',
  has_back_pain                              TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有背痛',
  has_paresthesia                            TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有感觉异常',
  is_iv_epidural_catheter_insertion          TINYINT(1) DEFAULT '0' NULL
  COMMENT '硬膜外导管是否入血管',
  is_intrathecal_epidural_catheter_insertion TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否蛛网膜下腔置管',
  patient_satisfaction_score                 INT                    NULL
  COMMENT '孕妇满意度',
  has_accidental_dural_punture               TINYINT(1)             NULL
  COMMENT '是否有意外硬脊膜穿破',
  lateral_episiotomy_vas_score               INT                    NULL
  COMMENT '侧切时VAS评分',
  has_lateral_episiotomy                     TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有侧切',
  birth_time                                 DATETIME               NULL
  COMMENT '分娩时间',
  foetal_gender                              INT                    NULL
  COMMENT '新生儿性别，1：男，2：女',
  foetal_height                              INT                    NULL
  COMMENT '胎儿身长',
  foetal_weight                              INT                    NULL
  COMMENT '胎儿体重',
  one_minute_apgar_score                     INT                    NULL
  COMMENT '1分钟APGAR评分',
  five_minute_apgar_score                    INT                    NULL
  COMMENT '5分钟APGAR评分',
  has_nicu                                   TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否去NICU',
  nicu_reason                                VARCHAR(255)           NULL
  COMMENT '去NICU的原因',
  arterial_ph                                FLOAT                  NULL
  COMMENT '动脉PH值',
  arterial_be                                FLOAT                  NULL
  COMMENT '动脉BE值',
  venous_ph                                  FLOAT                  NULL
  COMMENT '静脉PH值',
  venous_be                                  FLOAT                  NULL
  COMMENT '静脉BE值',
  description                                VARCHAR(1000)          NULL
  COMMENT '备注',
  ctime                                      DATETIME               NULL,
  utime                                      DATETIME               NULL,
  dtime                                      DATETIME               NULL,
  CONSTRAINT observal_data_id_uindex
  UNIQUE (id)
)
  COMMENT '观察数据'
  ENGINE = InnoDB
  CHARSET = utf8;
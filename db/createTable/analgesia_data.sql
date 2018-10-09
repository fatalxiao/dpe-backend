CREATE TABLE analgesia_data
(
  id                                 INT AUTO_INCREMENT
    PRIMARY KEY,
  patient_id                         VARCHAR(10)            NULL
  COMMENT '孕妇住院号',
  time_point                         INT                    NULL
  COMMENT '时间点',
  has_contraction                    TINYINT(1) DEFAULT '0' NULL
  COMMENT '是否有宫缩',
  vas_score                          FLOAT                  NULL
  COMMENT 'VAS评分',
  thoracic_sensory_block_left_value  INT                    NULL
  COMMENT '左侧最高阻滞平面',
  thoracic_sensory_block_right_value INT                    NULL
  COMMENT '左侧最高阻滞平面',
  sacral_sensory_block_left_value    INT                    NULL
  COMMENT '左侧最低阻滞平面',
  sacral_sensory_block_right_value   INT                    NULL
  COMMENT '左侧最低阻滞平面',
  bromage_score                      INT                    NULL
  COMMENT 'Bromage评分',
  systolic_blood_pressure            INT                    NULL
  COMMENT '收缩压',
  diastolic_blood_pressure           INT                    NULL
  COMMENT '舒张压',
  heart_rate                         INT                    NULL
  COMMENT '心率',
  pulse_oxygen_saturation            FLOAT                  NULL
  COMMENT '脉动血氧饱和度',
  fetal_heart_rate                   INT                    NULL
  COMMENT '胎心率',
  ctime                              DATETIME               NULL,
  utime                              DATETIME               NULL,
  dtime                              DATETIME               NULL,
  CONSTRAINT analgesia_data_id_uindex
  UNIQUE (id)
)
  COMMENT '麻醉数据'
  ENGINE = InnoDB
  CHARSET = utf8;
CREATE TABLE patients
(
  id                              VARCHAR(10)     NOT NULL
  COMMENT '住院号'
    PRIMARY KEY,
  group_id                        INT             NULL
  COMMENT '组别',
  name                            VARCHAR(30)     NULL
  COMMENT '姓名',
  age                             INT             NULL
  COMMENT '年龄',
  gestational_days                INT             NULL
  COMMENT '怀孕天数',
  height                          FLOAT           NULL
  COMMENT '身高',
  weight                          FLOAT           NULL
  COMMENT '体重',
  initial_vas_score               INT             NULL
  COMMENT '镇痛前VAS评分',
  heart_rate                      INT             NULL
  COMMENT '心率',
  systolic_blood_pressure         INT             NULL
  COMMENT '收缩压',
  diastolic_blood_pressure        INT             NULL
  COMMENT '舒张压',
  fetal_heart_rate                INT             NULL
  COMMENT '胎心率',
  pulse_oxygen_saturation         FLOAT           NULL
  COMMENT '氧饱和度',
  cervical_dilation_at_time_of_ea INT             NULL
  COMMENT '镇痛前宫口',
  has_oxytocin_at_time_of_ea      TINYINT(1)      NULL
  COMMENT '镇痛前是否使用催产素',
  description                     VARCHAR(1000)   NULL
  COMMENT '备注',
  status                          INT DEFAULT '1' NULL
  COMMENT '状态，1：启用，0：禁用',
  utime                           DATETIME        NULL,
  dtime                           DATETIME        NULL,
  ctime                           DATETIME        NULL,
  CONSTRAINT patient_id_uindex
  UNIQUE (id)
)
  COMMENT '孕妇'
  ENGINE = InnoDB
  CHARSET = utf8;
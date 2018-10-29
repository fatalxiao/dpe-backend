create table patients
(
  id                              varchar(10)            not null
  comment '住院号',
  group_id                        int                    null
  comment '组别',
  name                            varchar(30)            null
  comment '姓名',
  age                             int                    null
  comment '年龄',
  gestational_days                int                    null
  comment '怀孕天数',
  height                          float                  null
  comment '身高',
  weight                          float                  null
  comment '体重',
  initial_vas_score               int                    null
  comment '镇痛前VAS评分',
  heart_rate                      int                    null
  comment '心率',
  systolic_blood_pressure         int                    null
  comment '收缩压',
  diastolic_blood_pressure        int                    null
  comment '舒张压',
  fetal_heart_rate                int                    null
  comment '胎心率',
  pulse_oxygen_saturation         float                  null
  comment '氧饱和度',
  cervical_dilation_at_time_of_ea int                    null
  comment '镇痛前宫口',
  has_oxytocin_at_time_of_ea      tinyint(1) default '0' null
  comment '镇痛前是否使用催产素',
  has_induction                   tinyint(1) default '0' null
  comment '是否引产',
  description                     varchar(1000)          null
  comment '备注',
  status                          int default '1'        null
  comment '状态，1：启用，0：禁用',
  utime                           datetime               null,
  dtime                           datetime               null,
  ctime                           datetime               null,
  constraint patient_id_uindex
  unique (id)
)
  comment '孕妇'
  charset = utf8;

alter table patients
  add primary key (id);


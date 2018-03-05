CREATE TABLE dpe_group
(
  id   INT AUTO_INCREMENT
    PRIMARY KEY,
  name VARCHAR(20) NULL
  COMMENT '组名',
  CONSTRAINT group_id_uindex
  UNIQUE (id)
)
  COMMENT '分组'
  ENGINE = InnoDB
  CHARSET = utf8;
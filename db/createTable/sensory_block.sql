CREATE TABLE sensory_block
(
  id                  INT AUTO_INCREMENT
    PRIMARY KEY,
  sensory_block_name  VARCHAR(20) NULL,
  sensory_block_value INT         NULL,
  CONSTRAINT sensory_block_id_uindex
  UNIQUE (id)
)
  COMMENT '阻滞平面'
  ENGINE = InnoDB
  CHARSET = utf8;
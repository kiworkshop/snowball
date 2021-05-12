ALTER TABLE user convert to charset utf8;
ALTER TABLE stock_detail convert to charset euckr;
ALTER TABLE stock_transaction convert to charset utf8;
ALTER TABLE note convert to charset utf8;

INSERT INTO user (id, email, name, picture_url, created_date, modified_date, role) VALUES (1, 'test-user@snowball.com', '눈사람', '', now(), now(), 'USER');

LOAD DATA LOCAL INFILE '/home/ec2-user/snowball/build/resources/main/KOSPI.csv' REPLACE INTO TABLE `snowball_project`.`stock_detail` COLUMNS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES
(COMPANY_NAME, ITEM_CODE, CATEGORY, MAIN_PRODUCT, LISTING_DATE, SETTLEMENT_MONTH, REPRESENTATIVE);
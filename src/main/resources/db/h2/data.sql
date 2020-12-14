INSERT INTO user (id, email, name, picture_url, created_date, modified_date, role) VALUES (1, 'test-user@snowball.com', '눈사람', '', now(), now(), 'USER');

INSERT INTO STOCK_DETAIL (CREATED_DATE, MODIFIED_DATE, CATEGORY, COMPANY_NAME, ITEM_CODE, LISTING_DATE, MAIN_PRODUCT, REPRESENTATIVE, SETTLEMENT_MONTH, MARKET_TYPE)
SELECT now(), now(), 업종, 회사명, 종목코드, 상장일, 주요제품, 대표자명, 결산월, 'KOSPI'
FROM CSVREAD('/home/ec2-user/snowball/build/resources/main/KOSPI.csv');

INSERT INTO STOCK_DETAIL (CREATED_DATE, MODIFIED_DATE, CATEGORY, COMPANY_NAME, ITEM_CODE, LISTING_DATE, MAIN_PRODUCT, REPRESENTATIVE, SETTLEMENT_MONTH, MARKET_TYPE)
SELECT now(), now(), 업종, 회사명, 종목코드, 상장일, 주요제품, 대표자명, 결산월, 'KOSDAQ'
FROM CSVREAD('/home/ec2-user/snowball/build/resources/main/KOSDAQ.csv');
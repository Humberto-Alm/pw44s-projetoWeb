--import.sql
insert into tb_category (name) values ('Informática');
insert into tb_category (name) values ('UD');
insert into tb_category (name) values ('Cozinha');
insert into tb_category (name) values ('Móveis');
insert into tb_category (name) values ('Eletrônico');

insert into tb_product (name, description, price, category_id, url_image) values ('Refrigerador 429L','Refrigerador 429L Branco, duplex....',1990.0,2, 'https://a-static.mlcdn.com.br/800x560/geladeira-refrigerador-brastemp-frost-free-duplex-429l-c-dispenser-de-agua-e-lata-smart-bar-ative/magazineluiza/010089201/ce158b07a7e58fcb99df202f6ccf9950.jpg');
insert into tb_product (name, description, price, category_id, url_image) values ('Notebook Aorus 15.6','Notebook Arus 15.6 Core I7, 16Gb Ram...',2449.0,1, 'https://m.media-amazon.com/images/I/81JV0cb6AQL.jpg');
insert into tb_product (name, description, price, category_id, url_image) values ('Monitor 27pol','Monitor Gamer 27pol 144Hz, 1ms',1129.99,1, 'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/284662');
insert into tb_product (name, description, price, category_id, url_image) values ('Kit Teclado e Mouse','Kit com teclado ABNT e mouse com 5 botões',199.0,1, 'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/176467');
insert into tb_product (name, description, price, category_id, url_image) values ('Smartphone XYZ','Smatphone com tela de 9pol, 12GB....',9999.0,5, 'https://imgs.extra.com.br/55069649/1g.jpg');
insert into tb_product (name, description, price, category_id, url_image) values ('TV LCD 75pol','TV LCD 75pol, 5 HDMI...',7555.0,5, 'https://a-static.mlcdn.com.br/800x560/smart-tv-75-crystal-4k-samsung-75au7700-wi-fi-bluetooth-hdr-alexa-built-in-3-hdmi-1-usb/magazineluiza/193441700/1d93aaa240894a811d379db87cb9c853.jpg');
insert into tb_product (name, description, price, category_id, url_image) values ('Fogão 6 Bocas','Fogão 6 Bocas em aço inox, ...', 799.99,3, 'https://imgs.casasbahia.com.br/12731668/1xg.jpg');
insert into tb_product (name, description, price, category_id, url_image) values ('Roteador Wi-Fi 5.4GhZ','Roteador Wi-Fi 5.4GhZ, 6 antenas...',1299.0,1, 'https://s.alicdn.com/@sc04/kf/H52e9d2c5671e40f88a1a488fc7e91ab3l.png_300x300.jpg');

INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');/*123*/
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem'); /*123*/


INSERT INTO tb_address(user_id, city, logradouro, numero, bairro, complemento, cep) VALUES (1, 'Pato Branco', 'Rua Vicente Machado', 1230, 'Menino Deus', 'Condominio', '12345678');
INSERT INTO tb_address(user_id, city, logradouro, numero, bairro, complemento, cep) VALUES (2, 'São Lourenço do Oeste', 'Rua Rio de Janeiro', 85, 'Perpétuo Socorro', 'Casa com barracão', '89990000');
INSERT INTO tb_address(user_id, city, logradouro, numero, bairro, complemento, cep) VALUES (2, 'Pato Branco', 'Rua Taubaté', 231, 'São Roque', 'Apartamento', '87654321');

INSERT INTO tb_order(data, user_id, address_id) VALUES ('2025-08-23T10:35:22', 1, 2);
INSERT INTO tb_order(data, user_id, address_id) VALUES ('2025-09-24T13:55:03', 2, 3);

INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (1, 2, 5, 2449.0);
INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (1, 4, 2, 199.0);
INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (2, 1, 1, 1990.0);
INSERT INTO tb_order_itens(order_id, product_id, quantity, unit_price) VALUES (2, 8, 2, 1299.0);




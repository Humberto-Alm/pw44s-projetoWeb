-- 1. CATEGORIAS
INSERT INTO tb_category (id, name) VALUES (1, 'Guerra');
INSERT INTO tb_category (id, name) VALUES (2, 'Estratégia');
INSERT INTO tb_category (id, name) VALUES (3, 'Cooperativo');
INSERT INTO tb_category (id, name) VALUES (4, 'Cartas');
INSERT INTO tb_category (id, name) VALUES (5, 'Clássicos');

-- 2. PRODUTOS (Caminhos atualizados para /mage/ e nomes corrigidos)

-- ID 1: Catan
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (1, 'Catan', 249.90, '/mage/catanprincipal.jpg', 'Em até 12x sem juros',
     'Descubra tudo sobre o jogo Catan...', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (1, 'Marca: KOSMOS'), (1, 'Material: Papelão'), (1, 'Tema: Fantasia Medieval'), (1, 'Gênero: Estratégia'), (1, 'Jogadores: 3-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (1, '/mage/catan2.png'), (1, '/mage/catan3.webp'), (1, '/mage/catan4.webp');

-- ID 2: Azul
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (2, 'Azul', 399.90, '/mage/azulprincipal.jpg', 'Em até 10x sem juros',
     'Azul é um jogo premiado...', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (2, 'Marca: Next Move Games'), (2, 'Material: Papelão'), (2, 'Tema: Azulejos e Decoração'), (2, 'Gênero: Estratégia Familiar'), (2, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (2, '/mage/azul2.jpeg'), (2, '/mage/azul3.jpg'), (2, '/mage/azul4.jpg');

-- ID 3: Bohnanza
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (3, 'Bohnanza', 211.99, '/mage/bohnanzaprincipal.png', 'Em até 10x sem juros',
     'Bohnanza é um jogo divertido de negociação...', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (3, 'Marca: Amigo Spiele'), (3, 'Material: Papelão'), (3, 'Tema: Plantação de Feijão'), (3, 'Gênero: Estratégia'), (3, 'Jogadores: 3-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (3, '/mage/bohnanza2.webp'), (3, '/mage/bohnanza3.webp'), (3, '/mage/bohnanza4.avif');

-- ID 4: Certo ou Errado
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (4, 'Certo ou Errado', 150.90, '/mage/certoouerradoprincipal.webp', 'Em até 10x sem juros',
     'Certo ou Errado é um jogo rápido...', 4);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (4, 'Marca: Brain Games'), (4, 'Material: Cartas'), (4, 'Tema: Quiz e Conhecimento'), (4, 'Gênero: Party Game'), (4, 'Jogadores: 2-8');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (4, '/mage/certoouerrao2.webp'), (4, '/mage/certoouerrado3.jpg'), (4, '/mage/certoouerrado4.jpg');

-- ID 5: CuBirds
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (5, 'CuBirds', 277.24, '/mage/cubirdsprincipal.jpg', 'Em até 10x sem juros',
     'CuBirds é um jogo encantador...', 4);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (5, 'Marca: XYZ Games'), (5, 'Material: Cartas e Peças'), (5, 'Tema: Aves e Estratégia'), (5, 'Gênero: Familiar'), (5, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (5, '/mage/cubirds2.JPG'), (5, '/mage/cubirds3.jpg'), (5, '/mage/cubirds4.jpg');

-- ID 6: Distilled
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (6, 'Distilled', 320.99, '/mage/distilledprincipal.webp', 'Em até 10x sem juros',
     'Distilled desafia os jogadores...', 2);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (6, 'Marca: ABC Entertainment'), (6, 'Material: Cartas'), (6, 'Tema: Produção de Bebidas'), (6, 'Gênero: Estratégia'), (6, 'Jogadores: 2-6');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (6, '/mage/distilled2.webp'), (6, '/mage/distilled3.jpg'), (6, '/mage/distilled4.jpg');

-- ID 7: Gatinho (Exploding Kittens)
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (7, 'Gatinho', 200.99, '/mage/gatinhoprincipal.jpg', 'Em até 10x sem juros',
     'Gatinho é um jogo divertido...', 3);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (7, 'Marca: Pet Games'), (7, 'Material: Cartas e Peças'), (7, 'Tema: Animais'), (7, 'Gênero: Familiar'), (7, 'Jogadores: 2-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (7, '/mage/gatinho2.jpg'), (7, '/mage/gatinho3.jpg'), (7, '/mage/gatinho4.webp');

-- ID 8: Pandemic
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (8, 'Pandemic', 415.70, '/mage/pandemicprincipal.jpg', 'Em até 10x sem juros',
     'Pandemic é um clássico jogo cooperativo...', 3);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (8, 'Marca: Z-Man Games'), (8, 'Material: Cartas e Peças'), (8, 'Tema: Cooperação e Epidemias'), (8, 'Gênero: Estratégia Cooperativa'), (8, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (8, '/mage/pandemic2.webp'), (8, '/mage/pandemic3.jpg'), (8, '/mage/pandemic4.jpg');

-- ID 9: Red7
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (9, 'Red7', 178.90, '/mage/red7principal.webp', 'Em até 10x sem juros',
     'Red7 é um jogo rápido e estratégico...', 4);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (9, 'Marca: Asmadi Games'), (9, 'Material: Cartas'), (9, 'Tema: Estratégia e Mudança de Regras'), (9, 'Gênero: Party Game'), (9, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (9, '/mage/red72.jpg'), (9, '/mage/red73.png'), (9, '/mage/red74.webp');

-- ID 10: Splendor
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (10, 'Splendor', 305.80, '/mage/splendorprincipal.jpg', 'Em até 10x sem juros',
     'Splendor é um jogo de estratégia...', 1);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (10, 'Marca: Space Cowboys'), (10, 'Material: Cartas e Peças'), (10, 'Tema: Comércio e Gemas'), (10, 'Gênero: Estratégia'), (10, 'Jogadores: 2-4');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (10, '/mage/splendor2.jpg'), (10, '/mage/splendor3.webp'), (10, '/mage/splendor4.webp');

-- ID 11: Terra Mistica
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (11, 'Terra Mistica', 860.90, '/mage/terramisticaprincipal.webp', 'Em até 10x sem juros',
     'Terra Mistica é um jogo de estratégia profunda...', 5);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (11, 'Marca: Feuerland Spiele'), (11, 'Material: Peças e Tabuleiro'), (11, 'Tema: Fantasia e Estratégia'), (11, 'Gênero: Estratégia Complexa'), (11, 'Jogadores: 2-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (11, '/mage/terramistica2.png'), (11, '/mage/terramistica3.jpg'), (11, '/mage/terramistica4.webp');

-- ID 12: Welcome
INSERT INTO tb_product (id, name, price, image, installment_info, description, category_id) VALUES
    (12, 'Welcome', 299.90, '/mage/welcomeprincipal.jpg', 'Em até 10x sem juros',
     'Welcome é um jogo leve e estratégico...', 1);

INSERT INTO product_specifications (product_id, specification) VALUES
                                                                   (12, 'Marca: Blue Orange Games'), (12, 'Material: Cartas'), (12, 'Tema: Construção e Planejamento'), (12, 'Gênero: Estratégia Familiar'), (12, 'Jogadores: 1-5');

INSERT INTO product_gallery (product_id, image_url) VALUES
                                                        (12, '/mage/welcome2.jpeg'), (12, '/mage/welcome3.jpeg'), (12, '/mage/welcome4.jpeg');
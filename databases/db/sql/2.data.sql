INSERT INTO "city" (name, post_code) VALUES
	('Зашків', 80375),
	('Вінниця', 21000),
	('Волинь', 43000),
	('Дніпропетровськ', 49000),
	('Донецьк', 83000),
	('Житомир', 10000),
	('Закарпаття', 88000),
	('Запоріжжя', 69000),
	('Івано-Франківськ', 76000),
	('Київ', 07000),
	('Кіровоград', 25000),
	('Луганськ', 91000),
	('Львів', 79000),
	('Миколаїв', 54000),
	('Одесса', 65000),
	('Полтава', 36000),
	('Рівне', 33000),
	('Сумми', 40000),
	('Тернопіль', 46000),
	('Харків', 61000),
	('Херсон', 73000),
	('Хмельницьк', 29000),
	('Черкаси', 18000),
	('Чернівці', 58000),
	('Чернігі', 14000)
;

INSERT INTO "customer" (first_name, last_name, address, phone_number, city_id) VALUES
	('Ярослав', 'Ничкало', 'Мармаша 135', '+380970067238', 1),
	('Віталій', 'Ничкало', 'Мармаша 135', '+380970154039', 1)
;

INSERT INTO "color" (name) VALUES
	('Прозорий'),
	('Червоний'),
	('Зелений'),
	('Синій'),
	('Коричневий')
;

INSERT INTO "material" (name) VALUES
	('Скло'),
	('Метал'),
	('Дерево')
;

INSERT INTO "door" (model, price, material_id, color_id) VALUES
	('Двері 1000', 999,  1, 1),
	('Двері 2000', 1999, 2, 2),
	('Двері 3000', 2999, 3, 4)
;

INSERT INTO "part" (name, price, material_id, color_id) VALUES
	('Вікно', 100, 1, 1),
	('Рама', 100, 2, 4)
;

INSERT INTO "role" (name) VALUES 
	('admin'),
	('manager')
;

INSERT INTO "user" (email, password, role_id) VALUES 
	('admin', 'admin', 1),
	('manager_1', 'manager', 2),
	('manager_2', 'manager', 2),
	('manager_3', 'manager', 2)
;


INSERT INTO "employee" (first_name, last_name) VALUES 
	('Баба', 'Згороду'),
	('Андрій', 'Бамбула')
;

INSERT INTO "order" (customer_id, door_id, employee_id, width, height, length, details, date_on, date_off) VALUES 
	(1, 1, 1, 1000, 1000, 1000, 'Тестове замовлення 1', now(), now()),
	(2, 3, 2, 2000, 2000, 2000, 'Тестове замовлення 2', now(), now())
;
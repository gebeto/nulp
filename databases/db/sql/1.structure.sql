CREATE TABLE "logs" (
	id SERIAL PRIMARY KEY, 
	message VARCHAR(128) NULL,
	date TIMESTAMP NOT NULL DEFAULT NOW()
) WITH (
	OIDS = FALSE
);


CREATE TABLE "customer" (
	id_customer SERIAL PRIMARY KEY, 
	first_name VARCHAR(50) NULL, 
	last_name VARCHAR(50) NULL, 
	address VARCHAR(50) NULL, 
	phone_number VARCHAR(50) NULL, 
	city_id INT NOT NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "order" (
	id_order SERIAL PRIMARY KEY, 
	customer_id INT NULL, 
	door_id INT NULL, 
	employee_id INT NULL, 
	width VARCHAR(50) NULL, 
	height VARCHAR(50) NULL, 
	length VARCHAR(50) NULL, 
	details VARCHAR(50) NULL, 
	date_on DATE NULL, 
	date_off DATE NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "door" (
	id_door SERIAL PRIMARY KEY, 
	model VARCHAR(50) NULL, 
	price INT NULL, 
	material_id INT NULL, 
	color_id INT NULL
) WITH (
	OIDS = FALSE
);


CREATE OR REPLACE VIEW "vCustomer" AS
 SELECT cus.id_customer,
	cus.first_name,
	cus.last_name,
	cus.phone_number,
	ord.door_id,
	ord.width,
	ord.height,
	ord.length
	 FROM "customer" cus
	 JOIN "order" ord ON cus.id_customer = ord.customer_id
	 JOIN "door" d ON d.id_door = ord.door_id
	WHERE d.price > 50;


CREATE TABLE "delivery" (
	id_delivery SERIAL PRIMARY KEY, 
	date TIMESTAMP NULL, 
	done BOOLEAN NULL, 
	order_id INT NOT NULL, 
	typedelivery_id INT NOT NULL
) WITH (
	OIDS = FALSE
);


CREATE OR REPLACE VIEW "vCustomersDelivery" AS
 SELECT cus.first_name,
	cus.last_name,
	cus.phone_number,
	cus.id_customer,
	ord.customer_id,
	de.date,
	de.done,
	de.order_id
	 FROM "customer" cus
	 JOIN "order" ord ON cus.id_customer = ord.customer_id
	 JOIN "delivery" de ON de.order_id = ord.id_order
	WHERE de.done = true;


CREATE TABLE "city" (
	id_city SERIAL PRIMARY KEY,
	name VARCHAR(50) NULL,
	post_code INT NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "color" (
	id_color SERIAL PRIMARY KEY, 
	name VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "delivery_type" (
	id_deliverytype SERIAL PRIMARY KEY, 
	type VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "door_part" (
	id_parts SERIAL PRIMARY KEY, 
	door_id INT NULL, 
	part_id INT NULL, 
	count INT NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "employee" (
	id_employee SERIAL PRIMARY KEY, 
	first_name VARCHAR(50) NULL, 
	last_name VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "material" (
	id_material SERIAL PRIMARY KEY, 
	name VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "part" (
	id_parts SERIAL PRIMARY KEY, 
	name VARCHAR(50) NULL, 
	price VARCHAR(50) NULL, 
	material_id INT NULL, 
	color_id INT NULL
) WITH (
	OIDS = FALSE
);


CREATE TABLE "role" (
	id SERIAL PRIMARY KEY, 
	name VARCHAR(50) NOT NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE "user" (
	id SERIAL PRIMARY KEY, 
	email VARCHAR(50) NOT NULL, 
	password VARCHAR(50) NOT NULL, 
	role_id INT NOT NULL
) WITH (
	OIDS = FALSE
);


ALTER TABLE "customer" ADD CONSTRAINT FK_Customer_City FOREIGN KEY(city_id) REFERENCES "city" (id_city) ON DELETE CASCADE;


ALTER TABLE "delivery" ADD CONSTRAINT FK_Delivery_Delivery_Type FOREIGN KEY(typedelivery_id) REFERENCES "delivery_type" (id_deliverytype) ON DELETE CASCADE;
ALTER TABLE "delivery" ADD CONSTRAINT FK_Delivery_Order FOREIGN KEY(order_id) REFERENCES "order" (id_order) ON DELETE CASCADE;

ALTER TABLE "door" ADD CONSTRAINT FK_Door_Color FOREIGN KEY(color_id) REFERENCES "color" (id_color) ON DELETE CASCADE;
ALTER TABLE "door" ADD CONSTRAINT FK_Door_Material FOREIGN KEY(material_id) REFERENCES "material" (id_material) ON DELETE CASCADE;
ALTER TABLE "door" ADD CONSTRAINT UQ_Door_Color_Material UNIQUE (color_id, material_id);

ALTER TABLE "door_part" ADD CONSTRAINT FK_Door_Parts_Door FOREIGN KEY(door_id) REFERENCES "door" (id_door) ON DELETE CASCADE;
ALTER TABLE "door_part" ADD CONSTRAINT FK_Door_Parts_Parts FOREIGN KEY(part_id) REFERENCES "part" (id_parts);
ALTER TABLE "door_part" ADD CONSTRAINT UQ_DoorPart_Door_Part UNIQUE (door_id, part_id);


ALTER TABLE "order" ADD CONSTRAINT FK_Order_Customer FOREIGN KEY(customer_id) REFERENCES "customer" (id_customer) ON DELETE CASCADE;
ALTER TABLE "order" ADD CONSTRAINT FK_Order_Door FOREIGN KEY(door_id) REFERENCES "door" (id_door) ON DELETE CASCADE;
ALTER TABLE "order" ADD CONSTRAINT FK_Order_Employee FOREIGN KEY(employee_id) REFERENCES "employee" (id_employee) ON DELETE CASCADE;

ALTER TABLE "part" ADD CONSTRAINT FK_Parts_Color FOREIGN KEY(color_id) REFERENCES "color" (id_color) ON DELETE CASCADE;
ALTER TABLE "part" ADD CONSTRAINT FK_Parts_Material FOREIGN KEY(material_id) REFERENCES "material" (id_material) ON DELETE CASCADE;

ALTER TABLE "role" ADD CONSTRAINT UQ_Role_Name UNIQUE (name);

ALTER TABLE "user" ADD CONSTRAINT FK_User_Role FOREIGN KEY(role_id) REFERENCES "role" (id) ON DELETE CASCADE;
ALTER TABLE "user" ADD CONSTRAINT UQ_User_Email UNIQUE (email);


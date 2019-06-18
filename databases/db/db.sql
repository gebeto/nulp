CREATE TABLE public.customer (
	id_customer SERIAL PRIMARY KEY, 
	cname VARCHAR(50) NULL, 
	surname VARCHAR(50) NULL, 
	addess VARCHAR(50) NULL, 
	phonenumber VARCHAR(50) NULL, 
	city_id INT NOT NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.order (
	id_order SERIAL PRIMARY KEY, 
	date_on DATE NULL, 
	customer_id INT NULL, 
	door_id INT NULL, 
	employee_id INT NULL, 
	width VARCHAR(50) NULL, 
	height VARCHAR(50) NULL, 
	length VARCHAR(50) NULL, 
	details VARCHAR(50) NULL, 
	dateof DATE NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.door (
	id_door SERIAL PRIMARY KEY, 
	model VARCHAR(50) NULL, 
	price INT NULL, 
	material_id INT NULL, 
	color_id INT NULL
) WITH (
	OIDS = FALSE
);



CREATE OR REPLACE VIEW public.vCustomer AS
 SELECT cus.id_customer,
	cus.cname,
	cus.surname,
	cus.phonenumber,
	ord.door_id,
	ord.width,
	ord.height,
	ord.length
	 FROM public.customer cus
	 JOIN public.order ord ON cus.id_customer = ord.customer_id
	 JOIN public.door d ON d.id_door = ord.door_id
	WHERE d.price > 50;



CREATE TABLE public.delivery (
	id_delivery SERIAL PRIMARY KEY, 
	date TIMESTAMP NULL, 
	done BOOLEAN NULL, 
	order_id INT NOT NULL, 
	typedelivery_id INT NOT NULL
) WITH (
	OIDS = FALSE
);



CREATE OR REPLACE VIEW public.vCustomersDelivery AS
 SELECT cus.cname,
	cus.surname,
	cus.phonenumber,
	cus.id_customer,
	ord.customer_id,
	de.date,
	de.done,
	de.order_id
	 FROM public.customer cus
	 JOIN public.order ord ON cus.id_customer = ord.customer_id
	 JOIN public.delivery de ON de.order_id = ord.id_order
	WHERE de.done = true;



CREATE TABLE public.city (
	id_city SERIAL PRIMARY KEY,
	cityname VARCHAR(50) NULL, 
	cityindex INT NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.color (
	id_color SERIAL PRIMARY KEY, 
	name VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.delivery_type (
	id_deliverytype SERIAL PRIMARY KEY, 
	type VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.door_part (
	id_parts SERIAL PRIMARY KEY, 
	door_id INT NULL, 
	part_id INT NULL, 
	count INT NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.employee (
	id_employee SERIAL PRIMARY KEY, 
	name VARCHAR(50) NULL, 
	surname VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.material (
	id_material SERIAL PRIMARY KEY, 
	name VARCHAR(50) NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.part (
	id_parts SERIAL PRIMARY KEY, 
	name VARCHAR(50) NULL, 
	price VARCHAR(50) NULL, 
	material_id INT NULL, 
	color_id INT NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.role (
	id SERIAL PRIMARY KEY, 
	name VARCHAR(50) NOT NULL
) WITH (
	OIDS = FALSE
);



CREATE TABLE public.user (
	id SERIAL PRIMARY KEY, 
	email VARCHAR(50) NOT NULL, 
	password VARCHAR(50) NOT NULL, 
	role_id INT NOT NULL
) WITH (
	OIDS = FALSE
);


ALTER TABLE public.customer ADD CONSTRAINT FK_Customer_City FOREIGN KEY(city_id) REFERENCES public.city (id_city) ON DELETE CASCADE;
ALTER TABLE public.delivery ADD CONSTRAINT FK_Delivery_Delivery_Type FOREIGN KEY(typedelivery_id) REFERENCES public.delivery_type (id_deliverytype) ON DELETE CASCADE;
ALTER TABLE public.delivery ADD CONSTRAINT FK_Delivery_Order FOREIGN KEY(order_id) REFERENCES public.order (id_order) ON DELETE CASCADE;
ALTER TABLE public.door ADD CONSTRAINT FK_Door_Color FOREIGN KEY(color_id) REFERENCES public.color (id_color) ON DELETE CASCADE;
ALTER TABLE public.door ADD CONSTRAINT FK_Door_Material FOREIGN KEY(material_id) REFERENCES public.material (id_material) ON DELETE CASCADE;
ALTER TABLE public.door_part ADD CONSTRAINT FK_Door_Parts_Door FOREIGN KEY(door_id) REFERENCES public.door (id_door) ON DELETE CASCADE;
ALTER TABLE public.door_part ADD CONSTRAINT FK_Door_Parts_Parts FOREIGN KEY(part_id) REFERENCES public.part (id_parts);
ALTER TABLE public.order ADD CONSTRAINT FK_Order_Customer FOREIGN KEY(customer_id) REFERENCES public.customer (id_customer) ON DELETE CASCADE;
ALTER TABLE public.order ADD CONSTRAINT FK_Order_Door FOREIGN KEY(door_id) REFERENCES public.door (id_door) ON DELETE CASCADE;
ALTER TABLE public.order ADD CONSTRAINT FK_Order_Employee FOREIGN KEY(employee_id) REFERENCES public.employee (id_employee) ON DELETE CASCADE;
ALTER TABLE public.part ADD CONSTRAINT FK_Parts_Color FOREIGN KEY(color_id) REFERENCES public.color (id_color) ON DELETE CASCADE;
ALTER TABLE public.part ADD CONSTRAINT FK_Parts_Material FOREIGN KEY(material_id) REFERENCES public.material (id_material) ON DELETE CASCADE;
ALTER TABLE public.user ADD CONSTRAINT FK_User_Role FOREIGN KEY(role_id) REFERENCES public.role (id) ON DELETE CASCADE;

USE [DBofDoors]
GO 


/****** Object: Table [dbo].[Customer] Script Date: 02.05.2018 13:30:14 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[customer] 
( 
	[id_customer] [INT] NOT NULL, 
	[cname] [NVARCHAR](50) NULL, 
	[surname] [NVARCHAR](50) NULL, 
	[addess] [NVARCHAR](50) NULL, 
	[phonenumber] [NVARCHAR](50) NULL, 
	[city_id] [INT] NOT NULL, 
	CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED ([id_customer] ASC) WITH ( pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on ) ON [PRIMARY]
) 
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Order_D] Script Date: 02.05.2018 13:30:15 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[order_d] 
(
	[id_order] [INT] NOT NULL, 
	[date_on] [DATE] NULL, 
	[customer_id] [INT] NULL, 
	[door_id] [INT] NULL, 
	[employee_id] [INT] NULL, 
	[width] [NVARCHAR](50) NULL, 
	[height] [NVARCHAR](50) NULL, 
	[length] [NVARCHAR](50) NULL, 
	[details] [NVARCHAR](50) NULL, 
	[dateof] [DATE] NULL, 
	CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED ( [id_order] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Door] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[door] 
(
	[id_door] [INT] NOT NULL, 
	[model] [NVARCHAR](50) NULL, 
	[price] [INT] NULL, 
	[material_id] [INT] NULL, 
	[color_id] [INT] NULL, 
	CONSTRAINT [PK_Door] PRIMARY KEY CLUSTERED ( [id_door] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: View [dbo].[vCustomer] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE VIEW [dbo].[vCustomer] AS 
SELECT cus.id_customer, 
       cus.cname, 
       cus.surname, 
       cus.phonenumber, 
       ord.door_id, 
       ord.width, 
       ord.height, 
       ord.length 
FROM   customer cus 
JOIN   order_d ord 
ON     cus.id_customer=ord.customer_id 
JOIN   door DO 
ON     do.id_door=ord.door_id 
WHERE  do.price > 50
GO 


/****** Object: Table [dbo].[Delivery] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[delivery] 
(
	[id_delivery] [INT] NOT NULL, 
	[data] [DATETIME] NULL, 
	[done] [BIT] NULL, 
	[order_id] [INT] NOT NULL, 
	[typedelivery_id] [INT] NOT NULL, 
	CONSTRAINT [PK_Delivery] PRIMARY KEY CLUSTERED ( [id_delivery] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: View [dbo].[vCustomersDelivery] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE VIEW [dbo].[vCustomersDelivery] AS 
	SELECT cus.cname, cus.surname, cus.phonenumber, cus.id_customer, ord.customer_id, de.data, de.done, de.order_id 
	FROM   customer cus 
	JOIN   order_d ord 
	ON     cus.id_customer = ord.customer_id 
	JOIN   delivery de 
	ON     de.order_id = ord.id_order 
	WHERE  done = 'true';
GO 


/****** Object: Table [dbo].[City] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[city] 
(
	[id_city] [INT] NOT NULL, 
	[cityname] [NVARCHAR](50) NULL, 
	[cityindex] [INT] NULL, 
	CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED ([id_city] ASC) WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Color] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[color] 
(
	[id_color] [INT] NOT NULL, 
	[name] [NVARCHAR](50) NULL, 
	CONSTRAINT [PK_Color] PRIMARY KEY CLUSTERED ( [id_color] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Delivery_Type] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[delivery_type] 
(
	[id_deliverytype] [INT] NOT NULL, 
	[type] [NVARCHAR](50) NULL, 
	CONSTRAINT [PK_Delivery_Type] PRIMARY KEY CLUSTERED ( [id_deliverytype] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Door_Parts] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[door_parts] 
(
	[id_parts] [INT] NOT NULL, 
	[door_id] [INT] NULL, 
	[part_id] [INT] NULL, 
	[count] [INT] NULL, 
	CONSTRAINT [PK_Door_Parts] PRIMARY KEY CLUSTERED ( [id_parts] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Employee] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[employee] 
(
	[id_employee] [INT] NOT NULL, 
	[name] [NVARCHAR](50) NULL, 
	[surname] [NVARCHAR](50) NULL, 
	CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ( [id_employee] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Material] Script Date: 02.05.2018 13:30:16 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[material] 
(
	[id_material] [INT] NOT NULL, 
	[name] [NVARCHAR](50) NULL, 
	CONSTRAINT [PK_Material] PRIMARY KEY CLUSTERED ( [id_material] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Parts] Script Date: 02.05.2018 13:30:17 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[parts] 
(
	[id_parts] [INT] NOT NULL, 
	[name] [NVARCHAR](50) NULL, 
	[price] [NVARCHAR](50) NULL, 
	[material_id] [INT] NULL, 
	[color_id] [INT] NULL, 
	CONSTRAINT [PK_Parts] PRIMARY KEY CLUSTERED ( [id_parts] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[Role] Script Date: 02.05.2018 13:30:17 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[role] 
(
	[id] [INT] IDENTITY(1,1) NOT NULL, 
	[name] [NVARCHAR](50) NOT NULL, 
	CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED ( [id] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]
GO


/****** Object: Table [dbo].[User] Script Date: 02.05.2018 13:30:17 ******/
SET ansi_nulls ON
GO
SET quoted_identifier ON
GO
CREATE TABLE [dbo].[user] 
(
	[id] [INT] IDENTITY(1,1) NOT NULL, 
	[email] [NVARCHAR](50) NOT NULL, 
	[password] [NVARCHAR](50) NOT NULL, 
	[roleid] [INT] NOT NULL, 
	CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ( [id] ASC )WITH (pad_index = OFF, statistics_norecompute = OFF, ignore_dup_key = OFF, allow_row_locks = on, allow_page_locks = on) ON [PRIMARY]
)
ON [PRIMARY]

GO
ALTER TABLE [dbo].[customer] WITH CHECK ADD CONSTRAINT [FK_Customer_City] FOREIGN KEY([city_id]) REFERENCES [dbo].[city] ([id_city]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[customer] CHECK CONSTRAINT [FK_Customer_City]
GO
ALTER TABLE [dbo].[delivery] WITH CHECK ADD CONSTRAINT [FK_Delivery_Delivery_Type] FOREIGN KEY([typedelivery_id]) REFERENCES [dbo].[delivery_type] ([id_deliverytype]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[delivery] CHECK CONSTRAINT [FK_Delivery_Delivery_Type]
GO
ALTER TABLE [dbo].[delivery] WITH CHECK ADD CONSTRAINT [FK_Delivery_Order] FOREIGN KEY([order_id]) REFERENCES [dbo].[order_d] ([id_order]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[delivery] CHECK CONSTRAINT [FK_Delivery_Order]
GO
ALTER TABLE [dbo].[door] WITH CHECK ADD CONSTRAINT [FK_Door_Color] FOREIGN KEY([color_id]) REFERENCES [dbo].[color] ([id_color]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[door] CHECK CONSTRAINT [FK_Door_Color]
GO
ALTER TABLE [dbo].[door] WITH CHECK ADD CONSTRAINT [FK_Door_Material] FOREIGN KEY([material_id]) REFERENCES [dbo].[material] ([id_material]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[door] CHECK CONSTRAINT [FK_Door_Material]
GO
ALTER TABLE [dbo].[door_parts] WITH CHECK ADD CONSTRAINT [FK_Door_Parts_Door] FOREIGN KEY([door_id]) REFERENCES [dbo].[door] ([id_door]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[door_parts] CHECK CONSTRAINT [FK_Door_Parts_Door]
GO
ALTER TABLE [dbo].[door_parts] WITH CHECK ADD CONSTRAINT [FK_Door_Parts_Parts] FOREIGN KEY([part_id]) REFERENCES [dbo].[parts] ([id_parts])
GO
ALTER TABLE [dbo].[door_parts] CHECK CONSTRAINT [FK_Door_Parts_Parts]
GO
ALTER TABLE [dbo].[order_d] WITH CHECK ADD CONSTRAINT [FK_Order_Customer] FOREIGN KEY([customer_id]) REFERENCES [dbo].[customer] ([id_customer]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order_d] CHECK CONSTRAINT [FK_Order_Customer]
GO
ALTER TABLE [dbo].[order_d] WITH CHECK ADD CONSTRAINT [FK_Order_Door] FOREIGN KEY([door_id]) REFERENCES [dbo].[door] ([id_door]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order_d] CHECK CONSTRAINT [FK_Order_Door]
GO
ALTER TABLE [dbo].[order_d] WITH CHECK ADD CONSTRAINT [FK_Order_Employee] FOREIGN KEY([employee_id]) REFERENCES [dbo].[employee] ([id_employee]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order_d] CHECK CONSTRAINT [FK_Order_Employee]
GO
ALTER TABLE [dbo].[parts] WITH CHECK ADD CONSTRAINT [FK_Parts_Color] FOREIGN KEY([color_id]) REFERENCES [dbo].[color] ([id_color]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[parts] CHECK CONSTRAINT [FK_Parts_Color]
GO
ALTER TABLE [dbo].[parts] WITH CHECK ADD CONSTRAINT [FK_Parts_Material] FOREIGN KEY([material_id]) REFERENCES [dbo].[material] ([id_material]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[parts] CHECK CONSTRAINT [FK_Parts_Material]
GO
ALTER TABLE [dbo].[user] WITH CHECK ADD CONSTRAINT [FK_User_Role] FOREIGN KEY([roleid]) REFERENCES [dbo].[role] ([id]) ON DELETE CASCADE
GO
ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_User_Role]
GO
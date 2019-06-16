USE [DBofDoors]
GO






/****** Object: Table [dbo].[Customer] Script Date: 02.05.2018 13:30:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[id_customer] [int] NOT NULL,
	[cname] [nvarchar](50) NULL,
	[surname] [nvarchar](50) NULL,
	[addess] [nvarchar](50) NULL,
	[phonenumber] [nvarchar](50) NULL,
	[city_id] [int] NOT NULL,
	CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED
	([id_customer] ASC)
		WITH
		(
			PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
			ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON
		) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Order_D] Script Date: 02.05.2018 13:30:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_D](
[id_order] [int] NOT NULL,
[date_on] [date] NULL,
[customer_id] [int] NULL,
[door_id] [int] NULL,
[employee_id] [int] NULL,
[width] [nvarchar](50) NULL,
[height] [nvarchar](50) NULL,
[length] [nvarchar](50) NULL,
[details] [nvarchar](50) NULL,
[dateof] [date] NULL,
CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED
(
[id_order] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Door] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Door](
[id_door] [int] NOT NULL,
[model] [nvarchar](50) NULL,
[price] [int] NULL,
[material_id] [int] NULL,
[color_id] [int] NULL,
CONSTRAINT [PK_Door] PRIMARY KEY CLUSTERED
(
[id_door] ASC

27
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: View [dbo].[vCustomer] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vCustomer]
AS
SELECT cus.id_customer, cus.cname, cus.surname, cus.phonenumber, ord.door_id, ord.width, ord.height, ord.length
FROM Customer cus
join Order_D ord
on cus.id_customer=ord.customer_id
join Door do
on do.id_door=ord.door_id
where do.price &gt; 50
GO






/****** Object: Table [dbo].[Delivery] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Delivery](
[id_delivery] [int] NOT NULL,
[data] [datetime] NULL,
[done] [bit] NULL,
[order_id] [int] NOT NULL,
[typedelivery_id] [int] NOT NULL,
CONSTRAINT [PK_Delivery] PRIMARY KEY CLUSTERED
(
[id_delivery] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: View [dbo].[vCustomersDelivery] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vCustomersDelivery]
AS
SELECT cus.cname, cus.surname, cus.phonenumber, cus.id_customer, ord.customer_id, de.data, de.done, de.order_id
FROM Customer cus
JOIN Order_D ord
ON cus.id_customer = ord.customer_id
JOIN Delivery de
ON de.order_id = ord.id_order
WHERE done = &#39;true&#39;
GO






/****** Object: Table [dbo].[City] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
[id_city] [int] NOT NULL,
[cityname] [nvarchar](50) NULL,
[cityindex] [int] NULL,
CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED ([id_city] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Color] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Color](
[id_color] [int] NOT NULL,
[name] [nvarchar](50) NULL,
CONSTRAINT [PK_Color] PRIMARY KEY CLUSTERED
(
[id_color] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Delivery_Type] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Delivery_Type](
[id_deliverytype] [int] NOT NULL,
[type] [nvarchar](50) NULL,
CONSTRAINT [PK_Delivery_Type] PRIMARY KEY CLUSTERED
(
[id_deliverytype] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Door_Parts] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Door_Parts](
[id_parts] [int] NOT NULL,
[door_id] [int] NULL,
[part_id] [int] NULL,
[count] [int] NULL,
CONSTRAINT [PK_Door_Parts] PRIMARY KEY CLUSTERED
(
[id_parts] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Employee] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
[id_employee] [int] NOT NULL,
[name] [nvarchar](50) NULL,
[surname] [nvarchar](50) NULL,
CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED
(

29

[id_employee] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Material] Script Date: 02.05.2018 13:30:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Material](
[id_material] [int] NOT NULL,
[name] [nvarchar](50) NULL,
CONSTRAINT [PK_Material] PRIMARY KEY CLUSTERED
(
[id_material] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Parts] Script Date: 02.05.2018 13:30:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parts](
[id_parts] [int] NOT NULL,
[name] [nvarchar](50) NULL,
[price] [nvarchar](50) NULL,
[material_id] [int] NULL,
[color_id] [int] NULL,
CONSTRAINT [PK_Parts] PRIMARY KEY CLUSTERED
(
[id_parts] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[Role] Script Date: 02.05.2018 13:30:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
[id] [int] IDENTITY(1,1) NOT NULL,
[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO






/****** Object: Table [dbo].[User] Script Date: 02.05.2018 13:30:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
[id] [int] IDENTITY(1,1) NOT NULL,
[Email] [nvarchar](50) NOT NULL,
[Password] [nvarchar](50) NOT NULL,
[RoleId] [int] NOT NULL,

30

CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Customer] WITH CHECK ADD CONSTRAINT [FK_Customer_City] FOREIGN
KEY([city_id])
REFERENCES [dbo].[City] ([id_city])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Customer] CHECK CONSTRAINT [FK_Customer_City]
GO
ALTER TABLE [dbo].[Delivery] WITH CHECK ADD CONSTRAINT [FK_Delivery_Delivery_Type] FOREIGN
KEY([typedelivery_id])
REFERENCES [dbo].[Delivery_Type] ([id_deliverytype])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Delivery] CHECK CONSTRAINT [FK_Delivery_Delivery_Type]
GO
ALTER TABLE [dbo].[Delivery] WITH CHECK ADD CONSTRAINT [FK_Delivery_Order] FOREIGN
KEY([order_id])
REFERENCES [dbo].[Order_D] ([id_order])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Delivery] CHECK CONSTRAINT [FK_Delivery_Order]
GO
ALTER TABLE [dbo].[Door] WITH CHECK ADD CONSTRAINT [FK_Door_Color] FOREIGN KEY([color_id])
REFERENCES [dbo].[Color] ([id_color])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Door] CHECK CONSTRAINT [FK_Door_Color]
GO
ALTER TABLE [dbo].[Door] WITH CHECK ADD CONSTRAINT [FK_Door_Material] FOREIGN
KEY([material_id])
REFERENCES [dbo].[Material] ([id_material])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Door] CHECK CONSTRAINT [FK_Door_Material]
GO
ALTER TABLE [dbo].[Door_Parts] WITH CHECK ADD CONSTRAINT [FK_Door_Parts_Door] FOREIGN
KEY([door_id])
REFERENCES [dbo].[Door] ([id_door])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Door_Parts] CHECK CONSTRAINT [FK_Door_Parts_Door]
GO
ALTER TABLE [dbo].[Door_Parts] WITH CHECK ADD CONSTRAINT [FK_Door_Parts_Parts] FOREIGN
KEY([part_id])
REFERENCES [dbo].[Parts] ([id_parts])
GO
ALTER TABLE [dbo].[Door_Parts] CHECK CONSTRAINT [FK_Door_Parts_Parts]
GO
ALTER TABLE [dbo].[Order_D] WITH CHECK ADD CONSTRAINT [FK_Order_Customer] FOREIGN
KEY([customer_id])
REFERENCES [dbo].[Customer] ([id_customer])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_D] CHECK CONSTRAINT [FK_Order_Customer]
GO
ALTER TABLE [dbo].[Order_D] WITH CHECK ADD CONSTRAINT [FK_Order_Door] FOREIGN
KEY([door_id])

31

REFERENCES [dbo].[Door] ([id_door])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_D] CHECK CONSTRAINT [FK_Order_Door]
GO
ALTER TABLE [dbo].[Order_D] WITH CHECK ADD CONSTRAINT [FK_Order_Employee] FOREIGN
KEY([employee_id])
REFERENCES [dbo].[Employee] ([id_employee])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_D] CHECK CONSTRAINT [FK_Order_Employee]
GO
ALTER TABLE [dbo].[Parts] WITH CHECK ADD CONSTRAINT [FK_Parts_Color] FOREIGN KEY([color_id])
REFERENCES [dbo].[Color] ([id_color])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Parts] CHECK CONSTRAINT [FK_Parts_Color]
GO
ALTER TABLE [dbo].[Parts] WITH CHECK ADD CONSTRAINT [FK_Parts_Material] FOREIGN
KEY([material_id])
REFERENCES [dbo].[Material] ([id_material])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Parts] CHECK CONSTRAINT [FK_Parts_Material]
GO
ALTER TABLE [dbo].[User] WITH CHECK ADD CONSTRAINT [FK_User_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO
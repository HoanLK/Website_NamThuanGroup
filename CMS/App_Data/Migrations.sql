CREATE DATABASE BDSHD
GO
USE BDSHD
GO
CREATE TABLE [AlbumImages]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Title]			NVARCHAR(250) NOT NULL,
	[Slug]			VARCHAR(250) NOT NULL,
	[Description]	NVARCHAR(MAX),
	[Image]			NVARCHAR(MAX),
	[Published]		BIT NOT NULL DEFAULT(1),
	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [ItemAlbumImages]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[AlbumId]		INT NOT NULL,
	[Title]			NVARCHAR(250) NOT NULL,
	[Description]	NVARCHAR(MAX),
	[Image]			NVARCHAR(MAX),
	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [Banners]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Title]			NVARCHAR(250) NOT NULL,
	[Description]	NVARCHAR(MAX),
	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [ImageBanners]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[BannerId]		INT NOT NULL,
	[Title]			NVARCHAR(250),
	[Description]	NVARCHAR(MAX),
	[Link]			NVARCHAR(MAX),
	[Image]			NVARCHAR(MAX),
	[Published]		BIT NOT NULL DEFAULT(1),
	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [CategoryPosts]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[ParentId]		INT,
	[Title]			NVARCHAR(250),
	[Slug]			VARCHAR(250) NOT NULL,
	[Description]	NVARCHAR(MAX),
	[Published]		BIT NOT NULL DEFAULT(1),
	[Image]			NVARCHAR(MAX),
	[Tags]			NVARCHAR(MAX),
	[ImageBanner]	NVARCHAR(MAX),
	[Note]			NVARCHAR(1024),

	[MetaDescription]	NVARCHAR(MAX),
	[MetaKewords]		NVARCHAR(250),
	[Author]			NVARCHAR(50),
	[Robots]			NVARCHAR(50),

	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [Posts]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[CategoryId]	INT,
	[Title]			NVARCHAR(250),
	[Slug]			VARCHAR(250) NOT NULL,
	[Content]		NVARCHAR(MAX),
	[Description]	NVARCHAR(MAX),
	[Published]		BIT NOT NULL DEFAULT(1),
	[Image]			NVARCHAR(MAX),
	[Tags]			NVARCHAR(MAX),
	[ImageBanner]	NVARCHAR(MAX),
	[Note]			NVARCHAR(1024),
	[MetaDescription]	NVARCHAR(MAX),
	[MetaKewords]		NVARCHAR(250),
	[Author]			NVARCHAR(50),
	[Robots]			NVARCHAR(50),
	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [CategoryProjects]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[ParentId]		INT,
	[Title]			NVARCHAR(250),
	[Slug]			VARCHAR(250) NOT NULL,
	[Description]	NVARCHAR(MAX),
	[Published]		BIT NOT NULL DEFAULT(1),
	[Image]			NVARCHAR(MAX),
	[Tags]			NVARCHAR(MAX),
	[ImageBanner]	NVARCHAR(MAX),
	[Note]			NVARCHAR(1024),

	[MetaDescription]	NVARCHAR(MAX),
	[MetaKewords]		NVARCHAR(250),
	[Author]			NVARCHAR(50),
	[Robots]			NVARCHAR(50),

	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [Projects]
(
	[Id]			INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[CategoryId]	INT,
	[Title]			NVARCHAR(250),
	[Slug]			VARCHAR(250) NOT NULL,
	[Content]		NVARCHAR(MAX),
	[TongQuan]		NVARCHAR(MAX),
	[MatBang]		NVARCHAR(MAX),
	[ChinhSach]		NVARCHAR(MAX),
	[BanGiao]		NVARCHAR(MAX),
	[Description]	NVARCHAR(MAX),
	[Published]		BIT NOT NULL DEFAULT(1),
	[Image]			NVARCHAR(MAX),
	[Tags]			NVARCHAR(MAX),
	[ImageBanner]	NVARCHAR(MAX),
	[Note]			NVARCHAR(1024),
	[MetaDescription]	NVARCHAR(MAX),
	[MetaKewords]		NVARCHAR(250),
	[Author]			NVARCHAR(50),
	[Robots]			NVARCHAR(50),
	[TimeCreated]	DateTime NOT NULL DEFAULT(GetDate()),
	[UserId]		NVARCHAR(128) NOT NULL
)
GO
CREATE TABLE [dbo].[InfoCompany]
(
	[Id]			INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[NameCompany]	NVARCHAR(250) NOT NULL,
	[Intro]			NVARCHAR(250),
	[Address]		NVARCHAR(1024),
	[Tel]			NVARCHAR(250),
	[Hotline]		NVARCHAR(250),
	[Fax]			NVARCHAR(250),
	[Email]			NVARCHAR(250),
	[MasoThue]		NVARCHAR(250),
	[Website]		NVARCHAR(1025),
	[Facebook]		NVARCHAR(1025),
	[Youtube]		NVARCHAR(1025),
	[Twitter]		NVARCHAR(1025),
	[GooglePlus]	NVARCHAR(1025),
	[Pinterest]		NVARCHAR(1025),
	[Map]			NVARCHAR(1025)
)
GO
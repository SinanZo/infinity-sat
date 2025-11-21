CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(100) NOT NULL,
	`nameAr` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(200) NOT NULL,
	`nameAr` varchar(200) NOT NULL,
	`descriptionEn` text,
	`descriptionAr` text,
	`price` int NOT NULL,
	`image` varchar(500),
	`categoryId` int,
	`featuresEn` text,
	`featuresAr` text,
	`featured` int NOT NULL DEFAULT 0,
	`active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `software` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleEn` varchar(200) NOT NULL,
	`titleAr` varchar(200) NOT NULL,
	`descriptionEn` text,
	`descriptionAr` text,
	`version` varchar(50),
	`releaseDate` timestamp,
	`fileType` enum('software','apk','loader','rom','channels') NOT NULL,
	`downloadUrl` varchar(500),
	`fileSize` varchar(50),
	`model` varchar(100),
	`image` varchar(500),
	`active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `software_id` PRIMARY KEY(`id`)
);

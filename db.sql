CREATE TABLE IF NOT EXISTS `number`
(
    `id` INT AUTO_INCREMENT NOT NULL,
    `number` VARCHAR (30) NOT NULL,
    `code` VARCHAR (20) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE(`number`)
);

CREATE TABLE IF NOT EXISTS `filter`
(
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `number` VARCHAR (30) NOT NULL,
    `filter` JSON NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `message`
(
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `from` VARCHAR (30) NOT NULL,
    `to` VARCHAR (30) NOT NULL,
    `body` TEXT NOT NULL,
    `date_sent` DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`id`)
);
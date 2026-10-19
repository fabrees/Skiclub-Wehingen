-- CreateTable
CREATE TABLE `Buchung` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `von` DATE NOT NULL,
    `bis` DATE NOT NULL,
    `status` ENUM('ANFRAGE', 'BESTAETIGT') NOT NULL DEFAULT 'ANFRAGE',
    `titel` VARCHAR(200) NOT NULL,
    `name` VARCHAR(200) NULL,
    `email` VARCHAR(200) NULL,
    `nachricht` TEXT NULL,
    `geblocktBis` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Buchung_von_bis_idx`(`von`, `bis`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Einstellung` (
    `schluessel` VARCHAR(100) NOT NULL,
    `wert` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`schluessel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


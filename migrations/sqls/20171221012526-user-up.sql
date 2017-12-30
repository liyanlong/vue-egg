/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS `users` (
   `id` BIGINT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
   `username` VARCHAR(255) NOT NULL,
   `login` VARCHAR(128) BINARY NOT NULL ,
   `password` VARCHAR(255) BINARY NOT NULL,
   `email` VARCHAR(128) BINARY NOT NULL,
   `role_id` INT(10) UNSIGNED DEFAULT NULL,
   `permissions` TEXT,
   `is_activated` TINYINT(1) NOT NULL DEFAULT '0',
   `activated_at` TIMESTAMP NULL DEFAULT NULL,
   `last_login` TIMESTAMP NULL DEFAULT NULL,   
   `created_at` TIMESTAMP NULL DEFAULT NULL,
   `updated_at` TIMESTAMP NULL DEFAULT NULL,
   `is_admin` TINYINT(1) NOT NULL DEFAULT '0',
   PRIMARY KEY (`id`),
   UNIQUE KEY `login_unique` (`login`),
   UNIQUE KEY `email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`username`, `login`, `password`, `email`, `role_id`, `permissions`, `is_activated`, `is_admin`) 
VALUE ('管理员', 'admin', MD5('Admin123'), '295697141@qq.com', '1', '', '1', '1');
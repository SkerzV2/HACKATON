DROP DATABASE IF EXISTS hackaton;
CREATE DATABASE hackaton CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hackaton;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  UNIQUE KEY unique_email (email(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

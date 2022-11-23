DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;
-- Department Table
CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
names VARCHAR(30) NOT NULL
);
-- Role Table
CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id DECIMAL,
FOREIGN KEY (department_id)
REFERENCES departments(id)
);
-- Employee Table
CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
Manager_id INT,
FOREIGN KEY (role_id)
REFERENCES roles(id)
);

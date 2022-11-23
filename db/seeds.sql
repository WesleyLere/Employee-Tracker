INSERT INTO departments (names)
VALUES  ("Sales"),
        ("Engineering"),
        ("Services");
-- roles
INSERT INTO roles (title, salary,department_id)
VALUES  ("SalesLeader", 100000, 1),
        ("Salesmen", 75000, 1),
        ("LeadEngineer", 150000, 2),
        ("SoftwareEngineer", 100000, 2),
        ("CustomerServicesLeader", 90000, 3),
        ("Secretary", 75000, 3);
-- employees
INSERT INTO employees (first_name, last_name, role_id, Manager_id)
VALUES  ("Sheila", "Gutierrez", 01, NULL),
        ("Kurt", "Williams", 03, NULL),
        ("James", "Monroe", 05, Null),
        ("Sean", "Robinson", 02, 01),
        ("David", "Orr", 02, 01),
        ("Kathleen", "Chen", 04, 02),
        ("Ryan", "Delacruz", 04, 02),
        ("Julia", "Collins", 04, 02),
        ("Jason", "Rose", 06, 03),
        ("Kathryn", "Russo", 06, 03);
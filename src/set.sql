
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;

-----------------------------------------------------
-- ORGANIZATIONS TABLE
-----------------------------------------------------

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    logo VARCHAR(255) NOT NULL
);

-----------------------------------------------------
-- PROJECTS TABLE
-----------------------------------------------------

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    project_description TEXT,
    location VARCHAR(100),
    date DATE,
    organization_id INT NOT NULL,

    FOREIGN KEY (organization_id)
    REFERENCES organizations(organization_id)
);

-----------------------------------------------------
-- CATEGORIES TABLE
-----------------------------------------------------

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-----------------------------------------------------
-- PROJECT CATEGORIES TABLE
-----------------------------------------------------

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

-----------------------------------------------------
-- ORGANIZATIONS
-----------------------------------------------------

INSERT INTO organizations
(organization_name, description, contact_email, logo)
VALUES
('Home of Poetry',
 'A community for poetry lovers.',
 'poetry@example.com',
 'poetry.png'),

('Creative Writing Society',
 'Helping writers improve their skills.',
 'writing@example.com',
 'writing.png'),

('Arts and Crafts Association',
 'Promoting arts and crafts.',
 'arts@example.com',
 'arts.png'),

('Youth Development Center',
 'Supporting youth through education.',
 'youth@example.com',
 'youth.png'),

('Community Volunteers',
 'Helping local communities.',
 'community@example.com',
 'community.png');

-----------------------------------------------------
-- PROJECTS
-----------------------------------------------------

INSERT INTO projects
(project_name, project_description, location, date, organization_id)
VALUES

('Poetry Workshop',
 'Learn and share poetry with others.',
 'Kampala',
 '2026-01-10',
 1),

('Writing Competition',
 'Improve writing skills through competitions.',
 'Jinja',
 '2026-02-14',
 2),

('Craft Exhibition',
 'Showcase creative arts and crafts.',
 'Mbarara',
 '2026-03-20',
 3),

('Youth Leadership Camp',
 'Training young leaders.',
 'Gulu',
 '2026-04-15',
 4),

('Community Clean-up',
 'Cleaning local communities.',
 'Entebbe',
 '2026-05-18',
 5);

-----------------------------------------------------
-- CATEGORIES
-----------------------------------------------------

INSERT INTO categories
(category_name)
VALUES
('Education'),
('Health'),
('Environment');

-----------------------------------------------------
-- PROJECT CATEGORIES
-----------------------------------------------------

INSERT INTO project_categories
(project_id, category_id)
VALUES
(1,1),
(2,1),
(3,3),
(4,2),
(5,3);

-----------------------------------------------------
-- USERS TABLE
-----------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(20) DEFAULT 'volunteer' NOT NULL
);

-- Seed an admin user
-- Password for admin@example.com is 'cse340!' hashed with bcrypt (cost 10)
-- $2b$10$wN1S7f8.U.v9K3J1v6f8Oe1z6H1z6H1z6H1z6H1z6H1z6H1z6H1z6
-- Note: I will use a placeholder or assume the user will register, 
-- but the requirement says "Make sure that you have created the dedicated admin testing account"
-- So I will insert it here.

INSERT INTO users (user_name, user_email, user_password, user_role)
VALUES ('Admin User', 'admin@example.com', '$2b$10$GDiR2D1ziLMn5tRn7NOhu.XwHro/Thuu.ka5QtLlNcoYRcPs/.W/S', 'admin')
ON CONFLICT (user_email) DO NOTHING;

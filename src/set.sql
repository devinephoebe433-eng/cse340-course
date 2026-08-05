
-- Drop tables in correct order to avoid foreign key constraints
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS users;

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
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-----------------------------------------------------
-- PROJECT CATEGORIES TABLE (Many-to-Many)
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
-- USERS TABLE
-----------------------------------------------------

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(20) DEFAULT 'volunteer' NOT NULL
);

-----------------------------------------------------
-- SEED DATA - ORGANIZATIONS
-----------------------------------------------------

INSERT INTO organizations
(organization_name, description, contact_email, logo)
VALUES
('Home of Poetry', 'A community for poetry lovers.', 'poetry@example.com', 'poetry.jpg'),
('Creative Writing Society', 'Helping writers improve their skills.', 'writing@example.com', 'creative.jpg'),
('Arts and Crafts Association', 'Promoting arts and crafts.', 'arts@example.com', 'artsandcrafts.jpg'),
('Youth Development Center', 'Supporting youth through education.', 'youth@example.com', 'youth.jpg'),
('Community Volunteers', 'Helping local communities.', 'community@example.com', 'community.jpg');

-----------------------------------------------------
-- SEED DATA - PROJECTS
-----------------------------------------------------

INSERT INTO projects
(project_name, project_description, location, date, organization_id)
VALUES
('Poetry Workshop', 'Learn and share poetry with others.', 'Kampala', '2026-01-10', 1),
('Writing Competition', 'Improve writing skills through competitions.', 'Jinja', '2026-02-14', 2),
('Craft Exhibition', 'Showcase creative arts and crafts.', 'Mbarara', '2026-03-20', 3),
('Youth Leadership Camp', 'Training young leaders.', 'Gulu', '2026-04-15', 4),
('Community Clean-up', 'Cleaning local communities.', 'Entebbe', '2026-05-18', 5);

-----------------------------------------------------
-- SEED DATA - CATEGORIES
-----------------------------------------------------

INSERT INTO categories (category_name)
VALUES 
('Education'),
('Health'),
('Environment'),
('Arts & Culture'),
('Community Service');

-----------------------------------------------------
-- SEED DATA - PROJECT CATEGORIES
-----------------------------------------------------

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1), -- Poetry Workshop -> Education
(1, 4), -- Poetry Workshop -> Arts & Culture
(2, 1), -- Writing Competition -> Education
(3, 4), -- Craft Exhibition -> Arts & Culture
(4, 1), -- Youth Leadership Camp -> Education
(5, 3), -- Community Clean-up -> Environment
(5, 5); -- Community Clean-up -> Community Service

-----------------------------------------------------
-- SEED DATA - ADMIN USER
-----------------------------------------------------

-- Password for admin@example.com is 'cse340!'
INSERT INTO users (user_name, user_email, user_password, user_role)
VALUES ('Admin User', 'admin@example.com', '$2b$10$GDiR2D1ziLMn5tRn7NOhu.XwHro/Thuu.ka5QtLlNcoYRcPs/.W/S', 'admin');

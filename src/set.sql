-- Remove old tables if they exist
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;


-- ORGANIZATIONS TABLE
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL
);


-- PROJECTS TABLE
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    project_description TEXT,
    organization_id INT NOT NULL,

    FOREIGN KEY (organization_id)
    REFERENCES organizations(organization_id)
);


-- CATEGORIES TABLE
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);


-- CONNECTION TABLE
CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY(project_id, category_id),

    FOREIGN KEY(project_id)
    REFERENCES projects(project_id)
    ON DELETE CASCADE,

    FOREIGN KEY(category_id)
    REFERENCES categories(category_id)
    ON DELETE CASCADE
);


-- ADD ORGANIZATIONS

INSERT INTO organizations
(organization_name)
VALUES
('Home of Poetry'),
('Creative Writing Society'),
('Arts and Crafts Association');


-- ADD PROJECTS

INSERT INTO projects
(project_name, project_description, organization_id)
VALUES

('Poetry Workshop',
'Learn and share poetry with others.',
1),

('Writing Competition',
'Improve writing skills through competitions.',
2),

('Craft Exhibition',
'Showcase creative arts and crafts.',
3);



-- ADD CATEGORIES

INSERT INTO categories
(category_name)
VALUES

('Education'),
('Health'),
('Environment');


-- CONNECT PROJECTS TO CATEGORIES

INSERT INTO project_categories
(project_id, category_id)
VALUES

(1,1),
(2,1),
(3,3);
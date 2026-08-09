
-- Drop tables in correct order to avoid foreign key constraints
DROP TABLE IF EXISTS project_volunteers;
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
-- PROJECT VOLUNTEERS TABLE (Many-to-Many)
-----------------------------------------------------

CREATE TABLE project_volunteers (
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    volunteered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (project_id, user_id),

    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
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
('Creative Writing Circle', 'Practice storytelling and creative writing.', 'Kampala', '2026-01-24', 1),
('Open Mic for Beginners', 'Build confidence by sharing original work.', 'Kampala', '2026-02-07', 1),
('Poetry in Schools', 'Introduce poetry activities to local schools.', 'Kampala', '2026-02-21', 1),
('Community Poetry Reading', 'Celebrate local poets and writers.', 'Kampala', '2026-03-07', 1),
('Writing Competition', 'Improve writing skills through competitions.', 'Jinja', '2026-02-14', 2),
('Storytelling Workshop', 'Develop memorable characters and stories.', 'Jinja', '2026-02-28', 2),
('Editing Skills Lab', 'Learn practical editing and revision techniques.', 'Jinja', '2026-03-14', 2),
('Young Authors Mentorship', 'Pair aspiring authors with experienced mentors.', 'Jinja', '2026-03-28', 2),
('Community Newsletter', 'Create a newsletter featuring local voices.', 'Jinja', '2026-04-11', 2),
('Craft Exhibition', 'Showcase creative arts and crafts.', 'Mbarara', '2026-03-20', 3),
('Recycled Art Workshop', 'Turn reusable materials into creative artwork.', 'Mbarara', '2026-04-04', 3),
('Traditional Crafts Fair', 'Preserve and share local craft traditions.', 'Mbarara', '2026-04-18', 3),
('Community Mural Project', 'Create a collaborative mural in a public space.', 'Mbarara', '2026-05-02', 3),
('Handmade Skills Training', 'Teach practical skills for making handmade products.', 'Mbarara', '2026-05-16', 3),
('Youth Leadership Camp', 'Training young leaders.', 'Gulu', '2026-04-15', 4),
('Career Preparation Day', 'Help young people prepare for future careers.', 'Gulu', '2026-04-29', 4),
('Youth Tutoring Program', 'Provide tutoring and academic support.', 'Gulu', '2026-05-13', 4),
('Digital Skills Bootcamp', 'Introduce students to useful digital skills.', 'Gulu', '2026-05-27', 4),
('Youth Wellness Workshop', 'Promote healthy habits and personal wellbeing.', 'Gulu', '2026-06-10', 4),
('Community Clean-up', 'Cleaning local communities.', 'Entebbe', '2026-05-18', 5),
('Neighborhood Garden Day', 'Create and maintain a shared community garden.', 'Entebbe', '2026-06-01', 5),
('Food Donation Drive', 'Collect and distribute food to families in need.', 'Entebbe', '2026-06-15', 5),
('Community Health Fair', 'Connect residents with health education and services.', 'Entebbe', '2026-06-29', 5),
('Recreation Area Renewal', 'Improve a shared recreation area for residents.', 'Entebbe', '2026-07-13', 5);

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
(1, 1), (1, 4),
(2, 1), (2, 4),
(3, 4),
(4, 1), (4, 4),
(5, 4),
(6, 1),
(7, 1), (7, 4),
(8, 1),
(9, 1),
(10, 1), (10, 5),
(11, 4),
(12, 3), (12, 4),
(13, 4), (13, 5),
(14, 3), (14, 4),
(15, 4),
(16, 1),
(17, 1), (17, 5),
(18, 1), (18, 5),
(19, 1),
(20, 2),
(21, 3), (21, 5),
(22, 3),
(23, 5),
(24, 2), (24, 5),
(25, 3), (25, 5);

-----------------------------------------------------
-- SEED DATA - ADMIN USER
-----------------------------------------------------

-- Password for admin@example.com is 'cse340!'
INSERT INTO users (user_name, user_email, user_password, user_role)
VALUES ('Admin User', 'admin@example.com', '$2b$10$GDiR2D1ziLMn5tRn7NOhu.XwHro/Thuu.ka5QtLlNcoYRcPs/.W/S', 'admin');

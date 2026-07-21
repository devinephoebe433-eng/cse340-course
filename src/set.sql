
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
<<<<<<< HEAD
    description TEXT NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    logo VARCHAR(255) NOT NULL
=======
    description TEXT,
    contact_email VARCHAR(100),
    logo VARCHAR(255)
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8
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

<<<<<<< HEAD
-----------------------------------------------------
-- ORGANIZATIONS
-----------------------------------------------------

INSERT INTO organizations
(organization_name, description, contact_email, logo)
VALUES
('Home of Poetry',
 'A community for poetry lovers.',
 'poetry@example.com',
 'poetry.jpg'),
=======

-- ADD ORGANIZATIONS
INSERT INTO organizations
(organization_name, description, contact_email, logo)
VALUES
('Home of Poetry', 'A welcoming organization that encourages poets to share their work, collaborate, and participate in workshops and community events.', 'contact@homeofpoetry.org', '/images/poetry.jpg'),
('Creative Writing Society', 'Bringing together aspiring writers through competitions, writing challenges, mentoring, and publishing opportunities.', 'info@creativewriting.soc', '/images/creative.jpg'),
('Arts and Crafts Association', 'Supporting artists and craft makers with exhibitions, workshops, and community outreach programs.', 'support@artsandcrafts.asn', '/images/artsandcrafts.jpg');
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8

('Creative Writing Society',
 'Helping writers improve their skills.',
 'writing@example.com',
 'creative.jpg'),

<<<<<<< HEAD
('Arts and Crafts Association',
 'Promoting arts and crafts.',
 'arts@example.com',
 'artsandcrafts.jpg'),

('Youth Development Center',
 'Supporting youth through education.',
 'youth@example.com',
 'youth.jpg'),

('Community Volunteers',
 'Helping local communities.',
 'community@example.com',
 'community.jpg');

-----------------------------------------------------
-- PROJECTS
-----------------------------------------------------

=======
-- ADD PROJECTS (at least five sample rows for each organization)
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8
INSERT INTO projects
(project_name, project_description, location, date, organization_id)
VALUES
-- Organization 1: Home of Poetry
('Poetry Workshop', 'Learn and share poetry with others.', 'Online', '2026-08-01', 1),
('Spoken Word Night', 'Perform your poetry live.', 'Community Center', '2026-08-15', 1),
('Youth Poetry Slam', 'A competition for young poets.', 'Local Library', '2026-09-10', 1),
('Haiku in the Park', 'A relaxed haiku writing session.', 'Central Park', '2026-09-20', 1),
('Poetry Journal Launch', 'Celebrate the launch of our new anthology.', 'Bookstore', '2026-10-05', 1),

<<<<<<< HEAD
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
=======
-- Organization 2: Creative Writing Society
('Writing Competition', 'Improve writing skills through competitions.', 'Online', '2026-08-10', 2),
('Novel Writing Bootcamp', 'Intensive month-long writing program.', 'Online', '2026-11-01', 2),
('Short Story Workshop', 'Master the art of short fiction.', 'Community Hall', '2026-08-25', 2),
('Scriptwriting Seminar', 'Learn to write for stage and screen.', 'Theater Arts Center', '2026-09-15', 2),
('Flash Fiction Friday', 'Weekly quick-writing challenges.', 'Online', '2026-08-07', 2),

-- Organization 3: Arts and Crafts Association
('Craft Exhibition', 'Showcase creative arts and crafts.', 'City Gallery', '2026-12-01', 3),
('Pottery Class', 'Hands-on pottery for beginners.', 'Studio A', '2026-08-12', 3),
('Knitting Circle', 'Weekly social knitting group.', 'Senior Center', '2026-08-19', 3),
('Painting in the Garden', 'Outdoor landscape painting session.', 'Botanical Garden', '2026-09-05', 3),
('Jewelry Making Workshop', 'Create your own unique accessories.', 'Craft Hub', '2026-10-12', 3);
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8

('Community Clean-up',
 'Cleaning local communities.',
 'Entebbe',
 '2026-05-18',
 5);

<<<<<<< HEAD
-----------------------------------------------------
-- CATEGORIES
-----------------------------------------------------

=======
-- ADD CATEGORIES
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8
INSERT INTO categories
(category_name)
VALUES
('Education'),
('Health'),
('Environment'),
('Arts & Culture'),
('Community Service');

<<<<<<< HEAD
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
=======

-- CONNECT PROJECTS TO CATEGORIES (at least five sample rows)
INSERT INTO project_categories
(project_id, category_id)
VALUES
(1, 1), -- Poetry Workshop -> Education
(1, 4), -- Poetry Workshop -> Arts & Culture
(2, 4), -- Spoken Word Night -> Arts & Culture
(3, 1), -- Youth Poetry Slam -> Education
(6, 1), -- Writing Competition -> Education
(11, 4), -- Craft Exhibition -> Arts & Culture
(11, 5); -- Craft Exhibition -> Community Service
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8

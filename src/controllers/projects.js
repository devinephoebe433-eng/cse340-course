import { getUpcomingProjectsWithOrganization, getAllProjects, getProjectById, getCategoriesByProjectId, createProject, updateProject, updateProjectCategories, isUserVolunteering, addVolunteer, removeVolunteer } from "../models/projects.js";
import { getAllOrganizations } from "../models/organizations.js";
import { getAllCategories } from "../models/categories.js";
import { validationResult } from "express-validator";

export async function buildProjects(req, res) {
    const projects = await getUpcomingProjectsWithOrganization();
    res.render("projects", {
        title: "Upcoming Service Projects",
        projects
    });
}

export async function buildProjectDetail(req, res) {
    const project_id = req.params.projectId;
    const project = await getProjectById(project_id);

    if (!project) {
        return res.status(404).render("404", { title: "Project Not Found" });
    }

    const categories = await getCategoriesByProjectId(project_id);
    const isVolunteering = req.session.loggedin
        ? await isUserVolunteering(project_id, req.session.user.id)
        : false;

    res.render("project-detail", {
        title: project.project_name,
        project,
        categories,
        isVolunteering
    });
}

// POST Volunteer Signup
export async function handleVolunteerSignup(req, res) {
    const project_id = req.params.projectId;
    const user_id = req.session.user.id;

    try {
        const project = await getProjectById(project_id);
        if (!project) {
            req.flash("error", "Project not found.");
            return res.redirect("/project");
        }

        await addVolunteer(project_id, user_id);
        req.flash("success", `You are now volunteering for ${project.project_name}.`);
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Volunteer signup error:", error);
        req.flash("error", "Unable to sign up for this project.");
        res.redirect(`/project/${project_id}`);
    }
}

// POST Remove Volunteer Signup
export async function handleVolunteerRemoval(req, res) {
    const project_id = req.params.projectId;
    const user_id = req.session.user.id;

    try {
        await removeVolunteer(project_id, user_id);
        req.flash("success", "You are no longer volunteering for this project.");
        res.redirect(req.get("referer") || "/dashboard");
    } catch (error) {
        console.error("Volunteer removal error:", error);
        req.flash("error", "Unable to remove your volunteer signup.");
        res.redirect(req.get("referer") || "/dashboard");
    }
}

// GET New Project Form
export async function buildNewProject(req, res) {
    const organizations = await getAllOrganizations();
    res.render("project-form", {
        title: "Add New Project",
        action: "/project/new",
        project: null,
        organizations
    });
}

// POST New Project
export async function handleNewProject(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const organizations = await getAllOrganizations();
        req.flash("error", errors.array()[0].msg);
        return res.status(400).render("project-form", {
            title: "Add New Project",
            action: "/project/new",
            project: req.body,
            organizations
        });
    }

    const { project_name, project_description, location, date, organization_id } = req.body;
    try {
        await createProject(project_name, project_description, location, date, organization_id);
        req.flash("success", "Project created successfully!");
        res.redirect("/management");
    } catch (error) {
        req.flash("error", "Error creating project.");
        res.redirect("/project/new");
    }
}

// GET Edit Project Form
export async function buildEditProject(req, res) {
    const project = await getProjectById(req.params.projectId);
    if (!project) {
        req.flash("error", "Project not found.");
        return res.redirect("/management");
    }
    const organizations = await getAllOrganizations();
    res.render("project-form", {
        title: "Edit Project",
        action: `/project/edit/${project.project_id}`,
        project,
        organizations
    });
}

// POST Edit Project
export async function handleEditProject(req, res) {
    const project_id = req.params.projectId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const organizations = await getAllOrganizations();
        req.flash("error", errors.array()[0].msg);
        return res.status(400).render("project-form", {
            title: "Edit Project",
            action: `/project/edit/${project_id}`,
            project: { ...req.body, project_id },
            organizations
        });
    }

    const { project_name, project_description, location, date, organization_id } = req.body;
    try {
        await updateProject(project_id, project_name, project_description, location, date, organization_id);
        req.flash("success", "Project updated successfully!");
        res.redirect("/management");
    } catch (error) {
        req.flash("error", "Error updating project.");
        res.redirect(`/project/edit/${project_id}`);
    }
}

// GET Category Assignment Form
export async function buildUpdateCategories(req, res) {
    const project_id = req.params.projectId;
    const project = await getProjectById(project_id);
    if (!project) {
        req.flash("error", "Project not found.");
        return res.redirect("/project");
    }
    
    const allCategories = await getAllCategories();
    const currentCategories = await getCategoriesByProjectId(project_id);
    const currentCategoryIds = currentCategories.map(c => c.category_id);
    
    res.render("project-categories-form", {
        title: "Update Project Categories",
        project,
        allCategories,
        currentCategoryIds
    });
}

// POST Category Assignment
export async function handleUpdateCategories(req, res) {
    const project_id = req.params.projectId;
    const { category_ids } = req.body; // This will be an array or undefined
    
    const ids = Array.isArray(category_ids) ? category_ids : (category_ids ? [category_ids] : []);
    
    try {
        await updateProjectCategories(project_id, ids);
        req.flash("success", "Project categories updated successfully!");
        res.redirect(`/project/${project_id}`);
    } catch (error) {
        req.flash("error", "Error updating project categories.");
        res.redirect(`/project/${project_id}/categories`);
    }
}

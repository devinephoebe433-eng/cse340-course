import { getAllProjects, getProjectById, getCategoriesByProjectId } from "../models/projects.js";


export async function buildProjects(req, res) {

    const projects = await getAllProjects();

    res.render("projects", {
        title: "Service Projects",
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

    res.render("project-detail", {
        title: project.project_name,
        project,
        categories
    });
}

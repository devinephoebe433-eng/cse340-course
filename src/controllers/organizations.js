import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from "../models/organizations.js";


export async function buildOrganizations(req, res) {

    const organizations = await getAllOrganizations();

    res.render("organizations", {
        title: "Organizations",
        organizations
    });

}

export async function buildOrganizationDetail(req, res) {
    const organization_id = req.params.organizationId;
    const organization = await getOrganizationById(organization_id);
    
    if (!organization) {
        return res.status(404).render("404", { title: "Organization Not Found" });
    }

    const projects = await getProjectsByOrganizationId(organization_id);

    res.render("organization-detail", {
        title: organization.organization_name,
        organization,
        projects
    });
}

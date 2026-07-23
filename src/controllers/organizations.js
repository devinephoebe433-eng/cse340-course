import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId, createOrganization, updateOrganization } from "../models/organizations.js";
import { validationResult } from "express-validator";

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

// GET New Organization Form
export async function buildNewOrganization(req, res) {
    res.render("organization-form", {
        title: "Add New Organization",
        action: "/organizations/new",
        organization: null
    });
}

// POST New Organization
export async function handleNewOrganization(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg);
        return res.status(400).render("organization-form", {
            title: "Add New Organization",
            action: "/organizations/new",
            organization: req.body
        });
    }

    const { organization_name, description, contact_email, logo } = req.body;
    try {
        await createOrganization(organization_name, description, contact_email, logo);
        req.flash("success", "Organization created successfully!");
        res.redirect("/management");
    } catch (error) {
        req.flash("error", "Error creating organization.");
        res.redirect("/organizations/new");
    }
}

// GET Edit Organization Form
export async function buildEditOrganization(req, res) {
    const organization = await getOrganizationById(req.params.organizationId);
    if (!organization) {
        req.flash("error", "Organization not found.");
        return res.redirect("/management");
    }
    res.render("organization-form", {
        title: "Edit Organization",
        action: `/organizations/edit/${organization.organization_id}`,
        organization
    });
}

// POST Edit Organization
export async function handleEditOrganization(req, res) {
    const organization_id = req.params.organizationId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg);
        return res.status(400).render("organization-form", {
            title: "Edit Organization",
            action: `/organizations/edit/${organization_id}`,
            organization: { ...req.body, organization_id }
        });
    }

    const { organization_name, description, contact_email, logo } = req.body;
    try {
        await updateOrganization(organization_id, organization_name, description, contact_email, logo);
        req.flash("success", "Organization updated successfully!");
        res.redirect("/management");
    } catch (error) {
        req.flash("error", "Error updating organization.");
        res.redirect(`/organizations/edit/${organization_id}`);
    }
}

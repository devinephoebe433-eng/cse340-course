const requireLogin = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        req.flash("error", "Please log in to access this page.");
        res.redirect("/login");
    }
}

const requireAdmin = (req, res, next) => {
    if (req.session.loggedin && req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        req.flash("error", "You do not have permission to access this page.");
        res.redirect("/management");
    }
}

export default {
    requireLogin,
    requireAdmin
};

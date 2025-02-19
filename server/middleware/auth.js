function ensureAuthenticated(req, res, next) {
    if (req.session && req.user) {
        return next();
    } else {
        console.warn('Unauthorized access attempt: ', req.originalUrl);
        return res.status(401).json({ error: 'Unauthorized. Please log in'});
    }
};

module.exports = ensureAuthenticated;
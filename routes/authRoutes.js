const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google',
            {
                scope: ['profile', 'email']
            })
    );

    // After authentication
    app.get('/auth/google/callback',
        passport.authenticate('google'))

    // Logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    // Check if user has been authenticated
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
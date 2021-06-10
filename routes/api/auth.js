const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    auth = require('../../middleware/auth'),
    User = require('../../models/User');

// @route POST /api/auth
// @desc Auth User
// @access Public
router.post('/', async(req, res) => {
    try{
        const {email, password} = req.body;

        // Validate fields
        if(!email || !password) return res.status(400).json({msg: 'Enter all fields'});

        const foundUser = await User.findOne({email});
        if(!foundUser) return res.status(400).json({msg: 'User does not exist'});
        bcrypt.compare(password, foundUser.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials!'});

                jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            email: foundUser.email,
                            id: foundUser._id,
                            name: foundUser.name
                        }
                    })
                });
            })
    } catch(err) {
        console.log(err);
    }
});

// @route GET /api/auth/user
// @desc Get User info
// @access Private
router.get('/user', auth, async (req, res) => {
    try{
        const foundUser = await User.findById(req.user.id).select('-password');
        if(foundUser) return res.json({
            name: foundUser.name,
            email: foundUser.email,
            id: foundUser._id
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;
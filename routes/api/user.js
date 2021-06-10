const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    User = require('../../models/User');

// @route POST /api/users
// @desc Register an User
// @access Public
router.post('/', async (req, res) => {
    try{
        const {name, email, password} = req.body;

        // Validate Fields
        if (!name || !email || !password) return res.status(400).json({msg: 'Enter all fields'});

        // Check for existing user
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: 'User already exists'});

        const newUser = new User({name, email, password});
        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if(err) throw err;
                newUser.password = hash;

                const saveUser = await newUser.save();
                if(saveUser) {
                    jwt.sign({id: saveUser.id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                name: saveUser.name,
                                email: saveUser.email,
                                id: saveUser.id
                            }
                        });
                    });
                }
            });
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;
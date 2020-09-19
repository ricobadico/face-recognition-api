const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || ! password){
        return res.status(400).json('Incorrect form submission');  
    }
    //Use given email to pull up a matching credential set
    db.select('email', 'hash').from('login')
    .where({email: email})
    // Take the returned credentials and compare pass hash to given password
    .then(creds => {
       const isValid = bcrypt.compareSync(password, creds[0].hash);
        if(isValid) {
            return db.select('*').from('users').where({email: email})
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json('Unable to get user'));
        } else {
            res.status(400).json('Wrong credentials');
        }
    })
    .catch(err => res.status(400).json('Error signing in'));
    }

    module.exports = {
        handleSignin: handleSignin
    }
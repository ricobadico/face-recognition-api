const handleRegister = (req,res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || ! password){
        return res.status(400).json('Incorrect form submission');  
    }
    const hash = bcrypt.hashSync(req.body.password);
    //Transaction allows you to bundle multiple steps together
    //and require all of them to succeed for changes to occur
    db.transaction(trx => {
        //First step (inserting into login)
        trx.insert({
            hash: hash,
            email: email     
        })
        .into('login')
        .returning('email')
        //Second step (inserting into users)
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user=> {
                res.json(user[0]);
            })
        })
        //At end, required to commit transaction or else will not stick
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('Username or email already exists.'));
}

module.exports = {
    handleRegister: handleRegister
}
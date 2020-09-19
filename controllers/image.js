const Clarifai = require('clarifai');

const ClarifaiInstance = new Clarifai.App({
    apiKey: '7d033b34d14542db9599a79bb447992b'
   }); 

const handleAPICall = (req, res) => {
ClarifaiInstance.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => res.json(data))
.catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users')
    .where({id:id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}


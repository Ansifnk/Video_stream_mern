const jwt = require('jsonwebtoken')


function authenticateToken(req, res, next) {
    const token = req.cookies.access_token;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'SECRET', (err, user) => {
        if (err) return res.sendStatus(403)
        // console.log(user)
        req.userId = user.id

        next()
    })


}


function generateAccesToken(userId) {
    return jwt.sign({ id: userId }, 'SECRET', { expiresIn: '7d' })

}

module.exports = { authenticateToken, generateAccesToken }
//library used normally by secure apis in our server
const expressJwt = require('express-jwt');

//Protection functions
function authJwt(){
    const secret = process.env.secret
    return expressJwt({
        secret,
        //token can be generate based   on many alogarithms so HS256 algorithms is also used by  express-jwt
        algorithms: ['HS256'], 
    });
}

module.exports = authJwt;
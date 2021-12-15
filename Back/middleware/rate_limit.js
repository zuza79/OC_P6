//rateLimit

const rateLimit = require("express-rate-limit");

//limite d'utilisation de requêtes à 250 max par quart d'heure 
const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,  // 15 minutes  (en milliseconds)
    max : 250,                  // 250 requests max

});

module.exports = limiter;
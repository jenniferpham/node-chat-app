const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from, //could also be written "from: from"
        text, //could also be written "text: text"
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage}
var generateMessage = (from, text) => {
    return {
        from, //could also be written "from: from"
        text, //could also be written "text: text"
        createdAt: new Date().getTime()
    };
};

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocationMessage}
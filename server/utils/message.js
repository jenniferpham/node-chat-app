var generateMessage = (from, text) => {
    return {
        from, //could also be written "from: from"
        text, //could also be written "text: text"
        creaetdAt: new Date().getTime()
    };
};

module.exports = {generateMessage}
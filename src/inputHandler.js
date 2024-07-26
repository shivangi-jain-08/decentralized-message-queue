const readline = require('readline');
const { pushMessage } = require('./messageQueue');

// Creating an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * this function reads input from the user and pushes it to the swarm
 * it will continue reading input until the user stops the process
 * @param {object} swarm - The Hyperswarm instance.
 */
const startInputReader = (swarm) => {
    rl.question('Enter message: ', (message) => {
        if (message.trim() !== '') {
            try {
                pushMessage(message, swarm);
            } catch (err) {
                console.error('Error pushing message:', err);
            }
        }
        startInputReader(swarm);
    });
};

/**
 * Function to close the input reader.
 */
const closeInputReader = () => {
    rl.close();
};

module.exports = { startInputReader, closeInputReader };

const createSwarm = require('./src/swarm');
const { closeInputReader, startInputReader } = require('./src/inputHandler');

// Creating an instance of swarm 
let swarm;
try {
    swarm = createSwarm();
} catch (err) {
    console.error('Failed to create swarm:', err);
    process.exit(1);
}

// Starting reaading messages from the user
startInputReader(swarm);

// Handling process termination
process.on('SIGINT', () => {
    try {
        swarm.destroy(() => {
            console.log('Swarm terminated.');
            closeInputReader();
            process.exit();
        });
    } catch (err) {
        console.error('Error during swarm termination:', err);
        closeInputReader();
        process.exit(1);
    }
});

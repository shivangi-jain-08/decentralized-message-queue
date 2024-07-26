const crypto = require('crypto');
const Hyperswarm = require('hyperswarm');
const { pullMessage, sendQueuedMessage } = require('./messageQueue');
const { startInputReader } = require('./inputHandler');

/**
 * func to create a Hyperswarm instance and join the swarm.
 * @returns {object} The Hyperswarm instance.
 */
const createSwarm = () => {
    // Creating a new hyperswarm instance
    const swarm = new Hyperswarm();

    // Generating a unique topic
    const topic = crypto.createHash('sha256').update('hyperswarmtopic').digest();

    // logging the topic
    console.log('Joining swarm:', topic.toString('hex'));

    // for storing the connections
    swarm.connections = new Set();

    // Queue for storing messages
    swarm.messageQueue = [];

    // handling peer connections
    swarm.on('connection', (socket, details) => {
        // logging when a new peer connects
        console.log('New peer connected');

        // storing the connection
        swarm.connections.add(socket);

        // Logging total number of connected peers
        console.log('Total connected peers:', swarm.connections.size, '\n');

        // Handling  incoming data from peers
        pullMessage(swarm);

        // sending queued messages
        sendQueuedMessage(swarm);

        // Starting input reader after the first peer connection is established
        // if (swarm.connections.size === 1) {
        //     startInputReader(swarm);
        // }

        // Handling peer disconnections
        socket.on('close', () => {
            // Logging when a peer disconnects
            console.log('Peer disconnected');

            // Removing the socket
            swarm.connections.delete(socket);

            // Logging total connected peers
            console.log('Total connected peers:', swarm.connections.size);
        });

        // error handling
        socket.on('error', (err) => {
            // error log - in case socket errors
            console.error('Socket error:', err);
        });
    });

    // Handling peer discovery
    swarm.on('peer', (peerInfo) => {
        // Log when a new peer is discovered
        console.log('Discovered a new peer:', peerInfo);
    });

    // Joining the swarm 
    try {
        swarm.join(topic, {
            lookup: true,
            announce: true
        });
    } catch (err) {
        // error log - in case of error in joining the swarm
        console.error('Error joining swarm:', err);
    }

    // error handling
    swarm.on('error', (err) => {
        // error log - swarm errors
        console.error('Swarm error:', err);
    });

    return swarm;
};

module.exports = createSwarm;
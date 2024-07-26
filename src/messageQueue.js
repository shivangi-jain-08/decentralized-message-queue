/**
 * Function to push a message to all connected peers.
 * 
 * @param {string} message - The message that I want to published.
 * @param {object} swarm - Hyperswarm instance.
 */
const pushMessage = (message, swarm) => {
    try {
        // checkign if there are any connected peers and if the message empty
        if (swarm.connections.size > 0 && message.trim() !== '') {
            // sending message to all the connected peers
            swarm.connections.forEach(socket => {
                try {
                    socket.write(message);
                } catch (err) {
                    console.error('Error sending message to peer:', err);
                }
            });
            // logging message
            console.log('Message published:', message);
        } else {
            // error log - in case no peers are connected or message is empty
            swarm.messageQueue.push(message);
            console.log('No peers connected, message queued:', message);
        }
    } catch (error) {
        // error log - in case there is an error while publishing the message
        console.error('Error publishing message:', error.message);
    }
};

/**
 * Function to pull messages from the queue.
 * 
 * @param {object} swarm - Hyperswarm instance.
 */
const pullMessage = (swarm) => {
    try {
        // Checking for connected peers
        if (swarm.connections.size > 0) {
            // Listening to data from each connected peer
            swarm.connections.forEach(socket => {
                socket.on('data', (data) => {
                    try {
                        // logging received message
                        console.log('\nMessage received:', data.toString());
                    } catch (err) {
                        // error log - in case there is an error processing the received message
                        console.error('Error processing received message:', err);
                    }
                });
            });
        } else {
            // error log  - in case no peers are connected
            console.log('No peers connected to pull messages.');
        }
    } catch (error) {
        // error log - in case there is an error while pulling messages
        console.error('Error pulling messages:', error.message);
    }
};

/**
 * func to send queued messages to all connected peers.
 * 
 * @param {object} swarm - Hyperswarm instance.
 */
const sendQueuedMessage = (swarm) => {
    try {
        if (swarm.messageQueue.length > 0 && swarm.connections.size > 0) {
            // Delivering all queued messages
            while (swarm.messageQueue.length > 0) {
                const message = swarm.messageQueue.shift();
                swarm.connections.forEach(socket => {
                    try {
                        socket.write(message);
                        console.log('Queued message delivered:', message);
                    } catch (err) {
                        console.error('Error delivering queued message to peer:', err);
                    }
                });
            }
        }
    } catch (error) {
        // Error log - in case there is an error while delivering queued messages
        console.error('Error delivering queued messages:', error.message);
    }

}

module.exports = { pushMessage, pullMessage, sendQueuedMessage };
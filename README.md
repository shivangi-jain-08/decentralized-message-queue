# Hyperswarm Message Queue

This project implements a decentralized message queue using Hyperswarm by Holepunch. It demonstrates peer-to-peer networking and distributed systems by enabling message publishing and subscribing across connected peers.

### Installation

1. **Download the zip file.**
2. **Extract the contents of the zip file.**
3. **Navigate to the folder labeled `tether-assignment`.**
4. **Run:**

   ```bash
   npm install
   ```

### Using the App

1. **To start the app:**

    ```bash
    node index.js
    ```

    This will start the Hyperswarm instance and begin listening for messages.

2. **Testing the Setup:**

    - Open two terminal windows.
    - In both terminals, navigate to the `tether-assignment` folder and run the command from step 1.
    - After a few seconds, both terminals will log "Total connected peers: 1". You can now start sending and receiving messages between these two endpoints.

### Example Usage

**Publishing Messages**

1. You can input a message in the terminal and press Enter. The message will be sent to all connected peers.

    **Example:**

    ```plaintext
    Enter message: Hello, peer!
    ```

    This will result in the message "Hello, peer!" being sent to the other terminal.

2. **Sending Messages with No Peers Connected:**

    You can also send messages when no other peers are connected. These messages will be queued and automatically delivered once another peer comes online and reconnects.

    **Example:**

    ```plaintext
    Enter message: Hello, future peer!
    ```

    This message will be stored in the queue and sent to the connected peer when it joins the network.

**Receiving Messages**

1. Messages sent by other peers will be logged in the terminal.
2. You will see incoming messages in real-time as they are received from connected peers.

   **Example:**

   ```plaintext
   Message received: Hello, peer!
   ```

   This will appear in the terminal where the other peer is running, indicating that the message was successfully received.

### Error Handling

- Errors in connecting, sending, or receiving messages are logged to the console.
- If there is an issue joining the swarm or communicating with peers, detailed error messages will be displayed.

---

Feel free to reach out if you have any questions or issues with the project!

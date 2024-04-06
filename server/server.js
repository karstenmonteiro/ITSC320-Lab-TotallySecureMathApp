/**
 * CHANGE: Setup the Node.js server by executing the two following lines:
 *           (1) 'npm init -y'
 *           (2) 'npm install express bcryptjs jsonwebtoken'
 *         
 *         This creates a new Node.js project, and installs:
 *           - 'Express' (web framework for Node.js)
 *           - 'bcryptjs' (for hashing passwords)
 *           - 'jsonwebtoken' (for creating JWT tokens)
 * 
 *         You can start the server by executing either of the following:
 *           (1) 'npm run api'
 *           (2) 'node server.js'
 */

/**
 * CHANGE: Set up basic Express server
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '93442e2c91758972e5e126812902b66bd8aef0cf8c630f4c5978dca0c92b2be8';

/**
 * CHANGE: API SERVER CONFIGURATION
 * 
 *    *** NOTE: MUST CHANGE THE IP TO YOUR IP ADDRESS!! (may also need to change the port to one that's open)
 */
const IP = '192.168.1.88';
const PORT = 3000;
const ADDRESS = IP + ':' + PORT;
const app = express();

app.use(express.json());

const users = [
    {
        username: 'bob',
        password: '$2y$10$B1c5iE81VNGutHevINnoYuqAHFFdw81wlsPzoKkuQ7F6IwcEJ4bpO'
    },
    {
        username: 'joe',
        password: '$2y$10$GbjW8MRbldhQCpxLRusJC.XqxWARedFwt/13lQbweN.vqsYH2k8Y.'
    },
    {
        username: 'k',
        password: '$2y$10$B1c5iE81VNGutHevINnoYuqAHFFdw81wlsPzoKkuQ7F6IwcEJ4bpO'
    }
];

app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } else {
        res.status(401).json({ status: 'error', message: 'Authentication failed.' });
    }
});

app.listen(3000, () => {
    console.log('\x1b[33m%s\x1b[0m\x1b[35m%s\x1b[0m', '\nBackend API server is running at ', `http://${ADDRESS}/users`);
});

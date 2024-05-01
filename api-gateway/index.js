import { config } from "dotenv";
import express from "express";
import httpProxy from "http-proxy";
import { authenticate } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const apiGateway = express();
apiGateway.use(cookieParser());
apiGateway.use(cors());
const proxy = httpProxy.createProxyServer();

const colors = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    magenta: "\x1b[35m",
    green: "\x1b[32m"
};

// Function to log requests with color
const consoleLog = (message, color) => {
    console.log(`${color}${message}${colors.reset}`);
};

apiGateway.use('/api/auth', (req, res) => {
    consoleLog(`Request sent to auth server from gateway`, colors.green);
    proxy.web(req, res, { target: process.env.AUTH_API });
});

apiGateway.use('/api/*', (req, res, next) => {
    authenticate(req, res, next);
});

proxy.on('error', (error, req, res) => {
    console.error('Proxy Error:', error);
    res.status(500).send('Proxy Error');
});

apiGateway.listen(process.env.API_GATEWAY_PORT, () => {
    console.log(`API Gateway running on http://localhost:${process.env.API_GATEWAY_PORT}`);
});

apiGateway.use('/api/payment', (req, res) => {
    consoleLog(`Request sent to payment server from gateway`, colors.cyan);
    proxy.web(req, res, { target: process.env.PAYMENT_API });
});

apiGateway.use('/api/course', (req, res) => {
    consoleLog(`Request sent to course server from gateway`, colors.yellow);
    proxy.web(req, res, { target: process.env.COURSE_API });
});

apiGateway.use('/api/learner', (req, res) => {
    consoleLog(`Request sent to learner server from gateway`, colors.magenta);
    proxy.web(req, res, { target: process.env.LEARNER_API });
}); 
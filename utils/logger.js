const winston = require('winston');
const path = require('path');

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

// Create Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Write all logs to console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        // Write all logs with level 'info' and below to combined.log
        new winston.transports.File({
            filename: path.join(logsDir, 'combined.log')
        }),
        // Write all logs with level 'error' and below to error.log
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error'
        })
    ]
});

// Log system interactions
const logSystemInteraction = (action, details) => {
    logger.info('System Interaction', {
        action,
        details,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
};

// Log errors
const logError = (error, context) => {
    logger.error('Error', {
        error: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
};

// Log API requests
const logAPIRequest = (req, res, responseTime) => {
    logger.info('API Request', {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        responseTime,
        userAgent: req.headers['user-agent'],
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    logger,
    logSystemInteraction,
    logError,
    logAPIRequest
}; 
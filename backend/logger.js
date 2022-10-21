import winston, { format } from "winston";
const tsFormat = () => ( new Date() ).toLocaleDateString() + ' - ' + ( new Date() ).toLocaleTimeString();

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
    ),
    transports: [
        new ( winston.transports.Console )({ 
            timestamp: tsFormat,
            colorize: true,
        }),
        new winston.transports.File({ filename: 'combined.log'})
    ]
});

export default logger;
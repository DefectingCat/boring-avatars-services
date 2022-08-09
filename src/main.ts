import express from 'express';
import helmet from 'helmet';
import winston from 'winston';
import expressWinston from 'express-winston';
import helloRouter from './routes/hello';
import avatarsRouter from './routes/avatars';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
    })
);

app.use(helloRouter);
app.use(avatarsRouter);

app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
    })
);

app.listen(port, () => {
    console.log(`Server running on ${port}, http://localhost:${port}`);
});

// Export default
export default app;

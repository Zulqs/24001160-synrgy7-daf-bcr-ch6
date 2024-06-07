import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yml'));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BCR Chapter 6 API',
            version: '1.0.0',
            description: 'Chapter 6 SYNRGY7 Binar.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./app/routes/*.ts', './app/models/*.ts'],
};

const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;

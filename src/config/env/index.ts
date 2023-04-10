import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
}

const NODE_ENV: string =  'production';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: 'mongodb://localhost:27017/',
        MONGODB_DB_MAIN:'Nombre de base de datos'
    },
    secret: process.env.SECRET || '@QEGTUI'
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: 'Generar en mongo db atlas',//Generar en monbo db atlas
        MONGODB_DB_MAIN: 'Nombre de base de datos'
    },
    secret: process.env.SECRET || '@QEGTUI'
};

const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        MONGODB_DB_MAIN: 'Nombre de base de datos'
    },
    secret: process.env.SECRET || '@QEGTUI'
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production
};

export default config[NODE_ENV];

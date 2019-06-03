const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                dbUrl: 'mongodb+srv://admin:PASSWORD@CLUSTER.mongodb.net/test?retryWrites=true&w=majority',
                    jwt_secret: 'frenchfries2019',
                    jwt_expires: '7d',
                    bycript_salts: 10
            }
            case 'qa':
                return {
                    dbUrl: 'mongodb+srv://admin:PASSWORD@CLUSTER.mongodb.net/test?retryWrites=true&w=majority',
                        jwt_secret: 'frenchfries2019',
                        jwt_expires: '1h',
                        bycript_salts: 10
                }
                case 'prod':
                    return {
                        dbUrl: 'mongodb+srv://admin:PASSWORD@CLUSTER.mongodb.net/test?retryWrites=true&w=majority',
                            jwt_secret: 'SNU3htPZNOLmt4hFCOHeLCT9RjFSoMmHVbKIjw8a',
                            jwt_expires: '1h',
                            bycript_salts: 10
                    }
    }
}

console.log(`Inicializing the Api - Environment: ${env.toUpperCase()}`);

module.exports = config();
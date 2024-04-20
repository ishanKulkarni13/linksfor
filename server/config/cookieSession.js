
import MongoStore from 'connect-mongo';

const sessionStorage = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB_NAME,
    collectionName: "sessions",
    ttl:  30 * 60, // temp
    // ttl: 1 * 24 * 60 * 60, //1d in sec as user will not configure the tree or other things daily
})

export const cookieSessionConfig = {
    secret: process.env.SESSION_SESSION_SECREAT,
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false
    },
    store: sessionStorage,
}
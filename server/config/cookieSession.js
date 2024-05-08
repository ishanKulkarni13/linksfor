
import MongoStore from 'connect-mongo';

const sessionStorage = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB_NAME,
    collectionName: "sessions",
    // ttl:  30 * 60, // temp
    ttl: 7 * 24 * 60 * 60,
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
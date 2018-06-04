function headersValidation(router) {
    router.use((req, res, next) => {
        req.clientIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
        req.userAgent = req.headers['user-agent'];
        next();
    });
}

module.exports = headersValidation;
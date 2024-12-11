"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
/*export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]
        if(whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}*/
exports.corsConfig = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
//# sourceMappingURL=cors.js.map
import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: true,
    message: { error: "Too many requests, please try again later." }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Too many login attempts from this IP, please try again after 15 minutes." }
});

export { globalLimiter, authLimiter };
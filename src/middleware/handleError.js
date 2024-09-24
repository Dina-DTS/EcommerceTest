import { AppError } from "../../utils/AppError.js";

// Error handling wrapper
export const handleError = (fn) => {
    return (req, res, next) => {
        // Ensure fn receives next as an argument
        fn(req, res, next).catch(err => next(new AppError(err, 401)));
    };
};

const { body, validationResult } = require("express-validator")

const validateBar = [
    body("name")
        .notEmpty().withMessage("name is required")
        .isString().withMessage("name must be a string")
        .trim(),

    body("address")
        .notEmpty().withMessage("address is required")
        .isString().withMessage("address must be a string")
        .trim(),

    body("tel")
        .isString().withMessage("Tel must be a string")
        .trim(),

    body("email")
        .notEmpty().withMessage("email is required")
        .isString().withMessage("email must be a string")
        .trim(),

    body("description")
        .isString().withMessage("description must be a string")
        .trim(),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

const validateBeer = [
    body("name")
        .notEmpty().withMessage("name is required")
        .isString().withMessage("name must be a string")
        .trim(),

    body("description")
        .isString().withMessage("description must be a string")
        .trim(),

    body("degree")
        .notEmpty().withMessage("degree is required")
        .isFloat().withMessage("degree must be a float")
        .trim(),

    body("price")
        .notEmpty().withMessage("price is required")
        .isFloat({gt:0}).withMessage("price must be a positive float")
        .trim(),

        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
    
            next()
        }
]

const validateOrder = [
    body("name")
        .notEmpty().withMessage("name is required")
        .isString().withMessage("name must be a string")
        .trim(),

    body("price")
        .notEmpty().withMessage("price is required")
        .isFloat({gt:0}).withMessage("price must be a positive float")
        .trim(),

    body("date")
        .notEmpty().withMessage("date is required")
        .isDate().withMessage("Invalid date format")
        .custom(value => {
            if (new Date(value) > new Date()) {
                throw new Error("Order date cannot be in the future")
            }
            return true;
        }),

    body("status")
        .notEmpty().withMessage("status is required")
        .isString().withMessage("status must be a string")
        .isIn(["en cours", "terminée"]).withMessage("Invalid status")
        .trim(),

        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
    
            next()
        }
]

module.exports = {validateBar, validateBeer, validateOrder}

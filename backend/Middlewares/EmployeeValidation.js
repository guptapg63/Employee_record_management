import joi from 'joi';

const employeeValidation = (req, res, next) => {
    const schema = joi.object({

        name: joi.string().min(3).max(100).required(),
        address: joi.string().required(),
        dateOfBirth: joi.date().required(),
        skills: joi.array().items(joi.string()).required(),
        photo: joi.string().optional(),
    });


    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
}

export default employeeValidation;
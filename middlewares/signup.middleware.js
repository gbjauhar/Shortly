import signUpSchema from "../schemas/signup.schema.js";

export default function signUpValidation(req, res, next){
    const { error } = signUpSchema.validate(req.body, { abortEarly: false })
    if(error){
        const err = error.details.map(detail => detail.message)
        return res.status(422).send(err)
    }
    next()
}
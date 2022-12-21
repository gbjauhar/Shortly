import signInSchema from "../schemas/signin.schema.js";

export default function signInValidation(req, res, next){
    const { error } = signInSchema.validate(req.body, { abortEarly: false })
    if(error){
        const err = error.details.map(detail => detail.message)
        return res.status(422).send(err)
    }
    next()
}
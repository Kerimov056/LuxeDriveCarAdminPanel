import * as Yup from "yup";



const loginSchema = Yup.object({
    UsernameOrEmail: Yup.string()
    .email()
    .min(5,"Too Short!")
    .max(255,"Too Long")
    .required("Required"),

    password: Yup.string()
    .min(5,"Too Short")
    .max(255,"Too Long")
    
    .required("Required")
});

export default loginSchema
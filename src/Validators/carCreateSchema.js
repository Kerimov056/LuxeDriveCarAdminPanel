import * as Yup from "yup";

const carCreateSchema = Yup.object({
    Marka: Yup.string()
        .required("Required"),

    Model: Yup.string()
        .required("Required"),

    Year: Yup.string()
        .required("Required"),

    CarType: Yup.string()
        .required("Required"),

    CarCategory: Yup.string()
        .required("Required"),

    Image: Yup.mixed()
        .required("Required"),

    Price: Yup.number()
        .min(5, "Too Short!")
        .max(255, "Too Long")
        .required("Required"),

    Description: Yup.string()
        .email()
        .min(5, "Too Short!")
        .max(255, "Too Long")
        .required("Required"),


    tags: Yup.string()
        .email()
        .min(5, "Too Short!")
        .max(255, "Too Long")
        .required("Required"),
});

export default carCreateSchema;

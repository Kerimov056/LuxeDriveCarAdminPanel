import * as Yup from "yup";

const carCreateSchema = Yup.object({
    // Marka: Yup.string()
    //     .required("Required"),

    // Model: Yup.string()
    //     .required("Required"),

    // Year: Yup.string()
    //     .required("Required"),

    // CarType: Yup.array()
    //     .required("Required"),

    // CarCategory: Yup.array()
    //     .required("Required"),

    // Image: Yup.mixed()
    //     .required("Required"),

    Price: Yup.number()
        .required("Required"),

    Description: Yup.string()
        .min(1, "Too Short!")
        .max(12000, "Too Long")
        .required("Required"),


    tags: Yup.string()
        .min(1, "Too Short!")
        .max(255, "Too Long")
        .required("Required"),
});

export default carCreateSchema;

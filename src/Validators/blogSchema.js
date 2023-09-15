import * as Yup from "yup";

const advantagesSchema = Yup.object({
    Title: Yup.string()
        .min(1, "Too Short!")
        .max(100, "Too Long")
        .required("Required"),

    Description: Yup.string()
        .min(5, "Too Short!")
        .max(1000, "Too Long")
        .required("Required"),

    blogImages: Yup.mixed()
        .required("A file is required")
});

export default advantagesSchema;

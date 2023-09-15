import * as Yup from "yup";

const advantagesSchema = Yup.object({
    Title: Yup.string()
        .min(1, "Too Short!")
        .max(100, "Too Long")
        .required("Required"),

    Descrption: Yup.string()
        .min(5, "Too Short!")
        .max(1000, "Too Long")
        .required("Required"),
});

export default advantagesSchema;

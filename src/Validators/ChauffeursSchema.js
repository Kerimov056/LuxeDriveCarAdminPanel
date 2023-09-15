import * as Yup from "yup";

const ChauffeursSchema = Yup.object({

    Name: Yup.string()
        .min(2, "Too Short!")
        .max(100, "Too Long")
        .required("Required"),

    Number: Yup.number()
        .required("Required"),

    Price: Yup.number()
        .required("Required"),

});

export default ChauffeursSchema;

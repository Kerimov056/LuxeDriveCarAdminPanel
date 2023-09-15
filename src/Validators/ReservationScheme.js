import * as Yup from "yup";

const reservationSchema = Yup.object({
    FullName: Yup.string()
        .min(5, "Too Short!")
        .max(125, "Too Long")
        .required("Required"),

    Email: Yup.string()
        .email()
        .min(5, "Too Short!")
        .max(255, "Too Long")
        .required("Required"),

    Number: Yup.number() // <- Changed this line
        .min(5, "Too Short!")
        .max(255, "Too Long")
        .required("Required"),

    PickupDate: Yup.string()
        .required("Required"),

    ReturnDate: Yup.string()
        .required("Required"),

});

// isInvalid={reservFormik.errors.Image && reservFormik.touched.Image}
// {reservFormik.touched.Image && reservFormik.errors.Image}



export default reservationSchema;

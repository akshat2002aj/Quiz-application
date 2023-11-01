import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../../App.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../Input/Input";
import { toast } from "react-hot-toast";
import Loading from "../../Layout/Loading/Loading";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  description: Yup.string().trim().required("Description is required"),
  duration: Yup.number().required("Duration is required"),
  image: Yup.string().required("Image is required"),
  startTime: Yup.date().required("Start time is required!"),
  endTime: Yup.date().required("End time is required"),
});

const AdminCreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const quizData = {
    name: "",
    description: "",
    duration: "",
    image: "",
    startTime: "",
    endTime: "",
  };

  const handleDateChange = (date, setFieldValue, fieldName) => {
    setFieldValue(fieldName, date);
  };

  const imagehandler = (e, setFieldValue, fieldName) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFieldValue(fieldName, reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const data = await axios.post(
        "https://treasure-hunt-tcb7.onrender.com/api/v1/quiz/create-quiz",
        {
          name: values.name,
          description: values.description,
          image: values.image,
          startTime: values.startTime,
          endTime: values.endTime,
          duration: +values.duration,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Quiz created successfully!");
      setSubmitting(false);
      setLoading(false);
      navigate("/admin-quiz");
    } catch (error) {
      setSubmitting(false);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-white-100 flex items-center justify-center relative">
      <div className="bg-gray-300 rounded-3xl p-6 md:p-12 shadow-2xl  w-full md:w-[40rem] m-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Create a Quiz</h2>
        {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
        <Formik
          initialValues={quizData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, { setSubmitting });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            const { name, description, duration, image, startTime, endTime } =
              values;
            return (
              <Form>
                <Input
                  type="text"
                  label="Name"
                  placeholder="Quiz Name"
                  id="name"
                  className="p-2 border rounded-xl w-full"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                />
                <Input
                  text="textarea"
                  label="Description"
                  placeholder="Quiz Description"
                  className="p-2 border rounded-xl w-full"
                  id="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && errors.description}
                />

                <div className="mb-4 w-full flex flex-col">
                  <label
                    className="block text-gray-700 font-bold mb-2 text-lg"
                    htmlFor="startTime"
                  >
                    Start Time
                  </label>
                  <DatePicker
                    selected={startTime}
                    onChange={(e) =>
                      handleDateChange(e, setFieldValue, "startTime")
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    placeholderText="MM/DD/YYYY  HH:MM  AA"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="p-2 mr-6 border rounded-xl w-full"
                    minDate={Date.now()}
                  />
                  {touched.startTime && (
                    <p className="text-[crimson] text-sm mr-2 mb-2 self-end">
                      {errors.startTime}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-full flex flex-col">
                  <label
                    className="block text-gray-700 font-bold mb-2 text-lg"
                    htmlFor="endTime"
                  >
                    End Time
                  </label>
                  <DatePicker
                    selected={endTime}
                    onChange={(e) =>
                      handleDateChange(e, setFieldValue, "endTime")
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    placeholderText="MM/DD/YYYY  HH:MM  AA"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="p-2 mr-6 border rounded-xl w-full"
                    minDate={startTime}
                  />
                  {touched.endTime && (
                    <p className="text-[crimson] text-sm mr-2 mb-2 self-end">
                      {errors.endTime}
                    </p>
                  )}
                </div>
                <div className="mb-4 flex flex-col">
                  <Input
                    type="number"
                    label="Duration"
                    placeholder="Quiz Duration in Minutes"
                    className="p-2 border rounded-xl w-full"
                    id="duration"
                    value={duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.duration && errors.duration}
                  />
                </div>
                <div className="mb-4 flex flex-col">
                  <h1 className="block text-gray-700 font-bold mb-2 text-lg">
                    Image Upload
                  </h1>
                  <div className="mt-5 ">
                    <label
                      htmlFor="image"
                      className="cursor-pointer bg-indigo-600 text-white font-bold  px-4 py-3 rounded-full focus:outline hover:text-indigo-600 hover:bg-white w-[30%] h-auto items-center"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className=" md:w-[10%] "
                      onChange={(e) => imagehandler(e, setFieldValue, "image")}
                      hidden
                    />
                    <img className="mx-2 mt-6 w-[250px]" src={image} />
                  </div>
                  {touched.image && (
                    <p className="text-[crimson] text-sm mr-2 mb-2 self-end">
                      {errors.image}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 items-center text-lg text-white font-bold px-2 py-2 rounded-xl focus:outline hover:text-indigo-600 hover:bg-white w-full"
                >
                  Create Quiz
                </button>
              </Form>
            );
          }}
        </Formik>
        {/* </form> */}
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
};

export default AdminCreateQuiz;

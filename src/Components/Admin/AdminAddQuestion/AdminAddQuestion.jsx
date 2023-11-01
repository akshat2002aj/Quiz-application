import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Formik, Form, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "../../Input/Input";
import {toast} from 'react-hot-toast';
import Loading from "../../Layout/Loading/Loading";

const validationSchema = Yup.object().shape({
  description: Yup.string().trim().required("Description is required"),
  imgdescp: Yup.string(),
  option1: Yup.string().when("imgoption1", {
    is: item => item && item.length>0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Option 1 is required"),
  }),
  imgoption1: Yup.string().when("option1", {
    is: item=> item && item.length > 0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Img Option 1 is required"),
  }),
  option2: Yup.string().when("imgoption2", {
    is: item => item && item.length>0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Option 2 is required"),
  }),
  imgoption2: Yup.string().when("option2", {
    is: item=> item && item.length > 0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Img Option 2 is required"),
  }),
  option3: Yup.string().when("imgoption3", {
    is: item => item && item.length>0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Option 3 is required"),
  }),
  imgoption3: Yup.string().when("option3", {
    is: item=> item && item.length > 0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Img Option 3 is required"),
  }),
  option4: Yup.string().when("imgoption4", {
    is: item => item && item.length>0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Option 4 is required"),
  }),
  imgoption4: Yup.string().when("option4", {
    is: item=> item && item.length > 0,
    then: ()=>Yup.string(),
    otherwise: ()=>Yup.string().required("Img Option 4 is required"),
  }),
  correctOption:Yup.number()
}, [['imgoption1', 'option1'], ['imgoption2', 'option2'], ['imgoption3', 'option3'], ['imgoption4', 'option4']]);

const AdminAddQuestion = ({ quiz }) => {
  // console.log("New", quiz);
  const navigate = useNavigate();

  const emptyElement = {
    description: "",
    imgdescp: "",
    option1: "",
    imgoption1: "",
    option2: "",
    imgoption2: "",
    option3: "",
    imgoption3: "",
    option4: "",
    imgoption4: "",
    correctoption: "",
  };
  const [question, setQuestion] = useState(emptyElement);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setQuestion({ ...question, [name]: file });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  const handleSubmit = async (values, {setSubmitting}) => {
    setLoading(true);
    const data = {
        description: values.description,
      imageDescription: values.imgdescp,
      options: [
        {
          text: values.option1,
          image: values.imgoption1,
        },
        {
          text: values.option2,
          image: values.imgoption2,
        },
        {
          text: values.option3,
          image: values.imgoption3,
        },
        {
          text: values.option4,
          image: values.imgoption4,
        },
      ],
      correctOption: +values.correctoption,
    };
    try {
      const d = await axios.post(
        `https://treasure-hunt-tcb7.onrender.com/api/v1/question/create-question/${quiz._id}`,
        data,
        { withCredentials: true }
      );
      // console.log(d);
      toast.success("Question created successfully!")
      navigate(`/admin-quiz-question/${quiz._id}`)
      setSubmitting(true)
      setLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSubmitting(true)
      setLoading(false)
    }
  };

  const imagehandler = (e, setFieldValue, fieldName) => {
    if (e.target.files[0]) {
      setQuestion({ ...question, [e.target.name]: e.target.files[0] });
    }

    // console.log(fieldName)

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log(1, fieldName);
        // console.log(reader.result);
        // setQuestion({ ...question, [e.target.name]: reader.result });
        setFieldValue(fieldName, reader.result)
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center mt-4 ">
      <div className="flex-col items-center justify-center">
        <div className="bg-gray-300 rounded-xl p-6 md:p-8 w-[90%] m-4 shadow-xl md:w-[36rem]  ">
          <h1 className="font-bold text-transform: uppercase text-3xl text-gray-800 mb-4 flex justify-center border-b-2 border-black pb-4">
            {quiz.name}
          </h1>
          <h1 className="font-semibold text-xl text-gray-800 mb-4">
            New Question
          </h1>
          <Formik
            initialValues={emptyElement}
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
              // handleSubmit,
              isSubmitting,
              setFieldValue,
              // isValid
            }) => {
              console.log(errors)

              const { description, imgdescp,  option1, option2, option3, option4, imgoption1, imgoption2, imgoption3, imgoption4, correctoption } = values;
              return (
                <Form>
                  <div className="mb-2">
                    <div className="flex items-center justify-center">
                      <Input
                        type="textarea"
                        className="p-2 border rounded-xl md:w-full w-full h-32 resize-none"
                        label="Description"
                        placeholder="Quiz Description"
                        id="description"
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && errors.description}
                      />

                      <label
                        htmlFor="imgdescp"
                        className="ml-1 md:ml-5 flex-col flex justify-center w-[10%] cursor-pointer "
                      >
                        <AiOutlineCloudUpload
                          size={50}
                          color="indigo"
                          className="hidden md:block"
                        />
                        <AiOutlineCloudUpload
                          size={45}
                          color="indigo"
                          className="visible md:hidden"
                        />
                      </label>
                      <input
                        type="file"
                        id="imgdescp"
                        name="imgdescp"
                        accept="image/*"
                        className=" md:w-[10%] "
                        // value={imgoption1}
                        onBlur={handleBlur}
                        onChange={(e)=>imagehandler(e, setFieldValue,'imgdescp')}
                        hidden
                      />
                    </div>
                    <img
                      className="mx-2 my-3"
                      src={imgdescp}
                      width={100}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-end">
                      <Input
                        type="text"
                        label="Option 1:"
                        placeholder="Option 1"
                        id="option1"
                        className="p-2 border rounded-xl w-full"
                        value={option1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(touched.option1 || touched.imgoption1) && (errors.option1 || errors.imgoption1)}
                      />
                      <label
                        htmlFor="option1img"
                        className="ml-1 md:ml-5 w-[10%] cursor-pointer "
                      >
                        <AiOutlineCloudUpload
                          size={50}
                          color="indigo"
                          className="hidden md:block"
                        />
                        <AiOutlineCloudUpload
                          size={45}
                          color="indigo"
                          className="visible md:hidden"
                        />
                      </label>
                      <input
                        type="file"
                        id="option1img"
                        name="imgoption1"
                        accept="image/*"
                        className=" md:w-1/2 inp"
                        onBlur={handleBlur}
                        onChange={(e)=>imagehandler(e, setFieldValue, 'imgoption1')}
                        hidden
                      />
                    </div>
                    <img
                      className="mx-2 my-3"
                      src={imgoption1}
                      width={100}
                      // alt={fileName}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-end">
                      <Input
                        type="text"
                        label="Option 2:"
                        placeholder="Option 2"
                        id="option2"
                        className="p-2 border rounded-xl w-full"
                        value={option2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(touched.option2 || touched.imgoption2) && (errors.option2 || errors.imgoption2)}
                      />
                      <label
                        htmlFor="option2img"
                        className="ml-1 md:ml-5 w-[10%] cursor-pointer "
                      >
                        <AiOutlineCloudUpload
                          size={50}
                          color="indigo"
                          className="hidden md:block"
                        />
                        <AiOutlineCloudUpload
                          size={45}
                          color="indigo"
                          className="visible md:hidden"
                        />
                      </label>
                      <input
                        type="file"
                        id="option2img"
                        name="imgoption2"
                        accept="image/*"
                        className=" md:w-1/2 inp"
                        onBlur={handleBlur}
                        onChange={(e)=>imagehandler(e, setFieldValue, 'imgoption2')}
                        hidden
                      />
                    </div>
                    <img
                      className="mx-2 my-3"
                      src={imgoption2}
                      width={100}
                      // alt={fileName}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-end">
                      <Input
                        type="text"
                        label="Option 3:"
                        placeholder="Option 3"
                        id="option3"
                        className="p-2 border rounded-xl w-full"
                        value={option3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(touched.option3 || touched.imgoption3) && (errors.option3 || errors.imgoption3)}
                      />
                      <label
                        htmlFor="option3img"
                        className="ml-1 md:ml-5 w-[10%] cursor-pointer "
                      >
                        <AiOutlineCloudUpload
                          size={50}
                          color="indigo"
                          className="hidden md:block"
                        />
                        <AiOutlineCloudUpload
                          size={45}
                          color="indigo"
                          className="visible md:hidden"
                        />
                      </label>
                      <input
                        type="file"
                        id="option3img"
                        name="imgoption3"
                        accept="image/*"
                        className=" md:w-1/2 inp"
                        onBlur={handleBlur}
                        onChange={(e)=>imagehandler(e, setFieldValue, 'imgoption3')}
                        hidden
                      />
                    </div>
                    <img
                      className="mx-2 my-3"
                      src={imgoption3}
                      width={100}
                      // alt={fileName}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-end">
                      <Input
                        type="text"
                        label="Option 4:"
                        placeholder="Option 4"
                        id="option4"
                        className="p-2 border rounded-xl w-full"
                        value={option4}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(touched.option4 || touched.imgoption4) && (errors.option4 || errors.imgoption4)}
                      />
                      <label
                        htmlFor="option4img"
                        className="ml-1 md:ml-5 w-[10%] cursor-pointer"
                      >
                        <AiOutlineCloudUpload
                          size={50}
                          color="indigo"
                          className="hidden md:block"
                        />
                        <AiOutlineCloudUpload
                          size={45}
                          color="indigo"
                          className="visible md:hidden"
                        />
                      </label>
                      <input
                        type="file"
                        id="option4img"
                        name="imgoption4"
                        accept="image/*"
                        className=" md:w-1/2"
                        onBlur={handleBlur}
                        onChange={(e)=>imagehandler(e, setFieldValue, 'imgoption4')}
                        hidden
                      />
                    </div>
                    <img
                      className="mx-2 my-3"
                      src={imgoption4}
                      width={100}
                      // alt={fileName}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="answer"
                    >
                      Correct Answer
                    </label>
                    <div>
                      <select
                        value={correctoption}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="correctoption"
                        className="p-3 border rounded-xl w-[86%]"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                        <option value={4}>Option 4</option>
                      </select>
                      {touched.correctoption && errors.correctoption && (
                        <p className="text-[crimson] text-sm mr-2 mb-2 self-end">
                          {errors.correctoption}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                  type="submit"
                  disabled={isSubmitting}
                  // onClick={(e)=>handleSubmit(e, values)}
                  className="bg-indigo-600 items-center text-lg text-white font-bold px-2 py-2 rounded-xl mt-8 hover:text-indigo-600 hover:bg-white hover:border-2 hover:border-indigo-600 w-full"
                >
                  Create Question
                </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      {
        loading ? <Loading /> : null
      }
    </div>
  );
};

export default AdminAddQuestion;

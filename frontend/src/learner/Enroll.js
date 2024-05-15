import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import EnrollBackground from "../assets/enroll.jpg";
import HeroCover from "./HeroCover";
import NavBar from "./NavBar";
import {GiProgression} from "react-icons/gi";
import {IoTime} from "react-icons/io5";
import {FaBookReader} from "react-icons/fa";
import Modal from "./Modal";

const Enroll = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const learnerId = "123f55396a149b001f8a1234";
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4003/api/v1/course/getApproved`
        );

        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchAllCourses();
  }, []);

  const handleEnroll = async (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmEnroll = async (course) => {
    // localStorage.setItem("courseData", JSON.stringify(course));

    const learnerId = "123f55396a149b001f8a1234";
    console.log("call proceed to payment");
    console.log("Enrolled to " + course._id);
    try {
      const response = await axios.post(
        `http://localhost:4002/learner/course/enroll?courseId=${course._id}`,
        {learnerId}
      );

      console.log(response.data.message);

      if (response.status === 200) {
        navigate("/enroll/success"); // direct to payment api
      } else {
        navigate("/enroll/unsuccess");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      // Handle error
    }
  };

  const confirmEnrollBtn = async (course) => {
    // localStorage.setItem("courseData", JSON.stringify(course));

    const learnerId = "123f55396a149b001f8a1234";
    console.log("call proceed to payment");
    console.log("Enrolled to " + course._id);
    try {
      const response = await axios.post(
        `http://localhost:4002/learner/course/enroll?courseId=${course._id}`,
        {learnerId}
      );

      console.log(response.data.message);

      if (response.status === 200) {
        alert("You have successfully enrolled to this course");
        navigate("/enrolledCourses"); // direct to payment api
      } else {
        navigate("/enroll/unsuccess");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      // Handle error
    }
  };

  const callPayment = async (course) => {
    // localStorage.setItem("courseData", JSON.stringify(course));

    const learnerId = "123f55396a149b001f8a1234";
    console.log("call payment API");
    console.log("Payment for course" + course._id);

    const imagePath = course.preview.replace(/\\/g, "/");

    const items = {
      products: [
        {
          name: course.CourseName,
          price: course.price,
          images: [`http://localhost:4003/${imagePath}`],
          quantity: 1,
        },
      ],
    };
    try {
      const response = await axios.post(`http://localhost:4004/api/payment`, {
        items: items,
      });

      if (response.status === 200) {
        console.log(response.data.url);
        //navigate to the stripe generated payment url
        window.location.href = response.data.url;
      } else {
        navigate("/enroll/unsuccess");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      // Handle error
      navigate("/enroll/unsuccess");
    }
  };

  return (
    <div className="container px-4 mx-auto">
      <div
        className="relative inset-0 z-0 bg-center bg-cover"
        style={{height: "40vh"}}
      >
        <div
          className="absolute inset-0 z-0 bg-green-900"
          //   style={{ backgroundImage: `url(${EnrollBackground})` }}
        >
          {/* <NavBar /> */}
        </div>
        <header className="absolute px-10 mb-2 top-10 md:top-52">
          <div className="items-start justify-center text-center">
            <h2 className="text-lg font-bold text-white md:text-4xl">
              Featured Courses
            </h2>
          </div>
        </header>
      </div>

      {/* Display enrolled courses */}
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <img
              className="object-cover object-center w-full h-40 shadow-lg"
              src={`http://localhost:4003/${course.preview.replace("\\", "/")}`}
              alt={course.CourseName}
            />

            <div className="flex flex-col px-2 py-4">
              <div className="mb-2 ">
                <h3 className="text-xl font-semibold text-gray-900">
                  {course.CourseName}
                </h3>
              </div>

              <div className="flex flex-row ">
                <div className="flex flex-row flex-1 gap-1 justify-left ">
                  <GiProgression />
                  <p className="">{course.level}</p>
                </div>
                <div className="flex flex-row flex-1 gap-1 justify-left">
                  <FaBookReader />
                  <p>{course.lessons.length}</p>lessons
                </div>
                <div className="flex flex-row flex-1 gap-1 justify-left">
                  <IoTime />
                  <p>{course.duration}</p>
                </div>
              </div>

              <div className="flex flex-row justify-around gap-1 item-center ">
                <div className="flex flex-row p-0 justify-centeritems-center">
                  <p className="text-xl font-bold text-stone-900 ">
                    LKR {course.price}
                  </p>
                </div>
                <div>
                  <Link
                    // to={`/courses/${course._courseId}`}
                    onClick={() => handleEnroll(course)}
                    className="items-center justify-center block px-4 py-2 font-bold text-center text-gray-800 bg-gray-200 border-2 rounded tex-center hover:bg-gray-800 focus:outline-none focus:shadow-outline border-gray-950 hover:text-gray-100"
                  >
                    Enroll me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <h2 className="font-sans text-xl font-bold">
            {selectedCourse.CourseName}
          </h2>
          <img
            src={`http://localhost:4003/${selectedCourse.preview.replace(
              "\\",
              "/"
            )}`}
          />
          <div className="flex flex-row items-center justify-around px-2 pt-2 pb-1 rounded-lg">
            <div className="flex flex-row justify-center flex-1 gap-1 ">
              <GiProgression />
              <p className="">{selectedCourse.level}</p>
            </div>
            <div className="flex flex-row justify-center flex-1 gap-1">
              <FaBookReader />
              <p>{selectedCourse.lessons.length}</p>lessons
            </div>
            <div className="flex flex-row justify-center flex-1 gap-1">
              <IoTime />
              <p>{selectedCourse.duration}</p>
            </div>
          </div>

          <div className="py-2 pb-2 font-semibold text-justify">
            Instructor: {selectedCourse.instructor}
          </div>
          <div className="py-2 pb-2 text-justify">
            {selectedCourse.description}
          </div>
          <div className="flex flex-row justify-between pt-2">
            <p>Price</p>
            <p className="font-sans text-lg font-bold ">
              LKR {selectedCourse.price}
            </p>
          </div>
          <button
            className="w-full px-5 py-2 text-white bg-green-600"
            onClick={() => confirmEnrollBtn(selectedCourse)}
          >
            Confirm Enrollment
          </button>
          <button
            className="w-full px-5 py-2 mt-2 text-white bg-blue-600"
            onClick={() => callPayment(selectedCourse)}
          >
            Proceed to Payment
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Enroll;

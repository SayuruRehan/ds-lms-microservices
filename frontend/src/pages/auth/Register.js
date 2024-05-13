import {useState} from "react";
import logoImage from "../../assets/Edu-logo.png";
import PopUp from "../../components/PopUp";

export default function Login() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // API - signUpHandler
  const signUpHandler = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(`http://localhost:4001/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          NIC: formData.get("NIC"),
          password: formData.get("password"),
          role: formData.get("role"),
        }),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        console.log(responseData.message);
        setPopupMessage("Alright! 👏 Your Account is successfully created 🔥");
        setShowPopup(true);

        // Check if there's a cookie and log it
        const cookie = response.headers.get("Set-Cookie");
        if (cookie) {
          console.log("Received cookie:", cookie);
        }
        // redirect the user home page
        window.location.href = "/";
      } else if (response.status === 400) {
        console.log(responseData.message);
        setPopupMessage("Oh no! 🫣 You already have an account 😇");
        setShowPopup(true);
      } else if (response.status === 500) {
        console.log(responseData.message);
        setPopupMessage(
          `Oh sorry! 😔 Seems to be interal server error, Please try again later 🫂 \n\n\n NOTE: ${responseData.message}`
        );
        setShowPopup(true);
      } else {
        console.log("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handler - Modler Handler
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <PopUp
          heading="Create a New Account"
          message={popupMessage}
          onClose={closePopup}
        />
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logoImage}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={signUpHandler}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="NIC"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                NIC
              </label>
              <div className="mt-2">
                <input
                  id="NIC"
                  name="NIC"
                  type="text"
                  autoComplete="NIC"
                  required
                  className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-green-900 hover:text-green-800"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                I am ...
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  type="text"
                  autoComplete="role"
                  required
                  className="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="learner">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-green-900 hover:text-green-800"
            >
              Click to login!
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

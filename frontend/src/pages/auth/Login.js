import {useState} from "react";
import {useCookies} from "react-cookie";
import logoImage from "../../assets/Edu-logo.png";
import PopUp from "../../components/PopUp";

export default function Login() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [tokenCookie, setTokenCookie] = useCookies(["token"]);
  const [roleCookie, setRoleCookie] = useCookies("role");
  const [userIdCookie, setUserIdCookie] = useCookies("userId");

  // API - loginHandler
  const loginHandler = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(`http://localhost:4001/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        console.log(responseData.token);

        // Calculate expiration time (e.g., 1 day from now)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1); // Adding 1 day

        // Save the token in a cookie with expiration time
        setTokenCookie("token", responseData.token, {
          path: "/",
          expires: expirationDate, // Set expiration date
        });
        setRoleCookie("role", responseData.role, {
          path: "/",
          expires: expirationDate, // Set expiration date
        });
        setUserIdCookie("userId", responseData.user_id, {
          path: "/",
          expires: expirationDate, // Set expiration date
        });

        // console.log("Token saved in cookie:", responseData.token);

        // redirect the user home page
        window.location.href = "/";
      } else if (response.status === 404) {
        console.log(responseData.message);
        setPopupMessage(
          "Oh no! 🫣 Seems to be you are not registered in our system. Please feel free to Sign Up today 😇"
        );
        setShowPopup(true);
      } else if (response.status === 401) {
        console.log(responseData.message);
        setPopupMessage("Really! 🧐 Try again, Invalid Credentials 🤥");
        setShowPopup(true);
      } else if (response.status === 500) {
        console.log(responseData.message);
        setPopupMessage(
          "Oh sorry! 😔 Seems to be interal server error, Please try again later 🫂"
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
          heading="Login Faild!"
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={loginHandler}
          >
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
                  className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
                  className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-green-900 hover:text-green-800"
            >
              Sign up now!
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

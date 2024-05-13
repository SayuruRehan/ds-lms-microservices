import {useState} from "react";
import {useCookies} from "react-cookie";
import {Dialog} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import logoImage from "../assets/Edu-logo.png";

const navigation = [
  {name: "Home", href: "/"},
  {name: "Courses", href: "/all"},
  {name: "My Learnings", href: "/enrolledCourses"},
  {name: "About Us", href: "/about-us"},
];

export default function Header({fontColor, headerAbsolute}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tockenCookie, setTokenCookie, removeTokenCookie] = useCookies([
    "token",
  ]);
  const [roleCookie, setRoleCookie, removeRoleCookie] = useCookies(["role"]);
  const [userIdcookie, setUserIdCookie, removeUserIdCookie] = useCookies([
    "userId",
  ]);

  const isLoggedIn = tockenCookie.token !== undefined;

  const handleLogout = () => {
    // Delete the token cookie
    removeTokenCookie("token");
    removeRoleCookie("role");
    removeUserIdCookie("userId");
    // Reload the page
    window.location.reload();
  };

  return (
    // <header className={fontColor + " absolute inset-x-0 top-0 z-50"}>
    <header className={`${fontColor} ${headerAbsolute} inset-x-0 top-0 z-50`}>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MARS</span>
            <img
              data-testid="logoImg"
              className="h-10 w-auto"
              src={logoImage}
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 black-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className={`h-6 ${mobileMenuOpen ? "hidden" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 black-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <a
              onClick={handleLogout}
              className="text-sm font-semibold leading-6 white-900"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <a
              href="/login"
              className="text-sm font-semibold leading-6 white-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={logoImage.src} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 white-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 white-900 hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 white-900 hover:bg-gray-700"
                  >
                    Log out
                  </button>
                ) : (
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 white-900 hover:bg-gray-700"
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

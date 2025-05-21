import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // user menu
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Enquiry", path: "/enquiry" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-steelblue-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold font-heading">
                SS STEEL INDIA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isActive(link.path) ? "nav-link-active" : "nav-link-default"
                } nav-link`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-3">
                {!isAdmin && (
                  <Link
                    to="/cart"
                    className="text-white hover:text-steelgray-200"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                )}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 cursor-pointer text-white p-1 rounded-md hover:bg-steelblue-800 focus:outline-none"
                  >
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <Link
                          to={
                            isAdmin ? "/admin/dashboard" : "/customer/dashboard"
                          }
                          className="block px-4 py-2 text-sm text-steelgray-700 hover:bg-steelgray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-steelgray-700 hover:bg-steelgray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-steelred-500 hover:bg-steelred-600">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-steelgray-200 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-steelblue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? "bg-steelblue-700 text-white"
                    : "text-steelgray-100 hover:bg-steelblue-600 hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-steelgray-100 hover:bg-steelblue-600 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {!isAdmin && (
                  <Link
                    to="/cart"
                    className="block px-3 py-2 rounded-md text-base font-medium text-steelgray-100 hover:bg-steelblue-600 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Cart
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-steelgray-100 hover:bg-steelblue-600 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-1 px-3 py-2">
                <Link
                  to="/login"
                  className="text-steelgray-100 hover:bg-steelblue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-steelred-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out");
  };

  return (
    <header className="w-full px-4 py-3 bg-white shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">CivicConnect</h1>

      {isMobile ? (
        <div className="relative">
          <button
            className="text-blue-600 font-bold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a>
              <a href="/issues" className="block px-4 py-2 hover:bg-gray-100">Issues</a>
              {user ? (
                <>
                  <span className="block px-4 py-2 text-sm text-gray-700">Hi, {user.name}</span>
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </>
              ) : (
                <>
                  <a href="/login" className="block px-4 py-2 hover:bg-gray-100">Login</a>
                  <a href="/signup" className="block px-4 py-2 hover:bg-gray-100">Signup</a>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <nav className="flex items-center gap-4">
          <a href="/" className="hover:text-blue-500">Home</a>
          <a href="/issues" className="hover:text-blue-500">Issues</a>
          <a href="/community" className="hover:text-blue-500">Community</a>
          {user ? (
            <>
              <span className="text-gray-700">Hi, {user.name}</span>
              <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-blue-500">Login</a>
              <a href="/signup" className="hover:text-blue-500">Signup</a>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;

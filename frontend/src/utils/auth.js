export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("user");
  // Cookie will auto-expire if backend supports logout route (optional)
};

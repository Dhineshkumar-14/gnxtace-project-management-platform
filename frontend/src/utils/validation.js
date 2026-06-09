export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return "";
};

export const validateLoginForm = (formData) => {
  const emailError = validateEmail(formData.email);

  const passwordError = validatePassword(formData.password);

  if (emailError) {
    return emailError;
  }

  if (passwordError) {
    return passwordError;
  }
};

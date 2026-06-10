import ApiError from "../utils/ApiError.js";

export const errorHandler = (error, req, res, next) => {
  // Known application errors
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Zod validation errors
  if (error.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Unexpected errors
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

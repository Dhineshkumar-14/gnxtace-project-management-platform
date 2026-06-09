import * as authService from "../services/authService.js";

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const result = await authService.logout();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

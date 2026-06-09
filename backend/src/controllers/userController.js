import * as userService from "../services/userService.js";
export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, roleId, isActive } = req.query;

    const result = await userService.getUsers({
      page: Number(page),
      limit: Number(limit),
      search,
      roleId,
      isActive: isActive === undefined ? undefined : isActive === "true",
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

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

export const inviteUser = async (req, res, next) => {
  try {
    const result = await userService.inviteUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User invited successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

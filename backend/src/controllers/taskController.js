import * as taskService from "../services/taskService.js";

export const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.query);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
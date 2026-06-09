import * as projectService from "../services/projectService.js";

export const getProjects = async (req, res, next) => {
  try {
    const result = await projectService.getProjects(req.query);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

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

export const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const ownerId = req.user.id; // adjust based on your auth middleware

    const project = await projectService.createProject({
      ownerId,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project archived successfully",
    });
  } catch (error) {
    next(error);
  }
};

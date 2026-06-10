import * as projectRepository from "../repositories/projectRepository.js";
import * as taskRepository from "../repositories/taskRepository.js";

import ApiError from "../utils/ApiError.js";

export const getProjects = async (queryParams) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const offset = (page - 1) * limit;

  const filters = {
    search: queryParams.search || "",
    status: queryParams.status || null,
    ownerId: queryParams.ownerId || null,
    limit,
    offset,
  };

  const projects = await projectRepository.findAll(filters);

  const total = await projectRepository.count(filters);

  const formattedProjects = projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    start_date: project.start_date,
    due_date: project.due_date,
    created_at: project.created_at,
    updated_at: project.updated_at,
    owner: {
      id: project.owner_id,
      first_name: project.owner_first_name,
      last_name: project.owner_last_name,
      email: project.owner_email,
    },
  }));

  return {
    data: formattedProjects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProjectById = async (id) => {
  const project = await projectRepository.findDetailsById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const tasks = await taskRepository.findByProjectId(id);

  const taskSummary = await taskRepository.getTaskSummary(id);

  return {
    project: {
      id: project.id,
      owner_id: project.owner_id,
      name: project.name,
      description: project.description,
      status: project.status,
      start_date: project.start_date,
      due_date: project.due_date,
      created_at: project.created_at,
      updated_at: project.updated_at,
    },

    owner: {
      id: project.owner_user_id,
      name: project.owner_name,
      email: project.owner_email,
    },

    taskSummary,

    tasks,
  };
};

export const createProject = async (projectData) => {
  const {
    ownerId,
    name,
    description,
    status = "active",
    start_date,
    due_date,
  } = projectData;

  if (!ownerId) {
    throw new ApiError(400, "Owner is required");
  }

  if (!name?.trim()) {
    throw new ApiError(400, "Project name is required");
  }

  const projectId = await projectRepository.create({
    ownerId,
    name,
    description,
    status,
    start_date,
    due_date,
  });

  return await projectRepository.findById(projectId);
};

export const updateProject = async (id, projectData) => {
  const project = await projectRepository.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (projectData.name !== undefined && !projectData.name?.trim()) {
    throw new ApiError(400, "Project name is required");
  }

  await projectRepository.update(id, projectData);

  return await projectRepository.findById(id);
};

export const deleteProject = async (id) => {
  const project = await projectRepository.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  await projectRepository.archive(id);

  return true;
};

export const getProjectStats = async (id) => {
  const project = await projectRepository.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return await taskRepository.getProjectStats(id);
};

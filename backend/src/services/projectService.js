import * as projectRepository from "../repositories/projectRepository.js";

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

  return {
    data: projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
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

  if (!name?.trim()) {
    throw new Error("Project name is required");
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

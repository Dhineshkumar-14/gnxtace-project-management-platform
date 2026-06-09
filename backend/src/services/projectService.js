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

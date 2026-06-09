import * as taskRepository from "../repositories/taskRepository.js";

export const getTasks = async (queryParams) => {
  const page = Number(queryParams.page) || 1;

  const limit = Number(queryParams.limit) || 10;

  const offset = (page - 1) * limit;

  const filters = {
    search: queryParams.search || null,
    projectId: queryParams.projectId || null,
    status: queryParams.status || null,
    priority: queryParams.priority || null,
    assigneeId: queryParams.assigneeId || null,
    limit,
    offset,
  };

  const tasks = await taskRepository.findAll(filters);

  const total = await taskRepository.count(filters);

  return {
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

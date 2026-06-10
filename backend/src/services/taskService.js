import * as taskRepository from "../repositories/taskRepository.js";
import * as projectRepository from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";

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

export const createTask = async (taskData) => {
  const {
    project_id,
    assignee_id,
    title,
    description,
    status = "todo",
    priority = "medium",
    due_date,
  } = taskData;

  if (!project_id) {
    throw new ApiError(400, "Project is required");
  }

  const project = await projectRepository.findById(project_id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Task title is required");
  }

  const taskId = await taskRepository.create({
    project_id,
    assignee_id,
    title,
    description,
    status,
    priority,
    due_date,
  });

  return await taskRepository.findById(taskId);
};

export const updateTask = async (id, taskData) => {
  const task = await taskRepository.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await taskRepository.update(id, taskData);

  return await taskRepository.findById(id);
};

export const updateTaskStatus = async (id, status) => {
  const task = await taskRepository.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const allowedStatuses = [
    "todo",
    "in_progress",
    "in_review",
    "done",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid task status");
  }

  await taskRepository.updateStatus(id, status);

  return await taskRepository.findById(id);
};

export const getTaskById = async (id) => {
  const task = await taskRepository.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

export const deleteTask = async (id) => {
  const task = await taskRepository.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await taskRepository.deleteById(id);

  return true;
};

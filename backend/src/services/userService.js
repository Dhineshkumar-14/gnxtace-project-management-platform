import * as userRepository from "../repositories/userRepository.js";
export const getUsers = async ({
  page = 1,
  limit = 10,
  search,
  roleId,
  isActive,
}) => {
  const offset = (page - 1) * limit;

  const filters = {
    search,
    roleId,
    isActive,
    limit,
    offset,
  };

  const [users, total] = await Promise.all([
    userRepository.findAll(filters),
    userRepository.count(filters),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

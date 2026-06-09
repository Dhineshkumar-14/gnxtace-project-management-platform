import * as dashboardService from "../services/dashboardService.js";

export const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

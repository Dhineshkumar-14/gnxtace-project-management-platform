export const authorize = (...requiredPermissions) => {
  return (req, res, next) => {
    try {
      const userPermissions = req.user?.permissions || [];
      console.log(userPermissions);

      const hasPermission = requiredPermissions.some((permission) =>
        userPermissions.includes(permission),
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action.",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

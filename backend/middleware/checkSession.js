export const checkForInvalidSession = (req, res, next) => {
  if (!req.session?.user) {
    next();
  } else {
    return res
      .status(403)
      .json({
        success: false,
        message: "Valid Session Found: You Are Not Allowed Here!",
      });
  }
};

export const checkForInvalidSession = (req, res, next) => {
  if (!req.session?.user) {
    next();
  } else {
    res.redirect(`${process.env.CLIENT_BASE_URL}/app`);
  }
};

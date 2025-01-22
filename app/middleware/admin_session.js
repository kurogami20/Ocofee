function session(req, res, next) {
  if (!req.session.admin) {
    req.session.admin = "";
  }
  next();
  console.log(req.session.admin);
}
export default session;

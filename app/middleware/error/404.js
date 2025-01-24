function error404(req, res) {
  res.status(404).render("error/404.ejs", {
    error404Style: "css",
  });
}
export default error404;

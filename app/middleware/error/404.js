function error404(req, res) {
  res.render("404.ejs", {
    error404Style: "css",
  });
}
export default error404;

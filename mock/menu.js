module.exports = function(app) {
  app.get('/api/getMenu', function(req, res) {
    res.json({ code: 1, data: [{ key: 1 }, { key: 2 }] });
  });
};

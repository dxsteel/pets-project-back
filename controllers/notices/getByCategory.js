const { Notice } = require("../../models/notice");

const { RequestError } = require("../../helpers");

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Notice.find({ category }, "-createdAt -updatedAt", { skip, limit });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = getByCategory;
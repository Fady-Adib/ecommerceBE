import appErr from "./appErr.js";

export const getItemById = async (dbQuery, item, req, res, next) => {
    
  let { id } = req.params;
  let foundedItem = await dbQuery.findById(id);
  if (!foundedItem) return next(new appErr(`this ${item} is not exists`));
  foundedItem &&
    res.json({
      msg: "success",
      foundedItem,
    });
};

import appErr from "./appErr.js";

export const deletedItemById = async (dbQuery, item, req, res, next) => {
       let { id } = req.params;
       let foundedItem = await dbQuery.findById(id);
        if (!foundedItem) return next(new appErr(`this ${item} is not exists`));
       let deletedItem = await dbQuery.findByIdAndDelete(id);
       res.json({
         msg: "success",
         deletedItem,
       });
     
};

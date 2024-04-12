
 const GlobalErrHandler = (err, req, res, next) => {
   let statusCode=err.statusCode || 500


  if (process.env.MODE == "dev") {
    res
      .status(statusCode)
      .json({ msg:"faild", error: err.message, stack: err.stack });
  } else {
    res.status(statusCode).json({ err: err.message });
  }



 };
export default GlobalErrHandler;
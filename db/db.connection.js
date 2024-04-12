import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(String(process.env.DB_URL_ONLINE), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`db connected in ${process.env.DB_URL_ONLINE}`);
    })
    .catch((err) => {
      console.log(process.env.DB_URL_ONLINE);
      console.log({ msg: "fail connect to db", err });
    });
};

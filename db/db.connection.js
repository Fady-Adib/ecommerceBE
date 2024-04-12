import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.DB_URL_ONLINE)
    .then(() => {
      console.log(`db connected in ${process.env.DB_URL_ONLINE}`);
    })
    .catch((err) => {
      console.log({ msg: "fail connect to db", err });
    });
};

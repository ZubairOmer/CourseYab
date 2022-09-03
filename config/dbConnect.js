import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(`*DATABASE CONNECTED ${con.connection.host}`);
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
};

export default dbConnect;

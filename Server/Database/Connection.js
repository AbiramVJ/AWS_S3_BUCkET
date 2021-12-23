import mongoose from "mongoose";

//mogodb link
// const mongoDB =
//   "mongodb+srv://CodePlus:97_Codeplus@codeplus.iinr9.mongodb.net/?retryWrites=true&w=majority";

// export default async () => {
//   return mongoose.connect(mongoDB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

export default async () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

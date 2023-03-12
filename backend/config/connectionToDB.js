import mongoose from "mongoose";
const connectionToDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL, {
     useNewUrlParser: true,
     useUnifiedTopology:true
    }).then( () => console.log(`MONGO DB STARTED AT PORT: ${process.env.MONGODB_URL}`))
    .catch( (error) => console.log(error));
   }

export default connectionToDB;
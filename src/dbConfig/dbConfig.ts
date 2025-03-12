import mongoose from "mongoose";

export async function connect(){
  try{
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {

      console.log(`Connected to MongoDB successfully`);
    })

    mongoose.connection.on('error', (error) => {  
      console.log(`Error connecting to MongoDB`);
      console.log(error);
      process.exit();
    })
  } catch(error){
    console.log(`Something is wrong`)
    console.log(error)
  }
}
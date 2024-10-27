import mongoose from 'mongoose';
const connecttodb=()=>{
    mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{console.log("DB connected hello")})
    .catch(()=>{console.error('DB connection error')})
}
export default connecttodb
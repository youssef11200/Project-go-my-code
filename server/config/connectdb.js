import mongoose from "mongoose"
export const connectdb=async()=>{
    try {
        const connection=mongoose.connect(process.env.mongourl,
            {
                useUnifiedTopology:true,
                useNewUrlParser:true
            })
            console.log("mongo connect")
    } catch (error) {
        console.log(`error:${error.message}`)
        process.exit(1)
    }
}
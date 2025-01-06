import mongoose, {connect} from 'mongoose'

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sharifjonovvalijon:Rah6Rn7l0HQ01aCZ@cluster0.atia8fk.mongodb.net/bilim-top-db?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connect to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connectToMongoDB;
import mongoose from 'mongoose';
import 'dotenv/config';

// MongoDB connection function with better error handling
const connectDB = async () => {
    try {
        // Check if connection string exists
        if (!process.env.MONGODB_CONNECT_STRING) {
            throw new Error('MONGODB_CONNECT_STRING is not defined in environment variables');
        }

        // Add connection options for better stability
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        };

        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, connectionOptions);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// Call the connection function
connectDB();

// Set up event listeners for the connection
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    connectDB();
});

// Define schema with proper validation
const taskSchema = mongoose.Schema({
    task: { 
        type: String, 
        required: [true, 'Task name is required'],
        trim: true,
        maxlength: [1000, 'Task cannot be more than 1000 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model
const TaskList = mongoose.model('Task', taskSchema);

// CREATE model *****************************************
const createTask = async (taskContent, userId) => {
    try {
        const singleTask = new TaskList({ 
            task: taskContent,
            user: userId
        });
        return await singleTask.save();
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// RETRIEVE model *****************************************
const retrieveTasks = async (userId) => {
    try {
        return await TaskList.find({ user: userId }).sort({ createdAt: -1 }); // Newest first
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        throw error;
    }
};

// RETRIEVE by ID
const retrieveTaskByID = async (_id, userId) => {
    try {
        return await TaskList.findOne({ _id, user: userId });
    } catch (error) {
        console.error('Error retrieving task by ID:', error);
        throw error;
    }
};

// DELETE model based on _id *****************************************
const deleteTaskById = async (_id, userId) => {
    try {
        const result = await TaskList.deleteOne({ _id, user: userId });
        return result.deletedCount;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};


// UPDATE model *****************************************************
const updateTask = async (_id, taskContent, userId) => {
    try {
        const result = await TaskList.findOneAndUpdate(
            { _id, user: userId }, 
            { task: taskContent },
            { new: true } // Return the updated document
        );
        
        if (!result) {
            throw new Error('Task not found');
        }
        
        return result;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// EXPORT the variables for use in the controller file.
export { createTask, retrieveTasks, retrieveTaskByID, updateTask, deleteTaskById };
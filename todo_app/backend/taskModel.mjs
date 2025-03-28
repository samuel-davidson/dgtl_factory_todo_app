import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => {
    console.log('Success: Database connected');
});

const taskSchema = mongoose.Schema({
	task: { type: String, required: true },
});

const taskList = mongoose.model('Tasks', taskSchema);

// CREATE model *****************************************
const createTask = async (task) => {
    const singletask = new taskList({ 
        task: task,
    });
    return singletask.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveTasks = async () => {
    const query = taskList.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveTaskByID = async (_id) => {
    return taskList.findById(_id);
}

// DELETE model based on _id  *****************************************
const deleteTaskById = async (_id) => {
    const result = await taskList.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateTask = async (_id, task) => {
    const result = await taskList.replaceOne({_id: _id }, {
        task: task,
    });
    return { 
        _id: _id, 
        task: task,
    }
}

// EXPORT the variables for use in the controller file.
export { createTask, retrieveTasks, retrieveTaskByID, updateTask, deleteTaskById }
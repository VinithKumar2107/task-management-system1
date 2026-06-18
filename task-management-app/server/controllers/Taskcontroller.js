// const Task = require("../models/Task");

// const createTask = async (req, res) => {
//     try {
//         const { title, description, status } = req.body;

//         if (!title) {
//             return res.status(400).json({
//                 message: "Title is required",
//             });
//         }

//         const task = await Task.create({
//             title,
//             description,
//             status,
//             user: req.user._id,
//         });

//         res.status(201).json({
//             message: "Task created successfully",
//             task,
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Server Error",
//         });
//     }
// };

// module.exports = { createTask, getTasks };

// const getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({
//             user: req.user._id,
//         });

//         res.status(200).json(tasks);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Server Error",
//         });
//     }
// };

// module.exports = { createTask, getTasks };
const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            user: req.user._id,
        });

        res.status(201).json({
            message: "Task created successfully",
            task,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Get All Tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user._id,
        });

        res.status(200).json(tasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        task.priority = req.body.priority || task.priority;

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
// Export Functions
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};
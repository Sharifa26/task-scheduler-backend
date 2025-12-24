const { readTasksFromFile, writeTasksToFile } = require('../utils/taskFile');
const generateId = require('../utils/generateId');
const taskController = {};

const validtime = /^\d{2}:\d{2}$/;
const validdate = /^\d{4}-\d{2}-\d{2}$/;

taskController.getAllTask = async (req, res) => {
    try {
        const tasks = await readTasksFromFile();

        const sorted = tasks.sort((a, b) => {
            const dateCompare = a.date.localeCompare(b.date);
            if (dateCompare !== 0) return dateCompare;
            return a.time.localeCompare(b.time);
        });
        res.status(200).json({ message: 'Tasks retrieved successfully', tasks: sorted });
    } catch (error) {
        console.error('Error reading tasks:', error);
        res.status(500).json({ error: 'Failed to read tasks' });
    }
}

taskController.createTask = async (req, res) => {
    try {
        const { id, title, date, time } = req.body;

        if (!title || !date || !time) {
            return res.status(400).json({
                error: 'Missing required fields: title, date, time'
            });
        }

        if (!validdate.test(date)) {
            return res.status(400).json({
                error: 'Invalid date format. Use YYYY-MM-DD'
            });
        }

        if (!validtime.test(time)) {
            return res.status(400).json({
                error: 'Invalid time format. Use HH:mm'
            });
        }

        const tasks = await readTasksFromFile();
        const newTask = {
            id: generateId(),
            title: title.trim(),
            date,
            time
        };
        tasks.push(newTask);
        await writeTasksToFile(tasks);
        res.status(201).json({ message: 'Task created successfully', task: newTask });

    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ error: 'Failed to save task' });
    }
}


taskController.updateTask = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, date, time } = req.body;
        
        const tasks = await readTasksFromFile();

        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (!title || !date || !time) {
            return res.status(400).json({
                error: 'Missing required fields: title, date, time'
            });
        }

        if (!validdate.test(date)) {
            return res.status(400).json({
                error: 'Invalid date format. Use YYYY-MM-DD'
            });
        }

        if (!validtime.test(time)) {
            return res.status(400).json({
                error: 'Invalid time format. Use HH:mm'
            });
        }

        
        tasks[index] = { id, title, date, time };
        await writeTasksToFile(tasks);
        res.status(200).json({ message: 'Task updated successfully', task: tasks[index] });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
}

taskController.deletedTask = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await readTasksFromFile();

        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const deletedTask = tasks.splice(index, 1)[0];
        await writeTasksToFile(tasks);

        res.status(200).json({
            message: 'Task deleted successfully',
            task: deletedTask
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
}


module.exports = taskController;
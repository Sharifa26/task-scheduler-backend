const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../task.json');

function readTasksFromFile() {
    try {
        const fileContent = fs.readFileSync(tasksFilePath, 'utf8');
        let tasksArray;
        try {
            tasksArray = JSON.parse(fileContent);
        } catch (parseError) {
            throw new Error('Failed to parse tasks JSON file: ' + parseError.message);
        }
        if (!Array.isArray(tasksArray)) {
            throw new Error('Tasks JSON file does not contain an array');
        }
        return tasksArray;
    } catch (err) {
        throw new Error('Error reading tasks file: ' + err.message);
    }
}

function writeTasksToFile(tasks) {
    if (!Array.isArray(tasks)) {
        throw new Error('Input "tasks" should be an array');
    }
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    } catch (err) {
        throw new Error('Error writing tasks file: ' + err.message);
    }
}

module.exports = { readTasksFromFile, writeTasksToFile };
const express = require('express');
const taskController = require("../controllers/taskController");
const router = express.Router();



router.get("/",taskController.getAllTask);
router.post("/",taskController.createTask);
router.delete("/:id",taskController.deletedTask);
router.put("/:id",taskController.updateTask);

module.exports = router;
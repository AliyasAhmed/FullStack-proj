const express = require('express');
const router = express.Router();
const { getUser, createStudent, updateStudent, deleteStudent, createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/userControllers');

// Student Routes
router.get('/getusers', getUser);
router.post('/students', createStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// Course Routes
router.post('/courses', createCourse);
router.get('/courses', getCourses);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

module.exports = router;

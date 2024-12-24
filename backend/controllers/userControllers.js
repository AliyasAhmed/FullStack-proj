const {PrismaClient} = require("@prisma/client");
const json = require("express-json");
const prisma = new PrismaClient();


exports.getUser = async(req , res) =>{
    try {
        const students = await prisma.student.findMany({
          include: {
            courses: true, // Include related courses
          },
        });
        res.json(students);
      } catch (error) {
        res.status(500).json({ error: "Unable to fetch students" });
      }
}

exports.createStudent = async (req, res) => {
  const { name, cohort, dateJoined, lastLogin, status, courseIds } = req.body;

  try {
    const student = await prisma.student.create({
      data: {
        name,
        cohort,
        dateJoined: new Date(dateJoined),
        lastLogin: new Date(lastLogin),
        status,
        courses: courseIds && Array.isArray(courseIds) // Check if courseIds exists and is an array
          ? {
              connect: courseIds.map((id) => ({ id })), // Map IDs if provided
            }
          : {}, // Empty object if courseIds is undefined
      },
    });
    res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Unable to create student' });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, cohort, dateJoined, lastLogin, status, courseIds } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name,
        cohort,
        dateJoined: dateJoined ? new Date(dateJoined) : undefined,
        lastLogin: lastLogin ? new Date(lastLogin) : undefined,
        status,
        courses: {
          set: courseIds.map((id) => ({ id })),
        },
      },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Unable to update student" });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.student.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete student" });
  }
};

exports.createCourse = async (req, res) => {
  const { name, cohort } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        name,
        cohort,
      },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Unable to create course" });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch courses" });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, cohort } = req.body;

  try {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        name,
        cohort,
      },
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: "Unable to update course" });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.course.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete course" });
  }
};

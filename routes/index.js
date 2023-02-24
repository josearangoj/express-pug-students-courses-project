var express = require('express');
var router = express.Router();
const Student = require("../student");
const Course = require("../course");
const OngoingCourse = require("../ongoingCourse")
const CompletedCourse = require("../completedCourse")
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

let onGoingCourses = [
  new OngoingCourse("C100", "Python", "IT", "Data analysis using Pyhton programming language", 0),
  new OngoingCourse("C101", "Java", "IT", "OOP using Java programming language", 20),
  new OngoingCourse("C102", "Reading", "GNED", "Reading and writting skills", 5),
  new OngoingCourse("C103", "Maths", "Exact Sciences", "Basic calculus", 23),
  new OngoingCourse("C104", "Stadistics", "Exact Sciences", "Descriptive Stadistics", 0),
  new OngoingCourse("C105", "React", "IT", "React basics for web development", 12),
  new OngoingCourse("C106", "Machine Learning", "IT", "Machine learning basics with final project", 0),
  new OngoingCourse("C107", "Data Science", "IT", "Data science skill path", 2),
  new OngoingCourse("C108", "Web Design Basics", "IT", "HTML, CSS and Javascript", 6),
];

let students = [
  new Student(100, "Jose", "IT", 3, [0, 1, 3, 5].map(x => onGoingCourses[x]),
    [
      new CompletedCourse("C104", "Stadistics", "Exact Sciences", "Descriptive Stadistics", 90),
      new CompletedCourse("C106", "Machine Learning", "IT", "Machine learning basics with final project", 88),
      new CompletedCourse("C108", "Web Design Basics", "IT", "HTML, CSS and Javascript", 98),
    ]),
  new Student(101, "David", "IT", 2, [0, 4, 3, 1].map(x => onGoingCourses[x]),
    [
      new CompletedCourse("C102", "Reading", "GNED", "Reading and writting skills", 67),
      new CompletedCourse("C108", "Web Design Basics", "IT", "HTML, CSS and Javascript", 86),
    ]),
  new Student(102, "Ana", "Media", 2, [0, 5, 1].map(x => onGoingCourses[x]),
    [
      new CompletedCourse("C102", "Reading", "GNED", "Reading and writting skills", 89),
      new CompletedCourse("C103", "Maths", "Exact Sciences", "Basic calculus", 95),
    ]),
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/students', function (req, res, next) {
  res.render('students', {
    students: students,
  });
});

router.get('/ongoing-courses', function (req, res, next) {
  res.render('ongoingCourses', {
    courses: onGoingCourses,
  });
});

router.get('/search-ongoing', function (req, res, next) {
  res.render('searchOngoing');
});

router.post('/search-ongoing', function (req, res, next) {
  id = req.body.id;
  name = req.body.name;
  department = req.body.department;
  isOpen = req.body.isOpen;
  courses = onGoingCourses;

  if (id) {
    courses = courses.filter(course => course.id === id);
  }
  if (name) {
    courses = courses.filter(course => course.name === name);
  }
  if (isOpen) {
    courses = courses.filter(course => course.remainingSeats !== 0);
  }
  if (department) {
    courses = courses.filter(course => course.department === department);
  }

  res.render('searchedCourses', {
    courses: courses
  });
});

router.get('/search-student', function (req, res, next) {
  res.render('searchStudent');
});

router.post('/search-student', function (req, res, next) {
  id = req.body.id;
  name = req.body.name;
  enrolledCourse = req.body.enrolledCourse ? true : false;
  completedCourse = req.body.completedCourse ? true : false;
  studentsRender = students;

  if (id && enrolledCourse) {
    console.log("1")
    studentsRenderize = studentsRender.filter((st) => st.coursesEnrolled.find(course => course.id === id))
  }
  if (id && completedCourse) {
    console.log("2")
    studentsRenderize = studentsRender.filter((st) => st.coursesCompleted.find(course => course.id === id))
  }
  if (name && enrolledCourse) {
    console.log("3")
    studentsRenderize = studentsRender.filter((st) => st.coursesEnrolled.find(course => course.name === name))
  }
  if (name && completedCourse) {
    console.log("4")
    studentsRenderize = studentsRender.filter((st) => st.coursesCompleted.find(course => course.name === name))
  }

  res.render('searchedStudents', {
    students: studentsRenderize,
  });
});

router.get('/:studentId', function (req, res, next) {
  res.render('singleStudent', {
    students: students,
    studentId: req.params.studentId
  });
});

module.exports = router;

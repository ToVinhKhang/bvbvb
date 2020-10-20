var express = require('express');
var router = express.Router();
const { getStudent,  deleteStudent, addCourse, updateCourse } = require('./services');

router.get("/", async (req, res, ext) => {
  res.send(await getStudent ()) 
})

router.post("/add", async (req, res, ext) => {
  var courseName = req.body.course_name
  var courseDes = req.body.course_des
  var courseFee = req.body.course_fee
  var courseStartDate = req.body.course_startdate
  var courseTeacher = req.body.course_teacher

  res.send(await addCourse (courseName, courseDes, courseFee, courseStartDate, courseTeacher)) 
})

router.post("/delete", async (req, res, ext) => {
  res.send(await deleteStudent (req.body.id)) 
})

router.post("/update", async (req, res, ext) => {
  var id = req.body.id
  var courseName = req.body.course_name
  var courseDes = req.body.course_des
  var courseFee = req.body.course_fee
  var courseStartDate = req.body.course_startdate
  var courseTeacher = req.body.course_teacher


  res.send(await updateCourse (id, courseName, courseDes, courseFee, courseStartDate, courseTeacher)) 
})

module.exports = router;
const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const roles = require('../middlewares/roles');
const Course = require("../models/course");

router.get("/courses", (req, res, next) => {
    if (req.user.role === 'TA') req.user.isTA = true;
  
    Course.find({})
      .then(courses => {
        res.render("courses", { courses });
      })
      .catch(error => {
        throw new Error(error);
      });
});
  
router.get("/course/:id", (req, res, next) => {
    let courseId = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) return res.status(404).send('not-found');
    Course.findOne({ _id: courseId })
      .populate("students")
      .then(course => {
        // res.send(user);
        res.render("course-detail", { course });
      })
      .catch(error => {
        throw new Error(error);
      });
});

router.get("/courses/add", roles.checkTA, (req, res, next) => {
    User.find({role: 'STUDENT'})
    .then(users => {
      let course = new Course();
      course._id = null;
      res.render("course-form", { course, allStudents: users });
    })
    .catch(err => { throw new Error(err) });
});
  
router.post("/courses/add", (req, res, next) => {
    const {
      title,
      leadTeacher,
      startDate,
      endDate,
      TAs,
      courseImg,
      description,
      students,
      status
    } = req.body;
  
    const location = {
      type: 'Point',
      coordinates: [req.body.lng, req.body.lat]
    };

    if (title == '') {
      res.render('course-add', {
        msgError: `title can't be empty`
      })
      return;
    }
  
    Course.findOne({ "title": title })
    .then(course => {
      if (course !== null) {
        res.render("course-form", {
          msgError: "The course with that title already exists!"
        });
        return;
      }
  
      const newCourse = new Course({
        title,
        leadTeacher,
        startDate,
        endDate,
        TAs,
        courseImg,
        description,
        location,
        students,
        status
      });
  
      newCourse.save()
      .then(course => {
        res.redirect("/courses");
      })
      .catch(err => { throw new Error(err)});
    })
    .catch(err => { throw new Error(err)});
  
});
  
router.get("/courses/edit/:id", checkTA, (req, res, next) => {
    const courseId = req.params.id
    Course.findOne({ _id: courseId })
      // .populate('students')
      .then(course => {
        let strArr = course.students.map(u => String(u));
        User.find({role: 'STUDENT'})
        .then(users => {
          users.forEach((u) => {
            if (strArr.includes(String(u._id))) {
              u.enrolled = true;
            }
          });
          res.render("course-form", { course, allStudents: users} );
        })
        .catch(err => { throw new Error(err) });
      })
      .catch(error => {
        throw new Error(error);
      });
});
  
router.post("/courses/edit", (req, res, next) => {
    const courseId = req.body.courseId;
    const {
      title,
      leadTeacher,
      startDate,
      endDate,
      TAs,
      courseImg,
      description,
      status,
      students
    } = req.body;
  
    const location = {
      type: 'Point',
      coordinates: [req.body.lng, req.body.lat]
    };
    console.log(location)
    Course.update(
      { _id: courseId },
      { $set: {
        title,
        leadTeacher,
        startDate,
        endDate,
        TAs,
        courseImg,
        description,
        location,
        status,
        students
       }
      },
      { new: true } 
    )
      .then(course => {
        res.redirect(`/courses`);
      })
      .catch(error => {
        throw new Error(error);
      });
});

router.get("/courses/delete/:id", (req, res, next) => {
    let courseId = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) return res.status(404).send('not-found');
    Course.findOne({ _id: courseId })
      // .populate("author")
      .then(course => {
        res.render("course-delete", { course });
      })
      .catch(error => {
        console.log(error);
      });
});
  
router.post("/courses/delete", (req, res, next) => {
    let courseId = req.body.id;
    Course.deleteOne({ _id: courseId })
      .then(course => {
        res.render("course-delete", { message: `course ${course.title} deleted!`, currentUser: req.user });    
      })
      .catch(err => {
        throw new Error(err);
      });
});

module.exports = router;

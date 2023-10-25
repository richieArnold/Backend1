const express = require("express");
const router = express.Router();
const studentSchema = require("../schema/studentSchema");

router.post("/create-student", (req, res, next) => {
  studentSchema.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

router.get("/", (req, res, next) => {
  studentSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router.post("/login", (req, res) => {
  const { name, email, password } = req.body;
  studentSchema.findOne({ email: email }).then((student) => {
    if (student) {
      if (student.password === password) {
        res.json("Login success");
        console.log("Hi");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("No record existing");
    }
  });
});

router
  .route("/update-user/:id")
  .get((req, res, next) => {
    entriesSchema.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        console.log("Hi from server");
        return res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    entriesSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          return res.json(data);
        }
      }
    );
  });

module.exports = router;

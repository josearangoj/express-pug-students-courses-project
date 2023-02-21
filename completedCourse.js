const Course = require("./course");

class CompletedCourse extends Course{
   constructor(id, name, department, description, grade) {
      super(id, name, department, description);
      this.grade = grade;
   }

}

module.exports = CompletedCourse;

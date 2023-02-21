const Course = require("./course");

class OngoingCourse extends Course{
   constructor(id, name, department, description, remainingSeats) {
      super(id, name, department, description);
      this.remainingSeats = remainingSeats;
   }

}

module.exports = OngoingCourse;
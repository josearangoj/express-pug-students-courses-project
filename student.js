class Student{
   constructor(id, name, department, semester, coursesEnrolled, coursesCompleted) {
      this.id = id;
      this.name = name;
      this.department = department;
      this.semester = semester;
      this.coursesEnrolled = coursesEnrolled;
      this.coursesCompleted = coursesCompleted;
   }

   calculateGPA() {
      var total = 0;
      var numCourses = 0
      this.coursesCompleted.forEach(function (item, index) {
         total += item.grade;
         numCourses += 1;
      })
      return total / numCourses
   }

}

module.exports = Student;
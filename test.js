const student = {
  firstName: "tri",
  lastName: "luu",
  fullName: "",
  get getFirstName() {
    return this.fullName;
  },
  set name(name) {
    this.fullName = name;
  },
};

student.name = "abc";
console.log(student.getFirstName);
console.log(student.fullName);

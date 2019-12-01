const { prisma } = require("../generated/prisma-client");
const { classes } = require("./classrooms.json");
const { students } = require("./students.json");
async function main() {
    Object.keys(classes).map(async key => {
      await prisma.createClassroom({
        id: parseInt(key),
        name: classes[key]
      });
    });

  students.map(async student => {
    const { email, first, last, studentClasses } = student;
    await prisma.createStudent({
      email,
      first,
      last,
      grades: {
        create: studentClasses.map(grade => ({
          grade: grade.grade,
          classroom: {
            connect: { id: grade.id }
          }
        }))
      }
    });
  });
}
main().catch(e => console.error(e));

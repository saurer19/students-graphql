const resolvers = {
  Query: {
    async students(root, args, context) {
      return await context.prisma.students();
    },
    async student(root, args, context) {
      return await context.prisma.student({ id: args.id });
    },
    async StudentFilter(root, args, context) {
      const searchString = args.searchString
        .trim()
        .split(" ")
        .filter(x => x)
        .map(x => x);
      const students =
        searchString.length === 2
          ? await context.prisma.students({
              where: {
                AND: [
                  { first_contains: searchString[0] },
                  { last_contains: searchString[1] }
                ]
              }
            })
          : await context.prisma.students({
              where: {
                OR: [
                  { first_contains: searchString[0] },
                  { last_contains: searchString[0] }
                ]
              }
            });
      return students;
    }
  },
  Student: {
    async grades(root, args, context) {
      return await context.prisma
        .student({
          id: root.id
        })
        .grades();
    }
  },
  Grade: {
    async classroom(root, args, context) {
      return await context.prisma
        .grade({
          id: root.id
        })
        .classroom();
    }
  }
};
module.exports = resolvers;

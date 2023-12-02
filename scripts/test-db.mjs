import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: [{ emit: "stdout", level: "query" }] });

// const comment = await db.comment.create({
//   data: {
//     slug: "fall-guys",
//     user: "Alice",
//     message: "Test message 1",
//   },
// });

const comments = await db.comment.findMany();
console.log('comments:', comments)
-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "courseName" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

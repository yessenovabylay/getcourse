-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(2000) NOT NULL,
    "firstName" VARCHAR(25) NOT NULL,
    "lastName" VARCHAR(25) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryCourse" (
    "id" BIGSERIAL NOT NULL,
    "categoryId" BIGINT NOT NULL,
    "courseId" BIGINT NOT NULL,

    CONSTRAINT "CategoryCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "shortTitle" VARCHAR(25) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "price" BIGINT,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lessons" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "shortTitle" VARCHAR(25),
    "description" VARCHAR(500) NOT NULL,
    "secondDescription" VARCHAR(500),
    "courseId" BIGINT,

    CONSTRAINT "Lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoModel" (
    "id" BIGSERIAL NOT NULL,
    "link" VARCHAR(2000) NOT NULL,
    "lessonId" BIGINT,

    CONSTRAINT "VideoModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageModel" (
    "id" BIGSERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "courseId" BIGINT,
    "categoryId" BIGINT,

    CONSTRAINT "ImageModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "index_user_email" ON "User"("email");

-- CreateIndex
CREATE INDEX "index_user_firstName" ON "User"("firstName");

-- CreateIndex
CREATE INDEX "index_user_lastName" ON "User"("lastName");

-- CreateIndex
CREATE INDEX "index_category_title" ON "Categories"("title");

-- CreateIndex
CREATE INDEX "index_course_title" ON "Courses"("title");

-- CreateIndex
CREATE INDEX "index_lessons_short_title" ON "Lessons"("shortTitle");

-- AddForeignKey
ALTER TABLE "CategoryCourse" ADD CONSTRAINT "CategoryCourse_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryCourse" ADD CONSTRAINT "CategoryCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoModel" ADD CONSTRAINT "VideoModel_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lessons"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageModel" ADD CONSTRAINT "ImageModel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageModel" ADD CONSTRAINT "ImageModel_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

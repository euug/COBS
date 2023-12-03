-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "glCode" INTEGER NOT NULL,
    "programType" TEXT NOT NULL,
    "session" INTEGER[],

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

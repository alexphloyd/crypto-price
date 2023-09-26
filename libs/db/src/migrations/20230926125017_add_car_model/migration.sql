-- CreateTable
CREATE TABLE "CarMake" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CarMake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" SERIAL NOT NULL,
    "makeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarMake_name_key" ON "CarMake"("name");

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "CarMake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

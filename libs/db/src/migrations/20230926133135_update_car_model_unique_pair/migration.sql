/*
  Warnings:

  - A unique constraint covering the columns `[makeId,name]` on the table `CarModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CarModel_makeId_name_key" ON "CarModel"("makeId", "name");

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const data = readFileSync(path.resolve(__dirname, '../assets/cars.csv'), { encoding: 'utf-8' });

  const convertedToArray = data.split(';;').map((item) => item.replace(`\r\n`, ''));
  convertedToArray.pop();

  const makes = convertedToArray.map((specificCarInfo) => {
    const [make] = specificCarInfo.split(';');
    return make;
  });

  const uniqueMakes = Array.from(new Set(makes));

  for (const name of uniqueMakes) {
    await prisma.carMake.upsert({
      where: { name },
      update: {
        name,
      },
      create: { name },
    });
  }

  for (const specificCarInfo of convertedToArray) {
    const [make, model] = specificCarInfo.split(';');

    if (!make || !model) continue;

    await prisma.carModel
      .create({
        data: {
          name: model,
          make: { connect: { name: make } },
        },
      })
      .catch((error) => console.log(error));
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

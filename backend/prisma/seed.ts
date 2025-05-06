import { PrismaClient } from '../generated/prisma/client';
import parkingSpots from './parkingSpots.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.parkingSpot.createMany({
    data: parkingSpots,
    skipDuplicates: true,
  });

  console.log('Parking spots added succesfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

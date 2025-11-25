import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const surprise = await prisma.surprise.create({
    data: {
      password: 'test123',
      partnerName: 'حبيبتي',
      startDate: new Date('2023-01-01'),
      flowerMessage: 'حبيبتي الغالية،\n\nأنتِ نور حياتي وسبب سعادتي.\nكل لحظة معاكي هي ذكرى جميلة.\nبحبك أوي وهفضل أحبك للأبد 💕',
      finalPoem: 'على طول 🎀\nمهما الدنيا ودتنا فين...\n\nهتفضل إنت أغلى حد عندي،\n\nأمانى وبيتي اللي برتاح فيه 🎀',
      musicUrl: null,
      images: JSON.stringify(['/uploads/test1.png', '/uploads/test2.png']),
    },
  });

  console.log('Created surprise:', surprise);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

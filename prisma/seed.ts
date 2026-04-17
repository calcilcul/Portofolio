import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB seeding...');

  // 1. Create or Update Profile
  const profile = await prisma.profile.upsert({
    where: {
      id: 'default_profile_1', // We can use a fixed ID for the single profile
    },
    update: {},
    create: {
      id: 'default_profile_1',
      name: 'Faisal Ramdhani',
      professionalTitle: 'Full-Stack Developer',
      aboutText: 'I am a passionate Full-Stack developer specializing in building modern web applications with cutting-edge technologies. Welcome to my personal portfolio!',
      cvLink: 'https://example.com/cv.pdf',
      instagramLink: 'https://instagram.com/',
      githubLink: 'https://github.com/',
      linkedinLink: 'https://linkedin.com/'
    },
  });
  console.log('Profile seeded:', profile.name);

  // 2. Create Admin Account
  const adminPassword = await bcrypt.hash('password', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
    },
  });
  console.log('Admin account seeded. Username:', admin.username);

  console.log('Seeding finished.');
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

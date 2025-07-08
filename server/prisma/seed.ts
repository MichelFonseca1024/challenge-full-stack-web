import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT = 10;

async function main() {
  const hashedPassword = await bcrypt.hash("123456", SALT);

  await prisma.user.upsert({
    where: { email: "admin@teste.com" },
    update: {},
    create: {
      name: "Usuario Administrador",
      email: "admin@teste.com",
      academicRecord: "2024001",
      cpf: "123.456.789-01",
      password: hashedPassword,
    },
  });
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

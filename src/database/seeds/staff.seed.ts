import { prisma } from "../../prisma/client.js";
import bcrypt from "bcrypt";
import dbConfig from "../../config/db.js";

async function seedStaff() {
  try {
    await prisma.$transaction(async (tx) => {

      let role = await tx.role.findUnique({
        where: {
          name: "STAFF",
        },
      });

      if (!role) {
        role = await tx.role.create({
          data: {
            name: "STAFF",
            description: "Staff role with all permissions",
          },
        });

        if (!role.id) {
          throw new Error("Failed to create Staff role");
        }

        console.log("Staff role created");

        // Fetch all permissions
        const permissionIds = await tx.permission.findMany({
          select: {
            id: true,
          },
        });
        console.log(`Fetched ${permissionIds.length} permissions`);
        // Assign all permissions
        await tx.rolePermission.deleteMany({
          where: {
            roleId: role.id,
          },
        });

        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId) => ({
            roleId: role!.id,
            permissionId: permissionId.id,
          })),
        });

        console.log("Permissions assigned to Staff role");
      } else {
        console.log("Staff role already exists");
      }


      const existingStaff = await tx.user.findUnique({
        where: {
          email: dbConfig.STAFF_EMAIL,
        },
      });

      if (existingStaff) {
        console.log("Staff already exists");
        return;
      }

      const hashedPassword = await bcrypt.hash(
        dbConfig.STAFF_PASSWORD,
        10
      );

      const staff = await tx.user.create({
        data: {
          firstName: dbConfig.STAFF_NAME,
          email: dbConfig.STAFF_EMAIL,
          passwordHash: hashedPassword,
          roleId: role.id,
        },
      });

      console.log(`Staff created: ${staff.email}`);
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error while seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedStaff();
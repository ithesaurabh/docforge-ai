import { prisma } from "../../prisma/client.js";
import bcrypt from "bcrypt";
import dbConfig from "../../config/db.js";

async function seedAdmin() {
  try {
    await prisma.$transaction(async (tx) => {
      // Find or create SUPER ADMIN role
      let role = await tx.role.findUnique({
        where: {
          name: "SUPER ADMIN",
        },
      });

      if (!role) {
        role = await tx.role.create({
          data: {
            name: "SUPER ADMIN",
            description: "Super Admin role with all permissions",
          },
        });

        if (!role.id) {
          throw new Error("Failed to create SUPER ADMIN role");
        }

        console.log("Super Admin role created");

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

        console.log("Permissions assigned to Super Admin role");
      } else {
        console.log("Super Admin role already exists");
      }

      // Check if Super Admin user already exists
      const existingAdmin = await tx.user.findUnique({
        where: {
          email: dbConfig.SUPER_ADMIN_EMAIL,
        },
      });

      if (existingAdmin) {
        console.log("Super Admin already exists");
        return;
      }

      const hashedPassword = await bcrypt.hash(
        dbConfig.SUPER_ADMIN_PASSWORD,
        10
      );

      const admin = await tx.user.create({
        data: {
          firstName: dbConfig.SUPER_ADMIN_NAME,
          email: dbConfig.SUPER_ADMIN_EMAIL,
          passwordHash: hashedPassword,
          roleId: role.id,
        },
      });

      console.log(`Super Admin created: ${admin.email}`);
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error while seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
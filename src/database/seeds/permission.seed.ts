import { prisma } from "../../prisma/client.js";


const permissions = [
  // User
  {
    key: "user.create",
    description: "Create users",
  },
  {
    key: "user.read",
    description: "View users",
  },
  {
    key: "user.update",
    description: "Update users",
  },
  {
    key: "user.delete",
    description: "Delete users",
  },

  // Role
  {
    key: "role.create",
    description: "Create roles",
  },
  {
    key: "role.read",
    description: "View roles",
  },
  {
    key: "role.update",
    description: "Update roles",
  },
  {
    key: "role.delete",
    description: "Delete roles",
  },

  // Permission
  {
    key: "permission.create",
    description: "Create permissions",
  },
  {
    key: "permission.read",
    description: "View permissions",
  },
  {
    key: "permission.update",
    description: "Update permissions",
  },
  {
    key: "permission.delete",
    description: "Delete permissions",
  },
  
  //document
  {
    key: "document.upload",
    description: "Upload documents",
  },
  {
    key: "document.read",
    description: "Read documents",
  },
  {
    key: "document.delete",
    description: "Delete documents",
  },

];

async function seedPermissions() {
  try {
    for (const permission of permissions) {
      await prisma.permission.upsert({
        where: {
          key: permission.key,
        },
        update: {
          description: permission.description,
        },
        create: permission,
      });
    }

    console.log("Permissions seeded successfully");
  } catch (error) {
    console.error("Permission seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPermissions();
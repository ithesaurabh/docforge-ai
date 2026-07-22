import prisma from "../../prisma/client.js";

const findByIds = async (permissionIds: string[]) => {
  return prisma.permission.findMany({
    where: {
      id: {
        in: permissionIds,
      },
    },
  });
};

const getPermissions = async () => {
  return prisma.permission.findMany({
    select: {
      id: true,
      key: true,
      description: true,
    },
  });
};
export default { findByIds, getPermissions };
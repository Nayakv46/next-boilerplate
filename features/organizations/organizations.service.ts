import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAllOrganizations = async () => {
  return await prisma.organizations.findMany();
};

export const getAllOrganizationsByIds = async (ids: string[]) => {
  return await prisma.organizations.findMany({ where: { id: { in: ids } } });
};

export const getOrganizationById = async (id: string) => {
  return await prisma.organizations.findUnique({ where: { id } });
};

export const createOrganization = async (
  data: Prisma.organizationsCreateInput,
  ownerUserId: string,
) => {
  const ownerRole = await prisma.roles.findUnique({
    where: { name: "owner" },
  });

  if (!ownerRole) {
    throw new Error("Owner role not found");
  }

  return prisma.$transaction(async (tx) => {
    // Create the organization
    const organization = await tx.organizations.create({ data });

    // Add the owner user to the organization and assign them the owner role
    await tx.mm_users_organizations.create({
      data: {
        user_id: ownerUserId,
        organization_id: organization.id,
      },
    });

    // Add the owner role to the user for this organization
    await tx.mm_organizations_users_roles.create({
      data: {
        user_id: ownerUserId,
        organization_id: organization.id,
        role_id: ownerRole.id,
      },
    });

    // Expand your needs when you need to add more related data to the organization creation process.

    return organization;
  });
};

export const updateOrganization = async (
  id: string,
  data: Prisma.organizationsUpdateInput,
) => {
  return await prisma.organizations.update({ where: { id }, data });
};

export const deleteOrganization = async (id: string) => {
  return await prisma.organizations.delete({ where: { id } });
};

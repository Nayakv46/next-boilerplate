import "server-only";

import { prisma } from "@/lib/db";
import { authenticateUser } from "@/features/auth/authenticate-user";

const EDITOR_ROLES = ["owner", "editor"];

export const authenticateUserOrganizations = async (
  organizationId?: string,
) => {
  const { userId } = await authenticateUser();

  try {
    // Get user's organizations
    const mmOrganizationUser = await prisma.mm_users_organizations.findMany({
      where: { user_id: userId },
      select: {
        organization_id: true,
      },
    });

    const userOrganizations = mmOrganizationUser.map(
      (item) => item.organization_id,
    );

    // If an organizationId is provided, check if the user is part of that organization
    if (organizationId && !userOrganizations.includes(organizationId)) {
      throw new Error(
        "Forbidden - User does not have access to this organization",
      );
    }

    return { userId, userOrganizations };
  } catch {
    throw new Error("Not authenticated");
  }
};

export const authenticateUserOrganizationsEdit = async (
  organizationId?: string,
) => {
  const { userId, userOrganizations } = await authenticateUserOrganizations();

  if (!organizationId) {
    throw new Error("Forbidden - No organization specified");
  }

  if (!userOrganizations.includes(organizationId)) {
    throw new Error(
      "Forbidden - User does not have access to this organization",
    );
  }

  try {
    // If the user is part of the organization, check if they have the right role for edit and creation (owner or editor)
    const userOrganizationRoles =
      await prisma.mm_organizations_users_roles.findMany({
        where: {
          user_id: userId,
          organization_id: organizationId,
        },
        select: {
          organization_id: true,
          role: true,
        },
      });

    const hasEditPermission = userOrganizationRoles.some((item) =>
      EDITOR_ROLES.includes(item.role.name),
    );
    // If no role found or the role is not owner or editor, reject the request
    if (!hasEditPermission) {
      throw new Error("Forbidden - Request not allowed");
    }

    return {
      userId,
      organizationId,
      userOrganizations,
    };
  } catch {
    throw new Error("Not authenticated");
  }
};

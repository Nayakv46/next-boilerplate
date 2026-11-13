// app/api/organizations/[organizationId]/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";

import {
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "@/features/organizations/organizations.service";

const updateOrganizationSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    description: z.string().nullable().optional(),
  })
  .strict();

type RouteContext = {
  params: Promise<{
    organizationId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { organizationId } = await params;

    // TODO: sprawdź członkostwo użytkownika w organizacji.
    const organization = await getOrganizationById(organizationId);

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.error("[GET /api/organizations/:id]", error);

    return NextResponse.json(
      { message: "Failed to fetch organization" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { organizationId } = await params;
    const body: unknown = await request.json();

    const validation = updateOrganizationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 },
      );
    }

    const organization = await updateOrganization(
      organizationId,
      validation.data,
    );

    return NextResponse.json(organization);
  } catch (error) {
    console.error("[PUT /api/organizations/:id]", error);

    return NextResponse.json(
      { message: "Failed to update organization" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { organizationId } = await params;

    await deleteOrganization(organizationId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE /api/organizations/:id]", error);

    return NextResponse.json(
      { message: "Failed to delete organization" },
      { status: 500 },
    );
  }
}

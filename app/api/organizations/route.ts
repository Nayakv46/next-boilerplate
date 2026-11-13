// app/api/organizations/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";

import {
  getAllOrganizations,
  createOrganization,
} from "@/features/organizations/organizations.service";

const createOrganizationSchema = z
  .object({
    name: z.string().trim().min(1, "Organization name is required"),
    description: z.string().nullable().optional(),
  })
  .strict();

export async function GET() {
  try {
    const organizations = await getAllOrganizations();

    return NextResponse.json(organizations);
  } catch (error) {
    console.error("[GET /api/organizations]", error);

    return NextResponse.json(
      { message: "Failed to fetch organizations" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const validation = createOrganizationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const organization = await createOrganization(validation.data);

    return NextResponse.json(organization, { status: 201 });
  } catch (error) {
    console.error("[POST /api/organizations]", error);

    return NextResponse.json(
      { message: "Failed to create organization" },
      { status: 500 },
    );
  }
}

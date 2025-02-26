import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { validateRequest } from "@/auth"

export async function POST(req: Request) {
  try {
    const {session} = await validateRequest();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    const publisher = await prisma.publisherProfile.create({
      data: {
        userId: session.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        workPhone: data.workPhone,
        cellPhone: data.cellPhone,
        address: data.address,
        city: data.city,
        stateProvince: data.stateProvince,
        country: data.country,
        postalCode: data.postalCode,
        companyName: data.organization || data.companyName,
        socialMediaUrl: data.socialMedia,
        pressReleaseFrequency: data.pressReleaseFrequency,
        productsOfInterest: data.productsOfInterest,
        bestTimeToReach: data.bestTimeToReach,
        additionalInfo: data.additionalInfo,
        paymentType: data.paymentType,
      },
    });

    return NextResponse.json(publisher);
  } catch (error) {
    console.error("Publisher registration error:", error);
    return NextResponse.json(
      { error: "Failed to register publisher" },
      { status: 500 }
    );
  }
}
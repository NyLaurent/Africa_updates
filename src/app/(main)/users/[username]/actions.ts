"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

<<<<<<< HEAD
export async function updateUserProfile(values: UpdateUserProfileValues & { avatarUrl?: string }) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();
=======
export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
<<<<<<< HEAD
      data: {
        ...validatedValues,
        avatarUrl: values.avatarUrl || undefined, // Store avatar URL if provided
      },
      select: getUserDataSelect(user.id),
    });

    // Update Stream user data
=======
      data: validatedValues,
      select: getUserDataSelect(user.id),
    });
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: validatedValues.displayName,
<<<<<<< HEAD
        avatar: values.avatarUrl || updatedUser.avatarUrl, // Ensure Stream gets the updated avatar
      },
    });

=======
      },
    });
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
    return updatedUser;
  });

  return updatedUser;
}

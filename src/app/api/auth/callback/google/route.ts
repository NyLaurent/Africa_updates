import { google, lucia } from "@/auth";
import kyInstance from "@/lib/ky";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { slugify } from "@/lib/utils";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  const storedState = cookies().get("state")?.value;
  const storedCodeVerifier = cookies().get("code_verifier")?.value;

  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  ) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const googleUser = await kyInstance
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      })
<<<<<<< HEAD
      .json<{ id: string; name: string; email: string; picture: string }>();

    // Check if the user already exists
=======
      .json<{ id: string; name: string }>();

>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
    const existingUser = await prisma.user.findUnique({
      where: {
        googleId: googleUser.id,
      },
    });

    if (existingUser) {
<<<<<<< HEAD
      // User exists, create a session for the user
=======
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

<<<<<<< HEAD
    // Create a new user if not found
    const userId = generateIdFromEntropySize(10);
    const username = slugify(googleUser.name) + "-" + userId.slice(0, 4);

    // Transaction to create the user in the database
=======
    const userId = generateIdFromEntropySize(10);

    const username = slugify(googleUser.name) + "-" + userId.slice(0, 4);

>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          id: userId,
          username,
          displayName: googleUser.name,
<<<<<<< HEAD
          email: googleUser.email, // Store the email
          avatarUrl: googleUser.picture, // Store the Google profile picture URL
          googleId: googleUser.id, // Store the Google ID
        },
      });
      // Handle other related tasks such as upserting the user in Stream
=======
          googleId: googleUser.id,
        },
      });
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
      await streamServerClient.upsertUser({
        id: userId,
        username,
        name: username,
      });
    });

<<<<<<< HEAD
    // Create a session for the new user
=======
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

import schema from "../schema";
import prisma from "@/prisma/lib/client";
import { NextRequest, NextResponse } from "next/server";
import isAuthorized from "@/app/api/auth/[...nextauth]/auth-helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uniqueBlog = await prisma.blog.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (uniqueBlog == null)
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  return NextResponse.json(uniqueBlog);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // if (!(await isAuthorized()))
  //   return NextResponse.json("not Authorized", { status: 401 })

  // const body = await request.json();
  // const validation = schema.safeParse(body);

  // if (!validation.success)
  //   return NextResponse.json(validation.error.errors, { status: 400 });

  // const test = await prisma.blog.findUnique({
  //   where: {
  //     id: parseInt(params.id),
  //   },
  // });

  // if (!test)
  //   return NextResponse.json({ error: "blog not found" }, { status: 404 });

  // await prisma.blog.update({
  //   where: {
  //     id: test.id,
  //   },
  //   data: {
  //     title: body.title,
  //     content: body.content,
  //     img: body.img,
  //   },
  // });

  // return NextResponse.json(
  //   { title: body.title, content: body.content, img: body.img },
  //   { status: 200 }
  // );
  console.log("Authorization check");
  if (!(await isAuthorized()))
    return NextResponse.json("not Authorized", { status: 401 })

  console.log("Parsing body");
  const body = await request.json();

  console.log("Validating body");
  const validation = schema.safeParse(body);

  if (!validation.success) {
    console.log("Validation failed:", validation.error.errors);
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  console.log("Finding blog");
  const { id } = await params;
  const test = await prisma.blog.findUnique({ where: { id: parseInt(id) } });

  if (!test) {
    console.log("Blog not found");
    return NextResponse.json({ error: "blog not found" }, { status: 404 });
  }

  console.log("Updating blog");
  await prisma.blog.update({
    where: { id: test.id },
    data: { title: body.title, content: body.content, img: body.img }
  });

  console.log("Update successful");
  return NextResponse.json({ title: body.title, content: body.content, img: body.img }, { status: 200 });

}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized()))
    return NextResponse.json("not Authorized", { status: 401 })

  const { id } = await params;
  const body = await prisma.blog.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!body)
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  await prisma.blog.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json(body, { status: 200 });
}

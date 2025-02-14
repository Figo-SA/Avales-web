import prisma from "@/lib/prisma";

export async function GET(REQ: Request) {
  const usuarios = await prisma.usuario.findMany();
  return new Response(JSON.stringify(usuarios), {
    headers: { "content-type": "application/json" },
  });
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagina = parseInt(searchParams.get("pagina") || "1", 10); // Página actual (por defecto 1)
  const take = 10; // Número de usuarios por página
  const skip = (pagina - 1) * take; // Saltar los registros de páginas anteriores

  try {
    const usuarios = await prisma.usuario.findMany({
      skip,
      take,
      orderBy: { apellido: "asc" }, // Orden ascendente por apellido
    });

    const totalUsuarios = await prisma.usuario.count(); // Contar total de usuarios
    const totalPaginas = Math.ceil(totalUsuarios / take); // Calcular total de páginas

    // return NextResponse.json(
    //   JSON.stringify({
    //     pagina,
    //     totalPaginas,
    //     totalUsuarios,
    //     usuarios,
    //   })
    // );
    return NextResponse.json({ pagina, totalPaginas, totalUsuarios, usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}

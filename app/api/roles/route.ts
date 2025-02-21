import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Obtener roles con paginación
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pagina = parseInt(searchParams.get("page") || "1");
    const take = 10; // Número de usuarios por página
    const skip = (pagina - 1) * take; // Saltar los registros de páginas anteriores

    const totalRoles = await prisma.rol.count();
    const roles = await prisma.rol.findMany({
      skip,
      take,
      orderBy: { nombre: "asc" },
    });
    const totalPaginas = Math.ceil(totalRoles / take); // Calcular total de páginas

    if (isNaN(pagina) || pagina < 1) {
      return NextResponse.json(
        { error: "El parámetro 'page' debe ser un número positivo" },
        { status: 400 }
      );
    }

    if (pagina > totalPaginas) {
      return NextResponse.json(
        {
          error: `La página ${pagina} excede el número total de páginas (${totalPaginas})`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        pagina,
        totalPaginas,
        totalRoles,
        roles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/roles:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // Página actual (por defecto 1)
  const take = 10; // Número de usuarios por página
  const skip = (page - 1) * take; // Saltar los registros de páginas anteriores

  try {
    const usuarios = await prisma.usuario.findMany({
      skip,
      take,
      orderBy: { apellido: "asc" }, // Orden ascendente por apellido
    });

    const totalUsuarios = await prisma.usuario.count(); // Contar total de usuarios
    const totalPages = Math.ceil(totalUsuarios / take); // Calcular total de páginas

    return new Response(
      JSON.stringify({
        page,
        totalPages,
        totalUsuarios,
        usuarios,
      })
    );
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

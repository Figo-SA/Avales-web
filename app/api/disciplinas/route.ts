import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Asegúrate de que la instancia de Prisma está correctamente importada

// Obtener disciplinas (paginadas) o una disciplina por ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Si se proporciona un ID, obtener una sola disciplina por ID
    if (id) {
      const disciplinaId = parseInt(id);
      if (isNaN(disciplinaId)) {
        return NextResponse.json(
          { error: "El ID de la disciplina debe ser un número válido" },
          { status: 400 }
        );
      }

      const disciplina = await prisma.disciplina.findUnique({
        where: { id: disciplinaId },
      });

      if (!disciplina) {
        return NextResponse.json(
          { error: "Disciplina no encontrada" },
          { status: 404 }
        );
      }

      return NextResponse.json(disciplina, { status: 200 });
    }

    const pagina = parseInt(searchParams.get("page") || "1");
    const take = 10; // Número de disciplinas por página
    const skip = (pagina - 1) * take; // Saltar los registros de páginas anteriores

    const totalDisciplinas = await prisma.disciplina.count();
    const disciplinas = await prisma.disciplina.findMany({
      skip,
      take,
      orderBy: { nombre: "asc" },
    });
    const totalPaginas = Math.ceil(totalDisciplinas / take); // Calcular total de páginas

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
        totalDisciplinas,
        disciplinas,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/disciplinas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Crear una nueva disciplina
export async function POST(request: Request) {
  try {
    const { nombre } = await request.json();

    if (!nombre) {
      return NextResponse.json(
        { error: "El nombre de la disciplina es obligatorio" },
        { status: 400 }
      );
    }

    const nuevaDisciplina = await prisma.disciplina.create({
      data: { nombre },
    });

    return NextResponse.json(nuevaDisciplina, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear la disciplina" },
      { status: 500 }
    );
  }
}

// Editar una disciplina existente
export async function PUT(request: Request) {
  try {
    const { id, nombre } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "El ID de la disciplina es obligatorio" },
        { status: 400 }
      );
    }

    const disciplinaActualizada = await prisma.disciplina.update({
      where: { id },
      data: { nombre },
    });

    return NextResponse.json(disciplinaActualizada, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar la disciplina" },
      { status: 500 }
    );
  }
}

// Eliminar una disciplina por ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");

    if (!id) {
      return NextResponse.json(
        { error: "El ID de la disciplina es obligatorio" },
        { status: 400 }
      );
    }

    await prisma.disciplina.delete({ where: { id } });

    return NextResponse.json(
      { message: "Disciplina eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar la disciplina" },
      { status: 500 }
    );
  }
}

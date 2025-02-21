import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Obtener roles con paginación
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Si se proporciona un ID, obtener un solo rol por ID
    if (id) {
      const rolId = parseInt(id);
      if (isNaN(rolId)) {
        return NextResponse.json(
          { error: "El ID del rol debe ser un número válido" },
          { status: 400 }
        );
      }

      const rol = await prisma.rol.findUnique({
        where: { id: rolId },
      });

      if (!rol) {
        return NextResponse.json(
          { error: "Rol no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(rol, { status: 200 });
    }

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

// Crear un nuevo rol
export async function POST(request: Request) {
  try {
    const { nombre, descripcion } = await request.json();

    if (!nombre) {
      return NextResponse.json(
        { error: "El nombre del rol es obligatorio" },
        { status: 400 }
      );
    }

    const nuevoRol = await prisma.rol.create({
      data: { nombre, descripcion },
    });

    return NextResponse.json(nuevoRol, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el rol" },
      { status: 500 }
    );
  }
}

// Editar un rol existente
export async function PUT(request: Request) {
  try {
    const { id, nombre, descripcion } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "El ID del rol es obligatorio" },
        { status: 400 }
      );
    }

    const rolActualizado = await prisma.rol.update({
      where: { id },
      data: { nombre, descripcion },
    });

    return NextResponse.json(rolActualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el rol" },
      { status: 500 }
    );
  }
}

// Eliminar un rol por ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");

    if (!id) {
      return NextResponse.json(
        { error: "El ID del rol es obligatorio" },
        { status: 400 }
      );
    }

    await prisma.rol.delete({ where: { id } });

    return NextResponse.json(
      { message: "Rol eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el rol" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Obtener usuarios con paginación o un usuario por ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Si se proporciona un ID, obtener un solo usuario por ID
    if (id) {
      const usuarioId = parseInt(id);
      if (isNaN(usuarioId)) {
        return NextResponse.json(
          { error: "El ID del usuario debe ser un número válido" },
          { status: 400 }
        );
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
        include: {
          UsuariosRol: {
            include: {
              Rol: true, // Incluir los roles relacionados
            },
          },
        },
      });

      if (!usuario) {
        return NextResponse.json(
          { error: "Usuario no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(usuario, { status: 200 });
    }

    // Si no se proporciona un ID, obtener todos los usuarios con paginación
    const pagina = parseInt(searchParams.get("page") || "1");
    const take = 10; // Número de usuarios por página
    const skip = (pagina - 1) * take; // Saltar los registros de páginas anteriores

    const totalUsuarios = await prisma.usuario.count();
    const usuarios = await prisma.usuario.findMany({
      skip,
      take,
      orderBy: { nombre: "asc" },
      include: {
        UsuariosRol: {
          include: {
            Rol: true, // Incluir los roles relacionados
          },
        },
      },
    });
    const totalPaginas = Math.ceil(totalUsuarios / take); // Calcular total de páginas

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
        totalUsuarios,
        usuarios,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/usuarios:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Crear un nuevo usuario
export async function POST(request: Request) {
  try {
    const {
      email,
      password,
      nombre,
      apellido,
      cedula,
      categoria_id,
      disciplina_id,
      roles, // Asumimos que roles es un array de IDs de los roles seleccionados
    } = await request.json();

    // Validar campos obligatorios
    if (
      !email ||
      !password ||
      !nombre ||
      !apellido ||
      !cedula ||
      !categoria_id ||
      !disciplina_id ||
      !roles ||
      roles.length === 0 // Validar que roles esté presente y no esté vacío
    ) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios, incluyendo los roles" },
        { status: 400 }
      );
    }

    // Crear el nuevo usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        email,
        password,
        nombre,
        apellido,
        cedula,
        categoria_id,
        disciplina_id,
        UsuariosRol: {
          create: roles.map((rolId: number) => ({
            rol_id: rolId, // Asociar cada rol seleccionado al usuario
          })),
        },
      },
    });

    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/usuarios:", error);
    return NextResponse.json(
      { error: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}

// Actualizar un usuario existente
export async function PUT(request: Request) {
  try {
    const {
      id,
      email,
      password,
      nombre,
      apellido,
      cedula,
      categoria_id,
      disciplina_id,
    } = await request.json();

    // Validar que el ID esté presente
    if (!id) {
      return NextResponse.json(
        { error: "El ID del usuario es obligatorio" },
        { status: 400 }
      );
    }

    // Actualizar el usuario
    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: {
        email,
        password,
        nombre,
        apellido,
        cedula,
        categoria_id,
        disciplina_id,
      },
    });

    return NextResponse.json(usuarioActualizado, { status: 200 });
  } catch (error) {
    console.error("Error en PUT /api/usuarios:", error);
    return NextResponse.json(
      { error: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}

// Eliminar un usuario por ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");

    // Validar que el ID esté presente
    if (!id) {
      return NextResponse.json(
        { error: "El ID del usuario es obligatorio" },
        { status: 400 }
      );
    }

    // Eliminar el usuario
    await prisma.usuario.delete({ where: { id } });

    return NextResponse.json(
      { message: "Usuario eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/usuarios:", error);
    return NextResponse.json(
      { error: "Error al eliminar el usuario" },
      { status: 500 }
    );
  }
}

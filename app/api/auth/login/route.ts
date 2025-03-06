import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // const passwordMatch = await bcrypt.compare(password, usuario.password);
    const passwordMatch = password === usuario.password; // Elimina esta línea

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const JWT = process.env.JWT_SECRET;
    if (!JWT) {
      return NextResponse.json(
        { error: "Error la clave de JWT no esta definida" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT, {
      expiresIn: "1h",
    });

    // Modifica la respuesta para incluir tanto el token como el usuario
    return NextResponse.json({
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
    });
  } catch (er) {
    console.log(er);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    console.log("POST /api/auth/login");
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

    const passwordMatch = password === usuario.password;
    // const passwordMatch = await bcrypt.compare(password, usuario.password);
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

    return NextResponse.json({ token });
  } catch (er) {
    console.log(er);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

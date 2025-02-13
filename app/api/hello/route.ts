// app/api/hello/route.ts
const { NextResponse } = require("next/server");

async function GET(request: any) {
  return NextResponse.json({ message: "Hello, Next.js!" });
}

module.exports = { GET };

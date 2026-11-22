import type { NextRequest } from "next/server";
import { addTodo, getTodos } from "@/lib/todos";
 
// GET /api/todo หรือ /api/todo?done=true
export async function GET(request: NextRequest) {
  const done = request.nextUrl.searchParams.get("done");
  let todos = getTodos();
  if (done !== null) {
    todos = todos.filter((t) => String(t.done) === done);
  }
  return Response.json(todos);
}
 
// POST /api/todo  body: { "title": "ซื้อกาแฟ" }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
 
  if (!title || title.length > 100) {
    return Response.json(
      { error: "title ต้องมี 1–100 ตัวอักษร" },
      { status: 400 }
    );
  }
 
  return Response.json(addTodo(title), { status: 201 });
}
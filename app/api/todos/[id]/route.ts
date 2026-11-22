import { deleteTodo, getTodo, updateTodo } from "@/lib/todos";
 
type Ctx = { params: Promise<{ id: string }> };
 
const notFound = () =>
  Response.json({ error: "ไม่พบงานนี้" }, { status: 404 });
 
// GET /api/todo/1
export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const todo = getTodo(id);
  return todo ? Response.json(todo) : notFound();
}
 
// PATCH /api/todo/1  body: { "done": true }
export async function PATCH(request: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
 
  const data: { title?: string; done?: boolean } = {};
  if (typeof body?.title === "string") data.title = body.title.trim();
  if (typeof body?.done === "boolean") data.done = body.done;
 
  const todo = updateTodo(id, data);
  return todo ? Response.json(todo) : notFound();
}
 
// DELETE /api/todo/1
export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  if (!deleteTodo(id)) return notFound();
  return new Response(null, { status: 204 });
}
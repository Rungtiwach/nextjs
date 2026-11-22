
"use client";

import { useEffect, useState } from "react";
import type { Todo } from "@/lib/todos";

const JSON_HEADERS = { "Content-Type": "application/json" };

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch(() => setError("ไม่สามารถโหลดรายการงานได้"));
  }, []);

  async function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ title }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setTodos((current) => [...current, data]);
    setTitle("");
    setError("");
  }

  async function toggle(todo: Todo) {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({ done: !todo.done }),
    });
    const updated: Todo = await res.json();

    setTodos((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
  }

  async function remove(id: string) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((current) => current.filter((item) => item.id !== id));
  }

  return (
    <section className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-3xl font-bold">งานของฉัน</h1>

      <form onSubmit={addTodo} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="เพิ่มงานใหม่..."
          className="flex-1 rounded-lg border p-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-sky-500 px-4 text-white"
        >
          เพิ่ม
        </button>
      </form>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <ul className="mt-6 flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggle(todo)}
            />
            <span className={todo.done ? "line-through" : ""}>
              {todo.title}
            </span>
            <button
              type="button"
              onClick={() => remove(todo.id)}
              className="ml-auto text-red-500"
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

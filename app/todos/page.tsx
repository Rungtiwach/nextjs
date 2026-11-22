"use client";

import { useState, useEffect } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const API = "/api/todos";
const JSON_HEADERS = { "Content-Type": "application/json" };

async function callApi(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? JSON_HEADERS : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // โหลดรายการงานทั้งหมดเมื่อเปิดหน้าเว็บ
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    const { ok, data } = await callApi(API, "GET");
    if (ok && Array.isArray(data)) {
      setTodos(data);
    }
    setLoading(false);
  }

  // เพิ่มงานใหม่
  async function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    const { ok, data } = await callApi(API, "POST", { title: trimmed });
    if (ok && data) {
      setTodos((prev) => [...prev, data]);
      setTitle("");
    }
    setSubmitting(false);
  }

  // สลับสถานะเสร็จ / ยังไม่เสร็จ
  async function handleToggleTodo(todo: Todo) {
    const updatedDone = !todo.done;
    // อัปเดต UI ทันทีให้ดูลื่นไหล (Optimistic UI)
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, done: updatedDone } : t))
    );

    const { ok } = await callApi(`${API}/${todo.id}`, "PATCH", {
      done: updatedDone,
    });
    if (!ok) {
      // ย้อนกลับถ้า API มีปัญหา
      fetchTodos();
    }
  }

  // ลบงาน
  async function handleDeleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    const { ok } = await callApi(`${API}/${id}`, "DELETE");
    if (!ok) {
      fetchTodos();
    }
  }

  const completedCount = todos.filter((t) => t.done).length;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* การ์ดหลัก */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
          {/* ส่วนหัว */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-6 text-white">
            <h1 className="text-2xl font-bold tracking-tight">รายการสิ่งที่ต้องทำ</h1>
            <p className="mt-1 text-sm text-sky-100">
              เสร็จแล้ว {completedCount} จากทั้งหมด {todos.length} รายการ
            </p>
          </div>

          <div className="p-6">
            {/* ฟอร์มเพิ่มงาน */}
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เพิ่มงานใหม่ที่ต้องทำ..."
                disabled={submitting}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!title.trim() || submitting}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {submitting ? "กำลังเพิ่ม..." : "เพิ่ม"}
              </button>
            </form>

            {/* รายการงาน */}
            <div className="mt-6">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-12 animate-pulse rounded-xl bg-slate-100"
                    />
                  ))}
                </div>
              ) : todos.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                  <p className="text-sm font-medium text-slate-500">
                    ยังไม่มีรายการงานในตอนนี้
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    พิมพ์งานด้านบนแล้วกด &ldquo;เพิ่ม&rdquo; เพื่อเริ่มต้น
                  </p>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xs transition hover:border-slate-200 hover:bg-slate-50/60"
                    >
                      <label className="flex flex-1 cursor-pointer items-center gap-3 select-none">
                        <input
                          type="checkbox"
                          checked={todo.done}
                          onChange={() => handleToggleTodo(todo)}
                          className="h-5 w-5 cursor-pointer rounded-md border-slate-300 text-sky-500 transition focus:ring-sky-500/30"
                        />
                        <span
                          className={`text-sm transition ${
                            todo.done
                              ? "text-slate-400 line-through"
                              : "font-medium text-slate-700"
                          }`}
                        >
                          {todo.title}
                        </span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleDeleteTodo(todo.id)}
                        aria-label="ลบรายการ"
                        className="ml-2 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 opacity-0 transition hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 focus:opacity-100"
                      >
                        ลบ
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
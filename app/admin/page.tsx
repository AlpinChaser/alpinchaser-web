"use client";

import { useCallback, useEffect, useState } from "react";

type Tab = "photos" | "users" | "passes";

type AdminPhoto = {
  passId: string;
  fileName: string;
  url: string;
  folder: "user" | "photos";
  uploadedAt: string | null;
  storagePath: string;
  adminStatus?: string;
};

type AdminUser = {
  uid: string;
  username: string | null;
  email: string | null;
  joinDate: string | null;
  isPremium: boolean;
  passCount: number;
};

type AdminPass = {
  id: string;
  name: string;
  rideCount: number;
};

const bg = "#0a0a0a";
const gold = "#E8B800";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState<Tab>("photos");

  const [photos, setPhotos] = useState<AdminPhoto[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [passes, setPasses] = useState<AdminPass[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  const probeAuth = useCallback(async () => {
    const r = await fetch("/api/admin/photos", { credentials: "include" });
    if (r.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (r.ok) {
      setAuthenticated(true);
      const j = (await r.json()) as { photos?: AdminPhoto[] };
      setPhotos(j.photos ?? []);
    }
  }, []);

  useEffect(() => {
    void probeAuth();
  }, [probeAuth]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!r.ok) {
        setLoginError("Ungültiges Passwort.");
        setLoggingIn(false);
        return;
      }
      setPassword("");
      setAuthenticated(true);
      await probeAuth();
    } catch {
      setLoginError("Anmeldung fehlgeschlagen.");
    }
    setLoggingIn(false);
  };

  const loadTab = useCallback(async (t: Tab) => {
    setLoadError(null);
    setLoading(true);
    try {
      if (t === "photos") {
        const r = await fetch("/api/admin/photos", { credentials: "include" });
        if (r.status === 401) {
          setAuthenticated(false);
          return;
        }
        if (!r.ok) throw new Error(await r.text());
        const j = (await r.json()) as { photos?: AdminPhoto[] };
        setPhotos(j.photos ?? []);
      } else if (t === "users") {
        const r = await fetch("/api/admin/users", { credentials: "include" });
        if (r.status === 401) {
          setAuthenticated(false);
          return;
        }
        if (!r.ok) throw new Error(await r.text());
        const j = (await r.json()) as { users?: AdminUser[] };
        setUsers(j.users ?? []);
      } else {
        const r = await fetch("/api/admin/passes", { credentials: "include" });
        if (r.status === 401) {
          setAuthenticated(false);
          return;
        }
        if (!r.ok) throw new Error(await r.text());
        const j = (await r.json()) as { passes?: AdminPass[] };
        setPasses(j.passes ?? []);
      }
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Laden fehlgeschlagen.",
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    void loadTab(tab);
  }, [authenticated, tab, loadTab]);

  const photoAction = async (
    storagePath: string,
    action: "approve" | "reject",
  ) => {
    setActionId(storagePath + action);
    try {
      const r = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ storagePath, action }),
      });
      if (r.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!r.ok) {
        const t = await r.text();
        alert(t || "Aktion fehlgeschlagen.");
        return;
      }
      let body: { success?: boolean };
      try {
        body = (await r.json()) as { success?: boolean };
      } catch {
        body = {};
      }
      if (!body.success) {
        alert("Aktion fehlgeschlagen.");
        return;
      }
      if (action === "reject") {
        setPhotos((prev) =>
          prev.filter((p) => p.storagePath !== storagePath),
        );
      } else {
        setPhotos((prev) =>
          prev.map((p) =>
            p.storagePath === storagePath
              ? { ...p, adminStatus: "approved" }
              : p,
          ),
        );
      }
    } finally {
      setActionId(null);
    }
  };

  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: bg }}
      >
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/90 p-8 shadow-2xl">
          <h1
            className="text-2xl font-semibold tracking-tight text-center mb-1"
            style={{ color: gold }}
          >
            AlpinChaser Admin
          </h1>
          <p className="text-sm text-zinc-500 text-center mb-8">
            Passwort erforderlich
          </p>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-[#E8B800]/50 focus:ring-1 focus:ring-[#E8B800]/25"
              autoComplete="current-password"
            />
            {loginError ? (
              <p className="text-sm text-red-400">{loginError}</p>
            ) : null}
            <button
              type="submit"
              disabled={loggingIn || !password}
              className="w-full rounded-xl py-3 font-medium text-zinc-950 transition enabled:hover:brightness-110 disabled:opacity-40"
              style={{ backgroundColor: gold }}
            >
              {loggingIn ? "…" : "Anmelden"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabBtn = (id: Tab, label: string) => (
    <button
      type="button"
      key={id}
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        tab === id
          ? "text-zinc-950 shadow-lg"
          : "text-zinc-400 hover:text-zinc-200"
      }`}
      style={
        tab === id
          ? { backgroundColor: gold }
          : { backgroundColor: "transparent" }
      }
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen text-zinc-100" style={{ backgroundColor: bg }}>
      <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1
              className="text-lg font-semibold tracking-tight"
              style={{ color: gold }}
            >
              Admin Dashboard
            </h1>
            <p className="text-xs text-zinc-500">AlpinChaser</p>
          </div>
          <nav className="flex flex-wrap gap-1 rounded-xl bg-zinc-900/60 p-1 border border-zinc-800">
            {tabBtn("photos", "Neue Fotos")}
            {tabBtn("users", "User")}
            {tabBtn("passes", "Pässe")}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {loadError ? (
          <div className="mb-6 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
            {loadError}
          </div>
        ) : null}
        {loading ? (
          <p className="text-sm text-zinc-500 mb-4">Laden…</p>
        ) : null}

        {tab === "photos" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map((p) => {
              const approved =
                (p.adminStatus ?? "").toLowerCase() === "approved";
              return (
                <article
                  key={p.storagePath}
                  className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-xl"
                >
                  <div className="relative aspect-[4/3] bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {approved ? (
                      <div className="absolute left-2 top-2 rounded-lg bg-emerald-600/95 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                        Freigegeben ✓
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <p className="text-sm">
                      <span className="text-zinc-500">Pass </span>
                      <span className="font-medium" style={{ color: gold }}>
                        {p.passId}
                      </span>
                      <span className="text-zinc-600"> · </span>
                      <span className="text-xs text-zinc-500">{p.folder}</span>
                    </p>
                    <p className="text-xs text-zinc-500">
                      {p.uploadedAt
                        ? new Date(p.uploadedAt).toLocaleString("de-DE")
                        : "—"}
                    </p>
                    {!approved ? (
                      <div className="mt-auto flex gap-2 pt-3">
                        <button
                          type="button"
                          disabled={actionId !== null}
                          onClick={() =>
                            void photoAction(p.storagePath, "approve")
                          }
                          className="flex-1 rounded-lg py-2 text-xs font-semibold text-zinc-950 disabled:opacity-40"
                          style={{ backgroundColor: gold }}
                        >
                          {actionId === p.storagePath + "approve"
                            ? "…"
                            : "Freigeben"}
                        </button>
                        <button
                          type="button"
                          disabled={actionId !== null}
                          onClick={() =>
                            void photoAction(p.storagePath, "reject")
                          }
                          className="flex-1 rounded-lg border border-red-800/80 bg-red-950/60 py-2 text-xs font-semibold text-red-200 hover:bg-red-900/50 disabled:opacity-40"
                        >
                          {actionId === p.storagePath + "reject"
                            ? "…"
                            : "Ablehnen"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {tab === "users" ? (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/40">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="px-4 py-3 font-medium">Username</th>
                  <th className="px-4 py-3 font-medium">E-Mail</th>
                  <th className="px-4 py-3 font-medium">Beitritt</th>
                  <th className="px-4 py-3 font-medium">Premium</th>
                  <th className="px-4 py-3 font-medium">Pässe (gefahren)</th>
                  <th className="px-4 py-3 font-mono text-xs font-medium">
                    UID
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.uid}
                    className="border-b border-zinc-800/80 last:border-0 hover:bg-zinc-900/40"
                  >
                    <td className="px-4 py-3 font-medium text-zinc-200">
                      {u.username ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {u.email ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {u.joinDate
                        ? new Date(u.joinDate).toLocaleDateString("de-DE")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {u.isPremium ? (
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-semibold text-zinc-950"
                          style={{ backgroundColor: gold }}
                        >
                          Pro
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-300">
                      {u.passCount}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-600 max-w-[140px] truncate">
                      {u.uid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {tab === "passes" ? (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/40">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Fahrer (eindeutig)</th>
                </tr>
              </thead>
              <tbody>
                {passes.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-zinc-800/80 last:border-0 hover:bg-zinc-900/40"
                  >
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: gold }}
                    >
                      {p.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                      {p.id}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-200">
                      {p.rideCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>
    </div>
  );
}

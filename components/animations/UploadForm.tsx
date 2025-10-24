// components/UploadForm.tsx
"use client";

import React, { useState } from "react";

type Result = {
  total: number;
  breakdown: { content: number; expression: number; mechanics: number };
  grade?: string;
  feedback: string[];
  one_sentence_suggestion: string;
};

export default function UploadForm() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("English");
  const [level, setLevel] = useState("SHS3");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!text && !file) {
      setError("Please paste text or upload an image.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("subject", subject);
      form.append("level", level);
      if (text) form.append("text", text);
      if (file) form.append("image", file);

      const resp = await fetch("/api/grade", {
        method: "POST",
        body: form,
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || "Server error");
      }

      const data = await resp.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          >
            <option>English</option>
            <option>Mathematics</option>
            <option>Social Studies</option>
            <option>Biology</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          >
            <option>SHS3</option>
            <option>SHS2</option>
            <option>SHS1</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Paste essay text (or leave blank to upload image)</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="mt-1 block w-full border rounded p-2"
            placeholder="Paste essay text here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Or upload image (photo / scan)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1"
          />
          {file && <p className="text-xs mt-1">Selected: {file.name}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60"
          >
            {loading ? "Checking..." : "Check / Grade (Free) "}
          </button>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>

      {result && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold">Result — {result.total}/20</h3>
          <p className="text-sm">Breakdown: Content {result.breakdown.content}/10 • Expression {result.breakdown.expression}/5 • Mechanics {result.breakdown.mechanics}/5</p>

          <div className="mt-3">
            <h4 className="font-medium">Feedback</h4>
            <ul className="list-disc pl-5 mt-2">
              {result.feedback.map((f, i) => (
                <li key={i} className="text-sm">{f}</li>
              ))}
            </ul>
            <p className="mt-2 italic text-sm">{result.one_sentence_suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

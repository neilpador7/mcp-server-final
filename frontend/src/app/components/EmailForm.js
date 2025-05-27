"use client";
import { useState } from "react";
import { sendEmail } from "../api/email";

export default function EmailForm() {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await sendEmail(form);
      setStatus("Email sent successfully.");
      setForm({ to: "", subject: "", body: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send email.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Send Email</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="to"
          type="email"
          placeholder="Recipient Email"
          value={form.to}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="body"
          placeholder="Email body"
          rows={5}
          value={form.body}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded resize-none"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send Email
        </button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}

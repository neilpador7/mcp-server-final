export async function sendEmail({ to, subject, body }) {
  const res = await fetch("https://mcp-server-dc5e.onrender.com/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipient: to, subject, body }),
  });

  if (!res.ok) throw new Error("Failed to send email");
  return res.json();
}

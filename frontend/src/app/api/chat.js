export async function sendChatMessage(message) {
  const response = await fetch("https://mcp-server-dc5e.onrender.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: message }),
  });

  if (!response.ok) {
    throw new Error("Failed to get chat response");
  }

  const data = await response.json();
  return data.answer;
}

const API_BASE = "/api";

export const submitGameResult = async (data) => {
  const res = await fetch(`${API_BASE}/game-result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getStats = async () => {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
};

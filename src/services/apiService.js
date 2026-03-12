const API_BASE = "/api";

export const submitSurvey = async (data) => {
  const res = await fetch(`${API_BASE}/survey`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const submitGameResult = async (data) => {
  const res = await fetch(`${API_BASE}/game-result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const submitCheckin = async (data) => {
  const res = await fetch(`${API_BASE}/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw { ...json, status: res.status };
  }
  return json;
};

export const getStats = async () => {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
};

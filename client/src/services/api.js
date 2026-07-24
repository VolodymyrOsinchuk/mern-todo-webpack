// client/src/services/api.js
const API_URL = "/api/todos";

/**
 * Wrapper autour de fetch : parse le JSON et normalise les erreurs.
 * @param {string} url
 * @param {RequestInit} [options]
 */
const request = async (url, options = {}) => {
  let response;

  try {
    response = await fetch(url, options);
  } catch (err) {
    if (err.name === "AbortError") {
      throw err;
    }
    throw new Error(
      "Impossible de contacter le serveur. Vérifiez votre connexion.",
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Erreur ${response.status} : ${response.statusText}`,
    );
  }

  return data;
};

const JSON_HEADERS = { "Content-Type": "application/json" };

export const fetchTodos = (signal) => request(API_URL, { signal });

export const createTodo = (todo) =>
  request(API_URL, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(todo),
  });

export const updateTodo = (id, updates) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(updates),
  });

export const deleteTodo = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

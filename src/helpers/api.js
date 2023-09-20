const baseUrl = "https://reqres.in/api";

export async function checkResponse(res) {
  const parsedJson = await res.json();
  if (res.ok) {
    return parsedJson;
  }
  return Promise.reject(parsedJson);
}

export const getUsersApi = () => {
  return fetch(`${baseUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const signUpApi = (form) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }).then(checkResponse);
};

export const getCurrentUserApi = (id) => {
  return fetch(`${baseUrl}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const logoutApi = () => {
  return fetch(`${baseUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

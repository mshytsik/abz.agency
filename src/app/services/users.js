const API_BASE = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = async (page, count) => {
  const users = {
    list: [],
    total: 0,
  };

  const response = await fetch(`${API_BASE}/users?page=${page}&count=${count}`);

  if (response.ok) {
    const result = await response.json();

    if (result.success) {
      users.list = result.users;
      users.total = result.total_pages;
    }
  }

  return users;
};

export const getPositions = async () => {
  const response = await fetch(`${API_BASE}/positions`);

  if (response.ok) {
    const result = await response.json();

    if (result.success) {
      return result.positions;
    }
  }

  return [];
};

export const getToken = async () => {
  const response = await fetch(`${API_BASE}/token`);

  if (response.ok) {
    const result = await response.json();

    if (result.success) {
      return result.token;
    }
  }

  return false;
};

export const registerUser = async (data) => {
  const token = await getToken();
  if (!token) return false;

  const body = new FormData();
  body.append('name', data.name);
  body.append('email', data.email);
  body.append('phone', data.phone);
  body.append('position_id', data.position);
  body.append('photo', data.photo);

  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { Token: token },
    body,
  });

  if (response.ok) {
    const result = await response.json();

    if (result.success) {
      return result.user_id;
    }
  }

  return false;
};

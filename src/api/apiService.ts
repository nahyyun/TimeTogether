export const apiService = {
  get: async (endPoint: string) => {
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  },

  put: async (endPoint: string, body: any) => {
    const response = await fetch(endPoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  },

  post: async (endPoint: string, body: any) => {
    const response = await fetch(endPoint, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  },
};

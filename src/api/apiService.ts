export const apiService = {
  get: <ResponseSuccessType>(endPoint: string) =>
    fetch(endPoint)
      .then<ResponseSuccessType>((data) => data.json())
      .catch((err) => console.error(err)),

  put: (endPoint: string, body: any) =>
    fetch(endPoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .catch((err) => console.error(err)),

  post: (endPoint: string, body: any) =>
    fetch(endPoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .catch((err) => console.error(err)),
};

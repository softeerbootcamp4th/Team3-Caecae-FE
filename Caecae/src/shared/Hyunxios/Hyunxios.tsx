class Hyunxios {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetch(
    url: string,
    options: object | null = null,
    limitTime: number = 60000
  ): Promise<Response> {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchPromise = fetch(url, { ...options, signal }).then(
      (response) => ({ type: "success", data: response })
    );
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        controller.abort();
        reject({ type: "error", data: "Request timed out" });
      }, limitTime);
    });
    let result: Response = new Response();
    try {
      const raceResult = (await Promise.race([
        fetchPromise,
        timeoutPromise,
      ])) as { type: string; data: unknown };
      console.log(raceResult.type);
      if (raceResult.type === "error") throw new Error("Request timeout");
      result = raceResult.data as Response;
    } catch (error) {
      console.log(`fetch error -> ${error}`);
    }
    return result;
  }

  async get<T>(url: string): Promise<T> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await this.fetch(`${this.baseUrl}${url}`, {
        method: "GET",
        credentials: "include",
        headers: headers,
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error("request failed.");
      }

      const data = (await response.json()) as T;
      return data;
    } catch {
      throw new Error("parsing failed.");
    }
  }

  async post<T>(url: string, parameter: object): Promise<T> {
    const jsonData = JSON.stringify(parameter);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await this.fetch(`${this.baseUrl}${url}`, {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: jsonData,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("request failed.");
      }

      const data = (await response.json()) as T;
      return data;
    } catch {
      throw new Error("parsing failed.");
    }
  }

  async delete<T>(url: string): Promise<T | null> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await this.fetch(`${this.baseUrl}${url}`, {
        method: "DELETE",
        headers: headers,
        credentials: "include",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("request failed.");
      }

      const data = (await response.json()) as T;
      return data;
    } catch {
      throw new Error("parsing failed.");
    }
  }

  async update<T>(url: string, parameter: object): Promise<T | null> {
    const jsonData = JSON.stringify(parameter);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await this.fetch(`${this.baseUrl}${url}`, {
        method: "UPDATE",
        headers: headers,
        credentials: "include",
        body: jsonData,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("request failed.");
      }
      const data = (await response.json()) as T;
      return data;
    } catch {
      throw new Error("parsing failed.");
    }
  }
}

const huynxios = new Hyunxios("http://43.201.185.99:8080");
export default huynxios;

import assert from "node:assert/strict";
import test from "node:test";
import { api } from "../src/api.js";

async function withFetch(mockFetch, run) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockFetch;

  try {
    await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("GET uses the default method and returns JSON", async () => {
  await withFetch(
    async (url, options) => {
      assert.equal(url, "http://127.0.0.1:8000/courses");
      assert.equal(options.method, "GET");
      assert.equal(options.body, undefined);
      return new Response(JSON.stringify([{ code: "WEB" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
    async () => {
      assert.deepEqual(await api("/courses"), [{ code: "WEB" }]);
    },
  );
});

test("POST serializes the body as JSON", async () => {
  const payload = { student_id: "22000004", class_section_id: "WEB-01" };

  await withFetch(
    async (_url, options) => {
      assert.equal(options.method, "POST");
      assert.equal(options.headers["Content-Type"], "application/json");
      assert.equal(options.body, JSON.stringify(payload));
      return new Response(JSON.stringify({ message: "ok" }), { status: 201 });
    },
    async () => {
      assert.deepEqual(
        await api("/enrollments", { method: "POST", body: payload }),
        { message: "ok" },
      );
    },
  );
});

test("DELETE 204 returns null without reading JSON", async () => {
  await withFetch(
    async () => new Response(null, { status: 204 }),
    async () => {
      assert.equal(
        await api("/enrollments/22000004/WEB-01", { method: "DELETE" }),
        null,
      );
    },
  );
});

test("HTTP errors expose status and string detail", async () => {
  await withFetch(
    async () =>
      new Response(JSON.stringify({ detail: "Lop hoc phan da het cho" }), {
        status: 409,
      }),
    async () => {
      await assert.rejects(
        api("/enrollments", { method: "POST", body: {} }),
        (error) => {
          assert.equal(error.message, "HTTP 409: Lop hoc phan da het cho");
          assert.equal(error.status, 409);
          return true;
        },
      );
    },
  );
});

test("HTTP validation errors join detail messages", async () => {
  await withFetch(
    async () =>
      new Response(
        JSON.stringify({
          detail: [{ msg: "Truong bat buoc" }, { msg: "Gia tri khong hop le" }],
        }),
        { status: 422 },
      ),
    async () => {
      await assert.rejects(
        api("/enrollments", { method: "POST", body: {} }),
        (error) =>
          error.message ===
          "HTTP 422: Truong bat buoc; Gia tri khong hop le",
      );
    },
  );
});

test("non-JSON responses fail explicitly", async () => {
  await withFetch(
    async () =>
      new Response("<html>error</html>", {
        status: 502,
        headers: { "Content-Type": "text/html" },
      }),
    async () => {
      await assert.rejects(
        api("/courses"),
        new Error("HTTP 502: phản hồi không phải JSON."),
      );
    },
  );
});

test("network errors give a connection hint and are not retried", async () => {
  let calls = 0;

  await withFetch(
    async () => {
      calls += 1;
      throw new TypeError("fetch failed");
    },
    async () => {
      await assert.rejects(
        api("/enrollments", { method: "POST", body: {} }),
        /Kiểm tra Backend\/CORS/,
      );
      assert.equal(calls, 1);
    },
  );
});

test("aborted requests preserve the AbortError", async () => {
  const abortError = new DOMException("The operation was aborted", "AbortError");

  await withFetch(
    async () => {
      throw abortError;
    },
    async () => {
      await assert.rejects(api("/courses"), (error) => error === abortError);
    },
  );
});

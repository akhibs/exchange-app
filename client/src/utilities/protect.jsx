import settings from "../settings";

export default async function protect(userId, token) {
  const url =
    settings.mode === "development"
      ? "http://127.0.0.1:3000/protect"
      : "https://sixteenexchange.onrender.com/protect";

  const req = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      userId,
      token,
    }),
  });
  const res = await req.json();
  return res;
}

"use client";

export async function startCheckout(plan) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ plan })
  });

  const data = await res.json();
  if (data.success) {
    window.location.href = data.checkout_url;
  }
}

import config from "../configs/config.json";

export async function submitForm(values) {
  return await fetch(`https://formspree.io/f/${config.FORMSPREE_UID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
}

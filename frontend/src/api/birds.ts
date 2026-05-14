export async function getBirds() {
  const res = await fetch("http://localhost:3000/pets");

  if (!res.ok) {
    throw new Error("Failed to fetch pets");
  }

  return res.json();
}
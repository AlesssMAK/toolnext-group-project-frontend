export const getTools = async () => {
  const res = await fetch(
    "https://toolnext-group-project-backend.onrender.com/api/tools",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tools");
  }

  const data = await res.json();
  return data.tools || [];
};
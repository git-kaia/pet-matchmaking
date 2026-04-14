export const getAdopter = async (id: string) => {
  const response = await fetch(`http://localhost:3000/adopters/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch adopter');
  }

  return response.json();
};
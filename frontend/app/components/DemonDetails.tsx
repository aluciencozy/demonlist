const DemonDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await fetch(`http://127.0.0.1:8000/api/v1/demonlist/${id}`);
  if (!response.ok) throw new Error('Failed to fetch');

  const demon = await response.json();

  return (
    <div>
      <h1>{demon.name}</h1>
    </div>
  );
};

export default DemonDetails
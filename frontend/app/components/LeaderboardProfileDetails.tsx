const LeaderboardProfileDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await fetch(`http://127.0.0.1:8000/api/v1/leaderboard/${id}`);
  if (!response.ok) throw new Error('Failed to fetch');
  
  const profile = await response.json();

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>Points: {profile.total_points}</p>
    </div>
  );
}

export default LeaderboardProfileDetails;
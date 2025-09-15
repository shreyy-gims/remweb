"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { castVote, getVotingStatus } from "@/lib/firestore";

export default function VotingPage() {
  const { user } = useAuth();
  const [votingOpen, setVotingOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Example nominees (replace with Firestore later if needed)
  const categories = {
    "Best Singer": ["Nominee A", "Nominee B"],
    "Best Dancer": ["Nominee C", "Nominee D"],
  };

  useEffect(() => {
    getVotingStatus().then(status => {
      setVotingOpen(status);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to vote.</p>;
  if (!votingOpen) return <p>Voting is currently closed.</p>;

  const handleVote = async (category: string, nominee: string) => {
    try {
      await castVote(user.uid, category, nominee);
      alert(`Voted for ${nominee} in ${category}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vote Now</h1>
      {Object.entries(categories).map(([category, nominees]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold">{category}</h2>
          <div className="flex gap-4 mt-2">
            {nominees.map((nominee) => (
              <button
                key={nominee}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleVote(category, nominee)}
              >
                {nominee}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

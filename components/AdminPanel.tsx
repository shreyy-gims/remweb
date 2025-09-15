"use client";
import { useEffect, useState } from "react";
import { setVotingStatus, getVotingStatus, getResults } from "@/lib/firestore";

export default function AdminPanel() {
  const [votingOpen, setVotingOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    getVotingStatus().then(setVotingOpen);
    getResults().then(setResults);
  }, []);

  const toggleVoting = async () => {
    await setVotingStatus(!votingOpen);
    setVotingOpen(!votingOpen);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={toggleVoting}
      >
        {votingOpen ? "Stop Voting" : "Start Voting"}
      </button>

      <h2 className="mt-6 text-xl font-semibold">Results</h2>
      {results.map((nominee) => (
        <div key={nominee.id} className="mt-2">
          {nominee.id}: {nominee.votes ?? 0} votes
        </div>
      ))}
    </div>
  );
}

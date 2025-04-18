"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/repos");
        if (!res.ok) throw new Error("Failed to fetch repositories");

        const data = await res.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setError(error.message);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🚀 GitHub Repository Tracker</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-4xl grid gap-4">
        {repos.map((repo) => (
          <div key={repo.repoId} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <img src={repo.avatarUrl} alt={repo.owner} className="w-12 h-12 rounded-full" />
              <div>
                <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xl font-semibold hover:underline">
                  {repo.name}
                </a>
                <p className="text-gray-400">{repo.description || "No description available."}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <span className="bg-gray-700 px-2 py-1 rounded">{repo.language || "Unknown Language"}</span>
              <span className="ml-4">Created: {new Date(repo.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

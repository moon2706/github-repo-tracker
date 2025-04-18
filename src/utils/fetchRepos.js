import axios from 'axios';
import Repo from '../models/Repo';
import connectDB from './db';
import dotenv from 'dotenv';

dotenv.config();

const fetchGitHubRepos = async () => {
  try {
    await connectDB();

    const { data } = await axios.get('https://api.github.com/users/moon2706/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });

    const repoData = data.map(repo => ({
      repoId: repo.id.toString(),
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner.login,
      avatarUrl: repo.owner.avatar_url,
      htmlUrl: repo.html_url,
      description: repo.description,
      language: repo.language,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
    }));

    await Repo.insertMany(repoData, { ordered: false })
      .catch(error => {
        if (error.code === 11000) {
          console.warn("Duplicate entry detected, skipping...");
        } else {
          throw error;
        }
      });

    console.log("Repositories stored successfully!");
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error.message);
  }
};

fetchGitHubRepos();

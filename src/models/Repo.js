import mongoose from 'mongoose';

const RepoSchema = new mongoose.Schema({
  repoId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  owner: { type: String, required: true },
  avatarUrl: { type: String },
  htmlUrl: { type: String, required: true },
  description: { type: String },
  language: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

// ✅ Ensure model is registered before exporting
const Repo = mongoose.models.Repo || mongoose.model('Repo', RepoSchema);
export default Repo;

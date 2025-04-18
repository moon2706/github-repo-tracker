import connectDB from '../../../utils/db';
import Repo from '../../../models/Repo';

export async function GET() { // ✅ Next.js App Router requires function-based routes
  try {
    await connectDB();
    const repos = await Repo.find();
    return new Response(JSON.stringify(repos), { status: 200 });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return new Response(JSON.stringify({ error: "Error fetching repositories" }), { status: 500 });
  }
}

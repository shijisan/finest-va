import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// DELETE API Route to Delete Profile
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // Delete the profile in the database
    const deletedProfile = await prisma.profile.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'Profile deleted successfully', deletedProfile }), { status: 200 });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete profile' }), { status: 500 });
  }
}

// Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false, // Important: Disable Next.js body parser
  },
};

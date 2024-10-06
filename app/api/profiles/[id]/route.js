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

    return new Response(
      JSON.stringify({ message: 'Profile deleted successfully', deletedProfile }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting profile:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete profile' }),
      { status: 500 }
    );
  }
}

// Use Node.js runtime (this is the default for API routes)
export const config = {
  runtime: 'node', // or simply omit this line, as Node is the default
};

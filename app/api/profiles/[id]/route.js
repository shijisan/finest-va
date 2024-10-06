import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE API Route to Delete Profile
export async function DELETE(req, { params }) {
  const { id } = params;

  console.log("Deleting profile with ID:", id); // Log for debugging

  try {
    const deletedProfile = await prisma.profile.delete({
      where: { id: parseInt(id, 10) }, // Ensure id is parsed correctly
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

// Use the new runtime export
export const runtime = 'nodejs'; // Set the runtime to Node.js

import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = params;

  // Use formidable to handle file upload
  const form = new formidable.IncomingForm();
  form.uploadDir = './public/uploads';
  form.keepExtensions = true;

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(new Error('Form parsing error'));
      }

      try {
        const { name, description, niches } = fields;

        // Handle the image if uploaded
        let image = undefined;
        if (files.image) {
          const oldPath = files.image.filepath;
          const newPath = path.join(form.uploadDir, files.image.originalFilename);
          fs.renameSync(oldPath, newPath);
          image = `/uploads/${files.image.originalFilename}`;
        }

        // Update the profile
        const updatedProfile = await prisma.profile.update({
          where: { id: parseInt(id) },
          data: {
            name,
            description,
            niches, // directly use niches as a string
            ...(image && { image }), // only update image if a new one was uploaded
          },
        });

        resolve(new Response(JSON.stringify(updatedProfile), { status: 200 }));
      } catch (error) {
        reject(new Response(JSON.stringify({ error: 'Failed to update profile' }), { status: 500 }));
      }
    });
  });
}

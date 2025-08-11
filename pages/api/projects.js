import formidable from 'formidable';
import slugify from 'slugify';
import { connectToDatabase } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import Project from '@/models/Project';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const form = formidable({ multiples: true, keepExtensions: true });

      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      const title = fields.title?.toString() || '';
      const description = fields.description?.toString() || '';
      const blurb = fields.blurb?.toString() || '';
      const published = fields.published?.toString() === 'false' ? false : true;

      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const slug = slugify(title, { lower: true, strict: true });

      await connectToDatabase();

      let uploadedImages = [];
      const imageInputs = [];
      if (files.image) {
        if (Array.isArray(files.image)) {
          imageInputs.push(...files.image);
        } else {
          imageInputs.push(files.image);
        }
      }

      for (const file of imageInputs) {
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: 'saanvi-portfolio',
        });
        uploadedImages.push({ url: uploadResult.secure_url, publicId: uploadResult.public_id });
      }

      if (uploadedImages.length === 0) {
        return res.status(400).json({ error: 'At least one image is required' });
      }

      const project = await Project.create({
        title,
        slug,
        blurb,
        description,
        published,
        images: uploadedImages,
      });

      return res.status(201).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      await connectToDatabase();
      if (slug) {
        const project = await Project.findOne({ slug });
        if (!project) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(project);
      }
      const projects = await Project.find({}).sort({ createdAt: -1 });
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const form = formidable({ multiples: true, keepExtensions: true });
      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      const id = fields.id?.toString();
      if (!id) return res.status(400).json({ error: 'Project id is required' });

      const title = fields.title?.toString();
      const blurb = fields.blurb?.toString();
      const description = fields.description?.toString();
      const publishedStr = fields.published?.toString();

      await connectToDatabase();
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ error: 'Not found' });

      if (title) {
        project.title = title;
        project.slug = slugify(title, { lower: true, strict: true });
      }
      if (typeof blurb === 'string') project.blurb = blurb;
      if (typeof description === 'string') project.description = description;
      if (typeof publishedStr === 'string') project.published = publishedStr === 'true';

      // Optional image replacement; if new images provided, upload and replace
      const imageInputs = [];
      if (files.image) {
        if (Array.isArray(files.image)) imageInputs.push(...files.image);
        else imageInputs.push(files.image);
      }
      if (imageInputs.length > 0) {
        // Delete existing images on Cloudinary if publicId exists
        for (const img of project.images) {
          if (img.publicId) {
            try { await cloudinary.uploader.destroy(img.publicId); } catch {}
          }
        }
        const uploadedImages = [];
        for (const file of imageInputs) {
          const uploadResult = await cloudinary.uploader.upload(file.filepath, { folder: 'saanvi-portfolio' });
          uploadedImages.push({ url: uploadResult.secure_url, publicId: uploadResult.public_id });
        }
        project.images = uploadedImages;
      }

      await project.save();
      return res.status(200).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Project id is required' });
      await connectToDatabase();
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ error: 'Not found' });
      // cleanup images
      for (const img of project.images) {
        if (img.publicId) {
          try { await cloudinary.uploader.destroy(img.publicId); } catch {}
        }
      }
      await project.deleteOne();
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}



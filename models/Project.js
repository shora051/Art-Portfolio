import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    blurb: { type: String },
    description: { type: String, required: true },
    published: { type: Boolean, default: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);



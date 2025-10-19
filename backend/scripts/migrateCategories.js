import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Blog } from '../models/blog.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not set. Ensure backend/.env has MONGODB_URI.');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    const res = await Blog.updateMany(
      { $or: [ { mainCategory: { $exists: false } }, { mainCategory: null } ] },
      [
        {
          $set: {
            mainCategory: {
              $ifNull: [ '$mainCategory', 'Uncategorized' ]
            },
            subcategories: {
              $cond: [
                { $and: [ { $ne: ['$category', null] }, { $ne: ['$category', ''] } ] },
                { $setUnion: [ { $ifNull: ['$subcategories', []] }, [ '$category' ] ] },
                { $ifNull: ['$subcategories', []] }
              ]
            }
          }
        }
      ]
    );
    console.log('Migration complete:', res.acknowledged ? res.modifiedCount : res);
  } catch (e) {
    console.error('Migration error:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();

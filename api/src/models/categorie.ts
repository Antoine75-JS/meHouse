import { CategoryT } from 'categoriesT';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema<CategoryT>({
  catName: {
    type: String,
    required: [true, 'Please enter a name for your category']
  },
  orgaId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

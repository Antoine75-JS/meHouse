interface ICategory {
  _id: string;
  catName: string;
  orgaId: string;
}

interface ICategoryState extends ICategories {
  selectedCategory: string | null;
}

interface ICategories {
  categories: ICategory[];
}

interface INewCategoryPayload {
  catName: string;
  orgaId: string;
}

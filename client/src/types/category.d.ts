interface ICategory {
  _id: string;
  catName: string;
  orgaId: string;
}

interface ICategories {
  categories: ICategory[];
}

interface INewCategoryPayload {
  catName: string;
  orgaId: string;
}

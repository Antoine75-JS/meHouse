interface ICategory {
  _id: string;
  catName: string;
  orgaId: string;
}

interface ICategories {
  categories: ICategory[];
}

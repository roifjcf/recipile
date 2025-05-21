import { Category } from "@/common/type";
import CategoryList from "./components/categoryList";

interface Props {
  categories: Category[] | null,
  currentCategory: Category | null,
  setCurrentCategory: (data: Category) => void,
};

export default function SideBar({
  categories,
  currentCategory,
  setCurrentCategory,
}: Props) {




  return (
    <div className="sidebar-container" id="categories">
      <div className="sidebar-button-container">
        <button>By category</button>
        <button>By tag</button>
      </div>
      <CategoryList
        categories={categories ? categories : []}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
    </div>
  );





}
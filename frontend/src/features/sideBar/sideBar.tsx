import { Category } from "@/common/type";
import CategoryList from "./components/categoryList";

interface Props {
  categories: Category[] | null,
  currentCategory: Category | null,
  setCurrentCategory: (data: Category) => void,
  handleResetSearchInput: () => void,
};

export default function SideBar({
  categories,
  currentCategory,
  setCurrentCategory,
  handleResetSearchInput,
}: Props) {




  return (
    <div className="page-left-column" id="categories">
      <div className="sidebar-button-container">
        <button>By category</button>
        <button>By tag</button>
      </div>
      <CategoryList
        categories={categories ? categories : []}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        handleResetSearchInput={handleResetSearchInput}
      />
    </div>
  );





}
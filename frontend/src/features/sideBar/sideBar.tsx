import { Category } from "@/common/type";
import CategoryList from "./components/categoryList";
import { useState } from "react";

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

  const [currentGroup, setCurrentGroup] = useState<"category" | "tag">("category");

  return (
    <div className="page-left-column" id="categories">
      <div className="sidebar-button-container">

        <button
          className={currentGroup === "category" ? "active-button" : ""}
          onClick={()=>setCurrentGroup("category")}
        >
          By category
        </button>

        <button
          className={currentGroup === "tag" ? "active-button" : ""}
          onClick={()=>setCurrentGroup("tag")}
        >
          By tag
        </button>

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
'use client';
import { CategoryInterface } from "@/common/type";

interface Props {
  categories: CategoryInterface[],
  currentCategory: CategoryInterface | null,
  setCurrentCategory: (data: CategoryInterface) => void,
  handleResetSearchInput: () => void,
}

export default function CategoryList ({
  categories,
  currentCategory,
  setCurrentCategory,
  handleResetSearchInput,
}: Props) {

  const handleClick = (cat: CategoryInterface) => {
    handleResetSearchInput();
    setCurrentCategory(cat);
  }
  
  return(
    <ul>
      {categories.map((cat, index) =>
      <li
        className={`categorylist-item${cat === currentCategory ? " categorylist-item-selected" : ""}`}
        key={index}
        onClick={()=>handleClick(cat)}
      > 
        {cat.name}
      </li>)}
    </ul>
  )
}
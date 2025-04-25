'use client';
import { Category } from "@/common/type";

interface Props {
  categories: Category[],
  currentCategory: Category,
  setCurrentCategory: (data: Category) => void,
}

export default function CategoryList (props:Props) {
  const handleClick = (cat: Category) => {
    props.setCurrentCategory(cat);
  }
  return(
    <ul>
      {props.categories.map((cat, index) =>
      <li
        className={`categorylist-item${cat === props.currentCategory ? " categorylist-item-selected" : ""}`}
        key={index}
        onClick={()=>handleClick(cat)}
      > 
        {cat.name}
      </li>)}
    </ul>
  )
}
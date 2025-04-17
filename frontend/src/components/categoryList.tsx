'use client';
import { Recipe, Category, Tag, Ingredient } from "@/common/type";
import { useState } from "react";

interface Props {
  categories: Category[],
  setCurrentCategory: (data: Category) => void
}

export default function CategoryList (props:Props) {
  const handleClick = (cat: Category) => {
    props.setCurrentCategory(cat);
    // console.log(cat);
  }
  return(
    <div>
      <ul>
        {/* <li className="category">Uncategorized</li> */}
        {props.categories.map((cat, index) =>
        <li
          className="category-li"
          key={index} onClick={()=>handleClick(cat)}> {cat.name}
        </li>)}
      </ul>
    </div>
  )
}
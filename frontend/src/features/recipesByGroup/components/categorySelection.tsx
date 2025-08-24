import { CategoryInterface } from "@/common/type";
import Icon from "@/components/icon/icon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";

interface Props {
  categories: CategoryInterface[],
  handleMoveSelectedRecipes: (selectedCategoryid: number) => void,
  handleClose: () => void,
}

export default function CategorySelection({
  categories,
  handleMoveSelectedRecipes,
  handleClose
}: Props) {

  const [selectedCategoryId, setSelectedCategoryId] = useState<number|undefined>(undefined);
  const handleConfirm = () => {
    if (!selectedCategoryId) return;
    handleMoveSelectedRecipes(selectedCategoryId);
    handleClose();
  };
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, handleClose);

  return (
    <>
      <div
        className="categoryselection-container display-center soft-shadow"
        ref={ref}
      >
        <p className="categoryselection-title">Choose a category</p>

        {categories.map((cat, index) =>
        <div
          className={`categoryselection-item clickable + ${selectedCategoryId === cat.id ? " selected" : ""}`}
          key={index}
          onClick={()=>setSelectedCategoryId(cat.id)}
        >
          {cat.name}
        </div>
        )}

        <div className="categoryselection-buttons">
          <Icon
            src="close-outline"
            hoverable={true}
            onClick={handleClose}
          />
          <Icon
            src="yes-outline"
            hoverable={true}
            onClick={handleConfirm}
          />
        </div>

      </div>




      <div className="bluroverlay"></div>
    </>
  );
}
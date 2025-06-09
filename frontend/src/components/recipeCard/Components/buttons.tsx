import { RecipeInterface } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  canDelete: boolean,
  recipe: RecipeInterface,
  handlePin: (val: number, e: React.MouseEvent) => void,
  handleUpdateEditList?: (id: number, e: React.MouseEvent) => void,
  recipesToEdit: Set<number>,
};

export default function Buttons({
  canDelete,
  recipe,
  handlePin,
  handleUpdateEditList,
  recipesToEdit,
}: Props) {

  const handleToggle = (e: React.MouseEvent) => {
    handleUpdateEditList?.(recipe.id, e);
  };

  const checkboxImg = recipesToEdit.has(recipe.id) ? "checkbox-checked" : "checkbox-unchecked";

  return (
    <>
      {recipe.pinned === 1 && <Icon src="star-fill" hoverable={true} onClick={(e)=>handlePin(recipe.pinned, e)} />}
      {recipe.pinned === 0 && <Icon src="star-outline" hoverable={true} onClick={(e)=>handlePin(recipe.pinned, e)} />}
      {canDelete && checkboxImg === "checkbox-checked" && (
        <Icon src="checkbox-checked" hoverable={true} onClick={handleToggle} />
      )}
      {canDelete && checkboxImg === "checkbox-unchecked" && (
        <Icon src="checkbox-unchecked" hoverable={true} onClick={handleToggle} />
      )}
    </>
  );
}
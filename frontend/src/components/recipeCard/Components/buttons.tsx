import { RecipeInterface } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  canDelete: boolean,
  recipe: RecipeInterface,
  handlePin: (val: number, e: React.MouseEvent) => void,
  handleUpdateEditList?: (id: number, e: React.MouseEvent) => void,
  isChecked?: boolean,
};

export default function Buttons({
  canDelete,
  recipe,
  handlePin,
  handleUpdateEditList,
  isChecked,
}: Props) {

  
  return (
    <>
      {recipe.pinned === 1 && <Icon src="star-fill" hoverable={true} onClick={(e)=>handlePin(recipe.pinned, e)} />}
      {recipe.pinned === 0 && <Icon src="star-outline" hoverable={true} onClick={(e)=>handlePin(recipe.pinned, e)} />}
      {canDelete && isChecked && <Icon src="checkbox-unchecked" hoverable={true} onClick={(e)=>{handleUpdateEditList!(recipe.id, e)}}/>}
      {canDelete && isChecked && <Icon src="checkbox-checked" hoverable={true} onClick={(e)=>{handleUpdateEditList!(recipe.id, e)}}/>}
    </>
  );
}
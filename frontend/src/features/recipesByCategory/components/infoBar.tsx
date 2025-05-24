import { Category, IconProps, Mode, Recipe, recipeCardDisplay } from "@/common/type";

import Icon from "@/components/icon";
import NewRecipeButton from "./newRecipeButton";
import ExpandableIcons from "./expandableIcons";

interface Props {
  currentCategory: Category | null,
  setMode: (hookval: Mode) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setCurrentRecipe: (hookval: Recipe) => void,
  isBulkEditing: boolean,
  handleDeleteRecipes:(idSet: Set<number>) => Promise<void>,
  recipesToEdit: Set<number>,
  setIsBulkEditing: (hookval: boolean) => void,
  recipeCardDisplay: recipeCardDisplay,
  toggleCardDisplay: (hookval: recipeCardDisplay) => void,
  showRecipeDetail: boolean,
};


export default function InfoBar(props: Props) {

  const displayButtonGroup: IconProps[] = [
    {
      src: "display-list",
      hoverable: true,
      onClick: () => props.toggleCardDisplay("list"),
      description: "List",
    },
    {
      src: "display-simple",
      hoverable: true,
      onClick: () => props.toggleCardDisplay("simple"),
      description: "Simple",
    },
    {
      src: "display-full",
      hoverable: true,
      onClick: () => props.toggleCardDisplay("full"),
      description: "Full",
    },
    
  ];

  const multipleSelectButtonGroup: IconProps[] = [
    {
      src: "bin-outline",
      altsrc: "bin-fill",
      hoverable: true,
      onClick: ()=>{props.handleDeleteRecipes(props.recipesToEdit)},
      description: "Delete",
    }
  ];
  


  return (
  <div className="infobar-container">
    
    <div className="left">
      <h1>{props.currentCategory?.name}</h1>
      <NewRecipeButton
        setMode={props.setMode}
        setShowRecipeDetail={props.setShowRecipeDetail}
        setCurrentRecipe={props.setCurrentRecipe}
        showRecipeDetail={props.showRecipeDetail}
      />
    </div>
    
    <div className="right">
      {/* {props.isBulkEditing && <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} onClick={()=>{props.handleDeleteRecipes(props.recipesToEdit)}} />} */}
      {/* <Icon src="checkbox-unchecked" hoverable={true} onClick={()=>{props.setIsBulkEditing(!props.isBulkEditing)}}/> */}

      <ExpandableIcons
        iconsToDisplay={multipleSelectButtonGroup}
        src="checkbox-unchecked"
        hoverable={true}
        onClick={()=>{props.setIsBulkEditing(!props.isBulkEditing)}}
        description="Multi-select"
      />

      <ExpandableIcons
        iconsToDisplay={displayButtonGroup}
        src="display-outline"
        hoverable={true}
        description="Layout"
      />
    </div>
  </div>);
}
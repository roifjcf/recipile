import { CategoryInterface, IconProps, Mode, RecipeInterface, RecipeCardDisplay, SideBarDisplay } from "@/common/type";

import Icon from "@/components/icon";
import NewRecipeButton from "./newRecipeButton";
import ExpandableIcons from "./expandableIcons";
import Category from "@/components/category";

interface Props {
  currentCategory: CategoryInterface | null,
  setMode: (hookval: Mode) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
  isBulkEditing: boolean,
  handleDeleteRecipes:(idSet: Set<number>) => Promise<void>,
  recipesToEdit: Set<number>,
  setIsBulkEditing: (hookval: boolean) => void,
  recipeCardDisplay: RecipeCardDisplay,
  toggleCardDisplay: (hookval: RecipeCardDisplay) => void,
  showRecipeDetail: boolean,
  currentGroup: SideBarDisplay,
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
  
  const sortGroup: IconProps[] = [
    {
      src: "serving-outline",
      hoverable: true,
      description: "Serving size", // sort by pinned then id
    },
    {
      src: "time-outline",
      hoverable: true,
      description: "Time", // sort by pinned then id
    },
    {
      src: "sort-alpha",
      hoverable: true,
      description: "By name",
    },
    {
      src: "date-range",
      hoverable: true,
      description: "By date",
    },
    {
      src: "sort",
      hoverable: true,
      description: "Default", // sort by pinned then id
    }
  ];

  return (
  <div className="infobar-container">
    
    {props.currentGroup === "category" ?
    <div className="left">
      {props.currentCategory && <Category
        category={props.currentCategory}
      />}
      <NewRecipeButton
        setMode={props.setMode}
        setShowRecipeDetail={props.setShowRecipeDetail}
        setCurrentRecipe={props.setCurrentRecipe}
        showRecipeDetail={props.showRecipeDetail}
      />
    </div> : <div className="left"></div>}
    
    <div className="right">
      
      <ExpandableIcons
        iconsToDisplay={sortGroup}
        src="sort"
        hoverable={true}
        description="Sort"
      />

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
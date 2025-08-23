import { CategoryInterface, IconProps, Modes, RecipeInterface, RecipeCardDisplay, SideBarDisplay } from "@/common/type";

import NewRecipeButton from "./newRecipeButton";
import ExpandableIcons from "./expandableIcons";
import Category from "@/components/category";
import { useContext } from "react";
import SortMethodContext from "@/contexts/sortMethodContext";
import { sortRecipe } from "@/utils/helper";

interface Props {
  currentCategory: CategoryInterface | null,
  setMode: (hookval: Modes) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
  toggleCardDisplay: (hookval: RecipeCardDisplay) => void,
  showRecipeDetail: boolean,
  currentGroup: SideBarDisplay,
};


export default function InfoBar({
  currentCategory,
  setMode,
  setShowRecipeDetail,
  setCurrentRecipe,
  toggleCardDisplay,
  showRecipeDetail,
  currentGroup,
}: Props) {


  const context = useContext(SortMethodContext);


  const displayButtonGroup: IconProps[] = [
    {
      src: "display-list",
      hoverable: true,
      onClick: () => toggleCardDisplay("list"),
      description: "List",
    },
    {
      src: "display-simple",
      hoverable: true,
      onClick: () => toggleCardDisplay("simple"),
      description: "Simple",
    },
    {
      src: "display-full",
      hoverable: true,
      onClick: () => toggleCardDisplay("full"),
      description: "Full",
    },
    
  ];
  
  const sortGroup: IconProps[] = [
    {
      src: "serving-outline",
      hoverable: true,
      description: "Serving size", // sort by pinned then id
      onClick: () => {
        if (context) {
          const sortedRecipe = sortRecipe(context.recipes, "serving size");
          context.setRecipes(sortedRecipe);
        }
      }
    },
    {
      src: "time-outline",
      hoverable: true,
      description: "Time", // sort by pinned then id
      onClick: () => {
        if (context) {
          const sortedRecipe = sortRecipe(context.recipes, "time");
          context.setRecipes(sortedRecipe);
        }
      }
    },
    {
      src: "sort-alpha",
      hoverable: true,
      description: "By name",
      onClick: () => {
        if (context) {
          const sortedRecipe = sortRecipe(context.recipes, "name");
          context.setRecipes(sortedRecipe);
        }
      }
    },
    {
      src: "date-range",
      hoverable: true,
      description: "By date",
      onClick: () => {
        if (context) {
          const sortedRecipe = sortRecipe(context.recipes, "date");
          context.setRecipes(sortedRecipe);
        }
      }
    },
    {
      src: "sort",
      hoverable: true,
      description: "Default", // sort by pinned then id
      onClick: () => {
        if (context) {
          const sortedRecipe = sortRecipe(context.recipes, "default");
          context.setRecipes(sortedRecipe);
        }
      }
    }
  ];

  return (
  <div className="infobar-container">
    
    {currentGroup === "category" ?
    <div className="left">
      {currentCategory && <Category
        category={currentCategory}
      />}
      <NewRecipeButton
        setMode={setMode}
        setShowRecipeDetail={setShowRecipeDetail}
        setCurrentRecipe={setCurrentRecipe}
        showRecipeDetail={showRecipeDetail}
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
        iconsToDisplay={displayButtonGroup}
        src="display-outline"
        hoverable={true}
        description="Layout"
      />
    </div>
  </div>);
}
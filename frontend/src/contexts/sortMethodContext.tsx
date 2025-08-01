import { RecipeInterface } from "@/common/type";
import { createContext } from "react";

interface contextInterface {
  setRecipes: (hookval: RecipeInterface[]) => void,
  recipes: RecipeInterface[],
};

const SortMethodContext = createContext<contextInterface | undefined>(undefined);
export default SortMethodContext;
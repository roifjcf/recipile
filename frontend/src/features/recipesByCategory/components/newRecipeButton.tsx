import { Mode, Recipe } from "@/common/type";

interface Props {
  setMode: (hookval: Mode) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setCurrentRecipe: (hookval: Recipe) => void,
};

const newRecipeTemplate: Recipe = {
  id: -1,
  name: "",
  ingredients: [],
  steps: [],
  external_links: "",
  created: "",
  pinned: 0,
  serving: 1,
  prep_time: 10,
  notes: "",
  categories: [],
  tags: [],
};

export default function NewRecipeButton(props: Props) {
  return <button
          id="new-recipe"
          onClick={()=>{
              props.setMode("new");
              props.setShowRecipeDetail(true);
              props.setCurrentRecipe({...newRecipeTemplate})
            }}
          
          >
            Add recipe
          </button>
}
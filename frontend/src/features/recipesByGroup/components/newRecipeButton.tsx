import { Modes, RecipeInterface } from "@/common/type";

interface Props {
  showRecipeDetail: boolean,
  setMode: (hookval: Modes) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
};

const newRecipeTemplate: RecipeInterface = {
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
  img_filename: "",
  img_main: null,
};

export default function NewRecipeButton(props: Props) {

  const handleClick = () => {
    if (props.showRecipeDetail) {return;}
    props.setMode("new");
    props.setShowRecipeDetail(true);
    props.setCurrentRecipe({...newRecipeTemplate});
  };

  return <button
          id="new-recipe"
          onClick={handleClick}
          >
            New recipe
          </button>
}
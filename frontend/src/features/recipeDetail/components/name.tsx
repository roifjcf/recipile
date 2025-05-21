import { Mode, Recipe } from "@/common/type";

interface Props {
  name: string,
  mode: Mode,
  recipeDetail: Recipe,
  setRecipeDetail: (hookval: Recipe) => void,
}

export default function Name({
  name,
  mode,
  setRecipeDetail,
  recipeDetail,
} : Props) {

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeDetail({...recipeDetail, name: e.target.value});
  };

  const ViewMode = () => <h3>{name}</h3>;

  const EditMode = () => <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Recipe name"
                          />;

  return mode === "view" ?  <ViewMode/> : <EditMode/>;

};
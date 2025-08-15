import { Modes, RecipeInterface } from "@/common/type";

interface Props {
  name: string,
  mode: Modes,
  recipeDetail: RecipeInterface,
  setRecipeDetail: (hookval: RecipeInterface) => void,
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

  const renderViewMode = () => <h3>{name}</h3>;

  const renderEditMode = () => (
  <>
    <h4>Name*</h4>
    <input
      type="text"
      value={name}
      onChange={handleNameChange}
      placeholder="Recipe name"
    />
  </>);
  
  // https://stackoverflow.com/questions/42573017/in-react-es6-why-does-the-input-field-lose-focus-after-typing-a-character
  return mode === "view" ?  renderViewMode() : renderEditMode();

};
import { Modes, RecipeInterface } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  mode: Modes
  url: string,
  recipeDetail: RecipeInterface,
  setRecipeDetail: (hookval: RecipeInterface) => void,
};

export default function Link({
  url,
  mode,
  setRecipeDetail,
  recipeDetail,
}: Props) {

  const renderViewMode = () => <a href={url} target="_blank">
                          <Icon src={"link-outline"} hoverable={true}/>
                        </a>;

  const renderEditMode = () => (
  <>
    <h4>Reference link</h4>
    <input
      type="text"
      value={url}
      onChange={(e)=>setRecipeDetail({...recipeDetail, external_links: e.target.value})}
      placeholder="External link"
    />
  </>);

  return mode === "view" ?  renderViewMode() : renderEditMode();
}
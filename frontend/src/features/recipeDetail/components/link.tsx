import { Mode, Recipe } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  mode: Mode
  url: string,
  recipeDetail: Recipe,
  setRecipeDetail: (hookval: Recipe) => void,
};

export default function Link({
  url,
  mode,
  setRecipeDetail,
  recipeDetail,
}: Props) {

  const ViewMode = () => <a href={url} target="_blank">
                          <Icon src={"link-outline"} hoverable={true}/>
                        </a>;

  const EditMode = () => <input
                            type="text"
                            value={url}
                            onChange={(e)=>setRecipeDetail({...recipeDetail, external_links: e.target.value})}
                            placeholder="External link"
                          />

  return mode === "view" ?  <ViewMode/> : <EditMode/>;

}
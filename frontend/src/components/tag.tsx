import { Modes } from "@/common/type";
import Icon from "./icon/icon";

interface Props {
  mode: Modes,
  tag: string, // tag name
  key?: number,
  handleRemoveTag?: (tagid:string) => void,
  onClick?: ((...args: any[]) => void) | undefined, // handles general click event
  classList?: string,
};




export default function Tag({
  mode,
  tag,
  handleRemoveTag,
  onClick,
  classList,
}: Props) {




  const renderView = (tag: string) => (
    <>
      <Icon src={"tag-outline"} />
      <p>{tag}</p>
    </>
  );



  const renderEdit = (tag: string) => (
    /** Handles click event in edit mode */
    <>
      <Icon src={"tag-outline"} />
      <p>{tag}</p>
      <Icon src={"bin-outline"}
        altsrc={"bin-fill"}
        hoverable={true}
        onClick={()=>handleRemoveTag!(tag)}
      />
    </>
  );
  



  return (
    <li className={"tag-label" + " " + classList} onClick={onClick}>
      {mode === "view" ?  renderView(tag) : renderEdit(tag) }
    </li>
  );
}
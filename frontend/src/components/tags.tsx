/**
 * Tag component
 */

import { Mode, Tag } from "@/common/type"
import Icon from "@/components/icon";
import { findRecordNameByid } from "@/utils/helper";

interface Props {
  mode: Mode,
  recipeTags: string[], // a list of tag name, not id!
  tags: Tag[],
  handleRemoveTag?: (tagid:string) => void,
};

export default function Tags({
  mode,
  recipeTags,
  tags,
  handleRemoveTag,
}: Props) {
  
  const renderView = (tag: string) => (<>
                                        <Icon src={"tag-outline"} />
                                        <p>{findRecordNameByid(parseInt(tag), tags)}</p>
                                      </>);
                                    
  const renderEdit = (tag: string) => (<>
                                        <Icon src={"tag-outline"} />
                                        <p>{findRecordNameByid(parseInt(tag), tags)}</p>
                                        <Icon src={"bin-outline"} altsrc={"bin-fill"} hoverable={true} onClick={()=>handleRemoveTag!(tag)} />
                                      </>);

  return (
    <ul className="tags-container">
      {recipeTags.map((tag, index) =>
        <li className="tags-label" key={index}>
          {mode === "view" ?  renderView(tag) : renderEdit(tag) }
        </li>
      )}

    </ul>
  );
}
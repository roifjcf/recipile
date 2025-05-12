/**
 * Tag component
 */

import { Mode, Tag } from "@/common/type"
import Icon from "@/components/icon";
import { findRecordNameByid } from "@/utils/helper";

interface Props {
  mode: Mode,
  recipeTags: string[],
  tags: Tag[],
  handleRemoveTag?: (tag:string) => void,
};

export default function Tags({ mode, recipeTags, tags, handleRemoveTag }: Props) {
  const canEdit = mode === "update" || mode === "new";
  
  return (
    <ul className="tags-container">
      {recipeTags.map((tag, index) =>
        <li className="tags-label" key={index}>
          <Icon src={"tag-outline"} />
          <p>{findRecordNameByid(parseInt(tag), tags)}</p>
          {canEdit && <Icon src={"bin-outline"} altsrc={"bin-fill"} hoverable={true} onClick={()=>handleRemoveTag!(tag)} />}
        </li>
      )}
    </ul>
  );
}
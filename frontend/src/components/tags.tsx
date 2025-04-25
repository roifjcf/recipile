import { Mode, Tag } from "@/common/type"
import Icon from "@/components/icon";
import { findRecordNameByid } from "@/utils/helper";

interface Props {
  mode: Mode,
  recipeTags: string[],
  tags: Tag[],
  handleRemoveTag?: (tag:string) => void,
};

export default function Tags(props: Props) {
  return (
    <ul className="tags-container">
      {props.recipeTags.map((tag, index) =>
      <li className="tags-label" key={index}>
        <Icon
          src={"tag-outline"}
          altsrc={undefined}
          hoverable={false}
          changeSrc={false}
          onClick={undefined}
        />
        <p>{findRecordNameByid(parseInt(tag), props.tags)}</p>
        {(props.mode === "update" || props.mode === "new") &&
        <Icon
          src={"bin-outline"}
          altsrc={"bin-fill"}
          hoverable={true}
          changeSrc={true}
          onClick={()=>props.handleRemoveTag!(tag)}
        />}
      </li> )}
    </ul>
  );
}
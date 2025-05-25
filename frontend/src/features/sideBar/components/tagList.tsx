import { TagInterface, TagSetOperation } from "@/common/type";
import Icon from "@/components/icon";
import Tag from "@/components/tag";

interface Props {
  tags: TagInterface[],
  selectedTags: Set<TagInterface>,
  setSelectedTags: (hookval: Set<TagInterface>) => void,
  handleResetSearchInput: () => void,
  setTagSetOperation: (hookval: TagSetOperation) => void,
}

export default function TagList({
  tags,
  selectedTags,
  setSelectedTags,
  handleResetSearchInput,
  setTagSetOperation,
}: Props) {






  const handleClick = (tag: TagInterface) => {
    /** Toggles a tag */
    handleResetSearchInput();
    const updatedList = new Set(selectedTags);
    if (updatedList.has(tag)) { updatedList.delete(tag); }
    else { updatedList.add(tag); }
    setSelectedTags(updatedList);
  }
  
  const clearSeletedTags = () => {
    setSelectedTags(new Set());
  }

  return (
    <div className="taglist-container">

      <div className="taglist-buttons">
        <Icon
          src={"intersection"}
          hoverable={true}
          onClick={()=>setTagSetOperation("intersection")}
          description="Intersection"
        />
        <Icon
          src={"union"}
          hoverable={true}
          onClick={()=>setTagSetOperation("union")}
          description="Union"
        />
        <Icon
          src={"reset-outline"}
          hoverable={true}
          onClick={clearSeletedTags}
          description="Reset"
        />
      </div>

      <ul className="taglist-tags">
        {tags.map((tag, i) =>
          <Tag
            mode="view"
            tag={tag["name"]}
            key={i}
            onClick={() => handleClick(tag)}
            classList={`clickable ${selectedTags.has(tag) ? "taglist-selected" : ""}`}
          />
        )}
      </ul>

    </div>
  );




}
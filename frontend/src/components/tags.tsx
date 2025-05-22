/**
 * Tag component
 */

"use client";
import { Mode, Recipe, Tables, Tag } from "@/common/type"
import Icon from "@/components/icon";
import { findRecordidByName, findRecordNameByid } from "@/utils/helper";
import { useState } from "react";
import ManageAddItem from "./manageAddItem";

interface Props {
  mode: Mode,
  recipeTags: string[], // a list of tag name, not id!
  tags: Tag[],
  handleRemoveTag?: (tagid:string) => void,
  recipeDetail: Recipe,
  setRecipeDetail: (hookval:Recipe) => void,
  handleAddNewRecord: (table: Tables, content: any) => void,
};

export default function Tags({
  mode,
  recipeTags,
  tags,
  handleRemoveTag,
  recipeDetail,
  setRecipeDetail,
  handleAddNewRecord,
}: Props) {
  




  const [selectedTag, setSelectedTag] = useState<string>(""); // tag name

  const handleAddExistingTag = () => {
    if (selectedTag === "") return;
    let updatedTags = [...recipeDetail.tags];

    let id = findRecordidByName(selectedTag, tags).toString();
    if (!updatedTags.includes(id)) { updatedTags.push(id); }

    setRecipeDetail({...recipeDetail, tags:updatedTags});
  };

  const renderView = (tag: string) => (<>
                                        <Icon src={"tag-outline"} />
                                        <p>{findRecordNameByid(parseInt(tag), tags)}</p>
                                      </>);
                                    
  const renderEdit = (tag: string) => (<>
                                        <Icon src={"tag-outline"} />
                                        <p>{findRecordNameByid(parseInt(tag), tags)}</p>
                                        <Icon src={"bin-outline"}
                                          altsrc={"bin-fill"}
                                          hoverable={true}
                                          onClick={()=>handleRemoveTag!(tag)}
                                        />
                                      </>);




  return (
    <ul className="tags-container">
      {recipeTags.map((tag, index) =>
        <li className="tags-label" key={index}>
          {mode === "view" ?  renderView(tag) : renderEdit(tag) }
        </li>
      )}
      {mode !== "view" && 
      <>
        <select className="inline" value={selectedTag} onChange={e=>setSelectedTag(e.target.value)}>
          {tags.map((tag: Tag, index: number) =>
          <option key={index} value={tag["name"]}>{tag["name"]}</option>)}
        </select>
        <Icon src={"add-outline"} hoverable={true} onClick={handleAddExistingTag} />
        <ManageAddItem table="tags" handleAdd={handleAddNewRecord} />
      </>}
    </ul>
  );




}
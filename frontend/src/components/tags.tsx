/**
 * Tag component
 */

"use client";
import { Modes, RecipeInterface, Tables, TagInterface } from "@/common/type"
import Icon from "@/components/icon";
import { findRecordidByName, findRecordNameByid,  } from "@/utils/helper";
import { useState } from "react";
import ManageAddItem from "./manageAddItem";
import Tag from "./tag";

interface Props {
  /** general props */
  mode: Modes,
  recipeTags: string[], // a list of tag ids!
  tags: TagInterface[], // all tags

  /** for editable tags */
  handleRemoveTag?: (tagid:string) => void,
  recipeDetail?: RecipeInterface,
  setRecipeDetail?: (hookval:RecipeInterface) => void,
  handleAddNewRecord?: (table: Tables, content: any) => Promise<(string | boolean)[]>,
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
  




  const [selectedTag, setSelectedTag] = useState<string>(""); // currenty selected tag name, for the `select` element




  const handleAddExistingTag = () => {
    if (!recipeDetail) {return;}
    if (!setRecipeDetail) {return;}

    if (selectedTag === "") return;
    let updatedTags = [...recipeDetail.tags];

    let id = findRecordidByName(selectedTag, tags).toString();
    if (!updatedTags.includes(id)) { updatedTags.push(id); }

    setRecipeDetail({...recipeDetail, tags:updatedTags});
  };





  return (
    <ul className="tags-container">

      {recipeTags.map((tag, index) =>
        <Tag
          mode={mode}
          tag={findRecordNameByid(parseInt(tag), tags)}
          key={index}
          handleRemoveTag={handleRemoveTag}
        />
      )}

      {mode !== "view" && 
      <>
        <select className="inline" value={selectedTag} onChange={e=>setSelectedTag(e.target.value)}>
          {tags.map((tag: TagInterface, index: number) =>
          <option key={index} value={tag["name"]}>{tag["name"]}</option>)}
        </select>
        <Icon src={"add-outline"} hoverable={true} onClick={handleAddExistingTag} />
        <ManageAddItem table="tags" handleAdd={handleAddNewRecord} />
      </>}
    </ul>
  );




}
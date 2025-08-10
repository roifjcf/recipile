import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";
import Icon from "./icon";
import { fetchData } from "@/utils/helper";

interface Props {
  closePopUp: () => void;
};

export default function SettingMenu({
  closePopUp
}: Props) {

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, closePopUp);


  const exportData = async () => {
    const [categoryData, recipeData, tagData, ingredientData] = await fetchData();
    
    const files = [
      { data: categoryData, filename: "categories.json" },
      { data: recipeData, filename: "recipes.json" },
      { data: tagData, filename: "tags.json" },
      { data: ingredientData, filename: "ingredients.json" },
    ];

    files.forEach(({ data, filename }) => {
      const jsonString = JSON.stringify(data, null, 2); // Convert to JSON string
      const blob = new Blob([jsonString], { type: "application/json" }); // Create a blob and URL for the JSON file
      const url = URL.createObjectURL(blob);

      // Create a temporary link to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // console.log(categoryData);
    // console.log(tagData);
    // console.log(ingredientData);
    // console.log(recipeData);

  
  }

  const importData = async () => {
    /** Imports data from a local .json file
     * Ignores any record whose name already exists in the database
     */
  };

  return (
    <div className="settingmenu-container soft-shadow bluroverlay display-center" ref={ref}>
      <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={closePopUp}/>
      <button onClick={()=>exportData()}>Export data</button>    
      <button onClick={()=>importData()}>Import data</button>    
    </div>
  );
}
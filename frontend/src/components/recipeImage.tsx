import { Mode, RecipeInterface } from "@/common/type"
import { useRef, useState } from "react";
import Icon from "@/components/icon";


interface Props {
  mode: Mode,
  recipe: RecipeInterface,
  setRecipeDetail?: (hookval:RecipeInterface) => void,
};


export default function RecipeImage({
  mode,
  recipe,
  setRecipeDetail,
}: Props) {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const src = recipe["img_main"];

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Open the file picker
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setRecipeDetail && setRecipeDetail({
          ...recipe,
          img_main: base64String,
        });
      };

      reader.readAsDataURL(file);
    } else {
      // setImageURL(null);
    }
  };

  const renderEdit = () => {
    return (
      <>
        <input
        type="file"
        accept="image/*" // image only
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        />  
        <div className="recipeimage-button">
          <Icon
            src={"upload"}
            hoverable={true}
            onClick={handleButtonClick}
            description="Upload image"
          />
        </div>
      </>
    );
  }

  return (
  <div className="recipeimage-container">
    
    {mode !== "view" && renderEdit()}

    {src && 
      <img
        src={src}
        alt="Preview"
        className="recipeimage-img"
      />
    }



    
  </div>);



}
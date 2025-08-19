import { Modes, RecipeInterface } from "@/common/type"
import { useRef } from "react";
import Icon from "@/components/icon/icon";


interface Props {
  mode: Modes,
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
      const fileName = file.name;
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (setRecipeDetail) {
          setRecipeDetail({
            ...recipe,
            img_main: base64String,
            img_filename: fileName,
          });
        }
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
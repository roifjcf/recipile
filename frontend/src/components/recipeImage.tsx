"use client"
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


  const handleUploadButtonClick = () => {
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

  // copy & paste image upload
  const handlePasteButtonClick = async () => {
    try {
      // Read clipboard items
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        // Check for an image type
        const blob = item.types.includes("image/png")
          ? await item.getType("image/png")
          : item.types.includes("image/jpeg")
          ? await item.getType("image/jpeg")
          : null;

        if (blob && setRecipeDetail) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setRecipeDetail({
              ...recipe,
              img_main: reader.result as string,
              img_filename: "clipboard_image",
            });
          };
          reader.readAsDataURL(blob);
          return; // Only handle the first image
        }
      }
      alert("No image found in clipboard.");
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      alert(
        "Cannot access clipboard. Make sure you are on HTTPS and your browser allows clipboard read."
      );
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
          <div className="left">
            <Icon
              src={"bin-outline"}
              altsrc="bin-fill"
              hoverable={true}
              onClick={()=>{
                if (setRecipeDetail) {
                  setRecipeDetail({
                    ...recipe,
                    img_main: null,
                    img_filename: "",
                  });
                }
              }}
              description="Remove image"
              showPopUp={true}
              popUpMessage="Remove the image?"
              popUpDirection="right"
            />
          </div>
          <div className="right">
            <Icon
              src={"paste"}
              hoverable={true}
              onClick={handlePasteButtonClick}
              description="Paste from clipboard"
            />
            <Icon
              src={"upload"}
              hoverable={true}
              onClick={handleUploadButtonClick}
              description="Upload"
            />
          </div>
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
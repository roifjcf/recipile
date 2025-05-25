import { Mode } from "@/common/type"
import { useRef, useState } from "react";
import Icon from "@/components/icon";


interface Props {
  mode: Mode,
};


export default function RecipeImage(props: Props) {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);




  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Open the file picker
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };
      reader.readAsDataURL(file); // Convert file to base64
    } else {
      // setImageURL(null);
    }
  };


  return (
  <div className="recipeimage-container">
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
    

    {imageURL && 
      <img
        src={imageURL}
        alt="Preview"
        className="recipeimage-img"
      />
    }



    
  </div>);



}
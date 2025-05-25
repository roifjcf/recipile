import { CategoryInterface, SideBarDisplay, TagInterface, TagSetOperation } from "@/common/type";
import CategoryList from "./components/categoryList";
import TagList from "./components/tagList";

interface Props {
  categories: CategoryInterface[] | null,
  tags: TagInterface[] | null,
  handleResetSearchInput: () => void,

  currentCategory: CategoryInterface | null,
  setCurrentCategory: (data: CategoryInterface) => void,

  selectedTags: Set<TagInterface>,
  setSelectedTags: (hookval: Set<TagInterface>) => void,
  setTagSetOperation: (hookval: TagSetOperation) => void,

  currentGroup: SideBarDisplay,
  setCurrentGroup: (hookval: SideBarDisplay) => void,
};




export default function SideBar({
  categories,
  tags,
  handleResetSearchInput,

  currentCategory,
  setCurrentCategory,

  selectedTags,
  setSelectedTags,
  setTagSetOperation,
  
  currentGroup,
  setCurrentGroup,
}: Props) {






  return (
    <div className="page-left-column" id="categories">

      <div className="sidebar-button-container">

        <button
          className={currentGroup === "category" ? "active-button" : ""}
          onClick={()=>setCurrentGroup("category")}
        >
          By category
        </button>

        <button
          className={currentGroup === "tag" ? "active-button" : ""}
          onClick={()=>setCurrentGroup("tag")}
        >
          By tag
        </button>

      </div>


      {currentGroup === "category" &&
      <CategoryList
        categories={categories ? categories : []}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        handleResetSearchInput={handleResetSearchInput}
      />}

      {currentGroup === "tag" &&
      <TagList
        tags={tags ? tags : []}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        handleResetSearchInput={handleResetSearchInput}
        setTagSetOperation={setTagSetOperation}
      />}
    </div>
  );

}
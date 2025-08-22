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
  tagSetOperation: TagSetOperation,
  setTagSetOperation: (hookval: TagSetOperation) => void,

  currentGroup: SideBarDisplay,
  setCurrentGroup: (hookval: SideBarDisplay) => void,
  showCollapsedSideBar: boolean,
};




export default function SideBar({
  categories,
  tags,
  handleResetSearchInput,

  currentCategory,
  setCurrentCategory,

  selectedTags,
  setSelectedTags,
  tagSetOperation,
  setTagSetOperation,
  
  currentGroup,
  setCurrentGroup,
  showCollapsedSideBar
}: Props) {




  const renderFull = () => {
    return (
      <div className="sidebar-container-full" id="categories">

        <div className="sidebar-button-container">

          <button
            className={currentGroup === "category" ? "active-button" : ""}
            onClick={()=>setCurrentGroup("category")}
          >
            Category
          </button>

          <button
            className={currentGroup === "tag" ? "active-button" : ""}
            onClick={()=>setCurrentGroup("tag")}
          >
            Tag
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
          tagSetOperation={tagSetOperation}
          setTagSetOperation={setTagSetOperation}
        />}
      </div>
    );
  };

  const renderCollapsed = () => {
    return (
      <div className="sidebar-container-collapsed">
        <div className="sidebar-button-container">

          <button
            className={currentGroup === "category" ? "active-button" : ""}
            onClick={()=>setCurrentGroup("category")}
          >
            Category
          </button>

          <button
            className={currentGroup === "tag" ? "active-button" : ""}
            onClick={()=>setCurrentGroup("tag")}
          >
            Tag
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
          tagSetOperation={tagSetOperation}
          setTagSetOperation={setTagSetOperation}
        />}
      </div>
    )
  }



  return (
    <>
      {renderFull()}
      {showCollapsedSideBar && renderCollapsed()}
    </>
  );

}
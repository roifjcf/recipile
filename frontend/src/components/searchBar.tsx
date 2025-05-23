import Icon from "@/components/icon";
import { useEffect, useMemo } from "react";
import debouce from "lodash.debounce";
import { DEBOUNCE_TIMEOUT } from "@/common/constant";

interface Props {
  handleDebounceChange: (e: any) => void,
  handleResetSearchInput: () => void,
  searchInputRef: React.RefObject<HTMLInputElement | null>,
}





export default function SearchBar({
  handleDebounceChange,
  handleResetSearchInput,
  searchInputRef,
}: Props) {
  
  

  const debouncedResults = useMemo(()=> {
    return debouce(handleDebounceChange, DEBOUNCE_TIMEOUT);
  }, []);

  useEffect(() => {
    return () => { debouncedResults.cancel(); };
  });



  return (
    <div className="searchbar-container">

      <div className="left">
        <Icon src="magnifier-outline" hoverable={false}/>
        <input
          className="borderless"
          type="text"
          ref={searchInputRef}
          onChange={debouncedResults}
          placeholder="Search by recipe name"
        />
      </div>

      <div className="right">
        {/* clears input */}
        <Icon src="close-outline" hoverable={true} onClick={handleResetSearchInput}/>
      </div>

    </div>
  );




};
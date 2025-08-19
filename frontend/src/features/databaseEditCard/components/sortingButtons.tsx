import { CategoryInterface, IngredientInterface, TagInterface } from "@/common/type";
import Icon from "@/components/icon/icon";

interface Props {
  data: CategoryInterface[] | TagInterface[] | IngredientInterface[] | null,
  dataSetter: (hookval: any[]) => void;
};

export default function SortingButtons({
  data,
  dataSetter
}: Props) {

  const handleSortAlphabetically = () => {
    if (!data) return; // guard against null
    const newData = [...data].sort((a, b) => a.name.localeCompare(b.name));
    dataSetter(newData);
  };


  const handleSortByDefault = () => {
    if (!data) {return;}
    const newData = [...data].sort((a, b) => a.id - b.id);
    dataSetter(newData);
  }

  const handleReverseSort = () => {
    if (!data) return;
    const newData = [...data].reverse();
    dataSetter(newData);
  };


  return (
    <div className="sortingbuttons-container">

      <div className="left">
        <Icon
          src="date-range"
          hoverable={true}
          onClick={handleSortByDefault}
        />
        <Icon
          src="sort-alpha"
          hoverable={true}
          onClick={handleSortAlphabetically}
        />
      </div>

      <div className="right">
        <Icon
          src="swap"
          hoverable={true}
          onClick={handleReverseSort}
        />
      </div>

    </div>
  );
}
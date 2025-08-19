import { CategoryInterface, IngredientInterface, Tables, TagInterface } from "@/common/type";
import ManageAddItem from "@/components/manageAddItem";
import ManageItem from "@/features/databaseEditCard/components/manageItem";
import SortingButtons from "./components/sortingButtons";

interface Props {
  table: Tables,
  title: string,
  data: CategoryInterface[] | TagInterface[] | IngredientInterface[] | null,
  dataSetter: (hookval: any[] ) => void,
  handleAdd: (table: Tables, content: any) => Promise<(string | boolean)[]>,
  handleUpdate: (table:Tables, id:string | number, content: any) => Promise<(string | boolean)[]>,
  handleDelete: (table: Tables, id: string | number) => void,
};

export default function DatabaseEditCard({
  table,
  title,
  data,
  dataSetter,
  handleAdd,
  handleUpdate,
  handleDelete,
}: Props) {

  return (
    <div className="databaseeditcard-container">
      <h2 className="databaseeditcard-title">{title}</h2>
      <ManageAddItem table={table} handleAddRecord={handleAdd} />

      <hr />
      <SortingButtons
        data={data}
        dataSetter={dataSetter}
      />
      {data && data.map((item: CategoryInterface | TagInterface | IngredientInterface)=>
      item["name"] === "Uncategorized" && table === "categories" ? <div key={item.id} className="hidden"></div> :
      <ManageItem
        key={item.id}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        item={item}
        table={table}
      />)}

      {!data &&
      <p>Loading...</p> }

    </div>
  );



}
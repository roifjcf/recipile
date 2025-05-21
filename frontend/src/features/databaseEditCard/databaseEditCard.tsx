import { Category, Ingredient, Tables, Tag } from "@/common/type";
import ManageAddItem from "@/components/manageAddItem";
import ManageItem from "@/components/manageItem";

interface Props {
  table: Tables,
  title: string,
  data: Category[] | Tag[] | Ingredient[] | null,
  handleAdd: (table: Tables, content: any) => void,
  handleUpdate: (table: Tables, id: string | number, content: any) => void,
  handleDelete: (table: Tables, id: string | number) => void,
};

export default function DatabaseEditCard({
  table,
  title,
  data,
  handleAdd,
  handleUpdate,
  handleDelete,
}: Props) {


  return (
    <div className="databaseeditcard-container">
      <h2>{title}</h2>
      <ManageAddItem table={table} handleAdd={handleAdd} />

      {data && data.map((item: Category | Tag | Ingredient)=>
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
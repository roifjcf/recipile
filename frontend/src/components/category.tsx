import { CategoryInterface } from "@/common/type";
import Icon from "./icon/icon";

interface Props {
  category: CategoryInterface,
  className?: string,
  iconUrl?: string,
  listItem?: boolean,
  key?: number,
  onClick?: ((...args: any[]) => void) | undefined;
}

export default function Category({
  category,
  iconUrl,
  listItem = false,
  className,
  onClick,
}: Props) {


  const renderListItem = () => {
    return (
      <li className={className + " category_container"} onClick={onClick}>
        {category["icon_file_name"] !== "" && <Icon src={"food/" + category["icon_file_name"]} />}
        {iconUrl && iconUrl !== "" && <Icon src={iconUrl} />}
        <p>{category["name"]}</p>
      </li>
    );
  }

  const renderHeader = () => {
    return (
      <div className={className + " category_container"} onClick={onClick}>
        {category["icon_file_name"] !== "" && <Icon src={"food/" + category["icon_file_name"]} />}
        {iconUrl && iconUrl !== "" && <Icon src={iconUrl} />}
        <h3>{category["name"]}</h3>
      </div>
    );
  }

  return listItem ? renderListItem() : renderHeader();
}
import Icon from "./icon";

interface Props {
  content?: string,
  className?: string,
  iconUrl?: string,
  listItem?: boolean,
  key?: number,
  onClick?: ((...args: any[]) => void) | undefined;
}

export default function Category({
  content,
  iconUrl,
  listItem = false,
  className,
  onClick,
}: Props) {


  const renderListItem = () => {
    return (
      <li className={className} onClick={onClick}>
        {iconUrl && iconUrl !== "" && <Icon src={iconUrl} />}
        <p>{content}</p>
      </li>
    );
  }

  const renderHeader = () => {
    return (
      <div className={className} onClick={onClick}>
        {iconUrl && iconUrl !== "" && <Icon src={iconUrl} />}
        <h2>{content}</h2>
      </div>
    );
  }

  return listItem ? renderListItem() : renderHeader();
}
interface Props {
  options: string[],
  setSelectedOption: (hookval: string) => void,
};

export default function SettingMenuSideBar({
  options,
  setSelectedOption
}: Props) {
  return (
    <div className="settingmenusidebar-container">
      <p className="settingmenusidebar-comment">Options</p>
      {options.map((option, index) =>
      <div className="settingmenusidebar-option" key={index} onClick={()=>setSelectedOption(option)}>
        {option}
      </div>)}
    </div>
  );
}
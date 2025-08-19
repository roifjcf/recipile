interface Props {
  options: string[],
  setSelectedOption: (hookval: string) => void,
  selectedOption: string,
}

export default function SettingMenuSideBar({
  options,
  setSelectedOption,
  selectedOption
}: Props) {
  return (
    <div className="settingmenusidebar-container">
      <p className="settingmenusidebar-title">Options</p>
      {options.map((option, index) =>
      <div
        key={index}
        className={`settingmenusidebar-option ${selectedOption === option ? "settingmenusidebar-option-selected" : ""}`}
        onClick={() => setSelectedOption(option)}
      >
        {option}
      </div>)}
    </div>
  );
}
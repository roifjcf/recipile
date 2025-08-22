interface Props {
  kaomoji: string,
}

export default function EmptyDisplay({
  kaomoji
}: Props) {
  return (
    <div className="emptydisplay-msg">
      <p>{kaomoji}</p>
      <p>No recipes!</p>
    </div>
  );
}
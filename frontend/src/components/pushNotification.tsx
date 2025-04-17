interface Props {
  message: string,
};

export default function PushNotification (props: Props) {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
}
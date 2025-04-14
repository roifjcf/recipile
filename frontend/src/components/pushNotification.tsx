interface Props {
  message: string,
};

export default function PushNotification (props: Props) {
  return (
    <div className="push-notification">
      <p>{props.message}</p>
    </div>
  );
}
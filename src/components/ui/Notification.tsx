import React from "react";

type NotificationType = "info" | "danger";

interface NotificationProps extends React.HTMLProps<HTMLDivElement> {
  type: NotificationType;
}

const notificationColours: {
  [key in NotificationType]: string;
} = {
  danger: "bg-danger",
  info: "bg-alternate",
};

const Notification: React.FC<NotificationProps> = ({ type, ...props }) => {
  return (
    <div
      className={"p-3 m-1 border " + notificationColours[type]}
      {...props}
    ></div>
  );
};

export default Notification;

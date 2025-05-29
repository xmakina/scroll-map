import React from "react";
import Button from "./Button";

interface BaseProps {
  onCancel: () => void;
  children: React.ReactNode;
}

interface UseProceed extends BaseProps {
  onProceed: () => Promise<void>;
  useSubmit?: never;
}

interface UseSubmit extends BaseProps {
  useSubmit: boolean;
  onProceed?: never;
}

type Props = UseProceed | UseSubmit;

const ProceedCancelButtons = ({
  onProceed,
  useSubmit,
  onCancel,
  children,
}: Props) => {
  return (
    <div className="flex flex-row justify-between m-2">
      <Button danger onClick={onCancel} type="button">
        Cancel
      </Button>
      {useSubmit ? (
        <Button primary type="submit">
          {children}
        </Button>
      ) : (
        <Button primary type="button" onClick={onProceed}>
          {children}
        </Button>
      )}
    </div>
  );
};

export default ProceedCancelButtons;

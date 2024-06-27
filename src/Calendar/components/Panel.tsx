import { FC, memo } from "react";
import { createPortal } from "react-dom";

import PanelWithTransition from "./PanelWithTransition.tsx";

import type { CalendarProps } from "../types";

interface PanelProps extends CalendarProps {
  onClickOutside: () => void;
  onDateChangeOnly?: (date: string) => void;
}

const Panel: FC<PanelProps> = (props) => {
  return (
    <>
      {props.enablePortal ? (
        createPortal(<PanelWithTransition {...props} />, document.body)
      ) : (
        <PanelWithTransition {...props} />
      )}
    </>
  );
};

export default memo(Panel);

import { FC, PropsWithChildren, useEffect, useRef } from "react";

interface ClickAwayListenerProps {
  onClickAway: () => void;
}

/**
 * Will wrap content and listen for outside click from children, then will trigger the provided callback
 *
 * @param onClickAway
 * @param children
 *
 * @constructor
 */
const ClickAwayListener: FC<PropsWithChildren<ClickAwayListenerProps>> = ({
  onClickAway,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickAwayListener;

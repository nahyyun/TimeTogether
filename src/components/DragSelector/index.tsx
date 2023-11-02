import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { dragSelectionRefs } from "../ScheduleRegistForm";
import {
  getDragAreaBoundRect,
  setSelectedTargets,
  printDragArea,
  clearDragAreaBound,
  filterSelectedElements,
} from "@/utils/dragHelper";
import { isElementNull } from "@/utils/typeGuard";
import * as S from "./style";

interface DragSelectorProps {
  dragSelectionRefs: dragSelectionRefs;
  setSelected: Dispatch<SetStateAction<HTMLElement[]>>;
}

export default function DragSelector({
  dragSelectionRefs,
  setSelected,
}: DragSelectorProps) {
  const startDragPosition = useRef({ startX: Infinity, startY: Infinity });
  const dragArea = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: MouseEvent) => {
    const { pageX, pageY } = e;

    startDragPosition.current.startX = pageX;
    startDragPosition.current.startY = pageY;

    setSelected([]);

    window.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isElementNull(dragArea.current)) return;

    const { pageX: currentX, pageY: currentY } = e;

    const dragAreaBoundRect = getDragAreaBoundRect(
      { currentX, currentY },
      startDragPosition.current
    );

    printDragArea(dragArea.current, dragAreaBoundRect);

    setSelectedTargets(
      dragSelectionRefs.selectableTargetsRefs,
      dragAreaBoundRect.top,
      dragAreaBoundRect.bottom
    );
  };

  const handleMouseUp = () => {
    if (isElementNull(dragArea.current)) return;

    window.removeEventListener("mousemove", handleMouseMove);

    clearDragAreaBound(dragArea.current);

    setSelected(
      filterSelectedElements(dragSelectionRefs.selectableTargetsRefs)
    );
  };

  useEffect(() => {
    dragSelectionRefs.dragContainerRef?.addEventListener(
      "mousedown",
      handleMouseDown
    );
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      dragSelectionRefs.dragContainerRef?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return <S.DragArea ref={dragArea} />;
}

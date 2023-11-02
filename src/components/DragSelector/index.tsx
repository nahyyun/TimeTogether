import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { dragSelectionRefs } from "../ScheduleRegistForm";
import {
  getDragAreaBoundRect,
  setSelectedTargets,
  printDragArea,
  clearDragAreaBound,
  filterSelectedElements,
} from "@/utils/dragHelper";
import { isElementNull, isMouseEvent } from "@/utils/typeGuard";
import * as S from "./style";
import { getEventPosition } from "@/utils/event";

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

  const addMoveEvent = (e: MouseEvent | TouchEvent) => {
    const eventType = isMouseEvent(e) ? "mousemove" : "touchmove";

    window.addEventListener(eventType, handleMoveEvent);
  };

  const removeMoveEvent = (e: MouseEvent | TouchEvent) => {
    const eventType = isMouseEvent(e) ? "mousemove" : "touchmove";

    window.removeEventListener(eventType, handleMoveEvent);
  };

  const handleStartEvent = (e: MouseEvent | TouchEvent) => {
    const { currentX, currentY } = getEventPosition(e);

    startDragPosition.current.startX = currentX;
    startDragPosition.current.startY = currentY;

    setSelected([]);
    addMoveEvent(e);
  };

  const handleMoveEvent = (e: MouseEvent | TouchEvent) => {
    if (isElementNull(dragArea.current)) return;

    const { currentX, currentY } = getEventPosition(e);

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

  const handleEndEvent = (e: MouseEvent | TouchEvent) => {
    if (isElementNull(dragArea.current)) return;

    removeMoveEvent(e);

    clearDragAreaBound(dragArea.current);

    setSelected(
      filterSelectedElements(dragSelectionRefs.selectableTargetsRefs)
    );
  };

  useEffect(() => {
    dragSelectionRefs.dragContainerRef?.addEventListener(
      "mousedown",
      handleStartEvent
    );
    dragSelectionRefs.dragContainerRef?.addEventListener(
      "touchstart",
      handleStartEvent
    );

    window.addEventListener("mouseup", handleEndEvent);
    window.addEventListener("touchend", handleEndEvent);

    return () => {
      dragSelectionRefs.dragContainerRef?.removeEventListener(
        "mousedown",
        handleStartEvent
      );
      dragSelectionRefs.dragContainerRef?.removeEventListener(
        "touchstart",
        handleStartEvent
      );

      window.removeEventListener("mouseup", handleEndEvent);
      window.removeEventListener("touchend", handleEndEvent);
    };
  }, []);

  return <S.DragArea ref={dragArea} />;
}

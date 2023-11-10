import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { dragSelectionRefs } from "../ScheduleRegistForm";
import {
  getDragAreaBoundRect,
  selectElementsByDrag,
  printDragArea,
  clearDragAreaBound,
  filterSelectedElements,
  selectElementByClick,
  isClickedNotDragged,
} from "@/utils/dragHelper";
import { isElementNull, isMouseEvent } from "@/utils/typeGuard";
import { getEventPosition } from "@/utils/event";
import { SelectionInfo } from "@/types/dragSelection";
import * as S from "./style";

interface DragSelectorProps {
  dragSelectionRefs: dragSelectionRefs;
  onSelect: (selected: HTMLElement[]) => void;
}

export default function DragSelector({
  dragSelectionRefs,
  onSelect,
}: DragSelectorProps) {
  const startDragPosition = useRef({ startX: Infinity, startY: Infinity });
  const dragArea = useRef<HTMLDivElement | null>(null);

  const currSelectionInfo = useRef<SelectionInfo>({
    draggedElements: [],
    selectedAllElements: [],
  });
  const prevSelectionInfo = useRef<SelectionInfo>({
    draggedElements: [],
    selectedAllElements: [],
  });

  const addMoveEvent = (e: MouseEvent | TouchEvent) => {
    const eventType = isMouseEvent(e) ? "mousemove" : "touchmove";

    window.addEventListener(eventType, handleMoveEvent);
  };

  const removeMoveEvent = (e: MouseEvent | TouchEvent) => {
    const eventType = isMouseEvent(e) ? "mousemove" : "touchmove";

    window.removeEventListener(eventType, handleMoveEvent);
  };

  const updatePrevInfoToCurrInfo = (
    prevDragInfo: SelectionInfo,
    currDragInfo: SelectionInfo,
    key: keyof SelectionInfo
  ) => {
    prevDragInfo[key] = [...currDragInfo[key]];
  };

  const clearDragInfo = () => {
    prevSelectionInfo.current.draggedElements = [];
    currSelectionInfo.current.draggedElements = [];
  };

  const handleStartEvent = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    const { currentX, currentY } = getEventPosition(e);

    startDragPosition.current.startX = currentX;
    startDragPosition.current.startY = currentY;

    onSelect([]);

    addMoveEvent(e);
  };

  const handleMoveEvent = (e: MouseEvent | TouchEvent) => {
    if (isElementNull(dragArea.current)) return;

    updatePrevInfoToCurrInfo(
      prevSelectionInfo.current,
      currSelectionInfo.current,
      "draggedElements"
    );

    updatePrevInfoToCurrInfo(
      prevSelectionInfo.current,
      currSelectionInfo.current,
      "selectedAllElements"
    );

    const eventPosition = getEventPosition(e);

    const dragAreaBoundRect = getDragAreaBoundRect(
      eventPosition,
      startDragPosition.current
    );

    printDragArea(dragArea.current, dragAreaBoundRect);

    selectElementsByDrag(
      dragSelectionRefs.selectableTargetsRefs,
      dragAreaBoundRect.top,
      dragAreaBoundRect.bottom,
      prevSelectionInfo.current,
      currSelectionInfo.current
    );
  };

  const handleEndEvent = (e: MouseEvent | TouchEvent) => {
    if (isElementNull(dragArea.current)) return;

    removeMoveEvent(e);

    const { currentY } = getEventPosition(e);

    if (isClickedNotDragged(currSelectionInfo.current.draggedElements)) {
      selectElementByClick(
        dragSelectionRefs.selectableTargetsRefs,
        currentY,
        prevSelectionInfo.current,
        currSelectionInfo.current
      );

      return updatePrevInfoToCurrInfo(
        prevSelectionInfo.current,
        currSelectionInfo.current,
        "selectedAllElements"
      );
    }

    clearDragAreaBound(dragArea.current);
    clearDragInfo();

    onSelect(filterSelectedElements(dragSelectionRefs.selectableTargetsRefs));
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
    };
  }, []);

  return <S.DragArea ref={dragArea} />;
};


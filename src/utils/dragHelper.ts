import { DragAreaBound } from "@/types/dragAreaBound";
import { SelectionInfo } from "@/types/dragSelection";

export const getDragAreaBoundRect = (
  { currentX, currentY }: { currentX: number; currentY: number },
  { startX, startY }: { startX: number; startY: number }
) => {
  const top = Math.min(startY, currentY);
  const left = Math.min(startX, currentX);
  const right = Math.max(startX, currentX);
  const bottom = Math.max(startY, currentY);

  const width = right - left;
  const height = bottom - top;

  const viewportTop = top - window.scrollY;
  const viewportLeft = left - window.scrollX;

  return {
    top,
    bottom,
    width,
    height,
    viewportTop,
    viewportBottom: viewportTop + height,
    viewportLeft,
    viewportRight: viewportLeft + width,
  };
};

export const printDragArea = (
  dragArea: HTMLDivElement,
  {
    width,
    height,
    viewportTop,
    viewportRight,
    viewportBottom,
    viewportLeft,
  }: DragAreaBound
) => {
  dragArea.style.inset = `${viewportTop}px ${viewportRight}px ${viewportBottom}px ${viewportLeft}px`;
  dragArea.style.width = width + "px";
  dragArea.style.height = height + "px";
};

export const getClientBoundRect = (client: HTMLElement) => {
  const { y, height } = client.getBoundingClientRect();
  const clientTop = window.scrollY + y;

  return { clientTop, clientBottom: clientTop + height };
};

export const isPositionInTopBottomBound = (
  targetY: number,
  minY: number,
  maxY: number
) => targetY >= minY && targetY <= maxY;

export const isElementWithinDragArea = (
  clientTop: number,
  clientBottom: number,
  dragAreaTop: number,
  dragAreaBottom: number
) =>
  isPositionInTopBottomBound(clientTop, dragAreaTop, dragAreaBottom) ||
  isPositionInTopBottomBound(clientBottom, dragAreaTop, dragAreaBottom) ||
  isPositionInTopBottomBound(dragAreaTop, clientTop, clientBottom);

const deleteElementFromList = (
  elementList: HTMLElement[],
  element: HTMLElement
) => {
  const findIdx = elementList.findIndex((el) => el === element);
  if (findIdx !== -1) elementList.splice(findIdx, 1);
};

const selectElement = (
  selectedElements: HTMLElement[],
  element: HTMLElement
) => {
  selectedElements.push(element);

  element.classList.add("selected");
};

const deSelectElement = (
  selectedElements: HTMLElement[],
  element: HTMLElement
) => {
  deleteElementFromList(selectedElements, element);

  element.classList.remove("selected");
};

export const handleElementSelection = (
  currSelectedAllElements: HTMLElement[],
  element: HTMLElement
) => {
  if (!currSelectedAllElements.includes(element)) {
    return selectElement(currSelectedAllElements, element);
  }

  deSelectElement(currSelectedAllElements, element);
};

const isElementInsidePrevDragArea = (
  prevDraggedElements: HTMLElement[],
  element: HTMLElement
) => prevDraggedElements.includes(element);

export const selectElementByClick = (
  selectableTargets: HTMLElement[],
  clickedY: number,
  { selectedAllElements: currSelectedAllElements }: SelectionInfo
) => {
  selectableTargets.forEach((client) => {
    const { clientTop, clientBottom } = getClientBoundRect(client);

    if (isPositionInTopBottomBound(clickedY, clientTop, clientBottom)) {
      handleElementSelection(currSelectedAllElements, client);
    }
  });
};

export const selectElementsByDrag = (
  selectableTargets: HTMLElement[],
  dragAreaTop: number,
  dragAreaBottom: number,
  prevSelectionInfo: SelectionInfo,
  {
    draggedElements: currDraggedElements,
    selectedAllElements: currSelectedAllElements,
  }: SelectionInfo
) => {
  selectableTargets.forEach((client) => {
    const { clientTop, clientBottom } = getClientBoundRect(client);

    if (
      isElementWithinDragArea(
        clientTop,
        clientBottom,
        dragAreaTop,
        dragAreaBottom
      )
    ) {
      if (
        isElementInsidePrevDragArea(prevSelectionInfo.draggedElements, client)
      )
        return;

      currDraggedElements.push(client);

      return handleElementSelection(currSelectedAllElements, client);
    }

    if (!isElementInsidePrevDragArea(prevSelectionInfo.draggedElements, client))
      return;

    deleteElementFromList(currDraggedElements, client);
    handleElementSelection(currSelectedAllElements, client);
  });
};

export const clearDragAreaBound = (dragArea: HTMLDivElement) => {
  dragArea.style.width = "0";
  dragArea.style.height = "0";
  dragArea.style.inset = "0 0 0 0";
};

export const filterSelectedElements = (selectableTargets: HTMLElement[]) =>
  selectableTargets.filter((client) => client.classList.contains("selected"));

const isZeroSize = (element: HTMLElement) =>
  element.offsetWidth === 0 && element.offsetHeight === 0;

export const isClickedNotDragged = (
  draggedElements: HTMLElement[],
  dragArea: HTMLDivElement
) => draggedElements.length === 0 && isZeroSize(dragArea);

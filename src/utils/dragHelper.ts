import { DragAreaBound } from "@/types/dragAreaBound";
import { SelectionInfo } from "@/types/dragSelection";

export const getDragAreaBoundRect = (
  { currentX, currentY }: { currentX: number; currentY: number },
  { startX, startY }: { startX: number; startY: number }
) => {
  const top = Math.min(startY, currentY);
  const left = Math.min(startX, currentX);

  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);

  const viewportTop = top - window.scrollY;
  const viewportLeft = left - window.scrollX;

  return {
    top,
    right: Math.max(startX, currentX),
    bottom: Math.max(startY, currentY),
    left,
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
  prevSelectedAllElements: HTMLElement[],
  currSelectedAllElements: HTMLElement[],
  element: HTMLElement
) => {
  if (!prevSelectedAllElements.includes(element)) {
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
  { selectedAllElements: prevSelectedAllElements }: SelectionInfo,
  { selectedAllElements: currSelectedAllElements }: SelectionInfo
) => {
  selectableTargets.forEach((client) => {
    const { clientTop, clientBottom } = getClientBoundRect(client);

    if (isPositionInTopBottomBound(clickedY, clientTop, clientBottom)) {
      handleElementSelection(
        prevSelectedAllElements,
        currSelectedAllElements,
        client
      );
    }
  });
};

export const selectElementsByDrag = (
  selectableTargets: HTMLElement[],
  dragAreaTop: number,
  dragAreaBottom: number,
  {
    draggedElements: prevDraggedElements,
    selectedAllElements: prevSelectedAllElements,
  }: SelectionInfo,
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
      if (isElementInsidePrevDragArea(prevDraggedElements, client)) return;

      currDraggedElements.push(client);

      return handleElementSelection(
        prevSelectedAllElements,
        currSelectedAllElements,
        client
      );
    }
    if (!isElementInsidePrevDragArea(prevDraggedElements, client)) return;

    deleteElementFromList(currDraggedElements, client);
    handleElementSelection(
      prevSelectedAllElements,
      currSelectedAllElements,
      client
    );
  });
};

export const clearDragAreaBound = (dragArea: HTMLDivElement) => {
  dragArea.style.width = "0";
  dragArea.style.height = "0";
  dragArea.style.inset = "0 0 0 0";
};

export const filterSelectedElements = (selectableTargets: HTMLElement[]) =>
  selectableTargets.filter((client) => client.classList.contains("selected"));

export const isClickedNotDragged = (draggedElements: HTMLElement[]) =>
  draggedElements.length === 0;

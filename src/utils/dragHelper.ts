import { prevDragInfo, currDragInfo } from "@/components/DragSelector";
import { DragAreaBound } from "@/types/dragAreaBound";

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

export const isInnerPosition = (targetY: number, minY: number, maxY: number) =>
  targetY >= minY && targetY <= maxY;

export const isElementWithinDragArea = (
  clientTop: number,
  clientBottom: number,
  dragAreaTop: number,
  dragAreaBottom: number
) =>
  isInnerPosition(clientTop, dragAreaTop, dragAreaBottom) ||
  isInnerPosition(clientBottom, dragAreaTop, dragAreaBottom) ||
  isInnerPosition(dragAreaTop, clientTop, clientBottom);

export const setSelectedTargets = (
  selectableTargets: HTMLElement[],
  dragAreaTop: number,
  dragAreaBottom: number,
  {
    draggedElements: prevDraggedEls,
    selectedAllElements: prevSelectedAllEls,
  }: prevDragInfo,
  currDragInfo: currDragInfo
) => {
  selectableTargets.forEach((client) => {
    const { clientTop, clientBottom } = getClientBoundRect(client);

    const toggleClassName = () => {
      if (!prevSelectedAllEls.includes(client)) {
        currDragInfo.selectedAllElements.push(client);
        client.classList.add("selected");
        return;
      }
      currDragInfo.selectedAllElements =
        currDragInfo.selectedAllElements.filter((el) => el !== client);
      client.classList.remove("selected");
    };

    if (
      isElementWithinDragArea(
        clientTop,
        clientBottom,
        dragAreaTop,
        dragAreaBottom
      )
    ) {
      if (prevDraggedEls.includes(client)) return;

      currDragInfo.draggedElements.push(client);

      toggleClassName();
    } else {
      if (!prevDraggedEls.includes(client)) return;

      const findIdx = currDragInfo.draggedElements.findIndex(
        (el) => el == client
      );
      currDragInfo.draggedElements.splice(findIdx, 1);

      toggleClassName();
    }
  });
};

export const clearDragAreaBound = (dragArea: HTMLDivElement) => {
  dragArea.style.width = "0";
  dragArea.style.height = "0";
  dragArea.style.inset = "0 0 0 0";
};

export const filterSelectedElements = (selectableTargets: HTMLElement[]) =>
  selectableTargets.filter((client) => client.classList.contains("selected"));

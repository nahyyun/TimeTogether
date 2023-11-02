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

const getClientBoundRect = (client: HTMLElement) => {
  const { y, height } = client.getBoundingClientRect();
  const clientTop = window.scrollY + y;

  return { clientTop, clientBottom: clientTop + height };
};

const isIntersect = (targetY: number, minY: number, maxY: number) =>
  targetY >= minY && targetY <= maxY;

export const setSelectedTargets = (
  selectableTargets: HTMLElement[],
  dragAreaTop: number,
  dragAreaBottom: number
) => {
  selectableTargets.forEach((client) => {
    const { clientTop, clientBottom } = getClientBoundRect(client);

    if (
      isIntersect(clientTop, dragAreaTop, dragAreaBottom) ||
      isIntersect(clientBottom, dragAreaTop, dragAreaBottom)
    )
      client.classList.add("selected");
  });
};

export const clearDragAreaBound = (dragArea: HTMLDivElement) => {
  dragArea.style.width = "0";
  dragArea.style.height = "0";
  dragArea.style.inset = "0 0 0 0";
};

export const filterSelectedElements = (selectableTargets: HTMLElement[]) =>
  selectableTargets.filter((client) => client.classList.contains("selected"));

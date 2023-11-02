import { isMouseEvent } from "./typeGuard";

export const getEventPosition = (e: MouseEvent | TouchEvent) => {
  if (isMouseEvent(e))
    return {
      currentX: e.pageX,
      currentY: e.pageY,
    };
  else
    return {
      currentX: e.touches[0].pageX,
      currentY: e.touches[0].pageY,
    };
};

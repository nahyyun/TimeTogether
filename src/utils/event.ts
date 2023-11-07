import { isMouseEvent, isTouchEvent } from "./typeGuard";

export const getEventPosition = (e: MouseEvent | TouchEvent) => {
  if (isMouseEvent(e))
    return {
      currentX: e.pageX,
      currentY: e.pageY,
    };

  if (isTouchEvent(e)) {
    const touch = e.touches[0] || e.changedTouches[0];

    return {
      currentX: touch.pageX,
      currentY: touch.pageY,
    };
  } else {
    throw new Error("Unsupported event type");
  }
};

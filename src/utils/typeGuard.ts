export const isElementNull = (element: HTMLElement | null): element is null =>
  !element;

 export const isMouseEvent = (e: MouseEvent | TouchEvent): e is MouseEvent =>
   e instanceof MouseEvent;

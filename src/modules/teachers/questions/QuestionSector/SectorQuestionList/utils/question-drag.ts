export interface QuestionSlot {
  id: string;
  top: number;
  bottom: number;
}

export interface QuestionDrag {
  id: string;
  targetId: string | null;
  startX: number;
  startY: number;
  grabOffset: number;
  originalTop: number;
  height: number;
  element: HTMLElement;
  originalTransform: string;
  slots: QuestionSlot[];
  moved: boolean;
}

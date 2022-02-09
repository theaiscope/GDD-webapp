declare module "react-canvas-draw" {
  export interface ZoomExtents {
    min?: number | undefined;
    max?: number | undefined;
  }

  export interface CanvasDrawProps {
    onChange?: ((canvas: CanvasDraw) => void) | null | undefined;
    loadTimeOffset?: number | undefined;
    lazyRadius?: number | undefined;
    brushRadius?: number | undefined;
    brushColor?: string | undefined;
    catenaryColor?: string | undefined;
    gridColor?: string | undefined;
    //available?
    backgroundColor?: string | undefined;
    hideGrid?: boolean | undefined;
    hideGridX?: boolean | undefined;
    hideGridY?: boolean | undefined;
    canvasWidth?: number | string | undefined;
    canvasHeight?: number | string | undefined;
    disabled?: boolean | undefined;
    imgSrc?: string | undefined;
    saveData?: string | undefined;
    immediateLoading?: boolean | undefined;
    hideInterface?: boolean | undefined;
    //available?
    className?: string | undefined;
    //available?
    style?: React.CSSProperties | undefined;
    gridSizeX?: number | undefined;
    gridSizeY?: number | undefined;
    gridLineWidth?: number | undefined;
    enablePanAndZoom?: boolean | undefined;
    mouseZoomFactor?: number | undefined;
    zoomExtents?: ZoomExtents | undefined;
  }

  export default class CanvasDraw extends React.Component<CanvasDrawProps> {
    /**
     * Returns the drawing's save-data as a stringified object.
     */
    getSaveData(): string;

    /**
     * Loads a previously saved drawing using the saveData string, as well as an optional boolean
     * flag to load it immediately, instead of live-drawing it.
     */
    loadSaveData(saveData: string, immediate?: boolean): void;

    /**
     * Clears the canvas completely.
     */
    clear(): void;

    /**
     * Removes the latest change to the drawing. This includes everything drawn since the last MouseDown event.
     */
    undo(): void;
  }
}
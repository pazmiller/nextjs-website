import { gsap } from "gsap";

declare global
{
    interface MagneticObject
    {
        container: SVGSVGElement;
        width: number;
        height: number;
        left: number;
        top: number;
        lines: number;
        rows: number;
        balls: Array<SVGCircleElement & {
            line: SVGLineElement;
            ori_x: number;
            ori_y: number;
            move_x?: number;
            move_y?: number;
            animater?: gsap.core.Timeline;
        }>;
        mouse_radius: number;
        init: () => void;
        resize: () => void;
        create_yoyo: ( radius: number ) => void;
        move_balls: ( x: number, y: number ) => void;
    }
}

export { };
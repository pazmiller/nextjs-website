'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';


const MagneticYoyo = () =>
{
    const containerRef = useRef<SVGSVGElement | null>( null );
    const { theme, resolvedTheme } = useTheme();
    const [ mounted, setMounted ] = useState( false );

    const isDarkTheme = theme === 'dark' || resolvedTheme === 'dark';

    const ballColor = isDarkTheme ? '#17f700' : '#05a177';
    const pointColor = isDarkTheme ? '#f7f7f7' : '#000000';
    const lineColor = isDarkTheme ? '#17f700' : '#05a177';

    useEffect( () =>
    {
        setMounted( true );
    }, [] );

    useEffect( () =>
    {
        if ( !containerRef.current || !mounted ) return;
        // 清除现有SVG内容以便重建
        while ( containerRef.current.firstChild )
        {
            containerRef.current.removeChild( containerRef.current.firstChild );
        }

        const magnetic: MagneticObject = {
            container: containerRef.current,
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            lines: 10,
            rows: 10,
            balls: [],
            mouse_radius: 180,

            init()
            {
                this.resize();
                this.create_yoyo( 30 );
                document.addEventListener( "mousemove", ( e ) =>
                {
                    this.move_balls( e.x, e.y );
                } );
            },

            resize()
            {
                this.width = this.container.getBoundingClientRect().width;
                this.height = this.container.getBoundingClientRect().height;
                this.left = this.container.getBoundingClientRect().left;
                this.top = this.container.getBoundingClientRect().top;
            },

            create_yoyo( radius: number )
            {
                for ( let r = 0; r <= this.rows; r++ )
                {
                    for ( let l = 0; l <= this.lines; l++ )
                    {
                        const x = this.width / this.lines * l;
                        const y = this.height / this.rows * r;
                        const ball = document.createElementNS( "http://www.w3.org/2000/svg", "circle" );
                        ball.setAttribute( "fill", ballColor );
                        ball.setAttribute( "cx", x.toString() );
                        ball.setAttribute( "cy", y.toString() );
                        ball.setAttribute( "r", radius.toString() );
                        const point = document.createElementNS( "http://www.w3.org/2000/svg", "circle" );
                        point.setAttribute( "fill", pointColor );
                        point.setAttribute( "cx", x.toString() );
                        point.setAttribute( "cy", y.toString() );
                        point.setAttribute( "r", ( radius / 5 ).toString() );
                        const line = document.createElementNS( "http://www.w3.org/2000/svg", "line" );
                        line.setAttribute( "stroke", lineColor );
                        line.setAttribute( "stroke-width", "1" );
                        line.setAttribute( "x1", x.toString() );
                        line.setAttribute( "y1", y.toString() );
                        line.setAttribute( "x2", x.toString() );
                        line.setAttribute( "y2", y.toString() );
                        this.container.appendChild( line );
                        this.container.appendChild( point );
                        this.container.appendChild( ball );

                        const extendedBall = ball as typeof this.balls[ number ];
                        extendedBall.line = line;
                        extendedBall.ori_x = x;
                        extendedBall.ori_y = y;

                        this.balls.push( extendedBall );
                    }
                }
            },

            move_balls( x, y )
            {
                this.balls.forEach( ball =>
                {
                    const mouse_x = x - this.left;
                    const mouse_y = y - this.top;
                    const dx = ball.ori_x - mouse_x;
                    const dy = ball.ori_y - mouse_y;
                    const distance = Math.sqrt( dx ** 2 + dy ** 2 );
                    if ( distance <= this.mouse_radius )
                    {
                        ball.move_x = mouse_x + dx / distance * this.mouse_radius;
                        ball.move_y = mouse_y + dy / distance * this.mouse_radius;
                        if ( ball.animater ) ball.animater.kill();
                        ball.animater = gsap.timeline()
                            .to( ball, {
                                attr: {
                                    cx: ball.move_x,
                                    cy: ball.move_y,
                                },
                                duration: 1.5,
                                ease: "power3.out",
                            } )
                            .to( ball.line, {
                                attr: {
                                    x2: ball.move_x,
                                    y2: ball.move_y,
                                },
                                duration: 1.5,
                                ease: "power3.out",
                            }, "<" )
                            .to( ball, {
                                attr: {
                                    cx: ball.ori_x,
                                    cy: ball.ori_y,
                                },
                                duration: 2,
                                ease: "power3.out",
                            }, "<0.1" )
                            .to( ball.line, {
                                attr: {
                                    x2: ball.ori_x,
                                    y2: ball.ori_y,
                                },
                                duration: 2,
                                ease: "power3.out",
                            }, "<" );
                    }
                } );
            }
        };

        magnetic.init();

        // 添加窗口大小变化监听器
        const handleResize = () =>
        {
            magnetic.resize();
        };
        window.addEventListener( 'resize', handleResize );

        // 为事件处理函数创建一个引用，以便正确移除
        const handleMouseMove = ( e: MouseEvent ) =>
        {
            magnetic.move_balls( e.x, e.y );
        };

        // 清理函数
        return () =>
        {
            window.removeEventListener( 'resize', handleResize );
            document.removeEventListener( 'mousemove', handleMouseMove );
        };
    }, [ ballColor, pointColor, lineColor, mounted ] );
    if ( !mounted ) return <svg ref={containerRef} className="absolute w-[50rem] h-[50rem] overflow-visible" />;

    return (
        <svg
            ref={containerRef}
            className="absolute w-[50rem] h-[50rem] overflow-visible"
            style={{ pointerEvents: 'none' }}
        >
            {/* SVG元素将在useEffect中动态创建 */}
        </svg>
    );
};

export default MagneticYoyo;
"use client"
import { useRef,useEffect } from "react";

const SimpleClock : React.FC = ()=>{
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    useEffect(()=>{
        const canvas  = canvasRef.current;
        if(!canvas) return;
        const context = canvas.getContext('2d');
        
        const drawClock=()=>{
            const centerX = canvas.width/2;
            const centerY = canvas.height/2;
            const radius = canvas.width/2-10;

            //Clear the canvas
            if(context){
                context.clearRect(0,0,canvas.width,canvas.height);
            }

            //Draw clock face
            if(context){
                context.beginPath();
                context.arc(centerX,centerY,radius,0,2*Math.PI);
                context.fillStyle="#f0f0f0";
                context.fill();
                context.lineWidth = 5;
                context.strokeStyle = '#333';
                context.stroke();
            }

            //Drew second hand
            if(context){
                const secondAngle = (new Date().getSeconds()+1)*(Math.PI/30)-Math.PI/2;
                const secondHandLength = radius*0.9;
                const secondHandX = centerX + secondHandLength * Math.cos(secondAngle);
                const secondHandY = centerY + secondHandLength * Math.sin(secondAngle);
                context.beginPath();
                context.moveTo(centerX,centerY);
                context.lineTo(secondHandX,secondHandY);
                context.lineWidth = 2;
                context.strokeStyle = 'red';
                context.stroke();
            }
            animationFrameIdRef.current =  requestAnimationFrame(drawClock);
        };
        drawClock();
        return()=>{
            if(animationFrameIdRef.current){
                console.log('卸载组件了:');
                console.log((animationFrameIdRef.current));
                
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        }
    });
    return  <canvas ref={canvasRef} width={600} height={600}></canvas> 

};

export default SimpleClock;


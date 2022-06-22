import React from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';


//Chess board is composed of 2 axes
//Defining axes 
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string
    x: number
    y: number;

}

const pieces: Piece[] = [];

/* 
    const type = (p === 0) ? "b" : "w";   is same as 

    if(b===0){
        type = "b"
    }
    else{
        type = "a"
    }
*/


/*
//rooks
pieces.push({image: "assets/images/rook_b.png", x: 0, y: 7})
pieces.push({image: "assets/images/rook_b.png", x: 7, y: 7})
pieces.push({image: "assets/images/rook_w.png", x: 0, y: 0})
pieces.push({image: "assets/images/rook_w.png", x: 7, y: 0})

//knight
pieces.push({image: "assets/images/knight_b.png", x: 1, y:7})
pieces.push({image: "assets/images/knight_b.png", x: 6, y:7})
pieces.push({image: "assets/images/knight_w.png", x: 1, y:0})
pieces.push({image: "assets/images/knight_w.png", x: 6, y:0})

//bishop
pieces.push({image: "assets/images/bishop_b.png", x: 2, y:7})
pieces.push({image: "assets/images/bishop_b.png", x: 5, y:7})
pieces.push({image: "assets/images/bishop_w.png", x: 2, y:0})
pieces.push({image: "assets/images/bishop_w.png", x: 5, y:0})

//queen
pieces.push({image: "assets/images/queen_b.png", x: 3, y:7})
pieces.push({image: "assets/images/queen_w.png", x: 3, y:0})

//king
pieces.push({image: "assets/images/king_b.png", x: 4, y:7})
pieces.push({image: "assets/images/king_w.png", x: 4, y:0})

*************the code below does the same thing as this big chunk, just more optimized.*****************
*/

for(let p = 0; p < 2; p++){
    const type = (p === 0) ? "b" : "w";     
    const y = (p === 0) ? 7 : 0;

    pieces.push({image: `assets/images/rook_${type}.png`, x: 0, y})
    pieces.push({image: `assets/images/rook_${type}.png`, x: 7, y})
    pieces.push({image: `assets/images/knight_${type}.png`, x: 1, y})
    pieces.push({image: `assets/images/knight_${type}.png`, x: 6, y})
    pieces.push({image: `assets/images/bishop_${type}.png`, x: 2, y})
    pieces.push({image: `assets/images/bishop_${type}.png`, x: 5, y})
    pieces.push({image: `assets/images/queen_${type}.png`, x: 3, y})
    pieces.push({image: `assets/images/king_${type}.png`, x: 4, y})
}
//pawns
for (let i = 0; i < 8; i++){
    pieces.push({image: "assets/images/pawn_b.png", x: i, y: 6})

}
for (let i = 0; i < 8; i++){
    pieces.push({image: "assets/images/pawn_w.png", x: i, y: 1})

}

//only 1 piece can be active at a time
let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement;

    if(element.classList.contains("chess-piece")){
        console.log(e);
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top =  `${y}px`;
        activePiece = element;
    }
}

function movePiece(e: React.MouseEvent){
    if(activePiece){
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top =  `${y}px`;
    }
}

function dropPiece(e: React.MouseEvent){
    if(activePiece){
        activePiece = null;
    }
}



export default function Chessboard(){
        let board = [];
        //fill in the chess board squares, imagine a grid being filled in with coordinates
        //(8,a), (8,b)... (7,a), (7,b)... (6,a),(6,b)...
        for (let j = verticalAxis.length - 1; j >= 0; j--){
            for (let i = 0; i < horizontalAxis.length; i++ ){
                /*  how we get the line below
                3   W B W B 
                2   B W B W
                1   W B W B
                0   B W B W                
                    0 1 2 3

                add coords, if even then black-tile, if odd then white-tile
                we add 2 because indices start at 0  
                */


                const number = j + i + 2;
                let image = undefined;

                pieces.forEach(p => {
                    if(p.x === i && p.y === j){
                        image = p.image;
                    }
                    
                })

                board.push(<Tile key = {`${j},${i}`} image = {image} number={number}/>);

            }
        }

    return <div onMouseMove = {(e) => movePiece(e)}
                onMouseDown = {(e) => grabPiece(e)}
                onMouseUp =   {(e) => dropPiece(e)}
                id = "chessboard"> {board} </div>;

}
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let win = document.querySelector(".msg");
let restart = document.querySelector(".reset");
let turn0 = "o";

const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8,]
];

boxes.forEach((box)=>{
    box.addEventListener("click" , () =>{
        console.log("box was clicked");
       if (turn0 ==="o"){
        box.innerText ="O";
        turn0 = "X";
       }else{
        box.innerText="X";
        turn0 = "o";
       }box.disabled = true;
       checkWinner();
       
    });
    
});
const showWinner = (winner) =>{
    win.innerText=`Congratulations,winner is ${winner}`;
    win.classList.remove("hide");
}
const stop =() =>{
    for(box of boxes){
       box.disabled=true; 
    }
}
const renew =() =>{
    for(box of boxes){

        box.innerText="";
       box.disabled=false; 
    }
}
const checkWinner = () =>{
    for(let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 !="" &&pos2 !="" &&pos3 !="" ){
            if(pos1===pos2 && pos2===pos3){
                console.log("winner",pos1);
                showWinner(pos1);
                stop();
                }
            }
        }
    };
    const resetGame=()=>{
        turn0 = "o";
        renew();
        win.classList.add("hide");
    }
    restart.addEventListener("click", resetGame);
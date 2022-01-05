const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const statusNum = document.querySelector(".statusNum");
const statusBar = document.querySelector(".statusBar")
const startB = document.querySelector("#startButton");

let votedAnimal = new Array();
votedAnimal.length = 12;
votedAnimal.fill(0);

startB.addEventListener("click",begin)

function calResult(){
    var pointArray = [
    {name:'mouse', value:0, key:0},
    {name:'cow', value:0, key:1},
    {name:'tiger', value:0, key:2},
    {name:'rabbit', value:0, key:3},
    {name:'dragon', value:0, key:4},
    {name:'snake', value:0, key:5},
    {name:'horse', value:0, key:6},
    {name:'sheep', value:0, key:7},
    {name:'monkey', value:0, key:8},
    {name:'chick', value:0, key:9},
    {name:'dog', value:0, key:10},
    {name:'pig', value:0, key:11}
  ]
  for(let i = 0; i < votedAnimal.length; i++){
      for(let j = 0; j< qnaList[i].a[parseInt(votedAnimal[i])].type.length; j++){
        for(let k = 0; k < pointArray.length; k++){
            if(qnaList[i].a[parseInt(votedAnimal[i])].type[j] == pointArray[k].name){
                pointArray[k].value += 1;
            }
        }
      }
  }
  const resultValue = pointArray.reduce((pre, cur)=>{
    return pre.value > cur.value ? cur : pre})
  resultInfo = infoList.find((ele,idx)=>{
      if(idx == resultValue.key)return true;
      else return false;
})
  return [resultInfo,resultValue.key]
}

function goResult(){
    const resultTitle = document.querySelector(".resultTitle");
    const descImg = document.querySelector(".descImg");
    const desc = document.querySelector(".desc");

    qna.style.animation = "fadeout 1s";
    qna.style.webkitanimation = "fadeout in";

    result.style.animation = "fadein 1s"
    result.style.webkitanimation = "fadein 1s";

    setTimeout(()=>{
        qna.style.display="none";
        setTimeout(()=>{
            result.style.display = "block";
        },800)
    },800)

    const resultAnimal = calResult();

    
    resultTitle.innerHTML = resultAnimal[0].name
    descImg.src = `img/image-${resultAnimal[1]}.png`
    desc.innerHTML = resultAnimal[0].desc

}

//버튼생성과 클릭제어
function answerButtonMake(answer, qnaIdx, idx){
    const a = document.querySelector(".aBox");

    const newButton = document.createElement("button");
    newButton.classList.add("buttonList");
    newButton.classList.add('my-2');
    newButton.classList.add('py-2');
    newButton.classList.add('mx-auto');
    newButton.classList.add('fadeIn');

    newButton.innerHTML = answer;

    newButton.addEventListener("click",()=>{
        votedAnimal[qnaIdx] = idx;
        const buttonList = document.querySelectorAll(".buttonList");
        buttonList.forEach((button)=>{
            button.disabled = true;
            button.classList.add("fadeOut")
            setTimeout(()=>{  
                button.remove()
            },500)
        },false);
        setTimeout(()=>{  
            goNext(++qnaIdx)
        },500)
    })
    
    a.appendChild(newButton)
    
}

// 시작버튼 제어
function begin(){
    main.style.animation = "fadeout 1s";
    main.style.webkitanimation = "fadeout 1s";
    
    qna.style.animation = "fadein 1s"
    qna.style.webkitanimation = "fadein 1s";
    
    startB.disabled = true;
    setTimeout(()=>{
        main.style.display="none";
        setTimeout(()=>{
            qna.style.display = "block";
        },500)
    },500)
    let qnaIdx = 0
    goNext(qnaIdx);
}


//qna 버튼제어
function goNext(qnaIdx){
    statusNum.innerHTML = `${qnaIdx}/${qnaList.length}`;
    statusBar.style.width = (100/qnaList.length) * (qnaIdx) + "%"
    if(qnaIdx === qnaList.length){
        goResult();
        return ;
    }

    const q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qnaIdx].q

    for(let i = 0; qnaList[qnaIdx].a.length > i; i++){
        answerButtonMake(qnaList[qnaIdx].a[i].answer, qnaIdx, i);
    }
}
let refresh_btn=document.querySelector('.refresh-btn');
let speak_btn=document.querySelector('.speak-btn');
let copy_btn=document.querySelector('.copy-btn');
let twitter_btn=document.querySelector('.twitter-btn');
let container=document.querySelector('.container');
let quote=document.querySelector('.quote');
let author=document.querySelector('.author');
let copy_icon=document.querySelector('.fa-copy');
let copy_message=document.querySelector('.copy-btn span');
if(refresh_btn){
refresh_btn.addEventListener('click',()=>{
    getQuote();
    getRandomColor();
});
}

let getRandomColor=()=>{
    const colors=["#42a7f5","#bf60b9","#6db3a0","#979962","#998062","#997362","#996862","#627199","#736299"];
    var RandomColor=colors[Math.floor(Math.random()*colors.length)];
    console.log(RandomColor);
    container.style.backgroundColor=RandomColor;

}

const url="https://api.quotable.io/random";

let getQuote=()=>{
    fetch(url).then((data)=>data.json()).then((item)=>{
        quote.innerHTML=item.content;
        author.innerHTML="- "+item.author;
        speechSynthesis.cancel();
    });
};

speak_btn.addEventListener('click',()=>{
    let speech=new SpeechSynthesisUtterance();
    speech.lang='en-US';
    speech.text= `${quote.textContent}  by ${author.textContent}`;
    console.log(speech.text);
    speech.rate=0.9;
    speech.volume=1;
    speech.pitch=1;
    speechSynthesis.speak(speech);
});

copy_btn.addEventListener('click',()=>{
    console.log("copy")
    var r=document.createRange();
    r.selectNode(quote);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    copy_icon.style.display='none';
    copy_message.style.display='block';
    setTimeout(()=>{
        copy_icon.style.display='block';
        copy_message.style.display='none';
    },1000)

});
twitter_btn.addEventListener('click',()=>{
    let tweetUrl=`https://twitter.com/intent/tweet?url=${quote.innerText} ${author.innerText}`;
    window.open(tweetUrl,"_blank");
});

getQuote();
getRandomColor();
var mode=Number(document.querySelector('.mode').value);
function modeChange(){
    mode=Number(document.querySelector('.mode').value);
}
var a=[], b=0;
var ans, game=document.querySelector('.game');
var t, timer=document.querySelector('.timer'), T;
var score=-1, fscore=0, scores=[], Score=document.querySelector('.score');
var rule=document.querySelector('.rule');
function toletter(x){
    return String.fromCharCode(parseInt('A', 36)+x+54);
}
function play(){
    var s=0;
    if(mode==0)for(var i=4; i>=0; --i)s=s*2+a[i];
    else s=b;
    if(s!=ans){
        ++fscore;
        return;
    }
    ++score;
    var A='';
    for(var i=4; i>=0; --i)A+=String(a[i])+' ', a[i]=0;
    if(mode==0)scores.push(String(score)+'. '+String(ans)+' = '+A+', time: '+String((t/10).toFixed(1))+'<br>');
    else if(mode==1)scores.push(String(score)+'. '+String(ans)+' = '+toletter(b)+', time: '+String((t/10).toFixed(1))+'<br>')
    else if(mode==2)scores.push(String(score)+'. '+A+' = '+toletter(b)+', time: '+String((t/10).toFixed(1))+'<br>');
    var ans0=ans;
    while(ans==ans0)ans=Math.floor(Math.random()*(mode==0?31:26)+1);
    if(mode==2)for(var i=0, j=ans; j>0; ++i, j=Math.floor(j/2))a[i]=j%2;
    upd();
}
function upd(){
    var A='';
    for(var i=4; i>=0; --i)A+=String(a[i])+' ';
    rule.textContent='';
    game.textContent=mode==0?String(ans)+' = '+A:mode==1?String(ans):A;
    Score.textContent='AC: '+String(score)+', WA: '+String(fscore);
}
function tupd(){
    ++t;
    timer.textContent='Time: '+String((60-t/10).toFixed(1));
    if(t==600)end();
}
function start(){
    ans=t=0, scores=[], a=[0, 0, 0, 0, 0], rule.textContent='';
    play();
    T=setInterval(tupd, 100);
}
function end(){
    clearInterval(T);
    game.textContent='';
    timer.textContent='';
    rule.textContent=mode==0?'按D重新開始':'按空白鍵重新開始';
    b=0;
    var A='';
    for(var i=score; i>0; --i)A+=scores[i];
    Score.innerHTML='Score: '+(fscore<10?String(score):'0')+'<br>AC: '+String(score)+', WA: '+String(fscore)+'<br>'+A;
    score=-1, fscore=0;
}
document.addEventListener('keydown', function(evt){
    if(mode==0){
        var k=['Semicolon', 'KeyL', 'KeyK', 'KeyJ', 'Space'];
        if(evt.code=='KeyD'){
            end();
            start();
            return;
        }
        if(score==-1)return;
        if(evt.code=='KeyF')play();
        for(var i=0; i<5; ++i)if(evt.code==k[i])a[i]=1-a[i];
    }
    else{
        if(evt.code=='Space'){
            end();
            start();
            return;
        }
        if(score==-1)return;
        for(var i=0; i<26; ++i)if(evt.code=='Key'+toletter(i+1))b=i+1, play();
    }
    upd();
})
rule.addEventListener('mouseover', function(){
    if(mode==0)rule.innerHTML="按下D鍵開始遊戲<br>'Space', 'J', 'K', 'L', ';'<br>分別為16, 8, 4, 2, 1位<br>按下後改變那一位的數值<br>完成題目給定的數字後<br>按下F鍵送出<br>(若送出錯誤10次以上會以0分計算)";
    else if(mode==1)rule.innerHTML="按下空白鍵開始遊戲<br>按下數字所對應到的字母(1~26->A~Z)<br>(若錯誤10次以上會以0分計算)";
    else rule.innerHTML="按下空白鍵開始遊戲<br>按下二進位數字所對應到的字母(00001~11010->A~Z)<br>(若錯誤10次以上會以0分計算)"
})
rule.addEventListener('mouseleave', function(){
    rule.innerHTML='遊戲規則';
})
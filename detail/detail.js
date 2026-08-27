const key=document.body.dataset.song,s=songs[key],cover=document.querySelector('#cover'),audio=document.querySelector('#audio'),lyrics=document.querySelector('#lyrics');document.title=s.title+'｜光 影 旋律';document.querySelector('#n').textContent=s.n;document.querySelector('#title').textContent=s.title;document.querySelector('#sub').textContent=s.sub;cover.src=base+'covers/'+s.cover;cover.alt=s.title+'封面';audio.src=base+'audio/'+s.audio;document.querySelector('#meta').innerHTML='<div><b>形式</b>'+s.form+'</div><div><b>速度</b>'+s.tempo+'</div><div><b>编曲</b>'+s.tone+'</div><div><b>演绎</b>'+s.voice+'</div>';document.querySelector('#texture').innerHTML='<b>风格</b> '+s.form+'<br><b>速度</b> '+s.tempo+'<br><b>核心音色</b> '+s.tone+'<br><b>演唱</b> '+s.voice;document.querySelector('#context').textContent=s.context;document.querySelector('#download').href=base+'audio/'+s.audio;fetch(base+'lyrics/'+s.lyric).then(r=>r.text()).then(t=>{lyrics.innerHTML=t.trim().split(/\n\s*\n/).map((b,i)=>'<p class="'+(i%4===3?'chorus':'')+'">'+b.replace(/\n/g,'<br>')+'</p>').join('')});
const introEl=document.querySelector('#intro');if(introEl)introEl.textContent=s.intro||'每一首歌，都从自己的光影、人物与声音出发。';audio.setAttribute('controlsList','noplaybackrate');const ds=document.createElement('style');ds.textContent='.download{display:inline-block;margin-top:12px;color:#f1eee5!important;background:none;border:0;border-bottom:1px solid #bc684e;padding:0 0 5px;font:11px "Microsoft YaHei","Noto Serif SC",serif;text-decoration:none}.download:hover{color:#fff!important;border-color:#e5cb96}';document.head.appendChild(ds);
const archiveCopy=document.querySelector('.intro p:nth-child(2)');if(archiveCopy)archiveCopy.textContent=s.archive||s.context;
document.querySelector('#download').style.cssText='display:inline-block;margin-top:12px;color:#f1eee5!important;background:none;border:0;border-bottom:1px solid #bc684e;padding:0 0 5px;font:11px "Microsoft YaHei","Noto Serif SC",serif;text-decoration:none';

// 双击打开详情页时，file:// 会阻止 fetch 本地歌词；加载内嵌歌词数据作为离线兜底。
(function(){
  if(location.protocol!=='file:') return;
  var script=document.createElement('script');
  script.src='detail-lyrics.js';
  script.onload=function(){
    var text=window.lyricData&&window.lyricData[key];
    if(!text||!lyrics) return;
    lyrics.innerHTML=text.trim().split(/\n\s*\n/).map(function(block,i){return '<p class="'+(i%4===3?'chorus':'')+'">'+block.replace(/\n/g,'<br>')+'</p>';}).join('');
  };
  document.head.appendChild(script);
})();

// 若旧数据对象缺少 context，恢复页面中已写入的作品专属 archive 文案。
var contextFallback=document.querySelector('#context');
if(contextFallback&&!s.context&&s.archive)contextFallback.textContent=s.archive;

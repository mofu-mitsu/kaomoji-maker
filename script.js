// ==========================================
// 左右対称変換辞書（真の完全版！）
// ==========================================
const symmetryDict = {
    // 輪郭
    '(': ')', '【': '】', '⊂(': ')⊃', '|　': '　|', '｡ﾟ(ﾟ': '∩ﾟ)ﾟ｡', '(ง': ' )ง', '(๑': ')', '( ੭ ': ' )੭', '(^': '^)', '^': '^', '( ᐢ': 'ᐢ )',
    '[': ']', '༼': '༽', '(੭ु': ')੭ु', '٩(': ')۶', // ジェミ追加
    // 耳
    'ʕ': 'ʔ', 'ʕ̢̣̣̣': 'Ɂ̡̣̣̣', '₍ᐢ': 'ᐢ₎', 'ฅ^': '^ฅ', '૮꒰': '꒱ა', '꒰՞': '՞꒱', 'ᐢ': 'ᐢ', '𑁊^': '^𑁊',
    // 眉毛
    '´': '｀', '｀': '´', ' ิ': ' ิ', '◟': '◞', '◡': '◡', '◠': '◠',
    // ほっぺ
    '◍': '◍', '҉': '҉', '///': '///', '*': '*', '⸝⸝': '⸝⸝', '⑉': '⑉', '｡': '｡', '˶': '˵', 'ෆ': 'ෆ', 'ꈊ': 'ꈊ',
    // 目
    '>': '<', '・': '・', 'ʚ̴̶̷̷': 'ʚ̴̶̷̷', '￥': '￥', '＠': '＠', '◉': '◉', '*': '*', '^': '^', "'": "'", '˙': '˙', '･̆': '･̆', 'ㅎ': 'ㅎ', '•': '•', '-᷄': '-᷅', '.': '.', 'ᴗ': 'ᴗ', 'o̴̶̷̤': 'o̴̶̷̤',
    '⁰': '⁰', '◔': '◔', '⚆': '⚆', '∩': '∩', '˘': '˘', '☆': '☆', '¯': '¯', '👁': '👁', 'ಠ': 'ಠ', '·͡˔': '·͡˔',
    '∂': '∂', '᭜𖫴𖫰𖫱𖫳𖫲𖫲𖫳𖫴𖫰𖫱꛰': '᭜𖫴𖫰𖫱𖫳𖫲𖫲𖫳𖫴𖫰𖫱꛰', 'థ': 'థ', '💲': '💲', '¥': '¥', '@': '@', '￢': '⌐', '⩌': '⩌', '⚲': '⚲', '✧': '✧', 'Ꙭ': 'Ꙭ', '◓': '◒',
    // 装飾
    'ヽ': 'ﾉ', 'ദ്ദി': ' .ᐟ.ᐟ', '〜': '〜', '💰': '💰', '🐾': '🐾', '🍅': '🍅', '∠': 'ゝ', 'ԅ': 'ԅ', '👐': '👐', 'Σ': '', '¿?': '¿?', '└': '┘', '‹‹\\': '/››', '⋆꙳✮': '⋆꙳✮', '♪': '♪', '⟆': '⟅', 'ꧦ𛰙᭜': 'ꧦ𛰙᭜',
    '==͟͟͞͞': '==͟͟͞͞', '三': '三', '✨': '✨'
};

// ==========================================
// UI連動ロジック
// ==========================================
function applySelect(part, value) {
    if(value !== null) { document.getElementById(`${part}-val`).value = value; }
}

function syncLeftToRight(type) { 
    const isSync = document.getElementById('sync-check').checked;
    if (!isSync) return;

    const leftVal = document.getElementById(`${type}-l-val`).value;
    const rightVal = symmetryDict[leftVal] !== undefined ? symmetryDict[leftVal] : leftVal;
    document.getElementById(`${type}-r-val`).value = rightVal;
}

function forceSync() {
    ['deco', 'frame', 'ear', 'eyebrow', 'cheek', 'eye'].forEach(type => syncLeftToRight(type));
    updatePreview();
}

function updatePreview() {
    const dL = document.getElementById('deco-l-val').value;
    const fL = document.getElementById('frame-l-val').value;
    const earL = document.getElementById('ear-l-val').value;
    const ebL = document.getElementById('eyebrow-l-val').value;
    const cL = document.getElementById('cheek-l-val').value;
    const eL = document.getElementById('eye-l-val').value;
    const m  = document.getElementById('mouth-val').value;
    
    const eR = document.getElementById('eye-r-val').value;
    const cR = document.getElementById('cheek-r-val').value;
    const ebR = document.getElementById('eyebrow-r-val').value;
    const earR = document.getElementById('ear-r-val').value;
    const fR = document.getElementById('frame-r-val').value;
    const dR = document.getElementById('deco-r-val').value;

    document.getElementById('preview').value = `${dL}${fL}${earL}${ebL}${cL}${eL}${m}${eR}${cR}${ebR}${earR}${fR}${dR}`;
}

// ==========================================
// アクションテンプレ生成
// ==========================================
function generateTemplate() {
    const type = document.getElementById('tmpl-type').value;
    const item = document.getElementById('tmpl-item').value || '〇';
    const text = document.getElementById('tmpl-text').value;
    let result = '';

    if (type === 'punch') result = `${item}=͟͟͞͞${item}=͟͟͞͞=( '-' ${item} )${text}`;
    if (type === 'paradise') result = `${item}(* ॑꒳ ॑* )${item}${text}`;
    if (type === 'throw') result = `(っ'-')╮ーー＝＝=͟͟͞͞${item})\`-' )${text}`;
    if (type === 'both') result = `${item}(^o^)${item}${text}`;
    if (type === 'shrug') result = `${item}╮( ❛_❛ )╭${item}${text}`;
    if (type === 'suu') result = `${item}( '-' ${item} )${text}`;
    if (type === 'appeal') result = `${text}(｢${item}･ω･)｢${item}`;
    if (type === 'yoshi') result = `ﾖｼﾖｼ(　'ω')ﾉ"${item}`; 
    if (type === 'barrier') result = `(੭ ᐕ))੭*⁾⁾ ${item}${item}${item} ﾊﾞﾘｱｰ! ${text}`; 

    document.getElementById('preview').value = result;
}

// ==========================================
// ランダム自動生成（全カテゴリ・パーツ超増量！）
// ==========================================
const partsDict = {
    normal: {
        decosL: ['', 'ヽ', '〜'], decosR: ['', 'ﾉ', '〜', '♪'],
        framesL: ['(', '(*', '(´', '⊂(', '(^'], framesR: [')', '*)', '`)', ')⊃', '^)'],
        earsL: [''], earsR: [''],
        eyebrowsL: ['', '´', '｀', '◡'], eyebrowsR: ['', '｀', '´', '◡'],
        cheeksL: ['', '*'], cheeksR: ['', '*'],
        eyesL: ['・', '>', '^', '⁰', '˘', "'", '˙'], eyesR: ['・', '<', '^', '⁰', '˘', "'", '˙'],
        mouths: ['ω', '∀', 'ー', 'ヮ', '▱', '꒳', '_', '-']
    },
    cute: {
        decosL: ['', 'ദ്ദി', '♡', '⋆꙳✮', '✨'], decosR: ['', ' .ᐟ.ᐟ', '♡', '⋆꙳✮', '✨'],
        framesL: ['(', '【', '', '( ᐢ', '^', '༼', '(੭ु'], framesR: [')', '】', '', 'ᐢ )', '^', '༽', ')੭ु'],
        earsL: ['꒰՞', '૮꒰', '₍ᐢ', 'ᐢ'], earsR: ['՞꒱', '꒱ა', 'ᐢ₎', 'ᐢ'],
        eyebrowsL: [''], eyebrowsR: [''],
        cheeksL: ['', '⸝⸝', '///', '｡', '⑉', '˶', 'ෆ'], cheeksR: ['', '⸝⸝', '///', '｡', '⑉', '˵', 'ෆ'],
        eyesL: ['ʚ̴̶̷̷', '•', '☆', '･̆', 'o̴̶̷̤', '✧', 'ᴗ'], eyesR: ['ʚ̴̶̷̷', '•', '☆', '･̆', 'o̴̶̷̤', '✧', 'ᴗ'],
        mouths: ['·', '༝', 'ㅅ', 'ヮ', 'x', '·̫', 'ᴗ', '.']
    },
    animal: {
        decosL: ['🐾', ''], decosR: ['🐾', '', '⟆'],
        framesL: ['(', '', '(^'], framesR: [')', '', '^)'],
        earsL: ['U', 'ฅ^', 'ʕ̢̣̣̣', 'ʕ', '𑁊^'], earsR: ['U', '^ฅ', 'Ɂ̡̣̣̣', 'ʔ', '^𑁊'],
        eyebrowsL: [''], eyebrowsR: [''],
        cheeksL: ['', '◍'], cheeksR: ['', '◍'],
        eyesL: ['ʘ', '•', '·͡˔', '·̀', '.', '⩌'], eyesR: ['ʘ', '•', '·͡˔', '·́', '.', '⩌'],
        mouths: ['ﻌ', 'ω', '·ོ', 'ꈊ','Ⱉ', 'ᴥ', ' ', 'ʚ', 'Θ', '∋']
    },
    weird: { 
        decosL: ['💰', '', '👐', '└', '‹‹\\', '¿?', '==͟͟͞͞'], decosR: ['💰', 'ﾊﾟｧ', '👐', '♪┐', '/››', '¿?♪', '三'],
        framesL: ['【', '∠(　', '( ', '|　', '٩('], framesR: ['】', '　)ゝ', ')', '　|', ')۶'],
        earsL: [''], earsR: [''],
        eyebrowsL: [''], eyebrowsR: [''],
        cheeksL: ['', '　'], cheeksR: ['', '　'],
        eyesL: ['◉', '´◔', 'ᐛ', '՞', 'ㅎ', '', '💲', '¥', '@', '￢', 'Ꙭ', '◓'], eyesR: ['◉', '◔`', 'ᐛ', '՞', 'ㅎ', '', '💲', '¥', '@', '⌐', 'Ꙭ', '◒'],
        mouths: ['益', 'ਊ', 'Д', 'ϖ', 'ᐛ', '∀', '👄', '౪', '∂']
    },
    creepy: { 
        decosL: ['💦', '', 'ꧦ𛰙᭜'], decosR: ['ﾍﾍｯ♡', '💦', 'ꧦ𛰙᭜'],
        framesL: ['(๑', '(', '｡ﾟ(ﾟ', '['], framesR: [')', ')', '∩ﾟ)ﾟ｡', ']'],
        earsL: [''], earsR: [''],
        eyebrowsL: [' ิ', ''], eyebrowsR: [' ิ', ''],
        cheeksL: [' ิ', '҉', ''], cheeksR: [' ิ', '҉', ''],
        eyesL: ['・', '👁', '⚆', 'ಠ', '-᷄', '᭜𖫴𖫰𖫱𖫳𖫲𖫲𖫳𖫴𖫰𖫱꛰', 'థ', '⚲'], eyesR: ['・', '👁', '⚆', 'ಠ', '-᷅', '᭜𖫴𖫰𖫱𖫳𖫲𖫲𖫳𖫴𖫰𖫱꛰', 'థ', '⚲'],
        mouths: ['ټ', 'ꎳ', '౪', ' ิټ', 'ഌ']
    }
};

function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateRandomLogic() {
    const mood = document.getElementById('random-mood').value;
    const p = partsDict[mood];
    const isSym = document.getElementById('random-sync-check').checked; 

    const lD = getRandom(p.decosL);
    const lF = getRandom(p.framesL);
    const lEar = getRandom(p.earsL);
    const lEb = getRandom(p.eyebrowsL);
    const lC = getRandom(p.cheeksL);
    const lE = getRandom(p.eyesL);
    const m  = getRandom(p.mouths);
    
    const getRight = (leftPart, rightArray) => {
        if (!isSym) return getRandom(rightArray);
        return symmetryDict[leftPart] !== undefined ? symmetryDict[leftPart] : leftPart;
    };

    const rE = getRight(lE, p.eyesR);
    const rC = getRight(lC, p.cheeksR);
    const rEb = getRight(lEb, p.eyebrowsR);
    const rEar = getRight(lEar, p.earsR);
    const rF = getRight(lF, p.framesR);
    const rD = getRight(lD, p.decosR);

    const kaomoji = `${lD}${lF}${lEar}${lEb}${lC}${lE}${m}${rE}${rC}${rEb}${rEar}${rF}${rD}`;
    document.getElementById('preview').value = kaomoji; 
}

// ==========================================
// ボタン機能
// ==========================================
function copyKaomoji() {
    const text = document.getElementById('preview').value;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.btn-copy');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> コピーした！';
        setTimeout(() => btn.innerHTML = '<i class="fa-regular fa-copy"></i> コピー', 2000);
    });
}

function shareKaomoji() {
    const text = document.getElementById('preview').value;
    const shareData = {
        title: '顔文字メーカー',
        text: `神顔文字作った！\n${text}\n\n#顔文字メーカー #顔文字\n`,
        url: 'https://mofu-mitsu.github.io/kaomoji-maker/'
    };
    if (navigator.share) {
        navigator.share(shareData).catch(err => console.log('シェアキャンセル'));
    } else {
        const shareText = encodeURIComponent(shareData.text + shareData.url);
        window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank');
    }
}

function resetAll() {
    document.querySelectorAll('input[type="text"]:not(.preview-input)').forEach(i => i.value = "");
    document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
    
    document.getElementById('frame-l-val').value = "(";
    document.getElementById('eyebrow-l-val').value = "´";
    document.getElementById('eye-l-val').value = "・";
    document.getElementById('mouth-val').value = "ω";
    document.getElementById('eye-r-val').value = "・";
    document.getElementById('eyebrow-r-val').value = "｀";
    document.getElementById('frame-r-val').value = ")";

    document.getElementById('sync-check').checked = true;
    updatePreview();
}

function openModal() { document.getElementById('helpModal').style.display = 'block'; }
function closeModal() { document.getElementById('helpModal').style.display = 'none'; }
window.onclick = function(e) { if(e.target == document.getElementById('helpModal')) closeModal(); }

updatePreview();

window.onscroll = function() {
    const btn = document.getElementById("page-top-btn");
    // 200px以上下にスクロールしたらボタンを表示する！
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
};

function scrollToTop() {
    // ぬるっと一番上までワープする！
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}
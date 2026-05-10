// ==========================================
// 左右対称変換辞書（みつきの最新版＋補足！）
// ==========================================
const symmetryDict = {
    // 輪郭
    '(': ')', '【': '】', '⊂(': ')⊃', '|　': '　|', '｡ﾟ(ﾟ': '∩ﾟ)ﾟ｡', '(ง': ' )ง', '(๑': ')', '( ੭ ': ' )੭', '(^': '^)', '^': '^', '( ᐢ': 'ᐢ )',
    '[': ']', '༼': '༽', '(੭ु': ')੭ु', '٩(': ')۶', 
    // 耳
    'ʕ': 'ʔ', 'ʕ̢̣̣̣': 'Ɂ̡̣̣̣', '₍ᐢ': 'ᐢ₎', 'ฅ^': '^ฅ', '૮꒰': '꒱ა', '꒰՞': '՞꒱', 'ᐢ': 'ᐢ', '𑁊^': '^𑁊',
    // 眉毛
    '´': '｀', '｀': '´', ' ิ': ' ิ', '◟': '◞', '◡': '◡', '◠': '◠',
    // ほっぺ
    '◍': '◍', '҉': '҉', '///': '///', '*': '*', '⸝⸝': '⸝⸝', '⑉': '⑉', '｡': '｡', '˶': '˵', 'ෆ': 'ෆ', 'ꈊ': 'ꈊ',
    // 目
    '>': '<', '・': '・', 'ʚ̴̶̷̷': 'ʚ̴̶̷̷', '￥': '￥', '＠': '＠', '◉': '◉', '*': '*', '^': '^', "'": "'", '˙': '˙', '･̆': '･̆', 'ㅎ': 'ㅎ', '•': '•', '-᷄': '-᷅', '.': '.', 'ᴗ': 'ᴗ', 'o̴̶̷̤': 'o̴̶̷̤',
    '⁰': '⁰', '◔': '◔', '⚆': '⚆', '∩': '∩', '˘': '˘', '☆': '☆', '¯': '¯', '👁': '👁', 'ಠ': 'ಠ', '·͡˔': '·͡˔',
    '∂': '∂', '᭜𖫴𖫰𖫱𖫳𖫲𖫲𖫳𖫴𖫰𖫱꛰': '᭜𖫴𖫰𖫱𖫳𖫲𖫲𖫳𖫴𖫰𖫱꛰', 'థ': 'థ', '💲': '💲', '¥': '¥', '@': '@', '￢': '⌐', '⩌': '⩌', '⚲': '⚲', '✧': '✧', 'Ꙭ': 'Ꙭ', '◓': '◒', 'め': 'め',
    // 装飾
    'ヽ': 'ﾉ', 'ദ്ദി': ' .ᐟ.ᐟ', '〜': '〜', '💰': '💰', '🐾': '🐾', '🍅': '🍅', '∠': 'ゝ', 'ԅ': 'ԅ', '👐': '👐', 'Σ': '', '¿?': '¿?', '└': '┘', '‹‹\\': '/››', '⋆꙳✮': '⋆꙳✮', '♪': '♪', '⟆': '⟅', 'ꧦ𛰙᭜': 'ꧦ𛰙᭜',
    '==͟͟͞͞': '==͟͟͞͞', '三': '三', '✨': '✨'
};

// ==========================================
// UI連動ロジック ＆ 自動反映機能
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
    updatePreview(true); // 連動ボタンを押した時は強制更新
}

// 🌟 自動反映トグルを考慮した更新処理
function updatePreview(force = false) {
    const isAutoBox = document.getElementById('auto-reflect-check');
    // auto-reflect-checkが存在しない（旧HTML）場合のエラー回避も一応入れておく
    const isAuto = isAutoBox ? isAutoBox.checked : true; 
    
    if (!force && !isAuto) return; // 自動反映OFFで、強制更新じゃなければ中断

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

// 🌟 「反映」ボタンを押した時専用（手動で強制更新）
function manualUpdate() {
    updatePreview(true);
}

// ==========================================
// 🌟 神機能：生成されたパーツをカスタム欄に逆反映させる！
// ==========================================
function setCustomInputs(p) {
    const parts = ['deco-l', 'frame-l', 'ear-l', 'eyebrow-l', 'cheek-l', 'eye-l', 'mouth', 'eye-r', 'cheek-r', 'eyebrow-r', 'ear-r', 'frame-r', 'deco-r'];
    const values = [p.dL, p.fL, p.earL, p.ebL, p.cL, p.eL, p.m, p.eR, p.cR, p.ebR, p.earR, p.fR, p.dR];

    for (let i = 0; i < parts.length; i++) {
        const id = parts[i];
        const val = values[i] || "";
        
        // Input（テキストボックス）に値をセット
        const inputEl = document.getElementById(`${id}-val`);
        if(inputEl) inputEl.value = val;
        
        // Select（ドロップダウン）の表示も同期させる
        const sel = document.getElementById(`${id}-sel`);
        if(sel) {
            let found = false;
            for (let j = 0; j < sel.options.length; j++) {
                if (sel.options[j].value === val) {
                    sel.selectedIndex = j;
                    found = true;
                    break;
                }
            }
            if (!found) sel.selectedIndex = 0; // 選択肢になければ「なし」等にリセット
        }
    }
}

// ==========================================
// アクションテンプレ生成
// ==========================================
function generateTemplate() {
    const type = document.getElementById('tmpl-type').value;
    const item = document.getElementById('tmpl-item').value || '〇';
    const text = document.getElementById('tmpl-text').value;
    
    // 🌟 カスタム欄へ逆反映させるための分解マップ
    let p = { dL:"", fL:"", earL:"", ebL:"", cL:"", eL:"", m:"", eR:"", cR:"", ebR:"", earR:"", fR:"", dR:"" };

    if (type === 'punch') p = { dL:`${item}=͟͟͞͞${item}=͟͟͞͞=`, fL:`(`, eL:`'`, m:`-`, eR:`'`, fR:`)`, dR:`${item} )${text}` };
    else if (type === 'paradise') p = { dL:`${item}`, fL:`(`, cL:`*`, eL:` ॑`, m:`꒳`, eR:` ॑`, cR:`*`, fR:`)`, dR:`${item}${text}` };
    else if (type === 'throw') p = { fL:`(`, cL:`っ`, eL:`'`, m:`-`, eR:`'`, fR:`)`, dR:`╮ーー＝＝=͟͟͞͞${item})\`-' )${text}` };
    else if (type === 'both') p = { dL:`${item}`, fL:`(`, eL:`^`, m:`o`, eR:`^`, fR:`)`, dR:`${item}${text}` };
    else if (type === 'shrug') p = { dL:`${item}╮`, fL:`(`, cL:` `, eL:`❛`, m:`_`, eR:`❛`, cR:` `, fR:`)`, dR:`╭${item}${text}` };
    else if (type === 'suu') p = { dL:`${item}`, fL:`(`, cL:` `, eL:`'`, m:`-`, eR:`'`, cR:` `, fR:`)`, dR:`${item}  )${text}` };
    else if (type === 'appeal') p = { dL:`${text}(｢${item}`, eL:`･`, m:`ω`, eR:`･`, fR:`)`, dR:`｢${item}` };
    else if (type === 'yoshi') p = { dL:`ﾖｼﾖｼ`, fL:`(`, cL:`　`, eL:`'`, m:`ω`, eR:`'`, fR:`)`, dR:`ﾉ"${item}` };
    else if (type === 'barrier') p = { dL:`(੭ `, eL:`ᐕ`, m:`)`, eR:`)`, cR:`੭`, dR:`*⁾⁾ ${item}${item}${item} ﾊﾞﾘｱｰ! ${text}` };

    // 分解したパーツをカスタム欄にセットして、プレビューを強制更新＆一番上にワープ！
    setCustomInputs(p);
    updatePreview(true);
    scrollToTop();
}

// ==========================================
// ランダム自動生成（みつきの最新辞書を完全継承！）
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
        eyesL: ['ʚ̴̶̷̷', '•', '☆', '･̆', 'o̴̶̷̤', '✧','ㅎ','ᴗ'], eyesR: ['ʚ̴̶̷̷', '•', '☆', '･̆', 'o̴̶̷̤', '✧','ㅎ','ᴗ'],
        mouths: ['·', '༝', 'ㅅ', 'ヮ', 'x', '·̫', 'ᴗ', '.']
    },
    animal: {
        decosL: ['🐾', ''], decosR: ['🐾', '', '⟆'],
        framesL: ['(', '', '(^'], framesR: [')', '', '^)'],
        earsL: ['U', 'ฅ^', 'ʕ̢̣̣̣', 'ʕ', '𑁊^'], earsR: ['U', '^ฅ', 'Ɂ̡̣̣̣', 'ʔ', '^𑁊'],
        eyebrowsL: [''], eyebrowsR: [''],
        cheeksL: ['', '◍'], cheeksR: ['', '◍'],
        eyesL: ['ʘ', '•', '·͡˔', '·̀', '.', '⩌', '∂', 'ㅎ'], eyesR: ['ʘ', '•', '·͡˔', '·́', '.', '⩌', '∂', 'ㅎ'],
        mouths: ['ﻌ', 'ω', '·ོ', 'ꈊ','Ⱉ', 'ᴥ', ' ', 'ʚ', 'Θ', '∋']
    },
    weird: { 
        decosL: ['💰', '', '👐', '└', '‹‹\\', '¿?', '==͟͟͞͞'], decosR: ['💰', 'ﾊﾟｧ', '👐', '♪┐', '/››', '¿?♪', '三'],
        framesL: ['【', '∠(　', '( ', '|　', '٩('], framesR: ['】', '　)ゝ', ')', '　|', ')۶'],
        earsL: [''], earsR: [''],
        eyebrowsL: [''], eyebrowsR: [''],
        cheeksL: ['', '　'], cheeksR: ['', '　'],
        eyesL: ['◉', '´◔', 'ᐛ','め','՞', 'ㅎ', '', '💲', '¥', '@', '￢', 'Ꙭ', '◓', '＠'], eyesR: ['◉', '◔`', 'ᐛ','め','՞', 'ㅎ', '', '💲', '¥', '@', '⌐', 'Ꙭ', '◒', '＠'],
        mouths: ['益', 'ਊ', 'Д', 'ϖ', 'ᐛ', '∀', '👄','6','ω', '౪']
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
    
    // 左右連動のチェック状態
    const isSym = document.getElementById('random-sync-check').checked; 

    // 🌟 詳細設定のチェック状態を取得
    const hasFrame = document.getElementById('gen-frame') ? document.getElementById('gen-frame').checked : true;
    const hasEar = document.getElementById('gen-ear') ? document.getElementById('gen-ear').checked : true;
    const hasEb = document.getElementById('gen-eyebrow') ? document.getElementById('gen-eyebrow').checked : true;
    const hasCheek = document.getElementById('gen-cheek') ? document.getElementById('gen-cheek').checked : true;
    const hasDeco = document.getElementById('gen-deco') ? document.getElementById('gen-deco').checked : true;

    // --- 1. 左側のパーツを決定 ---
    const lD = hasDeco ? getRandom(p.decosL) : "";
    const lF = hasFrame ? getRandom(p.framesL) : "";
    const lEar = hasEar ? getRandom(p.earsL) : "";
    const lEb = hasEb ? getRandom(p.eyebrowsL) : "";
    const lC = hasCheek ? getRandom(p.cheeksL) : "";
    const lE = getRandom(p.eyesL); // 目は必須
    const m  = getRandom(p.mouths); // 口も必須
    
    // --- 2. 右側パーツの取得用ヘルパー ---
    const getRight = (leftPart, rightArray) => {
        if (!isSym) return getRandom(rightArray); // カオスモード
        return symmetryDict[leftPart] !== undefined ? symmetryDict[leftPart] : leftPart;
    };

    // --- 3. 右側のパーツを決定（チェック状態を反映） ---
    const rE = getRight(lE, p.eyesR);
    const rC = hasCheek ? getRight(lC, p.cheeksR) : "";
    const rEb = hasEb ? getRight(lEb, p.eyebrowsR) : "";
    const rEar = hasEar ? getRight(lEar, p.earsR) : "";
    const rF = hasFrame ? getRight(lF, p.framesR) : "";
    const rD = hasDeco ? getRight(lD, p.decosR) : "";

    // 🌟 4. ランダム生成したパーツもカスタム欄に逆反映させる！
    const generatedParts = {
        dL: lD, fL: lF, earL: lEar, ebL: lEb, cL: lC, eL: lE, m: m,
        eR: rE, cR: rC, ebR: rEb, earR: rEar, fR: rF, dR: rD
    };
    
    // カスタム欄を更新し、プレビューを強制更新、そして一番上にワープ！
    setCustomInputs(generatedParts);
    updatePreview(true);
    scrollToTop(); 
}

// ==========================================
// ボタン機能 ＆ スクロール
// ==========================================
function copyKaomoji() {
    const text = document.getElementById('preview').value;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.btn-copy');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> コピーした！';
        setTimeout(() => btn.innerHTML = originalHTML, 2000);
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
    
    // 自動反映のチェックボックスをオンにする（もしあれば）
    const autoCheck = document.getElementById('auto-reflect-check');
    if(autoCheck) autoCheck.checked = true;

    updatePreview(true);
}

// ==========================================
// モーダルとワープ機能
// ==========================================
function openModal() { document.getElementById('helpModal').style.display = 'block'; }
function closeModal() { document.getElementById('helpModal').style.display = 'none'; }
window.onclick = function(e) { if(e.target == document.getElementById('helpModal')) closeModal(); }

window.onscroll = function() {
    const btn = document.getElementById("page-top-btn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 初期化（ページ読み込み時に1回実行）
updatePreview(true);

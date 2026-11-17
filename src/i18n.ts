export type Lang = "zh-TW" | "en";

export const LANG_STORAGE_KEY = "localpdf.lang";

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "zh-TW" || saved === "en") return saved;
  } catch {
    // Ignore storage unavailability in restricted contexts.
  }
  const navLang =
    typeof navigator !== "undefined" && typeof navigator.language === "string"
      ? navigator.language.toLowerCase()
      : "";
  if (navLang.startsWith("zh")) return "zh-TW";
  if (navLang) return "en";
  return "zh-TW";
}

let currentLang: Lang = detectInitialLang();
if (typeof document !== "undefined") {
  document.documentElement.lang = currentLang === "zh-TW" ? "zh-Hant" : "en";
}

export function getLang(): Lang {
  return currentLang;
}

export function toggleLang(): Lang {
  currentLang = currentLang === "zh-TW" ? "en" : "zh-TW";
  try {
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  } catch {
    // Ignore storage unavailability.
  }
  document.documentElement.lang = currentLang === "zh-TW" ? "zh-Hant" : "en";
  return currentLang;
}

export const GROUP_I18N: Record<string, { "zh-TW": string; en: string }> = {
  整理: { "zh-TW": "整理", en: "Organize" },
  最佳化: { "zh-TW": "最佳化", en: "Optimize" },
  轉換: { "zh-TW": "轉換", en: "Convert" },
  編輯: { "zh-TW": "編輯", en: "Annotate" },
  安全: { "zh-TW": "安全", en: "Security" },
};

export const TOOL_I18N: Record<string, { "zh-TW": [string, string]; en: [string, string] }> = {
  merge: { "zh-TW": ["合併", "多份併成一份"], en: ["Merge", "Combine multiple PDFs"] },
  extract: { "zh-TW": ["擷取頁面", "只保留指定頁"], en: ["Extract Pages", "Keep selected pages"] },
  remove: { "zh-TW": ["移除頁面", "刪掉指定頁"], en: ["Remove Pages", "Delete selected pages"] },
  rotate: { "zh-TW": ["旋轉", "90 / 180 / 270 度"], en: ["Rotate", "90 / 180 / 270 degrees"] },
  crop: { "zh-TW": ["裁切", "縮減頁面邊界"], en: ["Crop", "Trim page margins"] },
  split: { "zh-TW": ["分割", "每 N 頁一個檔"], en: ["Split", "Every N pages per file"] },
  compress: { "zh-TW": ["壓縮", "縮小檔案大小"], en: ["Compress", "Reduce file size"] },
  repair: { "zh-TW": ["修復", "重建損毀的檔案"], en: ["Repair", "Rebuild corrupted PDF"] },
  officetopdf: { "zh-TW": ["Office 轉 PDF", "Word / Excel / PPT"], en: ["Office to PDF", "Word / Excel / PPT"] },
  imagestopdf: { "zh-TW": ["圖片轉 PDF", "JPG / PNG 併成一份"], en: ["Images to PDF", "Combine JPG / PNG"] },
  toimage: { "zh-TW": ["轉成圖片", "每頁一張 JPG / PNG"], en: ["PDF to Images", "Each page to JPG / PNG"] },
  tomarkdown: { "zh-TW": ["轉成 Markdown", "抽出文字與結構"], en: ["PDF to Markdown", "Extract text & headings"] },
  pdftoword: { "zh-TW": ["PDF 轉 Word", "需要擴充包"], en: ["PDF to Word", "Requires extension pack"] },
  watermark: { "zh-TW": ["浮水印", "斜向文字"], en: ["Watermark", "Diagonal text overlay"] },
  pagenumbers: { "zh-TW": ["頁碼", "自動編號"], en: ["Page Numbers", "Auto page numbering"] },
  stamp: { "zh-TW": ["圖章", "簽名檔、公司章"], en: ["Stamp", "Signature / seal image"] },
  annotate: { "zh-TW": ["註記", "互動式編輯器"], en: ["Annotate", "Interactive editor"] },
  decrypt: { "zh-TW": ["解密", "移除密碼保護"], en: ["Unlock PDF", "Remove password"] },
  encrypt: { "zh-TW": ["加密", "AES-256 密碼保護"], en: ["Protect PDF", "AES-256 encryption"] },
};

export const UI_TEXT = {
  "zh-TW": {
    sub: "檔案不離開這台電腦。處理結果在你存檔或關閉視窗後立即從暫存區抹除。",
    dropTitle: "把檔案拖進來",
    dropOr: "或",
    browse: "選擇檔案",
    summaryTitle: "選擇功能",
    chipsEmpty: "尚未選擇",
    filterPlaceholder: "搜尋功能，例如「壓縮」或「頁」",
    clear: "清除",
    saveAll: "全部儲存…",
    cancel: "取消",
    run: "執行",
    running: "處理中…",
    openEditor: "開啟編輯器",
    saveOne: "儲存…",
    planAddFiles: (accept: string) => `先加入檔案（目前接受 ${accept}）`,
    planPickTools: "已加入檔案，接著勾選功能",
    planNeedsTwo: "「合併」至少需要兩個檔案",
    planOpenEditor: (name: string) => `對 ${name} 開啟編輯器`,
    planReady: (count: number, chain: string) => `${count} 個檔案　·　${chain}`,
    acceptHint: (accept: string) => `　（目前接受 ${accept}）`,
    installPyext: "匯入擴充包 (.zip)",
    installingPyext: "正在驗證並安裝擴充包…",
    installedPyext: (ver: string) => `擴充包安裝完成（${ver}），「PDF 轉 Word」已啟用。`,
    orgTitle: "視覺化頁面排版（點擊選取，拖曳或按 ← → 調整順序）",
    orgSelectAll: "全選",
    orgClearSel: "全不選",
    orgResetOrder: "重設順序",
    cancelling: "正在取消操作…",
    clearedAll: "已清除所有暫存結果。",
    stepProgress: (index: number, total: number, name: string, filePart: string) =>
      `步驟 ${index + 1}/${total}：${name}${filePart}`,
    singleProgress: (name: string, filePart: string) => `處理中：${name}${filePart}`,
    fileProgressPart: (fileIndex: number, fileTotal: number) =>
      `（檔案 ${fileIndex + 1}/${fileTotal}）`,
    noFonts: "找不到可用的字型，浮水印與頁碼無法使用。",
    gsMissing: "Ghostscript 缺失（壓縮／轉圖／修復無法使用）",
    qpdfMissing: "qpdf 缺失（加解密無法使用）",
    loMissing: "未偵測到 LibreOffice（Office 轉 PDF 無法使用）",
    pyextMissing: "未安裝擴充包（PDF 轉 Word 無法使用）",
    undoEmpty: "這一頁沒有可以移除的註記。",
    undoDone: "已移除最後加入的註記。",
    editorClosed: "已關閉編輯器，未儲存的變更已丟棄。",
    redactedSaved: (count: number) =>
      `已套用 ${count} 塊塗黑並完整重寫檔案，被塗掉的內容不會留在檔案裡。請在下方清單儲存。`,
    annotatedSaved: "已產生註記後的檔案，請在下方清單儲存。尚未存檔前只存在暫存區。",
  },
  en: {
    sub: "Files never leave this device. Temporary outputs are wiped immediately after saving or closing.",
    dropTitle: "Drop files here",
    dropOr: "or ",
    browse: "Browse files",
    summaryTitle: "Select Tools",
    chipsEmpty: "None selected",
    filterPlaceholder: "Search tools, e.g. Compress or Page",
    clear: "Clear",
    saveAll: "Save All…",
    cancel: "Cancel",
    run: "Run",
    running: "Processing…",
    openEditor: "Open Editor",
    saveOne: "Save…",
    planAddFiles: (accept: string) => `Add files first (accepts ${accept})`,
    planPickTools: "Files added — select tools to run",
    planNeedsTwo: "Merge requires at least 2 files",
    planOpenEditor: (name: string) => `Open editor for ${name}`,
    planReady: (count: number, chain: string) => `${count} file(s) · ${chain}`,
    acceptHint: (accept: string) => ` (Accepts ${accept})`,
    installPyext: "Import Extension (.zip)",
    installingPyext: "Verifying and installing extension pack…",
    installedPyext: (ver: string) => `Extension installed (${ver}). PDF to Word is now ready.`,
    orgTitle: "Visual Page Organizer (click to toggle, drag or use ← → to reorder)",
    orgSelectAll: "Select All",
    orgClearSel: "Clear Selection",
    orgResetOrder: "Reset Order",
    cancelling: "Cancelling…",
    clearedAll: "Cleared all temporary results.",
    stepProgress: (index: number, total: number, name: string, filePart: string) =>
      `Step ${index + 1}/${total}: ${name}${filePart}`,
    singleProgress: (name: string, filePart: string) => `Processing: ${name}${filePart}`,
    fileProgressPart: (fileIndex: number, fileTotal: number) =>
      ` (file ${fileIndex + 1}/${fileTotal})`,
    noFonts: "No system fonts found. Watermark and page numbers are unavailable.",
    gsMissing: "Ghostscript missing (compress/render/repair unavailable)",
    qpdfMissing: "qpdf missing (encrypt/decrypt unavailable)",
    loMissing: "LibreOffice not detected (Office to PDF unavailable)",
    pyextMissing: "Extension not installed (PDF to Word unavailable)",
    undoEmpty: "No annotations to undo on this page.",
    undoDone: "Removed the last annotation.",
    editorClosed: "Editor closed; unsaved changes were discarded.",
    redactedSaved: (count: number) =>
      `Applied ${count} redaction(s) and rewrote the PDF. Removed content is gone from the file. Save from the list below.`,
    annotatedSaved:
      "Annotated PDF generated in volatile temp storage. Save it from the list below.",
  },
};

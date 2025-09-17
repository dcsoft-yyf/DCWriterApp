// XML编码检测和解码函数
function detectAndDecodeXML(buffer) {
    // 检查BOM（字节顺序标记）
    const bytes = new Uint8Array(buffer);

    // 检查UTF-16 LE BOM (FF FE)
    if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) {
        return new TextDecoder('utf-16le').decode(buffer);
    }

    // 检查UTF-16 BE BOM (FE FF)
    if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
        return new TextDecoder('utf-16be').decode(buffer);
    }

    // 检查UTF-8 BOM (EF BB BF)
    if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
        return new TextDecoder('utf-8').decode(buffer);
    }

    // 尝试从XML声明中检测编码
    const firstBytes = bytes.slice(0, Math.min(100, bytes.length));
    const sampleText = new TextDecoder('utf-8').decode(firstBytes);

    // 查找XML声明中的编码
    const encodingMatch = sampleText.match(/encoding\s*=\s*["']([^"']+)["']/i);
    if (encodingMatch) {
        const encoding = encodingMatch[1].toLowerCase();
        try {
            return new TextDecoder(encoding).decode(buffer);
        } catch (e) {
            console.warn('无法使用检测到的编码解码，尝试UTF-8:', encoding);
        }
    }

    // 默认尝试UTF-8
    try {
        return new TextDecoder('utf-8').decode(buffer);
    } catch (e) {
        // 如果UTF-8失败，尝试UTF-16
        try {
            return new TextDecoder('utf-16').decode(buffer);
        } catch (e2) {
            console.error('无法解码XML文件');
            throw new Error('无法解码XML文件');
        }
    }
}

var TemplateList = [
    "Admission Record",
    "ADR and Incident Report Form",
    "CT Scanning Report",
    "Daily Progress Note",
    "Electronic Gastroscope Diagnosis and Treatment Report",
    "Fine Movement Function Measure（FMFM）",
    "Glasgow Coma Score",
    "Harris Hip Score",
    "Imaging Examination Application Sheet ",
    "List of Nursing Evaluation at Admission for Patient",
    "Medical Record",
    "Nursing Record",
    "Operation Schedule",
    "Pain Scale",
    "Pakinson Disease Non-Motor Symptom Scale",
    "PDQ39 Score",
    "Short Musculoskeletal Function Assessments（SMFA）",
    "The Awaiting Delivery Record",
    "The front page of medical records",
    "The Infectious Disease Report Card of PRC",
    "The Ultrasound Diagnosis",
    "WOMAC Score",
    "BigTable"
];


var templateBtn = document.getElementById('template-btn');
templateBtn && templateBtn.addEventListener('click', function () {
    showDialog();
});


function showDialog() {
    // Create dialog container (full-screen)
    const dialog = document.createElement('div');
    dialog.className = 'dc-dialog';
    dialog.style.position = 'fixed';
    dialog.style.top = '0';
    dialog.style.left = '0';
    dialog.style.width = '100%';
    dialog.style.height = '100%';
    // 让容器背景透明，避免面板滑入/滑出时出现整屏白底
    dialog.style.backgroundColor = 'transparent';
    dialog.style.zIndex = '1000';
    dialog.style.display = 'block';

    // Create main dialog content (full-screen sliding panel)
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dc-dialog-content';
    dialogContent.style.width = '100%';
    dialogContent.style.height = '100%';
    dialogContent.style.backgroundColor = '#ffffff';
    dialogContent.style.position = 'absolute';
    dialogContent.style.top = '0';
    dialogContent.style.left = '0';
    dialogContent.style.overflow = 'hidden';
    dialogContent.style.transform = 'translateX(-100%)';
    dialogContent.style.transition = 'transform 0.25s ease';
    dialogContent.style.willChange = 'transform';
    dialogContent.style.backfaceVisibility = 'hidden';
    dialogContent.style.transform = 'translateX(-100%) translateZ(0)';
    dialogContent.style.display = 'flex';
    dialogContent.style.flexDirection = 'column';

    // Create header
    const header = document.createElement('div');
    header.className = 'dc-dialog-header';
    header.style.padding = '20px 30px';
    header.style.borderBottom = '1px solid #E0E0E0';
    header.style.flexShrink = '0';

    const title = document.createElement('h2');
    title.className = 'dc-dialog-title';
    title.style.fontSize = '22px';
    title.style.fontWeight = 'bold';
    title.style.color = '#333333';
    title.style.margin = '0';
    title.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    title.textContent = 'Demo Documents';
    header.appendChild(title);

    // Create content area (split layout: left category, right list)
    const content = document.createElement('div');
    content.className = 'dc-dialog-content-area';
    content.style.flex = '1';
    content.style.overflow = 'hidden';
    content.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    content.style.display = 'flex';
    content.style.height = '100%';

    // Left sidebar - categories (blue)
    const sidebar = document.createElement('div');
    sidebar.className = 'dc-dialog-sidebar';
    sidebar.style.width = '280px';
    sidebar.style.backgroundColor = '#446995';
    sidebar.style.color = '#FFFFFF';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.padding = '16px 12px';
    sidebar.style.boxSizing = 'border-box';
    sidebar.style.height = '100%';
    sidebar.style.gap = '28px';

    // helper to create a sidebar button with svg icon
    function createSidebarButton(text, svgContent, onClick, isActive) {
        const btn = document.createElement('div');
        btn.className = 'dc-sidebar-button';
        btn.style.display = 'flex';
        btn.style.flexDirection = 'column';
        btn.style.alignItems = 'center';
        btn.style.gap = '12px';
        btn.style.padding = '14px 16px';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '16px';
        btn.style.fontWeight = '600';
        btn.style.letterSpacing = '0.5px';
        btn.style.color = '#FFFFFF';
        btn.style.userSelect = 'none';
        btn.style.transition = 'background-color 0.2s ease, opacity 0.2s ease';
        btn.style.backgroundColor = isActive ? 'rgba(255,255,255,0.12)' : 'transparent';
        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = 'rgba(255,255,255,0.2)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = isActive ? 'rgba(255,255,255,0.12)' : 'transparent';
        });
        const iconWrap = document.createElement('div');
        iconWrap.className = 'dc-sidebar-button-icon';
        iconWrap.style.display = 'flex';
        iconWrap.style.alignItems = 'center';
        iconWrap.style.justifyContent = 'center';
        iconWrap.style.color = '#FFFFFF';
        iconWrap.innerHTML = svgContent;
        const label = document.createElement('span');
        label.className = 'dc-sidebar-button-label';
        label.textContent = text;
        btn.appendChild(iconWrap);
        btn.appendChild(label);
        if (onClick) btn.addEventListener('click', onClick);
        return btn;
    }

    // SVG icons
    const svgBack = '<svg t="1755496903257" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21060" width="30" height="30"><path d="M910.222222 540.444444v455.111112H597.333333v-199.111112h-170.666666v199.111112H113.777778V512H0L512 28.444444l512 512h-113.777778zM142.222222 455.111111h28.444445v483.555556h199.111111v-199.111111h284.444444v199.111111h199.111111V483.555556h28.444445L512 113.777778 142.222222 455.111111z" fill="#FFFFFF" p-id="21061"></path></svg>';
    const svgGrid = '<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>';
    // const svgOpen = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h5l2 2h11v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M3 7V5a2 2 0 0 1 2-2h5l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

    // hidden file input for Open
    const hiddenFile = document.createElement('input');
    hiddenFile.className = 'dc-hidden-file-input';
    hiddenFile.type = 'file';
    hiddenFile.accept = '.xml';
    hiddenFile.style.display = 'none';
    document.body.appendChild(hiddenFile);
    hiddenFile.addEventListener('change', function () {
        var ctl = GetCurrentWriterControl();
        ctl.DCExecuteCommand("FileOpen", true, null);
    });

    // three buttons: Back, 全部模板, 打开
    const backBtn = createSidebarButton('Home', svgBack, () => closeDialog(), false);
    const allBtn = createSidebarButton('Documents', svgGrid, null, true);
    // const openBtn = createSidebarButton('打开', svgOpen, () => handleDCExecuteCommand('FileOpen'), false);

    sidebar.appendChild(backBtn);
    sidebar.appendChild(allBtn);
    // sidebar.appendChild(openBtn);

    // 底部分隔线，增强设计感
    const bottomDivider = document.createElement('div');
    bottomDivider.className = 'dc-sidebar-bottom-divider';
    bottomDivider.style.height = '1px';
    bottomDivider.style.background = 'rgba(255,255,255,0.35)';
    bottomDivider.style.width = '100%';
    bottomDivider.style.marginTop = 'auto';
    bottomDivider.style.borderRadius = '1px';
    bottomDivider.style.opacity = '0.9';
    sidebar.appendChild(bottomDivider);

    // Right side - main list area
    const mainArea = document.createElement('div');
    mainArea.className = 'dc-dialog-main-area';
    mainArea.style.flex = '1';
    mainArea.style.overflow = 'auto';
    mainArea.style.backgroundColor = '#FFFFFF';
    mainArea.style.boxSizing = 'border-box';
    mainArea.style.overflow = 'hidden';

    // Inner container to create pleasant whitespace and centered content
    const inner = document.createElement('div');
    inner.className = 'dc-dialog-inner-container';
    inner.style.maxWidth = '1080px';
    inner.style.margin = '0 auto ';
    inner.style.padding = '24px';
    inner.style.boxSizing = 'border-box';

    // Place the title on the right side inside inner container
    inner.appendChild(header);

    content.appendChild(sidebar);
    content.appendChild(mainArea);


    // Create template list
    const templateList = document.createElement('div');
    templateList.className = 'dc-template-list';
    templateList.style.padding = '0 24px 24px 24px';
    templateList.style.maxHeight = '700px';
    templateList.style.overflowY = 'auto';

    TemplateList.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'dc-template-list-item';
        listItem.style.padding = '12px 30px';
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';
        listItem.style.cursor = 'pointer';
        listItem.style.transition = 'background-color 0.2s ease';
        listItem.style.borderBottom = '1px solid #f0f0f0';

        // Add hover effect
        listItem.addEventListener('mouseenter', () => {
            listItem.style.backgroundColor = '#f5f5f5';
        });

        listItem.addEventListener('mouseleave', () => {
            listItem.style.backgroundColor = 'transparent';
        });

        // 加载XML文件
        listItem.addEventListener('click', async () => {
            fetch(`demoDocuments/${item}.xml`)
                .then(res => res.arrayBuffer())
                .then(buffer => {
                    // 检测XML编码并正确解码
                    const xmlContent = detectAndDecodeXML(buffer);
                    addNewTab(item, xmlContent);
                })
                .catch(error => {
                    console.error('获取XML文件失败:', error);
                });

            closeDialog();
        });

        // Left side - icon and name
        const leftSide = document.createElement('div');
        leftSide.className = 'dc-template-list-item-left';
        leftSide.style.display = 'flex';
        leftSide.style.alignItems = 'center';
        leftSide.style.gap = '12px';

        // Document icon
        const icon = document.createElement('div');
        icon.className = 'dc-template-list-item-icon';
        icon.style.width = '24px';
        icon.style.height = '24px';
        icon.style.backgroundColor = '#446995';
        icon.style.borderRadius = '3px';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.color = 'white';
        icon.style.fontWeight = 'bold';
        icon.style.fontSize = '12px';
        icon.textContent = '📄';

        // File name
        const fileName = document.createElement('div');
        fileName.className = 'dc-template-list-item-name';
        fileName.style.fontSize = '14px';
        fileName.style.color = '#333333';
        fileName.textContent = item;

        leftSide.appendChild(icon);
        leftSide.appendChild(fileName);

        listItem.appendChild(leftSide);
        templateList.appendChild(listItem);
    });

    inner.appendChild(templateList);
    mainArea.appendChild(inner);

    // 移除顶部绝对定位的 Back 按钮（已改为侧栏按钮）
    // Close dialog function (slide out to left)
    function closeDialog() {
        // 使用GPU合成减少重绘，避免白屏
        dialogContent.style.transform = 'translateX(-100%) translateZ(0)';
        const cleanup = () => {
            if (document.body.contains(dialog)) {
                document.body.removeChild(dialog);
            }
            dialogContent.removeEventListener('transitionend', cleanup);
        };
        dialogContent.addEventListener('transitionend', cleanup);
        // Fallback in case transitionend is not fired
        setTimeout(cleanup, 400);
    }

    // Assemble dialog
    // 右下角 Close 按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'dc-dialog-close-button';
    closeBtn.textContent = 'Close';
    closeBtn.style.position = 'absolute';
    closeBtn.style.right = '16px';
    closeBtn.style.bottom = '16px';
    closeBtn.style.padding = '8px 14px';
    closeBtn.style.backgroundColor = '#446995';
    closeBtn.style.color = '#FFFFFF';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '6px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '14px';
    closeBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    closeBtn.style.zIndex = '1001';
    closeBtn.addEventListener('mouseenter', () => { closeBtn.style.opacity = '0.9'; });
    closeBtn.addEventListener('mouseleave', () => { closeBtn.style.opacity = '1'; });
    closeBtn.addEventListener('click', closeDialog);

    dialogContent.appendChild(content);
    dialogContent.appendChild(closeBtn);
    dialog.appendChild(dialogContent);
    document.body.appendChild(dialog);

    // Trigger entrance animation (slide in from left)
    setTimeout(() => {
        dialogContent.style.transform = 'translateX(0) translateZ(0)';
    }, 10);
}
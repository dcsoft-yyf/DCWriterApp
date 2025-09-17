// 演示程序使用的JS
"use strict";

/**
 * 处理编辑器控件的显示快捷菜单事件
 */
function Handle_EventShowContextMenu(eventSender, args) {
    //console.log(eventSender);

    //let eventSender = GetCurrentWriterControl();

    //console.log("为 " + args.ElementType + "显示快捷菜单");
    //console.log(args);
    var typename = args.ElementType;
    if (typename != null && typename != "") {
        typename = typename.toLowerCase();
        var options = [
            {
                label: 'Undo',
                exec: () => {
                    console.log('撤销');
                    eventSender.DCExecuteCommand('Undo', false, null);
                },
            },
            {
                label: 'Redo',
                exec: () => {
                    console.log('重做');
                    eventSender.DCExecuteCommand('Redo', false, null);
                },
            },
            '-',
            {
                label: 'Copy(Ctrl+C)',
                exec: () => {
                    console.log('复制(Ctrl+C)');
                    eventSender.DCExecuteCommand('Copy', false, null);
                },
            },
            {
                label: 'Paste(Ctrl+V)',
                exec: () => {
                    eventSender.DCExecuteCommand('Paste', false, null);
                },
            },
            {
                label: 'Cut(Ctrl+X)',
                exec: () => {
                    eventSender.DCExecuteCommand('Cut', false, null);
                },
            },
            {
                label: 'CopyAsText',
                exec: () => {
                    eventSender.DCExecuteCommand('CopyAsText', false, null);
                },
            },
            {
                label: 'PasteAsText',
                exec: () => {
                    console.log('纯文本粘贴');
                    eventSender.DCExecuteCommand('PasteAsText', false, null);
                },
            },
            '-',
            {
                label: 'ElementProperties',
                exec: () => {
                    eventSender.DCExecuteCommand('ElementProperties', true, null);
                },
            },
        ];
        if (typename == "xtexttablecellelement") {//单元格
            var options2 = [
                '-',
                {
                    label: 'TableProperties',
                    exec: () => {
                        // //非只读模式下可以打开属性对话框
                        // if (eventSender.Readonly === false) {
                        eventSender.DCExecuteCommand("tableproperties", true, null);
                        // }

                    },
                },
                {
                    label: 'TableRowProperties',
                    exec: () => {
                        // //非只读模式下可以打开属性对话框
                        // if (eventSender.Readonly === false) {
                        eventSender.DCExecuteCommand("tablerowproperties", true, null);
                        // }
                    },
                },
                {
                    label: 'TableCellProperties',
                    exec: () => {
                        // //非只读模式下可以打开属性对话框
                        // if (eventSender.Readonly === false) {
                        eventSender.DCExecuteCommand("tablecellproperties", true, null);
                        // }
                    },
                },
                '-',
                {
                    label: 'TableRowAndColumn',
                    exec: () => {

                    },

                    subMenu: [
                        {
                            label: 'DeleteTableRow',
                            exec: () => {
                                eventSender.DCExecuteCommand("Table_DeleteRow", false, null);
                            },
                        },
                        {
                            label: 'DeleteTableColumn',
                            exec: () => {
                                eventSender.DCExecuteCommand("Table_DeleteColumn", false, null);
                            },
                        },
                        {
                            label: 'InsertTableRowUp',
                            exec: () => {
                                eventSender.DCExecuteCommand("Table_InsertRowUp", false, null);
                            },
                        },
                        {
                            label: 'InsertTableRowDown',
                            exec: () => {
                                eventSender.DCExecuteCommand("Table_InsertRowDown", false, null);
                            },
                        },
                        {
                            label: 'InsertTableColumnLeft',
                            exec: () => {
                                eventSender.DCExecuteCommand("Table_InsertColumnLeft", false, null);
                            },
                        },
                        {
                            label: 'InsertTableColumnRight',
                            exec: () => {
                                eventSender.DCExecuteCommand("Table_InsertColumnRight", false, null);
                            },
                        },
                    ]
                },

                '-',
                {
                    label: 'MergeTableCell',
                    exec: () => {
                        if (eventSender.Readonly === false) {
                            eventSender.DCExecuteCommand("Table_MergeCell", false, null);
                        };
                    },
                },
                {
                    label: 'SplitTableCell',
                    exec: () => {
                        if (eventSender.Readonly === false) {
                            eventSender.DCExecuteCommand("Table_SplitCellExt", true, null);
                        };
                    },
                },
                '-',
                {
                    label: 'SetTableCellGridline',
                    exec: () => {
                        // //非只读模式下可以打开属性对话框
                        // if (eventSender.Readonly === false) {
                        console.log('设置单元格网格线');
                        var cell = eventSender.CurrentTableCell();
                        if (cell != null) {
                            var settings = {
                                AlignToGridLine: "True", //文本行对齐到网格线
                                ColorValue: "#000000",  //网格线颜色
                                GridSpanInCM: 1,  //网格线之间的宽度
                                LineStyle: "Solid", //网格线样式
                                LineWidth: 1,  //网格线宽度
                                Printable: "True", //打印预览是否显示
                                Visible: "True", //网格是否显示
                            };
                            eventSender.cellGridlineDialog(settings, eventSender);
                        }
                        // };

                    },
                },
                {
                    label: 'SetTableCellSlantSplitLine',
                    exec: () => {
                        // //非只读模式下可以打开属性对话框
                        // if (eventSender.Readonly === false) {
                        console.log('设置单元格斜分线');
                        var cell = eventSender.CurrentTableCell();
                        if (cell != null) {
                            eventSender.cellDiagonalLineDialog(cell, eventSender);
                        };
                        // }
                    },
                },
                {
                    label: 'SetTableBorder',
                    exec: () => {
                        // //非只读模式下可以打开属性对话框
                        // if (eventSender.Readonly === false) {
                        eventSender.bordersShadingDialog();
                        // };
                    },
                },
                {
                    label: 'SetTableCellBorder',
                    exec: () => {
                        // //非只读模式下可以打开属性对话框
                        // if (eventSender.Readonly === false) {
                        eventSender.borderShadingcellDialog();
                        // };
                    },
                }
            ];

            options = options.concat(options2);
        }
        else {

        }
        ContextMenu(options, args, eventSender);

    }

    //return { eventSender,orgs }
};

/**
     * 开启右键菜单
     * @param {Array} options 右键菜单的所有配置
     * [
     *  {
     *  label: '全选',        //名称 
        icon: 'selectall',    //图标
        exec: () => {         //回调函数
            ctl.DCDCExecuteCommand('selectall', true, null)
        },
     *  }
     * ] 
     * @returns
     */
function ContextMenu(options, menuObj, rootElement) {
    if (options != null && Array.isArray(options)) {
        if (menuObj) {
            //获取到包裹元素
            var pageContainer = rootElement.querySelector('[dctype=page-container]');
            //判断是否为打印预览
            if (rootElement.IsPrintPreview()) {
                pageContainer = rootElement.querySelector('[dctype=page-printpreview]');
            }
            //判断是否存在dcContextMenu的元素
            var hasContextMenu = pageContainer.querySelector('#dcContextMenu');
            if (!hasContextMenu) {
                var meunDiv = document.createElement('div');
                meunDiv.setAttribute('id', 'dcContextMenu');
                pageContainer.appendChild(meunDiv);
                meunDiv.innerHTML = `<div class="dcMenu-line"></div>`;
                hasContextMenu = meunDiv;
                //判断是否有css
                var dcHead = document.head;
                //判断是否存在对应的css
                var hasContextMenuCss = dcHead.querySelector('#ContextMenuCss');
                if (!hasContextMenuCss) {
                    var newCssString = `
                    #dcContextMenu{
                        position: absolute;
                        margin: 0;
                        padding: 2px;
                        border-width: 1px;
                        border-style: solid;
                        background-color: #fafafa;
                        border-color: #ddd;
                        color: #444;
                        box-shadow: rgb(204, 204, 204) 2px 2px 3px;
                        min-width: 144px;
                        /* left: 8px;
                        top: 481.672px; 
                        overflow: hidden;*/
                        z-index: 110008;
                        display: none;
                    }
                    #dcContextMenu div.dcMenu-item:hover{
                        color: rgb(0, 0, 0);
                        border-color: rgb(183,210,255);
                        background: rgb(234,242,255);
                    }
                    #dcContextMenu .dcMenu-line{
                        position: absolute;
                        left: 26px;
                        top: 0;
                        height: 100%;
                        font-size: 1px;
                        border-left: 1px solid #ccc;
                        border-right: 1px solid #fff;
                    }
                    #dcContextMenu .dcMenu-item{
                        position: relative;
                        white-space: nowrap;
                        cursor: pointer;
                        margin: 0px;
                        padding: 0px;
                        font-size: 12px;
                        overflow: hidden;
                        border-width: 1px;
                        border-style: solid;
                        border-color: transparent;
                        box-sizing: content-box;
                    }
                    #dcContextMenu .dcMenu-item .dcMenu-text{
                        float: left;
                        padding-left: 28px;
                        padding-right: 20px;
                        font-size: 12px;
                    }

                    #dcContextMenu .dcMenu-icon{
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        left: 2px;
                        top: 50%;
                        margin-top: -8px;
                    }
                    #dcContextMenu .dcMenu-sep{
                        margin: 3px 0px 3px 25px;
                        font-size: 1px;
                        border-top: 1px solid #ccc;
                        border-bottom: 1px solid #fff;
                    }
                    #dcContextMenu .secondaryMenu{
                        position: absolute;
                        z-index: 110011;
                        margin: 0;
                        padding: 2px;
                        border-width: 1px;
                        border-style: solid;
                        border-color: #ddd;
                        min-width: 144px;
                        overflow: hidden;
                        display: none;
                        background-color: #fafafa;
                    }
                    #dcContextMenu .dcMenu-rightarrow {
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        right: 0;
                        top: 50%;
                        margin-top: -8px;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAZ0lEQVR42u2VMQ7AMAgD+f9XeYBHd+mA2IqrJFJ8EkMGrNiCJMIYY86Eh2otDYA7dNgq2/kLEEzwhxDGGrURQxGlN97gUUrxQCU9DM33ALjYQA0vlRGCcPEUjGxdgasfQX+DxphreAA2tk8BzQnbmgAAAABJRU5ErkJggg==) no-repeat -32px center;
                    }`;
                    var ContextMenuCss = document.createElement('style');
                    ContextMenuCss.setAttribute('id', 'ContextMenuCss');
                    dcHead.appendChild(ContextMenuCss);
                    ContextMenuCss.innerHTML = newCssString;

                    //页面滚动
                    pageContainer.addEventListener('scroll', function () {
                        var hasContextMenu = rootElement.querySelector('#dcContextMenu');
                        if (hasContextMenu) {
                            hasContextMenu.remove();
                        }
                    });
                    //丢失焦点
                    window.addEventListener('blur', function () {
                        var hasContextMenu = rootElement.querySelector('#dcContextMenu');
                        if (hasContextMenu) {
                            hasContextMenu.remove();
                        }
                    });
                }

            } else {
                //存在时，清空所有item和sep的元素
                var allItem = hasContextMenu.querySelectorAll('.dcMenu-item, .dcMenu-sep');
                for (var i = 0; i < allItem.length; i++) {
                    allItem[i].remove();
                }
            }
            /** 右键菜单的高度 */
            var containerHeight = 0;
            if (Array.isArray(options) && options.length > 0) {
                //根据options显示元素
                for (var option = 0; option < options.length; option++) {
                    if (typeof options[option] == 'object') {
                        var thisItem = insertItem(options[option], hasContextMenu, true);
                        //判断是否存在subMenu，如果需要更多可以使用递归调用
                        if (options[option].subMenu && Array.isArray(options[option].subMenu)) {
                            var secondaryMenu = document.createElement('div');
                            secondaryMenu.setAttribute('class', 'secondaryMenu');
                            secondaryMenu.innerHTML = `<div class="dcMenu-line"></div>`;
                            hasContextMenu.appendChild(secondaryMenu);
                            for (var meun = 0; meun < options[option].subMenu.length; meun++) {
                                insertItem(options[option].subMenu[meun], secondaryMenu, false);
                            }
                            var rightItem = document.createElement('div');
                            rightItem.setAttribute('class', 'dcMenu-rightarrow');
                            thisItem.appendChild(rightItem);
                            //添加事件
                            thisItem.addEventListener('mouseenter', function (e) {
                                //console.log(e)
                                //console.log($(e.target))
                                //找到下一个子元素
                                var targetEle = e.target.nextElementSibling;
                                targetEle.style.top = e.target.offsetTop + 'px';
                                targetEle.style.left = e.target.offsetLeft + e.target.offsetWidth + 'px';
                                targetEle.style.display = 'block';
                            });
                            thisItem.addEventListener('mouseleave', function (e) {
                                var targetEle = e.target.nextElementSibling;
                                targetEle.style.display = 'none';
                            });
                            secondaryMenu.addEventListener('mouseenter', function (e) {
                                var targetEle = e.target.previousElementSibling;
                                e.target.style.top = targetEle.offsetTop + 'px';
                                e.target.style.left = targetEle.offsetLeft + targetEle.offsetWidth + 'px';
                                e.target.style.display = 'block';
                            });
                            secondaryMenu.addEventListener('mouseleave', function (e) {
                                e.target.style.display = 'none';
                            });

                        }
                    } else if (typeof options[option] == 'string' && options[option] == '-') {
                        var sepEle = document.createElement('div');
                        sepEle.setAttribute('class', 'dcMenu-sep');
                        hasContextMenu.appendChild(sepEle);
                        containerHeight += 8;
                    }
                }
                var pageElement = menuObj.PageElement;
                //计算展示的高度
                /** 编辑器的滚动高度 */
                var minHeight = pageContainer.scrollTop;
                /** 编辑器的滚动高度 + 编辑器的可视高度 */
                var maxHeight = minHeight + pageContainer.clientHeight;
                containerHeight = containerHeight ? containerHeight + 6 : 0;
                /** 鼠标点击的顶部位置 */
                var cursorTop = pageElement.offsetTop + menuObj.Y;
                var cursorLeft = pageElement.offsetLeft + menuObj.X;
                // 整个右键菜单的高度超出编辑器的高度，则设置为编辑器的高度
                if (containerHeight > pageContainer.clientHeight) {
                    cursorTop = minHeight;
                    containerHeight = pageContainer.clientHeight;
                }
                // 修复右键菜单的高度超出编辑器的高度导致编辑器滚动条是否显示导致抖动的问题【DUWRITER5_0-3993】
                /** 右键菜单的最下方位置 */
                var menuLastHeight = cursorTop + containerHeight;
                // 计算最下方的距离是否够显示全
                if (menuLastHeight > maxHeight) {
                    // 下面显示不全
                    if ((maxHeight - cursorTop) > (cursorTop - minHeight)) {
                        // 点击位置距离下方的距离大于上方的距离
                        /** 右键菜单的超出高度 */
                        var ExcessiveHeight = menuLastHeight - maxHeight;
                        cursorTop -= ExcessiveHeight;
                    } else {
                        // 点击位置距离上方的距离大于下方的距离
                        cursorTop -= containerHeight;
                    }
                    if (cursorTop < minHeight) {
                        // 上面显示不全
                        cursorTop = minHeight;
                    }
                    menuLastHeight = cursorTop + containerHeight;
                }
                hasContextMenu.style.display = 'block';
                // hasContextMenu.style.overflowY = 'auto';
                hasContextMenu.style.height = containerHeight + 'px';
                hasContextMenu.style.left = cursorLeft + 'px';
                hasContextMenu.style.top = cursorTop + 'px';
                // [DUWRITER5_0-3305]右键菜单展示后最右侧的位置
                var rightHasSpacing = menuObj.X + hasContextMenu.clientWidth + 30;
                //如果右边距离不够
                if (rightHasSpacing > pageContainer.clientWidth) {
                    hasContextMenu.style.left = pageElement.offsetLeft + menuObj.X - hasContextMenu.clientWidth + 'px';
                }
            }
        }
    }

    //插入内部的item项
    function insertItem(options, hasContextMenu, needHeight) {
        if (typeof options == 'object') {
            var itemEle = document.createElement('div');
            itemEle.setAttribute('class', 'dcMenu-item');
            itemEle.style.cssText = 'height: 22px;line-height: 22px';
            hasContextMenu.appendChild(itemEle);
            itemEle.innerHTML = `
                <div class="dcMenu-text" style="height: 22px; line-height: 22px;">${options.label}</div>
                <div class="dcMenu-icon"></div>
            `;
            itemEle.addEventListener('mousedown', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            //itemEle.onclick
            itemEle.addEventListener('click', function () {
                // 右键菜单的点击事件不管是否成功，都需要删除右键菜单【DUWRITER5_0-2943】
                options.exec();
                var ContextMenuParentNode;
                if (hasContextMenu.className == "secondaryMenu") {
                    // 二级菜单需要删除一级菜单
                    ContextMenuParentNode = hasContextMenu.parentNode;
                }
                hasContextMenu.remove();
                if (ContextMenuParentNode) {
                    ContextMenuParentNode.remove();
                }
            });
            if (needHeight) {
                containerHeight += 24;
            }
            return itemEle;
        } else if (typeof options == 'string' && options == '-') {
            var sepEle = document.createElement('div');
            sepEle.setAttribute('class', 'dcMenu-sep');
            hasContextMenu.appendChild(sepEle);
            if (needHeight) {
                containerHeight += 24;
            }
            return sepEle;
        }
    }
}

/**
 * 处理动态下拉的方法
 * 只要触发此方法就表示为是该元素为动态下拉的操作
 * @param {HTMLDivElement} sender 编辑器控件
 * @param {object} args 事件参数，原型定义在WriterControl_DOMPackage.js文件中的QueryListItemsEventArgs类型。
 */
function WriterControl_QueryListItems(sender, args) {
    if (["dcprovince20240104", "dccity20240104", "dccounty20240104"].indexOf(args.ElementID) === -1) {
        console.log("很多应用程序会预先加载字典数据，如果已经缓存了字典数据，则可以使用QueryListItems事件来快速填充下拉列表,如果是异步加载下拉列表，则不要使用本事件，事件元素编号："
            + args.ElementID + "，获取的数据来源名称："
            + args.ListSourceName);
        args.AddResultItemByTextValue("汉族", "01");
        args.AddResultItemByTextValue("蒙古族", "02");
        args.AddResultItemByTextValue("回族", "03");
        args.AddResultItemByTextValue("藏族", "04");
        args.AddResultItemByTextValue("维吾尔族", "05");
        args.AddResultItemByTextValue("苗族", "06");
        args.AddResultItemByTextValue("彝族", "07");
        args.AddResultItemByTextValue("壮族", "08");
    }

}

/**
 * 处理编辑器控件的更新工具条按钮状态事件
 * @param {any} eventSender
 * @param {any} args
 */
function Handle_EventUpdateToolarState(eventSender, args) {
    function UpdateCommandUIElement(commandName, uiElement) {
        var info = GetCurrentWriterControl().GetCommandStatus(commandName);
        if (info.Supported == false) {
            // 系统不支持命令
            uiElement.style.backgroundColor = "red";
            uiElement.disabled = true;
        }
        else if (info.Enabled == false) {
            // 命令当前无效
            //uiElement.style.backgroundColor = "lightgray";
            uiElement.style.color = "#999999";
            uiElement.disabled = true;
        }
        else {
            uiElement.style.color = "";
            uiElement.disabled = false;
        }
        if (info.Checked == true) {
            // 命令处于勾选状态
            uiElement.style.border = "1px solid black";
        }
        else {
            uiElement.style.border = "";
        }
    }
    var elements = document.getElementsByTagName("A");
    for (var iCount = 0; iCount < elements.length; iCount++) {
        var element = elements[iCount];
        var cmdName = element.getAttribute("dccommandName");
        if (cmdName != null && cmdName.length > 0) {
            UpdateCommandUIElement(cmdName, element);
        }
    }
    console.log("更新工具条按钮状态");
};
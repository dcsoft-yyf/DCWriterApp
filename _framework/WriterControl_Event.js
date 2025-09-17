"use strict";

// DCWriter事件处理

import { WriterControl_Paint } from "./WriterControl_Paint.js";
import { WriterControl_DOMPackage } from "./WriterControl_DOMPackage.js";
import { DCTools20221228 } from "./DCTools20221228.js";
/**编辑器事件处理模块 */
export let WriterControl_Event = {
    /**
    * 触发事件
    * @param {string } strEventName 事件名称
    * @param {any} eventArgs 事件参数
    */
    InnerRaiseEvent: function (rootElement, strEventName, eventArgs) {
        if (typeof rootElement == "object" && rootElement.__PlayingAPILogRecord == true) {
            return;
        }
        if (strEventName == "OnLoad") {
            //在此处判断页面是否是否存在超过两个编辑器，如果存在对前一个显示的编辑器进行刷新操作
            if (typeof rootElement == "object") {
                var divWASM = rootElement.ownerDocument.querySelectorAll("[dctype='WriterControlForWASM']");
                if (divWASM && divWASM.length > 0) {
                    divWASM = Array.from(divWASM);
                    //只在最后一个div初始化的时候进行操作
                    if (divWASM[divWASM.length - 1] == rootElement) {
                        var hasLoadLast = false;
                        for (var icount = 0; icount < divWASM.length; icount++) {
                            var element = divWASM[icount];
                            //新增一个判断，客户存在未初始化编辑器的可能防止报错
                            if (element.AboutControl && element.getClientRects) {
                                var rects = element.getClientRects();
                                if (rects != null && rects.length != 0) {
                                    //if (element == rootElement) {
                                    //    divWASM.splice(icount, divWASM.length - icount);
                                    //    break;
                                    //} else {

                                    //}
                                    if (!hasLoadLast) {
                                        WriterControl_Task.AddCallbackForCompletedAllTasks(function () {
                                            for (var i = 0; i < divWASM.length; i++) {
                                                (function (thisWASM, index) {
                                                    setTimeout(function () {
                                                        if (typeof thisWASM.RefreshInnerView == "funciton") {
                                                            thisWASM.RefreshInnerView();
                                                        }
                                                    }, 100 * index)
                                                })(divWASM[i], i)
                                            }
                                        })
                                        hasLoadLast = true
                                    }
                                } else {
                                    divWASM.splice(icount, divWASM.length - icount);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (strEventName == "EventZoomChanged") {
            //处理多编辑器下自动缩放可能导致除了最后一个其他编辑器不能正常显示文本的问题
            if (typeof rootElement == "object" ) {
                WriterControl_Task.AddCallbackForCompletedAllTasks(function () {
                    //console.log(rootElement)
                    WriterControl_Paint.InvalidateAllView(rootElement);
                })
            }
        }
        // 内部处理事件
        if (WriterControl_Event.HandleDCWriterInnerEvent(rootElement, strEventName, eventArgs) == true) {
            return;
        }
        var handler = WriterControl_Event.InnerGetEventHandler(rootElement, strEventName);
        if (handler != null) {
            if (strEventName == "EventObjectElementMouseClick") {
                eventArgs.WriterControl = rootElement;
                eventArgs.GetElementProperties = function(){
                    return rootElement.GetElementProperties(eventArgs.ElementHashCode);
                };
            }
            if (DCTools20221228.ParseBoolean(rootElement.getAttribute("debugmode"), false) == true) {
                if (typeof (handler) == "function") {
                    handler.call(rootElement, rootElement, eventArgs);
                }
                else {
                    for (var iCount = 0; iCount < handler.length; iCount++) {
                        handler[iCount].call(rootElement, rootElement, eventArgs);
                    }
                }
            }
            else {
                var curFunc = null;
                try {
                    if (typeof (handler) == "function") {
                        curFunc = handler;
                        handler.call(rootElement, rootElement, eventArgs);
                    }
                    else {
                        for (var iCount = 0; iCount < handler.length; iCount++) {
                            curFunc = handler[iCount];
                            handler[iCount].call(rootElement, rootElement, eventArgs);
                        }
                    }
                }
                catch (ext) {
                    DCTools20221228.ConsoleWarring("执行编辑器{" + rootElement.id + "}的事件{" + strEventName + "}时发生错误:{" + ext + "}，相关代码为:");
                    console.error(curFunc);
                }
            }
            curFunc = null;
        }
    },
    /**获得事件处理函数对象
     * @param {string | Function} strEventName 事件名称
     * @returns { Function | Array} 事件处理函数对象，如果为多个函数则返回一个数组
     * 
     */
    InnerGetEventHandler: function (rootElement, strEventName) {
        var list = new Array();
        var func = window["WriterControl_" + strEventName];
        if (typeof (func) == "function") {
            // 获得全局性事件函数
            list.push(func);
        }
        func = rootElement[strEventName];
        if (typeof (func) == "function") {
            // 获得直接绑定的事件函数
            list.push(func);
        }
        else {
            // 按照属性名来获得事件函数
            var name2 = rootElement.getAttribute(strEventName);
            if (name2 != null && name2.length > 0) {
                if (typeof (window[name2]) == "function") {
                    list.push(window[name2]);
                }
                else {
                    try {
                        list.push(new Function(name2));
                    }
                    catch (ext) {
                        console.error("不是合法的JS语句:" + name2);
                    }
                }
            }
        }
        if (list.length == 0) {
            return null;
        }
        else if (list.length == 1) {
            return list[0];
        }
        else {
            return list;
        }
    },
    /**
     * 触发控件的快捷菜单事件
     * @param {string | HTMLElement} containerID 根元素
     * @param {number} intPageIndex 页码对象
     * @param {any} intX
     * @param {any} intY
     * @param {any} strElementTypeName
     */
    RaiseEventShowContextMenu: function (containerID, intPageIndex, intX, intY, strElementTypeName) {
        var rootElement = DCTools20221228.GetOwnerWriterControl(containerID);
        if (rootElement != null && rootElement.__PlayingAPILogRecord != true) {
            var page = WriterControl_Paint.GetCanvasElementByPageIndex(containerID, intPageIndex);
            rootElement.RaiseEvent(
                "EventShowContextMenu",
                {
                    ControlElement: rootElement,
                    PageIndex: intPageIndex,
                    PageElement: page,
                    X: intX,
                    Y: intY,
                    ElementType: strElementTypeName
                });
        }
    },
    /**
     * 处理内部事件
     * @param {string} containerID 容器元素编号
     * @param {string} strEventName 事件名称
     * @param {any} parameter 参数
     * @returns {boolean} true:事件得到处理了，无需后续处理。false:事件没处理，需要后续处理。
     */
    HandleDCWriterInnerEvent: function (containerID, strEventName, parameter) {
        var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
        if (ctl == null || ctl.__PlayingAPILogRecord == true) {
            return false;
        }
        //wyc20230518:对按钮元素追加执行前端脚本操作
        if (strEventName == "EventButtonClick"
            && parameter != null
            && parameter.ButtonElementID != null
            && parameter.ButtonElementID.length > 0) {
            // 2024-6-2 yyf 改进接口代码
            var strScript = parameter.ScriptTextForClick;// ctl.__DCWriterReference.invokeMethod("GetButtonScriptTextClick",parameter.ButtonElementID);
            if (strScript != null && strScript.length > 0) {
                var jscode = strScript;
                try {
                    if (window.execScript) {
                        window.execScript(jscode);
                    } else {
                        window.eval(jscode);
                    }
                }
                catch (ext) {
                    DCTools20221228.ConsoleWarring("执行按钮脚本错误{" + ext + "}，脚本为：" + jscode);
                }
            }
        }
        // 元素双击事件
        if (strEventName == "EventElementMouseDblClick" && parameter) {
            // 双击特定元素弹出属性对话框
            var strTypeName = parameter.ElementTypeName;
            var ele = parameter.TargetElement;
            switch (strTypeName) {
                case "XTextNewMedicalExpressionElement":// 医学表达式
                    var options = ctl.GetElementProperties(ele);
                    if (options) {
                        // let inputNode = ctl.CurrentElement("xtextinputfieldelement");
                        // 判断视图是否为只读模式
                        // wyc20250519:排除严格表单，否则会定位错误元素DUWRITER5_0-3966
                        // wyc20250702:修复DUWRITER5_0-4578 && (ctl.FormView() !== "Strict" || inputNode != null)
                        if (ctl.Readonly === false) {
                            if (options.ContentReadonly != true && options.ContentReadonly != "True" && options.ContentReadonly != "true") {
                                // [DUWRITER5_0-4278] 20250327 修改双击医学表达式时，打开对应的医学表达式编辑对话框
                                ctl.DCDispatchMedicalExpressionExecuteCommand(options, false, ele);
                            }
                        }
                    }

                    break;
                case "XTextImageElement":// 图片
                    var options = ctl.GetElementProperties(ele);
                    if (options) {
                        //判断视图是否为只读模式
                        if (ctl.Readonly === false) {
                            if (options.ContentReadonly != true && options.ContentReadonly != "True" && options.ContentReadonly != "true") {
                                if (options.EnableEditImageAdditionShape) { //判断图片是否允许编辑
                                    ctl.imgEditDialog(options, ctl);
                                }
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return false;
    },
    /**
     * 判断是否存在指定名称的属性
     * @param {string} containerID 容器元素对象编号
     * @param {string} strEventName 事件名称
     * @returns {boolean} 是否存在属性
     */
    HasControlEvent: function (containerID, strEventName) {
        if (strEventName == "EventElementMouseDblClick" || strEventName == "EventButtonClick") {
            return true;
        }
        var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
        if (ctl != null && ctl.__PlayingAPILogRecord != true) {
            return WriterControl_Event.InnerGetEventHandler(ctl, strEventName) != null;
        }
        return false;
    },
    /**
     * 触发指定名称的属性
     * @param {string} containerID 容器元素对象编号
     * @param {string} strEventName 事件名称
     * @param {Any} args 事件参数
     * @param {string} argsTypeName 参数类型名称
     */
    RaiseControlEvent: function (containerID, strEventName, args, argsTypeName) {
        var ctl = DCTools20221228.GetOwnerWriterControl(containerID);
        if (ctl != null && ctl.__PlayingAPILogRecord != true) {
            var runtimeArgs = WriterControl_DOMPackage.CreatePackage(ctl, args, argsTypeName);
            WriterControl_Event.InnerRaiseEvent(ctl, strEventName, runtimeArgs);
        }
    },
};
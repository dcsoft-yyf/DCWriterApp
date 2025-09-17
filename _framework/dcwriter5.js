//
// 2023-8-1
// Fifth-generation WEB editor startup script
// Nanjing Duchang Information Technology Co., Ltd.
// When used with the 5th generation file publisher DCWriter5FileDownload, any changes to this file that cause the file modification time to change
// will cause the browser to automatically re-download all program files (WSAM/DLL/GZ), etc., without needing to clear the browser cache.
//
"use strict";
(function () {
    if (window.__DCWriter5Started == true) {
        // Avoid repeated calls
        return;
    }
    window.__DCWriter5Started = true;
    window.__DCWriter5FullLoaded = false;
    var strAppVersion = "$$version$$";
    window.strAppVersion = strAppVersion;
    // Get resource base path
    var strBasePath = "_framework/";
    var bolDebugMode = false;
    var strServicePageUrl = null;
    var requestDLLUsingBase64 = false;
    var bolIFrameMode = false; // Whether running in IFrame mode
    function ConverToBoolean(strValue, bolDefaultValue) {
        if (strValue == null || strValue.length == 0) return bolDefaultValue;
        strValue = strValue.trim().toLowerCase();
        if (strValue == "true") return true;
        if (strValue == "false") return false;
        return bolDefaultValue;
    };

    if (document.currentScript != null) {
        //debugger;
        bolDebugMode = ConverToBoolean(document.currentScript.getAttribute("debugmode"), false);
        bolIFrameMode = ConverToBoolean(document.currentScript.getAttribute("iframemode"), false);
        strBasePath = document.currentScript.getAttribute("src");
        strServicePageUrl = document.currentScript.getAttribute("servicepageurl");
        // if (!strBasePath && !strServicePageUrl && window._DCWriter5SpecifyBasePath && window._DCWriter5SpecifyServicePageUrl) {
        //     strBasePath = window._DCWriter5SpecifyBasePath; // Try to set the editor program file download base path
        //     strServicePageUrl = window._DCWriter5SpecifyServicePageUrl; // Try to set the server page address path
        // }
        // Judge the two attributes separately to avoid impact
        if (!strBasePath && window._DCWriter5SpecifyBasePath) {
            strBasePath = window._DCWriter5SpecifyBasePath; // Try to set the editor program file download base path
        }
        if (!strServicePageUrl && window._DCWriter5SpecifyServicePageUrl) {
            strServicePageUrl = window._DCWriter5SpecifyServicePageUrl; // Try to set the server page address path
        }
    }
    else {
        // In a microservice-like front-end framework, this JS code is not referenced via <script src="xxx">, but executed via eval() in the main window,
        // at this time document.currentScript is invalid, user needs to specify information
        strBasePath = window._DCWriter5SpecifyBasePath; // Try to set the editor program file download base path
        strServicePageUrl = window._DCWriter5SpecifyServicePageUrl; // Try to set the server page address path
    }
    if (strBasePath != null && strBasePath.length > 0) {
        ////wyc20240828: Use special request flag DUWRITER5_0-3459
        if (strBasePath.indexOf("&dcloaddllusingbase64=1") >= 0) {
            strBasePath = strBasePath.replace("&dcloaddllusingbase64=1", "");
            requestDLLUsingBase64 = true;
        }
        var index = strBasePath.lastIndexOf("?");
        if (index > 0) {
            strServicePageUrl = strBasePath.substring(0, index).trim();
        }
        else {
            index = strBasePath.lastIndexOf("/");
            if (index < 0) {
                index = strBasePath.lastIndexOf("\\");
            }
            if (index < 0) {
                strBasePath = "./";
            }
            else {
                strBasePath = strBasePath.substring(0, index) + "/";
            }
        }
        strBasePath = strBasePath.trim();
        if( strBasePath.substr( 0 , 2 ) == "./" )
        {
            strBasePath = strBasePath.substr( 2 );
        }
    }
    else {
        // Use default path
        strBasePath = "_framework/";
    }
    window.strBasePath = strServicePageUrl;
    if (strServicePageUrl != null && strServicePageUrl.length > 0) {
        var index5 = strServicePageUrl.indexOf("?");
        if (index5 > 0) {
            strServicePageUrl = strServicePageUrl.substring(0, index5);
        }
    }
    if (strServicePageUrl != null && strServicePageUrl.length > 0) {
        console.info("DCWriter5 global server page address:" + strServicePageUrl);
        window.__DCWriterServicePageUrl = strServicePageUrl;
    }
    else {
        console.info("DCWriter5 base path:" + strBasePath);
    }
    if (bolIFrameMode == true) {
        // Running in IFrame mode
        if (window.top.__DCWriter5SrcWindow20250912 == null
            || window.top.__DCWriter5SrcWindow20250912.SrcWindow == window) {
            // Not initialized yet
            window.top.__DCWriter5SrcWindow20250912 = new Object();
        }
        else {
            console.warn("DCWriter5 is running in iframe mode, this mode is prone to errors and is not recommended.");
            var package2 = window.top.__DCWriter5SrcWindow20250912;
            window.WriterControl_Main = package2.WriterControl_Main;
            window.WriterControl_Paint = package2.WriterControl_Paint;
            window.WriterControl_UI = package2.WriterControl_UI;
            window.WriterControl_Task = package2.WriterControl_Task;
            window.WriterControl_Rule = package2.WriterControl_Rule;
            window.WriterControl_Event = package2.WriterControl_Event;
            window.DCTools20221228 = package2.DCTools20221228;
            window.WriterControl_Dialog = package2.WriterControl_Dialog;
            window.WriterControl_DOMPackage = package2.WriterControl_DOMPackage;
            window.CreateWriterControlForWASM = package2.WriterControl_Main.CreateWriterControlForWASM;
            //window.CreateTemperatureControlForWASM = WriterControl_Main.CreateWriterControlForWASM;
            window.WriterControl_EF = package2.WriterControl_EF;
            window.DisposeDCWriterDocument = package2.WriterControl_API.DisposeDCWriterDocument;
            window.DotNet = package2.DotNet;
            // Entry point assembly name
            window.DCWriterEntryPointAssemblyName = package2.DCWriterEntryPointAssemblyName;
            window.DCWriterStaticInvokeMethod = package2.DCWriterStaticInvokeMethod;
            window.__DCWriter5FullLoaded = true;
            return;
        }
    }
    var jsScript = document.createElement("script");
    jsScript.setAttribute("language", "javascript");
    var strEnvironment = "";
    var strResourceBasePath = strBasePath;
    if (strServicePageUrl != null && strServicePageUrl.length > 0) {
        var strFlag = strServicePageUrl + "@" + window.location.origin;
        var totalValue = 0;
        for (var iCount = 0; iCount < strFlag.length; iCount++) {
            totalValue += strFlag.charCodeAt(iCount);
        }
        for (var iCount = 0; iCount < strFlag.length; iCount += 2) {
            totalValue += strFlag.charCodeAt(iCount);
        }
        for (var iCount = 1; iCount < strFlag.length; iCount += 2) {
            totalValue += strFlag.charCodeAt(iCount) * strFlag.charCodeAt(iCount - 1);
        }
        strResourceBasePath = strServicePageUrl + "?wasmres={0}&ver=" + strAppVersion + "&flag=" + totalValue + "&wasmrootpath=" + encodeURIComponent(strServicePageUrl);
        jsScript.src = strResourceBasePath.replace("{0}", "blazor.webassembly.js");
    }
    else {
        jsScript.src = strResourceBasePath + "blazor.webassembly.js";
    }
    if (window.__DCResourceBasePath == null) {
        window.__DCResourceBasePath = strResourceBasePath;
    }
    //jsScript.src = "_framework/blazor.webassembly.js";
    /*if (strServicePageUrl != null && strServicePageUrl.length > 0) {
        jsScript.src = strServicePageUrl + "?ver=" + strAppVersion + "&wasmrootpath=" + strServicePageUrl + "&wasmres=blazor.webassembly.js";
        strEnvironment = strServicePageUrl + "?ver=" + strAppVersion + "&wasmrootpath=" + strServicePageUrl + "&wasmres=";
    }
    else {
        jsScript.src = strBasePath + "blazor.webassembly.js";
        strEnvironment = strBasePath;
    }*/
    strEnvironment = strResourceBasePath;

    // Here check if it is below chrome 71
    var UserAgent = navigator.userAgent.toLowerCase();
    // If it is chrome
    if (UserAgent.indexOf('chrome') > -1) {
        var versions = parseInt(UserAgent.match(/chrome\/([\d.]+)/)[1]);
        if (versions < 71) {
            if (typeof self !== "undefined") {
                window.globalThis = self;
            } else if (typeof window !== "undefined") {
                window.globalThis = window;
            } else if (typeof global !== "undefined") {
                window.globalThis = global;
            }
            if (!window.globalThis) {
                throw new Error("unable to locate global object");
            }
        }
    }
    // Fix the conflict between nw.js and WASM, rename the global variable process before Blazor loads
    var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
    if (ENVIRONMENT_IS_NODE) {
        globalThis.__process = globalThis.process;
        delete globalThis.process;
    }
    /**
     * Check the minimum browser version, if the condition is not met, display a prompt and throw an exception
     * @param {number} runtimeVersion The runtime version, can be 7, 8, 9
     */
    function CheckBorwserMinVersion(runtimeVersion) {
        // Here check whether the browser version meets the minimum requirements
        // Need to check Chrome, Firefox, and Safari
        // May also need to test some conditions of the operating system.
        // The judgment conditions come from the test results of the test group.
        if (typeof (runtimeVersion) != "number") return;
    }
    jsScript.setAttribute("autostart", "false");
    jsScript.onload = function () {
        CheckBorwserMinVersion(window.__DCRuntimeVersion);
        Blazor.start({
            environment: strEnvironment,
            //configureRuntime: dotnet => { dotnet.withRuntimeOptions(["--memory-profiler"]); dotnet.withDebugging(true); },
            loadBootResource: function (type, name, defaultUri, integrity) {
                //if (type === 'pdb') {
                //    return `${defaultUri}`;
                //}
                if (name == 'blazor.boot.json') {
                    // Support for micro front-end framework MicroApp
                    if (window.__MICRO_APP_WINDOW__) {
                        __MICRO_APP_WINDOW__.document.defaultView.Blazor = window.Blazor;
                        __MICRO_APP_WINDOW__.document.defaultView.DotNet = window.DotNet;
                        if (window.rawWindow) {
                            window.rawWindow.Blazor = window.Blazor;
                            window.rawWindow.DotNet = window.DotNet;
                        }
                    }
                }
                // Support for micro front-end framework QianKun
                if (window.__POWERED_BY_QIANKUN__) {
                    window.document.defaultView.Blazor = window.Blazor;
                    window.document.defaultView.DotNet = window.DotNet;
                }
                var strRuntimeUrl = null;
                if (strResourceBasePath.indexOf("{0}") > 0) {
                    strRuntimeUrl = strResourceBasePath.replace("{0}", name);
                }
                else {
                    strRuntimeUrl = strResourceBasePath + name;
                }
                //if (name.indexOf(".dll") >= 0) {
                //    strRuntimeUrl = strRuntimeUrl.replace(name, name + ".gz");
                //}
                //var strRuntimeUrl = defaultUri;
                //if (strServicePageUrl != null && strServicePageUrl.length > 0) {
                //    strRuntimeUrl = strServicePageUrl + "?ver=" + strAppVersion + "&wasmrootpath=" + strServicePageUrl + "&wasmres=" + name;
                //}
                //else if (strBasePath != null && strBasePath.length > 0) {
                //    // Enable custom download path
                //    strRuntimeUrl = strBasePath + name;
                //}
                //console.log(strRuntimeUrl);
                if (bolDebugMode == true) {
                    console.log("DCWriter5 loading resource:" + strRuntimeUrl);
                }
                if (type != "dotnetjs"
                    && name != "blazor.boot.json"
                    && strServicePageUrl != null
                    && strServicePageUrl.length > 0) {
                    // If using server page, enable local cache

                    //wyc20240828: Hide wasmres remote request url info DUWRITER5_0-3459
                    //debugger;
                    var strs2 = strRuntimeUrl;
                    if (requestDLLUsingBase64 === true) {
                        var strs = strRuntimeUrl.split('?');
                        strs2 = strs[0] + "?wasmres=" + window.btoa(strs[1]);
                    }
                    var promise = fetch(
                        strs2, {
                        method: "GET",
                        credentials: "include",
                        cache: "default"
                    });
                    //if (promise instanceof Promise) {
                    if (promise != null && promise.constructor.name === 'Promise') {
                        return promise;
                    } else {
                        return strRuntimeUrl;
                    }
                }
                else {
                    return strRuntimeUrl;
                }
            }
        }).then(function () {
            // Fix the conflict between nw.js and WASM, restore the global variable process after Blazor starts
            globalThis.process = globalThis.__process;
            delete globalThis.__process;
        });
    };
    document.head.appendChild(jsScript);
})();
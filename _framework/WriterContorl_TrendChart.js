import { d3 } from "./WriterControl_DrawD3.js";

export let WriterControl_TrendChart = {
    //创建接口
    CreateTrendChart: function (rootElement, newOptions) {
        //初始化判断是否存在TrendChartSvg
        if (rootElement.TrendChartSvg == null) {
            rootElement.TrendChartSvg = {};

        }
        //初始化options
        WriterControl_TrendChart.TrendChartDefaultAttributes(rootElement, newOptions);
        //开始进行计算
        WriterControl_TrendChart.DataCalculationFun(rootElement);
        //绘制svg元素
        WriterControl_TrendChart.CreateSvgElement(rootElement);
        //绘制网格线
        WriterControl_TrendChart.DrawGridlines(rootElement);
        //绘制y轴
        WriterControl_TrendChart.DrawYAxis(rootElement);
        //绘制点
        WriterControl_TrendChart.DrawPoint(rootElement);
        //绘制文本标签
        WriterControl_TrendChart.DrawTextLabel(rootElement);
        //创建完成以后转成图片插入到当前单元格
        WriterControl_TrendChart.CreateTrendChartImage(rootElement);
        return;
    },

    //定义默认元素
    TrendChartDefaultAttributes(rootElement, newValue) {
        //判断是否存在svg元素
        if (!rootElement.TrendChartSvg.Options) {
            rootElement.TrendChartSvg.Options = {
                Default: { //基础属性
                    width: 0, //宽度
                    height: 0, //长度
                    horizontalDivisionNum: 14, //横向分割数
                    leftYAxisSpace: 139, //左侧Y轴空白区域
                    rightYAxisSpace: 0, //右侧侧Y轴空白区域
                    chronologicalOrder: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7], //x轴时间顺序
                    timeDivisionNum: 2, //垂直分割数
                    //2025-7-29 新增横竖线的颜色属性
                    verticalLineColor: "#000000",
                    horizontalLineColor: "#000000",//"#6abcbc"
                    //date: "", //日期
                },
                YAxis: [  //Y轴属性(可以存在多个Y轴)
                    // {
                    //     id: "ceshi111",  //唯一标记
                    //     legendColor: "blue", //图例颜色
                    //     legendSize: "",  //图例大小
                    //     legendStyle: "", //图例样式
                    //     title: "", //标题
                    //     titleColor: "blue", //标题颜色
                    //     titleVisible: "", // 标题可见
                    //     rightShow: false, // boolean 是否右侧显示
                    //     axisType: "point", //text point  y轴类型 (可以不需要)
                    //     axisVisible: true, // boolean y轴是否展示
                    //     axisColor: "", //y轴颜色
                    //     axisStartValue: 0, //y轴起始值
                    //     axisEndValue: 100,//y轴结束值
                    //     scaleDivisionNum: 14, //刻度分割数
                    //     startValueOffset: 1, //起始值偏移量
                    //     endValueOffset: 1,//结束值偏移量
                    //     customScale: [],//自定义刻度
                    //     customHeightProportion: 0.2, //自定义高度比例
                    //     customHeightScale: [], //自定义高度刻度
                    //     style: {}, //文本轴样式
                    //     breakpointConnected: false, //断点是否连线
                    //     //2025-7-29 新增保留小数位数的属性
                    //     axisKeepDecimalPlaces: 2,
                    //     //2025-8-6 新增属性
                    //     // "valueStyle": "text", //新增一个属性用于设置数据值显示样式，默认为value,可选text。
                    //     // "yAxisVisible": false,//左侧Y轴刻度是否显示,y轴为文本时不会自动隐藏，需要把这个属性设置为false。
                    // }
                ],
                Labels: [
                    {
                        left: 0,                                     //左偏移         
                        top: 0,                                      //上偏移                   
                        text: "文本框1111",                              //文本           
                        alignment: "Center",                         //水平对齐方式   
                        lineAlignment: "Center",                     //垂直对齐方式   
                        textFontName: "宋体",                        //字体名        
                        textFontSize: 9,                             //字体大小       
                        textFontBold: false,                         //文本加粗       
                        textFontItalic: false,                       //文本倾斜       
                        textFontUnderline: false,                    //文本下划线   
                        "legendStyle": "Cross",                    //文本图标 
                        "legendColor": "",                         //文本图标颜色
                        "legendSize": 3,                           //文本图标大小
                    }
                ],
                Data: { //数据
                    "ceshi111": [
                        {
                            time: "08:20",
                            value: "60",
                            text: "",
                        },
                    ],
                    "wenben": [
                        {
                            "time": "20:45",
                            "value": 100,
                            "text": "改过克发",                        //同一个时间区域内建议客户只给一个文本，趋势图不会将多个文本合并显示
                            "textFontSize": 12,                       //字体大小的值，大于格子宽高的最小值，则无效
                            "textFontColor": "#0000FF",             //字体颜色
                            "textFontName": "宋体",                    //字体名称
                        }
                    ]

                },
                TimeScale: {  //时间刻度
                    startTime: "",//起始时间
                    endTime: "", //结束时间
                    scaleColor: "", //刻度颜色
                }
            };
        }
        if (typeof newValue === "object") {
            for (var i in newValue) {
                if (newValue.hasOwnProperty(i)) {
                    rootElement.TrendChartSvg.Options[i] = newValue[i];
                }
            }
        }



        return rootElement.TrendChartSvg.options;
    },

    //进行数据计算
    DataCalculationFun: function (rootElement) {
        console.log("DataCalculationFun");
        //拿到opt
        var opts = rootElement.TrendChartSvg.Options;
        var infos = rootElement.TrendChartSvg.SvgDataInfos;
        if (infos == null) {
            infos = rootElement.TrendChartSvg.SvgDataInfos = {
                top: 0, //定位
                left: 0, //定位
                width: opts.Default.width, //宽度
                height: opts.Default.height, //高度
                columnIndex: [], //垂直坐标
                rowIndex: [], //水平坐标
                stepColumnNumber: 0, //垂直网格线之间的距离
                stepRowNumber: 0, //水平网格线之间的距离
                textlableHeight: 12, //文本展示高度
                verticalBand: [], //垂直分割坐标
                verticalText: [], //垂直分割值
                verticalDivisionNum: 0, //垂直分割数
                horizontalBand: [], //水平分割坐标
                horizontalText: [], //水平分割值
                yAxis: {
                    "ceshi111": {
                        //id: "", // id
                        //top: 0, //垂直起始位置
                        //bottom: 0, //垂直结束位置
                        //left: 0, //水平位置
                        //stepYValue: 0, //数据间隔
                        //stepYValueArr: [], //数据值
                        //stepHeight: 0, //步进高度
                    }
                }, //y轴相关属性
            };
        }

        //拿到当前单元格属性
        var targetCell = rootElement.CurrentTableCell();
        if (targetCell != null) {
            targetCell = rootElement.GetElementProperties(targetCell);
            //找到目标canvas元素
            var targetCanvas = rootElement.PageContainer.querySelectorAll("canvas")[targetCell.OwnerPageIndex];
            //计算此处的位置
            infos.top = parseFloat((targetCell.TopInOwnerPage / 300 * 96.00001209449).toFixed(2)) + targetCanvas.offsetTop + 3;
            infos.left = parseFloat((targetCell.LeftInOwnerPage / 300 * 96.00001209449).toFixed(2)) + targetCanvas.offsetLeft;


            //判断是否存在宽度
            if (opts.Default.width == 0 || opts.Default.height == 0) {
                if (!rootElement.__DCWriterReference.invokeMethod("HasSelection")) {
                    //自己计算宽度
                    rootElement.SelectCurrentElement();
                }

                var allSelectCell = rootElement.GetSelectTableAndCell();
                //找到开始和结束两个
                //var firstCell = allSelectCell[0];
                var lastCell = allSelectCell[allSelectCell.length - 1];
                lastCell = rootElement.GetElementProperties(lastCell.CellNativeHandle);

                infos.width = parseFloat(((lastCell.LeftInOwnerPage + lastCell.Width - targetCell.LeftInOwnerPage) / 300 * 96.00001209449).toFixed(2));
                infos.height = parseFloat(((lastCell.TopInOwnerPage + lastCell.Height - targetCell.TopInOwnerPage) / 300 * 96.00001209449).toFixed(2)) + 1;
            }
        }

        infos.columnIndex = [];
        var verticalDivisionNum = infos.verticalDivisionNum = opts.Default.chronologicalOrder.length * opts.Default.timeDivisionNum;
        //console.log(verticalDivisionNum)
        //计算垂直线的位置
        var stepColumnNumber = infos.stepColumnNumber = parseFloat(((infos.width - opts.Default.leftYAxisSpace - opts.Default.rightYAxisSpace) / verticalDivisionNum).toFixed(2));
        //自此出拆分水平坐标
        opts.Default.chronologicalOrder.forEach((item, index) => {
            var nextText = opts.Default.chronologicalOrder[index + 1];
            if (nextText == null) {
                nextText = opts.Default.chronologicalOrder[0];
            }
            if (nextText == 0) {
                nextText = 24;
            }
            var step = (nextText - item) / opts.Default.timeDivisionNum;
            for (var i = 0; i < opts.Default.timeDivisionNum; i++) {
                infos.horizontalText.push(item + (i * step));
            }
            if (index == opts.Default.chronologicalOrder.length - 1) {
                infos.horizontalText.push(nextText - 0.01);
            }
        });
        for (var i = 0; i <= verticalDivisionNum; i++) {
            infos.columnIndex.push(stepColumnNumber * i + opts.Default.leftYAxisSpace);
        }
        infos.rowIndex = [];
        //计算水平线的位置
        var stepRowNumber = infos.stepRowNumber = parseFloat((infos.height / opts.Default.horizontalDivisionNum).toFixed(2));
        for (var i = 0; i <= opts.Default.horizontalDivisionNum; i++) {
            infos.rowIndex.push(stepRowNumber * i);
        }
    },

    //创建svg元素
    CreateSvgElement: function (rootElement) {
        var infos = rootElement.TrendChartSvg.SvgDataInfos;
        var svg = d3
            .create('svg')
            .attr('dctype', 'TrendChartPage')
            .attr('width', infos.width)
            .attr('height', infos.height)
            .attr('native-width', infos.width)
            .attr('native-height', infos.height)
            .attr('style', ``);
        var thisSvgEle = svg.node();
        //定位到页面位置中
        //获取到编辑器页面的offsetTop,和offsetLeft
        thisSvgEle.style.background = "#ffffff";
        thisSvgEle.style.position = "absolute";
        thisSvgEle.style.border = "1px solid #000000";
        thisSvgEle.style.boxSizing = "border-box";
        thisSvgEle.style.zIndex = "0";
        thisSvgEle.style.top = "-100000px";
        thisSvgEle.style.left = "-100000px";
        rootElement.appendChild(thisSvgEle);
        rootElement.TrendChartSvg.SvgNode = thisSvgEle;
        rootElement.TrendChartSvg.D3SvgNode = {
            MainSvg: svg
        };
    },

    //绘制网格线
    DrawGridlines: function (rootElement) {
        var opts = rootElement.TrendChartSvg.Options;
        var infos = rootElement.TrendChartSvg.SvgDataInfos;
        var trendChartBgLine = rootElement.TrendChartSvg.D3SvgNode.MainSvg.append('g')
            .attr('dctype', "trendChartBgLine");
        rootElement.TrendChartSvg.D3SvgNode.TrendChartBgLine = trendChartBgLine;
        //计算所需要的线条
        var verticalData = [...new Array(infos.columnIndex.length).keys()];
        //开始绘制线条
        var trendChartVerticalLine = trendChartBgLine.append('g')
            .attr("dctype", "trendChartVerticalLine")
            .selectAll('line')
            .data(verticalData)
            .join('line')
            .attr('x1', (d, i) => {
                //自此出报错垂直线坐标
                infos.horizontalBand.push(infos.columnIndex[i]);
                return infos.columnIndex[i];
            })
            .attr('x2', (d, i) => {
                return infos.columnIndex[i];
            })
            .attr('y1', 0)
            .attr('y2', infos.height)

            .attr('fill', 'none')
            .attr('stroke', opts.Default.verticalLineColor || '#000000')
            .attr('stroke-linejoin', "round")
            .attr('stroke-linecap', "round");
        //.attr('style', (d, i) => {
        //    if (i % (calculationData.TickTextsData.length) == 0 && i != 0) {
        //        return `stroke-width: ${gridLineWidth}; stroke: ${bigGridLineColorValue};`;
        //    }
        //    return `stroke-width: ${thinLineWidth}`;
        //});
        rootElement.TrendChartSvg.D3SvgNode.TrendChartVerticalLine = trendChartVerticalLine;

        //计算所需要的线条
        var horizontalData = [...new Array(infos.rowIndex.length).keys(), infos.rowIndex.length];

        //开始绘制线条
        var trendCharthorizontalLine = trendChartBgLine.append('g')
            .attr("dctype", "trendCharthorizontalLine")
            .selectAll('line')
            .data(horizontalData)
            .join('line')
            .attr('x1', opts.Default.leftYAxisSpace)
            .attr('x2', infos.width - opts.Default.rightYAxisSpace)
            .attr('y1', (d, i) => {
                return infos.rowIndex[i];
            })
            .attr('y2', (d, i) => {
                return infos.rowIndex[i];
            })
            .attr('fill', 'none')
            .attr('stroke', opts.Default.horizontalLineColor || '#000000')
            .attr('stroke-linejoin', "round")
            .attr('stroke-linecap', "round");
        //.attr('style', (d, i) => {
        //    if (i % (calculationData.TickTextsData.length) == 0 && i != 0) {
        //        return `stroke-width: ${gridLineWidth}; stroke: ${bigGridLineColorValue};`;
        //    }
        //    return `stroke-width: ${thinLineWidth}`;
        //});
        rootElement.TrendChartSvg.D3SvgNode.trendCharthorizontalLine = trendCharthorizontalLine;
    },

    //绘制y轴样式
    DrawYAxis: function (rootElement) {
        var opts = rootElement.TrendChartSvg.Options;
        var infos = rootElement.TrendChartSvg.SvgDataInfos;
        //console.log("DrawYAxis", infos);
        //循环y轴数据
        if (Array.isArray(opts.YAxis)) {
            //绘制一个y轴包裹元素
            var trendChartYAxisContainer = rootElement.TrendChartSvg.D3SvgNode.MainSvg.append('g')
                .attr('dctype', "trendChartYAxisContainer");
            rootElement.TrendChartSvg.D3SvgNode.TrendChartYAxisContainer = trendChartYAxisContainer;
            //开启循环绘制
            //计算左右两侧的数量
            var leftSide = 0;
            var rightSide = 0;
            for (var i = 0; i < opts.YAxis.length; i++) {
                //开始绘制先确定位置默认宽15px
                var thisYAttr = opts.YAxis[i];
                if (thisYAttr.axisVisible) {
                    var infoYAttr = infos.yAxis[thisYAttr.id];
                    infoYAttr = infoYAttr ? infoYAttr : {};
                    infoYAttr = infos.yAxis[thisYAttr.id] = thisYAttr;

                    if (thisYAttr.yAxisVisible != false) {
                        if (thisYAttr.rightShow) {
                            infoYAttr.left = infos.width - opts.Default.rightYAxisSpace + (rightSide * 35) + 15;
                            rightSide++;
                        } else {
                            //表示为左侧展示
                            infoYAttr.left = opts.Default.leftYAxisSpace - (leftSide * 35 + 15);
                            leftSide++;
                        }

                    } else {
                        infoYAttr.left = 0;
                    }


                    //infoYAttr.top = thisYAttr.startValueOffset * infos.stepColumnNumber;
                    //infoYAttr.bottom = infos.height - (thisYAttr.endValueOffset * infos.stepColumnNumber);
                    infoYAttr.height = infos.height;

                    //开始绘制
                    var trendChartYAxis = trendChartYAxisContainer.append('g')
                        .attr('dctype', "trendChartYAxis")
                        .attr(
                            'transform',
                            `translate(${infoYAttr.left},${0})`)
                        .attr("trendChartID", infoYAttr.id);
                    //判断y轴数组是否存在
                    if (Array.isArray(rootElement.TrendChartSvg.D3SvgNode.TrendChartYAxis) == false) {
                        rootElement.TrendChartSvg.D3SvgNode.TrendChartYAxis = [];
                    }
                    rootElement.TrendChartSvg.D3SvgNode.TrendChartYAxis.push(trendChartYAxis);

                    //开始拆分数据
                    //axisStartValue: 0, //y轴起始值
                    //axisEndValue: 100,//y轴结束值
                    thisYAttr.scaleDivisionNum = thisYAttr.scaleDivisionNum ? thisYAttr.scaleDivisionNum : opts.Default.horizontalDivisionNum;
                    var divNum = thisYAttr.scaleDivisionNum - thisYAttr.startValueOffset - thisYAttr.endValueOffset;
                    infoYAttr.stepYValue = (thisYAttr.axisEndValue - thisYAttr.axisStartValue) / divNum;
                    //获取线分割单只
                    infoYAttr.stepHeight = (infoYAttr.height - (thisYAttr.startValueOffset + thisYAttr.endValueOffset) * infos.stepRowNumber) / divNum;
                    infoYAttr.stepYValueArr = [];
                    for (var j = 0; j <= divNum; j++) {
                        infoYAttr.stepYValueArr.unshift((infoYAttr.stepYValue * j) + thisYAttr.axisStartValue);
                    }
                    trendChartYAxis.append('g')
                        .attr("dctype", "trendChartYAxis_Text")
                        .selectAll('text')
                        .data(infoYAttr.stepYValueArr)
                        .join('text')
                        .attr('style', `font-family:${"宋体"};font-size:${"12"}px;fill:${thisYAttr.titleColor || "black"};text-anchor: middle`)
                        .html((d, i) => {
                            if (i === 0) {
                                //是否显示标题
                                if (thisYAttr.titleVisible || (thisYAttr.yAxisVisible !== false)) {
                                    //绘制Title和BottomTitle
                                    trendChartYAxis.append('g')
                                        .attr("dctype", "dcYAxisInfos_Title")
                                        .selectAll("text")
                                        .data([0])
                                        .join('text')
                                        .attr('style', `font-family:${"宋体"};font-size:${"9"}px;fill:${thisYAttr.titleColor || "black"};text-anchor: middle`)
                                        .attr("x", 0)
                                        .attr("y", () => {
                                            return infos.textlableHeight / 1.5;
                                        })
                                        .text(thisYAttr.title);
                                }
                                infos.verticalText[thisYAttr.id] = [];
                            }

                            //在此处保存y轴的分割值
                            infos.verticalText[thisYAttr.id].push(parseFloat(d.toFixed(2)));

                            //[DUWRITER5_0-4665] 20250731 lxy 趋势图的体征项目中增加控制Y轴是否显示的属性，在此处返回空是为了使用对verticalBand的计算
                            if (thisYAttr.yAxisVisible === false) {
                                return ``;
                            }

                            //[DUWRITER5_0-4665] 20250729 lxy 修改趋势图Y轴的数值显示方式，保留指定位数
                            if (thisYAttr.axisKeepDecimalPlaces === 0) {
                                return `${parseInt(d)}`;
                            } else if (thisYAttr.axisKeepDecimalPlaces > 0) {
                                return `${d.toFixed(thisYAttr.axisKeepDecimalPlaces)}`;
                            } else {
                                return `${d.toFixed(2)}`;
                            }

                        })
                        .attr('x', 0)
                        .attr('y', (d, i) => {
                            if (i == 0) {
                                infos.verticalBand[thisYAttr.id] = [];
                            }
                            infos.verticalBand[thisYAttr.id].push(infoYAttr.stepHeight * i + (thisYAttr.startValueOffset * infos.stepRowNumber));
                            //console.log(infoYAttr.stepHeight * i, i);
                            if (i == 0 && thisYAttr.startValueOffset == 0) {
                                return (infos.textlableHeight / 2);
                            }
                            else if (i == infoYAttr.stepYValueArr.length - 1 && thisYAttr.endValueOffset == 0) {
                                return infoYAttr.stepHeight * i + (infos.textlableHeight / 2) - 5;
                            }
                            else {
                                return infoYAttr.stepHeight * i + (infos.textlableHeight / 2) + (thisYAttr.startValueOffset) * infos.stepRowNumber;
                            }
                        });

                }

            }
        }
    },

    //绘制点
    DrawPoint: function (rootElement) {
        var opts = rootElement.TrendChartSvg.Options;
        var infos = rootElement.TrendChartSvg.SvgDataInfos;
        //绘制一个y轴包裹元素
        var trendChartYPointContainer = rootElement.TrendChartSvg.D3SvgNode.MainSvg.append('g')
            .attr('dctype', "trendChartYAxisContainer");
        rootElement.TrendChartSvg.D3SvgNode.TrendChartYPointContainer = trendChartYPointContainer;
        //console.log("DrawPoint", infos);
        //var xScale = d3.scaleBand(infos.horizontalText, infos.horizontalBand);
        //开始循环并计算结果
        if (opts.Data) {
            //console.log(opts.Data);
            for (var i in opts.Data) {
                //创建元素对应的g包裹元素
                var yVal = infos.verticalBand[i];
                var yAttr = infos.yAxis[i];

                //只有存在y轴的情况下才展示
                if (yVal && Array.isArray(opts.Data[i])) {
                    //创建外层包裹元素
                    var trendChartYPoint = trendChartYPointContainer
                        .append('g')
                        .attr("dctype", `trendChartYPoint`)
                        .attr("name", i);
                    //x轴的标尺
                    //var yScale = d3.scaleOrdinal(infos.verticalText[i], yVal);
                    var pointIndexArr = [];
                    opts.Data[i].forEach((item, index) => {
                        //计算到所有的位置
                        var timeText = item.time ? item.time.split(":") : [];
                        //值类型是否为文本
                        var isTextValueType = yAttr.valueStyle && yAttr.valueStyle === 'text';
                        //只有在确保数据正确的情况下展示
                        if (timeText.length == 2) {
                            timeText[1] = parseInt(timeText[1]) / 60 * 100;
                            //拼接数据
                            timeText = parseFloat(timeText[0] + '.' + timeText[1]);
                            //console.log(timeText);
                            pointIndexArr.push({
                                //x: xScale(timeText),
                                //y: yScale(parseInt(item.value))
                                text: item.text,
                                title: item.title,
                                textFontSize: item.textFontSize,
                                textFontName: item.textFontName || "宋体",
                                textFontColor: item.textFontColor || "#000000",
                                x: WriterControl_TrendChart.CalculateLocation(timeText, infos.horizontalText, infos.horizontalBand, isTextValueType, true),
                                y: WriterControl_TrendChart.CalculateLocation(parseInt(item.value), infos.verticalText[i], infos.verticalBand[i], isTextValueType)
                            });
                        }
                    });
                    //排序
                    pointIndexArr.sort((a, b) => {
                        return a.x - b.x;
                    });
                    //绘点
                    if (yAttr.valueStyle && yAttr.valueStyle === 'text') {
                        //文本
                        pointIndexArr.forEach((point) => {
                            var textLabel = trendChartYPoint.append('g')
                                .attr('dctype', "trendChartValueText");
                            if (point.text && point.text.length > 0) {
                                for (var j = 0; j < point.text.length; j++) {
                                    //宽高
                                    var stepRowNumber = infos.stepRowNumber;
                                    var stepColumnNumber = infos.stepColumnNumber;

                                    //取最小值
                                    var minStepNumber = Math.min(stepRowNumber, stepColumnNumber);
                                    if (point.textFontSize && point.textFontSize > minStepNumber) {
                                        //当指定字体大小超出格子
                                        point.textFontSize = minStepNumber;
                                    }

                                    //计算字体的高度
                                    var fontSize = (point.textFontSize && parseInt(point.textFontSize)) || 12;

                                    var textLabelItem = textLabel.append('text')
                                        .attr('style', `font-size:${fontSize}px;font-family:${point.textFontName};`)
                                        .attr('fill', `${point.textFontColor ? point.textFontColor : "black"}`)
                                        .attr('x', point.x)
                                        .attr('y', point.y)
                                        .attr('xml:space', 'preserve')
                                        .text(point.text[j]);

                                    //纠正一遍文本位置，保证文字居中不超出格子。因为中文和数字英文的宽度不一样，所以需要绘制后纠正一下
                                    var textLabelItemRect = textLabelItem.node().getBoundingClientRect();
                                    var textWidth = textLabelItemRect.width;
                                    var textHeight = textLabelItemRect.height;
                                    //宽
                                    var xdiff = (stepColumnNumber - textWidth) > 0 ? (stepColumnNumber - textWidth) / 2 : 0;
                                    //高
                                    var ydiff = ((j + 1) * stepRowNumber) - ((stepRowNumber - textHeight) / 2) - 2;
                                    textLabelItem.attr('x', point.x + xdiff);
                                    textLabelItem.attr('y', point.y + ydiff);
                                }
                            }
                        });

                    } else {
                        //开始绘制点和折线
                        pointIndexArr.forEach((point, pointIndex) => {
                            //绘制连线
                            if (pointIndex < pointIndexArr.length - 1) {
                                trendChartYPoint.append("line")
                                    .attr('x1', point.x)
                                    .attr('y1', point.y)
                                    .attr('x2', pointIndexArr[pointIndex + 1].x)
                                    .attr('y2', pointIndexArr[pointIndex + 1].y)
                                    .attr('fill', 'none')
                                    .attr('stroke', yAttr.legendColor || '#000000')
                                    .attr('stroke-width', 1)
                                    .attr('stroke-linejoin', "round")
                                    .attr('stroke-linecap', "round");
                            }
                            var IconData = {
                                content: trendChartYPoint,
                                data: [0],
                                x: point.x,
                                y: point.y,
                                fill: yAttr.legendColor || '#000000',
                                stroke: yAttr.legendColor || '#000000',
                                r: parseFloat(yAttr.legendSize) || 5,
                                title: point.title || '',
                                isPoint: true,//判断是用于绘点，还是用于文本标签
                            };
                            WriterControl_TrendChart.IconDrawObj()[yAttr.legendStyle || "SolidCicle"](IconData);
                        });
                    }




                }
            }
        }

        ////计算位置
        ////console.log(xScale(0), yScale(0))
        ////展示标尺
        //var svgEle = rootElement.TrendChartSvg.D3SvgNode.TrendChartBgLine
        //var g3 = svgEle.append('g')
        //    .attr("transform",`translate(${160},${0})`)
        ////var xAxis = d3.axisTop(xScale).tickPadding(10)
        //var yAxis = d3.axisLeft(yScale)
        //window.yScale = yScale;
        ////g3.append('g').call(xAxis)
        //g3.append('g').call(yAxis)

    },

    //绘制文本标签
    DrawTextLabel: function (rootElement) {
        var opts = rootElement.TrendChartSvg.Options;
        var infos = rootElement.TrendChartSvg.SvgDataInfos;
        if (Array.isArray(opts.Labels)) {
            var trendChartTextLabelContainer = rootElement.TrendChartSvg.D3SvgNode.MainSvg.append('g')
                .attr('dctype', "trendChartTextLableContainer");
            rootElement.TrendChartSvg.D3SvgNode.TrendChartTextLabelContainer = trendChartTextLabelContainer;
            for (var i = 0; i < opts.Labels.length; i++) {
                var thisLabel = opts.Labels[i];
                var trendChartTextLabelItem = trendChartTextLabelContainer.append('g')
                    .attr('dctype', "trendChartTextLableItem");

                trendChartTextLabelItem.append('text')
                    .attr('style', `font-family:${thisLabel.textFontName} ;font-size:${thisLabel.textFontSize}px;font-weight:${thisLabel.textFontBold ? 900 : 0};text-decoration: ${thisLabel.textFontUnderline ? 'underline' : 'none'};color:${thisLabel.textFontColor ? thisLabel.textFontColor : "black"};font-style:${thisLabel.textFontItalic ? 'italic' : 'none'};`)
                    .attr('fill', `${thisLabel.textColorValue ? thisLabel.textColorValue : "black"}`)
                    .attr('x', thisLabel.left)
                    .attr('y', thisLabel.top + (thisLabel.textFontSize * 1.2))
                    .attr('xml:space', 'preserve')
                    .text(thisLabel.text);

                //图标
                if (thisLabel.legendStyle && thisLabel.legendStyle != '') {
                    var trendChartTextLabelItemRect = trendChartTextLabelItem.node().getBoundingClientRect();
                    var IconData = {
                        content: trendChartTextLabelItem,
                        data: [0],
                        x: thisLabel.left + trendChartTextLabelItemRect.width + (thisLabel.textFontSize * 1.2),
                        y: thisLabel.top + trendChartTextLabelItemRect.height,
                        fill: thisLabel.legendColor || '#000000',
                        stroke: thisLabel.legendColor || '#000000',
                        r: thisLabel.legendSize || 5,
                    };
                    WriterControl_TrendChart.IconDrawObj()[thisLabel.legendStyle || "SolidCicle"] && WriterControl_TrendChart.IconDrawObj()[thisLabel.legendStyle || "SolidCicle"](IconData);
                }
            }
        }
    },

    //计算位置 valueType:值类型,isTime是否是计算时间x轴的位置
    CalculateLocation: function (value, textArr, bandArr, isTextValueType, isTime = false) {
        //开始进行计算
        var hasIndex = textArr.indexOf(value);
        if (hasIndex >= 0) {
            return bandArr[hasIndex];
        } else {
            //开始循环计算是否在中间时刻
            for (var i = 0; i < textArr.length - 1; i++) {
                var nextText = textArr[i + 1];
                if (nextText == 0 && isTime) {
                    nextText = 24;
                }
                if ((value > textArr[i] && value < nextText) || (value < textArr[i] && value >= nextText)) {
                    //计算其中的差值
                    var diff = Math.abs(bandArr[i + 1] - bandArr[i]) / Math.abs(nextText - textArr[i]);
                    //[DUWRITER5_0-4668] 20250806 lxy Y轴支持文本类型，当文本类型时，不进行差值计算
                    if (isTextValueType) {
                        //为文本时，要求文本不可以压格子线，所以将差值设为0
                        diff = 0;
                    }

                    //计算位置
                    return Math.abs(value - textArr[i]) * diff + bandArr[i];
                }
            }

            //如果到了这里依旧没有return出去 比较最大值和最小值的差距
            if (value < textArr[0]) {
                return bandArr[0];
            } else if (value > textArr[textArr.length - 1]) {
                return bandArr[bandArr.length - 1];
            }

        }
    },

    //绘制图形
    IconDrawObj: function () {
        return {
            // 绘制圆形图标
            SolidCicle: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                r = 5,
                title
            }) => { //是否为标记物
                // 增加icon  红色空心
                content
                    .append('g')
                    .attr('fill', fill)
                    .attr('stroke', stroke)
                    .attr('stroke-width', 1)
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('r', r)
                    .attr('title', title);
            },
            // 绘制x
            Cross: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                r,
                title
            }) => {
                content
                    .append('g')
                    .attr('fill', fill)
                    .attr('stroke', stroke)
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('line')
                    .data([{}, {}]) // 为两条线创建两个空数据对象
                    .join('line')
                    .attr('x1', (d, i) => i === 0 ? x - r : x + r) // 第一条线的x1是x-r，第二条线的x1是x+r
                    .attr('y1', (d, i) => i === 0 ? y - r : y - r) // 第一条线的y1是y-r，第二条线的y1是y-r
                    .attr('x2', (d, i) => i === 0 ? x + r : x - r) // 第一条线的x2是x+r，第二条线的x2是x-r
                    .attr('y2', (d, i) => i === 0 ? y + r : y + r) // 第一条线的y2是y+r，第二条线的y2是y+r
                    .attr('title', title);


            },
            // 绘制圆形点图标
            RoundDotIcon: ({
                content,
                data,
                x,
                y,
                fill = 'white',
                stroke = 'blue',
                r = 6,
                title
            }) => {
                content
                    .append('g')
                    .attr('fill', fill)
                    .attr('stroke', stroke)
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('transform', i => {
                        const yVal = y(i) || 0;
                        if (!yVal) {
                            return 'scale(0)';
                        }
                        return '';
                    })
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('r', r)
                    .clone()
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('r', 1)
                    .attr('fill', stroke)
                    .attr('title', title);

            },
            // 绘制三角形
            SolidTriangle: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                riangle = 28,
                title
            }) => {
                // 蓝色三角形
                content
                    .append('g')
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('g')
                    .data(data)
                    .join('g')
                    .attr('transform', i => {
                        const yVal = y(i) || 0;
                        if (!yVal) {
                            return 'scale(0)';
                        }
                        return `translate(${x(i)},${yVal})`;
                    })
                    .append('path')
                    .call(path => {
                        const symbolThree = d3.symbol();
                        const symbolIndex = 5;
                        symbolThree.type(d3.symbols[symbolIndex]);
                        path
                            .attr('d', symbolThree.size(riangle))
                            .attr('fill', fill)
                            .attr('stroke', stroke)
                            .transition();
                        // .duration(1500)
                        // .attr('d', symbolThree.size(48))
                    })
                    .attr('title', title);

            },
            // 空心正三角形
            HollowSolidTriangle: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                riangle = 28,
                title
            }) => {
                // 蓝色三角形
                content
                    .append('g')
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('g')
                    .data(data)
                    .join('g')
                    .attr('transform', i => {
                        const yVal = y(i) || 0;
                        if (!yVal) {
                            return 'scale(0)';
                        }
                        return `translate(${x(i)},${yVal})`;
                    })
                    .append('path')
                    .call(path => {
                        const symbolThree = d3.symbol();
                        const symbolIndex = 5;
                        symbolThree.type(d3.symbols[symbolIndex]);
                        path
                            .attr('d', symbolThree.size(riangle))
                            .attr('fill', "white")
                            .attr('stroke', stroke)
                            .transition();
                        // .duration(1500)
                        // .attr('d', symbolThree.size(48))
                    })
                    .attr('title', title);

            },
            // 绘制倒三角
            SolidTriangleReversed: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                riangle = 28,
                title
            }) => {
                // 蓝色三角形
                content
                    .append('g')
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('g')
                    .data(data)
                    .join('g')
                    .attr('transform', i => {
                        const yVal = y(i) || 0;
                        if (!yVal) {
                            return 'scale(0)';
                        }
                        return `translate(${x(i)},${yVal})`;
                    })
                    .append('path')
                    .call(path => {
                        const symbolThree = d3.symbol();
                        const symbolIndex = 5;
                        symbolThree.type(d3.symbols[symbolIndex]);
                        path
                            .attr('d', symbolThree.size(riangle))
                            .attr('fill', fill)
                            .attr('stroke', stroke)
                            .transition();
                        // .duration(1500)
                        // .attr('d', symbolThree.size(48))
                    })
                    .attr("style", "transform: rotate(0.5turn);")
                    .attr('title', title)
                    .attr("isShow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    });
            },
            // 空心倒三角
            HollowSolidTriangleReversed: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                riangle = 28,
                title
            }) => {
                // 蓝色三角形
                content
                    .append('g')
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('g')
                    .data(data)
                    .join('g')
                    .attr('transform', i => {
                        const yVal = y(i) || 0;
                        if (!yVal) {
                            return 'scale(0)';
                        }
                        return `translate(${x(i)},${yVal})`;
                    })
                    .append('path')
                    .call(path => {
                        const symbolThree = d3.symbol();
                        const symbolIndex = 5;
                        symbolThree.type(d3.symbols[symbolIndex]);
                        path
                            .attr('d', symbolThree.size(riangle))
                            .attr('fill', "white")
                            .attr('stroke', stroke)
                            .transition();
                        // .duration(1500)
                        // .attr('d', symbolThree.size(48))
                    })
                    .attr("style", "transform: rotate(0.5turn);")
                    .attr('title', title)
                    .attr("isShow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    });
            },
            // 绘制方形
            Square: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                r = 5,
                title,
            }) => { //是否为标记物
                // 增加icon  红色空心
                content
                    .append('g')
                    .attr('fill', fill)
                    .attr('stroke', stroke)
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('rect')
                    .data(data)
                    .join('rect')
                    .attr('transform', (i, d) => {
                        var yVal = y(i) || 0;
                        if (!yVal) {
                            return 'scale(0)';
                        }
                        return '';
                    })
                    .attr('x', (i, d) => {
                        return x(i) - (r);
                    })
                    .attr('y', (i, d) => {
                        return y(i) - (r);
                    })
                    .attr('width', r * 2)
                    .attr('height', r * 2)
                    .attr('title', title);

            },
            //·空心圆
            HollowCicle: ({
                content,
                data,
                x,
                y,
                fill = 'green',
                stroke = 'green',
                r = 4,
                title,
            }) => {
                content
                    .append('g')
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('stroke', "blue")
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('fill', "white")
                    .attr('stroke', stroke)
                    .attr('r', r)
                    .attr('title', (i) => {
                        if (typeof title === 'function') {
                            title = title(i);
                        }
                        return title;
                    })
                    .attr('dcSymbolX', x)
                    .attr('dcSymbolY', y);


            },
            //空心带圆点
            HollowWithCircularDots: ({
                content,
                data,
                x,
                y,
                fill = 'green',
                stroke = 'green',
                r = 5,
                title,
            }) => {
                content
                    .append('g')
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('stroke', "blue")
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('fill', "white")
                    .attr('stroke', stroke)
                    .attr('r', 5)
                    .attr('title', (i) => {
                        if (typeof title === 'function') {
                            title = title(i);
                        }
                        return title;
                    });
                content
                    .append('g')
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('stroke', "blue")
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('fill', stroke)
                    .attr('stroke', stroke)
                    .attr('r', 5 / 2)
                    .attr('title', (i) => {
                        if (typeof title === 'function') {
                            title = title(i);
                        }
                        return title;
                    });

            },
            // 双层同心圆
            DoubleConcentricCircles: ({
                content,
                data,
                x,
                y,
                fill = 'green',
                stroke = 'green',
                r = 5,
                title,
            }) => {
                content
                    .append('g')
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('stroke', "blue")
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('fill', "white")
                    .attr('stroke', stroke)
                    .attr('r', 5)
                    .attr('title', (i) => {
                        if (typeof title === 'function') {
                            title = title(i);
                        }
                        return title;
                    });
                content
                    .append('g')
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    })
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('stroke', "blue")
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('fill', "white")
                    .attr('stroke', stroke)
                    .attr('r', 3)
                    .attr('title', (i) => {
                        if (typeof title === 'function') {
                            title = title(i);
                        }
                        return title;
                    });

            },
            //开口向下的V 
            LowerV: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                r = 5,
                title,
                isPoint = false
            }) => { //是否为标记物
                // 增加icon  红色空心
                content
                    .append('g')
                    .attr('fill', 'none')
                    .attr('stroke', stroke)
                    .attr('stroke-width', 1)
                    .attr("isshow", () => {
                        if (fill == "transparent") {
                            return "false";
                        } else {
                            return "true";
                        }
                    }).selectAll('path')
                    .data([data])
                    .enter()
                    .append('path')
                    .attr('d', d => {
                        // 计算开口向下的V的路径数据
                        if (isPoint) {
                            r = r * 2;
                            //绘点时不压线
                            var topX = x;
                            var topY = y;
                            var leftX = x - (r / 2);
                            var leftY = y + r;
                            var rightX = x + (r / 2);
                            var rightY = y + r;
                        } else {
                            //文本标签时按标准展示
                            var topX = x;
                            var topY = y - r;
                            var leftX = x - r;
                            var leftY = y + r;
                            var rightX = x + r;
                            var rightY = y + r;
                        }

                        return `M${leftX},${leftY} L${topX},${topY} L${rightX},${rightY}`;
                    })
                    .attr('title', title);
            },
            //开口向上的V 
            UpperV: ({
                content,
                data,
                x,
                y,
                fill = 'blue',
                stroke = 'blue',
                r = 5,
                title,
                isPoint = false
            }) => { //是否为标记物
                // 增加icon  红色空心
                content
                    .append('g')
                    .attr('fill', 'none')
                    .attr('stroke', stroke)
                    .attr('stroke-width', 1)

                    .selectAll('path')
                    .data([data])
                    .enter()
                    .append('path')
                    .attr('d', d => {
                        // 计算开口向上的V的路径数据
                        if (isPoint) {
                            r = r * 2;

                            // //如果超出定点范围
                            // if (y <= 0) {
                            //     y = r;
                            // }

                            //绘点时不压线
                            var bottomX = x;
                            var bottomY = y;
                            var leftX = x - (r / 2);
                            var leftY = y - r;
                            var rightX = x + (r / 2);
                            var rightY = y - r;

                        } else {
                            //文本标签中按照正常居中展示
                            var bottomX = x;
                            var bottomY = y + r;
                            var leftX = x - r;
                            var leftY = y - r;
                            var rightX = x + r;
                            var rightY = y - r;
                        }
                        return `M${leftX},${leftY} L${bottomX},${bottomY} L${rightX},${rightY}`;
                    })
                    .attr('title', title);
            },
        };
    },

    //数据源绑定赋值
    TrendChartDataSourceToDocument: function (rootElement, data) {
        // console.log(data)
        // var startTime = new Date();
        rootElement.__DCWriterReference.invokeMethod("CacheDocumentOptions");
        var hasTargetCustomAttr = rootElement.getAttribute("DCRecordAndTrendChartData");
        if (hasTargetCustomAttr == null) {
            hasTargetCustomAttr = "DCRecordAndTrendChartData";
        }
        // 缓存正则表达式，避免重复创建
        const IMAGE_EXTENSIONS_REGEX = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;
        const NETWORK_IMAGE_REGEX = /^https?:\/\/.+/i;
        const BASE64_IMAGE_REGEX = /^data:image\/[a-zA-Z+]+;base64,/i;
        const DIMENSIONS_REGEX = /\$imagewidthheight\$/;
        /**
         * 判断给定文本是否为图片资源
         * @param {string} text - 待判断的文本
         * @returns {boolean} - 是否为图片资源
         */
        const isImageSource = function (text) {
            if (!text || typeof text !== 'string') return false;
            return IMAGE_EXTENSIONS_REGEX.test(text) ||
                NETWORK_IMAGE_REGEX.test(text) ||
                BASE64_IMAGE_REGEX.test(text);
        };
        /**
         * 解析图片尺寸信息
         * 支持通过 "w100h100$imagewidthheight$" 前缀指定图片宽高
         * @param {string} text - 图片文本（可能包含尺寸前缀）
         * @returns {object} - 包含图片宽高、文本、宽高自适应等信息的对象
         */
        const parseImageDimensions = function (text) {
            const dimensions = {
                width: 100,
                height: 100,
                text: text,
                keepwidthheightrate: true
            };
            // 图片是否存在自定义宽度，默认false
            var hasCustomWidth = false;
            // 图片是否存在自定义高度，默认false
            var hasCustomHeight = false;
            try {
                // wyc20250313如果是图片数据允许通过加上 "w100h100$imagewidthheight$" 前缀指定图片宽高
                if (text && DIMENSIONS_REGEX.test(text)) {
                    const parts = text.split("$imagewidthheight$");
                    if (parts.length === 2) {
                        const whText = parts[0];
                        dimensions.text = parts[1];
                        // 使用正则表达式提取数字，更安全
                        const heightMatch = whText.match(/h(\d+)/);
                        const widthMatch = whText.match(/w(\d+)/);
                        if (heightMatch != null && heightMatch.length == 2) {
                            const height = parseInt(heightMatch[1]);
                            if (!isNaN(height) && height > 0) { dimensions.height = height; hasCustomHeight = true; }
                        }
                        if (widthMatch != null && widthMatch.length == 2) {
                            const width = parseInt(widthMatch[1]);
                            if (!isNaN(width) && width > 0) { dimensions.width = width; hasCustomWidth = true; }
                        }
                        // 当宽高都被自定义设置时，设置_KeepWidthHeightRate为false
                        if (hasCustomWidth && hasCustomHeight) {
                            dimensions.keepwidthheightrate = false;
                        }
                    }
                }
            } catch (error) {
                // console.warn("解析图片尺寸时出错:", error);
            }
            return dimensions;
        };
        //拿到对应的数据源配置信息
        var datasource = rootElement.GetCustomAttribute(hasTargetCustomAttr);
        if (datasource) {
            datasource = JSON.parse(datasource);
            if (typeof data == "object") {
                data = WriterControl_TrendChart.DefaulDataSourceData(data);
                //开始循环数据
                for (var i in data) {
                    var hasDataAttr = datasource[i];
                    if (hasDataAttr) {
                        var targetTable = rootElement.GetElementProperties(hasDataAttr.tableID);
                        //开始循环赋值并合并单元格
                        var thisDataSourceData = data[i];
                        //获取到所有的表格行
                        var allRowEle = targetTable.Rows;
                        // console.log(targetTable,hasDataAttr);
                        //矫正表格开始和结束位置
                        if (Array.isArray(hasDataAttr.rowColStart)) {
                            var startIndex = hasDataAttr.rowColStart[0];
                            startIndex = parseInt(startIndex);
                            if (isNaN(startIndex)) {
                                startIndex = 1;
                            }
                            hasDataAttr.rowColStart[0] = startIndex;
                            var endIndex = hasDataAttr.rowColStart[1];
                            endIndex = parseInt(endIndex);
                            if (isNaN(endIndex)) {
                                endIndex = 1;
                            }
                            hasDataAttr.rowColStart[1] = endIndex;
                        } else {
                            hasDataAttr.rowColStart = [1, 1];
                        }
                        //判断是否需要自动生成表格行
                        if (allRowEle.length - hasDataAttr.rowColStart[0] < thisDataSourceData.length) {
                            //对表格进行行新增
                            var options = {
                                FastMode: true, // yyf 2025-2-26 快速模式，不更新文档排版
                                tableid: hasDataAttr.tableID,
                                rowindex: null,
                                rowcount: thisDataSourceData.length - (allRowEle.length - (hasDataAttr.rowColStart[0] - 1))
                            };
                            // var time223 = new Date();
                            rootElement.DCExecuteCommand("table_insertrowdown", false, options);
                            // console.log("插入表格行耗时：" + (new Date().valueOf() - time223.valueOf()));
                            //重新获取所有表格行
                            targetTable = rootElement.GetElementProperties(hasDataAttr.tableID);
                            allRowEle = targetTable.Rows;
                        }
                        if (Array.isArray(hasDataAttr.rowColEnd)) {
                            var startIndex = hasDataAttr.rowColEnd[0];
                            startIndex = parseInt(startIndex);
                            if (isNaN(startIndex)) {
                                startIndex = targetTable.Rows.length;
                            }
                            hasDataAttr.rowColEnd[0] = startIndex;
                            var endIndex = hasDataAttr.rowColEnd[1];
                            endIndex = parseInt(endIndex);
                            if (isNaN(endIndex)) {
                                endIndex = targetTable.Columns.length;
                            }
                            hasDataAttr.rowColEnd[1] = endIndex;
                        } else {
                            //设置到当前表格的最后一行
                            hasDataAttr.rowColEnd = [targetTable.Rows.length, targetTable.Columns.length];
                        }
                        //拆分需要哪些行(防止长度不对)
                        allRowEle.splice(hasDataAttr.rowColEnd[0] - 1, allRowEle.length - hasDataAttr.rowColEnd[0]);
                        allRowEle.splice(0, hasDataAttr.rowColStart[0] - 1);
                        // console.log(allRowEle);
                        //在此处处理单元格
                        var allCellEle = [];
                        //在此处判断元素
                        //var targetPageIndex = 0;
                        //开始循环行获取单元格
                        allRowEle.forEach((row, rowIndex) => {
                            //获取到所有的单元格
                            //var rowAttr = rootElement.GetElementProperties(row);
                            var targetRowCells = rootElement.GetRowCellsHandles(row); // rowAttr.Cells;
                            //拆分需要哪些单元格
                            targetRowCells.splice(hasDataAttr.rowColEnd[1] - 1, targetRowCells.length - hasDataAttr.rowColEnd[1]);
                            targetRowCells.splice(0, hasDataAttr.rowColStart[1] - 1);
                            // console.log(targetRowCells);
                            allCellEle.push(targetRowCells);
                        });

                        //var a = new Date().getTime();
                        //开始行的循环
                        thisDataSourceData.forEach((rowItem, rowIndex) => {
                            //var b = new Date().getTime();
                            //在此处循环清空null值
                            // allCellEle[rowIndex] = allCellEle[rowIndex].filter(n => n != null)
                            //清空总合并值
                            var colSpanNum = 0;
                            rowItem.forEach((cellItem, cellIndex) => {
                                // console.log(rowIndex,cellIndex + colSpanNum)
                                var cellNativeHandle = allCellEle[rowIndex][cellIndex + colSpanNum];
                                while (cellNativeHandle === null) {
                                    colSpanNum = colSpanNum + 1;
                                    cellNativeHandle = allCellEle[rowIndex][cellIndex + colSpanNum];
                                }
                                // console.log("aaaaaa")
                                //开始合并单元格
                                cellItem.colspan = parseInt(cellItem.colspan);
                                if (isNaN(cellItem.colspan)) {
                                    cellItem.colspan = 1;
                                }
                                cellItem.rowspan = parseInt(cellItem.rowspan);
                                if (isNaN(cellItem.rowspan)) {
                                    cellItem.rowspan = 1;
                                }
                                //开始合并单元格
                                if (cellItem.colspan > 1 || cellItem.rowspan > 1) {
                                    // rootElement.SelectContentByStartEndElement(cellNativeHandle,allCellEle[rowIndex][cellIndex + colSpanNum]);
                                    // document.WriterControl.DCExecuteCommand("Table_MergeCell",false,null);
                                    rootElement.SetElementProperties(cellNativeHandle, {
                                        LogUndo: false, // yyf 2025-2-26 不记录重做、撤销信息
                                        ColSpanFast: cellItem.colspan,
                                        RowSpanFast: cellItem.rowspan,
                                        Style: {
                                            Align: cellItem.align,
                                            Verticalalign: cellItem.verticalalign
                                        }
                                    }, false);
                                    //在此次对单元格进行配置,防止出现赋值问题
                                    //if(cellItem.rowspan > 1){
                                    //    for(var i=1;i < cellItem.rowspan;i++){
                                    //        //找到对应的数据
                                    //        var targetRow = allCellEle[rowIndex + i];
                                    //        for(var j=0;j<cellItem.colspan;j++){
                                    //            //是否存在合并列
                                    //            targetRow.splice(cellIndex + colSpanNum + j,1,null);
                                    //        }
                                    //    }
                                    //}
                                    colSpanNum = colSpanNum + cellItem.colspan - 1;
                                }
                                // 判断值
                                var useItemText = cellItem.text;
                                if (Array.isArray(useItemText)) {
                                    const ChildOptions = [];
                                    useItemText.forEach(function (itemText, itemIndex) {
                                        const itemDimensions = parseImageDimensions(itemText);
                                        if (!itemDimensions.text || typeof itemDimensions.text !== 'string') {
                                            return false;
                                        }
                                        if (isImageSource(itemDimensions.text)) {
                                            const isNetworkImage = NETWORK_IMAGE_REGEX.test(itemDimensions.text);
                                            ChildOptions.push({
                                                image: {
                                                    id: "image_" + Date.now() + "_" + itemIndex,  // 图片id,使用时间戳生成唯一ID
                                                    src: itemDimensions.text, //图片路径
                                                    width: itemDimensions.width,  //图片宽度
                                                    height: itemDimensions.height,  //图片高度
                                                    savecontentinfile: !isNetworkImage, // 网络图片不保存到文档
                                                    keepwidthheightrate: itemDimensions.keepwidthheightrate // 图片宽高自适应
                                                }
                                            });
                                        } else {
                                            ChildOptions.push({
                                                text: itemDimensions.text
                                            });
                                        }
                                    });
                                    // 先清空文本
                                    rootElement.SetTableCellTextExtByHandle(cellNativeHandle, "");
                                    rootElement.SetChildElements(cellNativeHandle, ChildOptions, "beforeBegin", false);
                                } else {
                                    const itemDimensions = parseImageDimensions(useItemText);
                                    if (isImageSource(itemDimensions.text)) {
                                        const isNetworkImage = NETWORK_IMAGE_REGEX.test(itemDimensions.text);
                                        const ChildOptions = [
                                            {
                                                image: {
                                                    id: "image_" + Date.now(),  // 图片id,使用时间戳生成唯一ID
                                                    src: itemDimensions.text, //图片路径
                                                    width: itemDimensions.width,  //图片宽度
                                                    height: itemDimensions.height,  //图片高度
                                                    savecontentinfile: !isNetworkImage, // 网络图片不保存到文档
                                                    keepwidthheightrate: itemDimensions.keepwidthheightrate // 图片宽高自适应
                                                }
                                            }
                                        ];
                                        // 先清空文本
                                        rootElement.SetTableCellTextExtByHandle(cellNativeHandle, "");
                                        rootElement.SetChildElements(cellNativeHandle, ChildOptions, "beforeBegin", false);
                                    } else {
                                        rootElement.SetTableCellTextExtByHandle(cellNativeHandle, useItemText);
                                    }
                                }
                            });
                            //var c = new Date().getTime();
                            //console.log("完成一行赋值:",c - b);

                        });
                        //var d = new Date().getTime()
                        //rootElement.RefreshInnerView();
                        rootElement.__DCWriterReference.invokeMethod("ClearNativeHandleInfo");
                        //刷新表格内数据
                        // var time6 = new Date();
                        rootElement.EditorRefreshViewElement(hasDataAttr.tableID);
                        rootElement.__DCWriterReference.invokeMethod("ClearCachedDocumentOptions");
                        // console.log("刷新视图耗时 " + (new Date().valueOf() - time6.valueOf()));
                        //console.log("完成全部赋值:",d - a)
                    }
                }
            }
        }

        ////自此出对元素进行配置
        //if (allRowEle && Array.isArray(allRowEle)) {
        //    var targetPageIndex = 0;
        //    for (var z = 0; z < allRowEle.length; z++) {
        //        if (allRowEle[z].HeaderStyle === false) {
        //            //找打对应的OwnerPageIndex
        //            //if (allRowEle[z])
        //        }
        //    }
        //}
    },

    //整理下数据
    DefaulDataSourceData: function (data) {
        var a = new Date().getTime();
        if (data) {
            //设置默认
            var defaultData = {
                "text": "",
                "colspan": 1,//右合并
                "rowspan": 1,//下合并
                "align": "left",//左右对齐（居左、居右、居中）
                "verticalalign": "top",//上下对齐（顶端、垂直居中、底端）
                "firstLineIndent": "false",// 默认false
                "fontsize": "", //默认取当前字体
                "fontcolor": "", //默认取当前颜色 
                "bold": "false", //"默认：false",不加粗
                "italic": "false", //"默认：false",不斜体
                "strike": "false", //"默认：false",不删除线
                "underline": "false", //"默认：false",不下划线

                "bordertop": "1",
                "borderbottom": "1",
                "borderleft": "1",
                "borderright": "1",
                "bordertopleft": "0",
                "bordertopright": "0",

                "bordertopcolor": "#000000",
                "borderbottomcolor": "#000000",
                "borderleftcolor": "#000000",
                "borderrightcolor": "#000000",

                "cellgridline": "false",//用于自动换行实现，自动计算所需跨度等
                "autofix": "none",//枚举:默认none，  none,singleline,multiline
            };
            for (var i in data) {
                if (Array.isArray(data[i])) {
                    data[i].forEach((item) => {
                        item.forEach((d, index) => {
                            var cloneDefault = JSON.parse(JSON.stringify(defaultData));
                            //在此处对元素进行赋值
                            for (var attr in cloneDefault) {
                                if (d[attr] != null) {
                                    cloneDefault[attr] = d[attr];
                                }
                            }
                            item[index] = cloneDefault;
                        });
                    });
                }
            }
        }
        //var b = new Date().getTime();
        //console.log("DefaulDataSourceData",b - a);
        return data;
    },


    //在此处对图片进行整理,对当前页所有的行进行属性设置
    InsertImageSetTableRowAttr: function (rootElement) {
        //获取到当前光标的位置
        var oldCaretOption = rootElement.oldCaretOption;
        //获取到在第几页
        var pageIndex = oldCaretOption.intPageIndex;
        var inputAttr = rootElement.GetElementProperties(rootElement.CurrentInputField());
        var imageAttr = null;
        //找打当前图片
        for (var j = 0; j < inputAttr.Elements.length; j++) {
            imageAttr = rootElement.GetElementProperties(inputAttr.Elements[j]);
            if (imageAttr && imageAttr.TypeName == "XTextImageElement") {
                break;
            }
        }
        if (imageAttr && typeof pageIndex == "number") {
            //设置输入域属性
            rootElement.SetTableRowAttribute(inputAttr.NativeHandle, {
                LockInputFieldImage: imageAttr.Src
            });
            //获取到所有的表格行
            var rows = rootElement.GetElementsByTypeName("XTextTableRowElement");
            if (rows != null) {
                //找到当前页的所有表格行
                //var currentPageTableRows = [];
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].HeaderStyle === false && rows[i].OwnerPageIndex == pageIndex) {
                        //currentPageTableRows.push(rows[i])
                        //直接设置属性
                        rootElement.SetTableRowAttribute(rows[i].NativeHandle, {
                            LockInputFieldImage: imageAttr.Src
                        });
                    }
                }
            }
        }
    },


    CreateTrendChartImage: function (rootElement) {
        var CurrentTableCell = rootElement.CurrentTableCell();
        if (CurrentTableCell) {
            var targetCell = rootElement.GetElementProperties(CurrentTableCell);
            var svgNode = rootElement.TrendChartSvg.SvgNode;
            WriterControl_TrendChart.GetSvgToPngBase64(svgNode, function (err, base64) {
                if (err) {
                    console.error('出错:', err);
                } else {
                    if (base64) {
                        var options = {
                            Width: targetCell.Width,
                            Height: targetCell.Height,
                            id: "TrendChartCellImg" + new Date().getTime(),
                            src: base64,
                            SaveContentInFile: true,
                            KeepWidthHeightRate: false,
                            SmoothZoom: false,
                            AutoFitImageSize: true      //根据当前单元格宽高自适应缩放
                        };
                        //插入图片到单元格
                        ctl.DCExecuteCommand("InsertImage", false, options);
                        svgNode.remove();//删除svg
                    }
                }
            });
        }
    },
    GetSvgToPngBase64: function (svg, callback) {
        if (!svg) return callback('未找到svg[dctype=TrendChartPage]');
        var b = svg.getBBox(), NS = 'http://www.w3.org/2000/svg';
        var wrap = document.createElementNS(NS, 'svg');
        wrap.setAttribute('xmlns', NS);
        wrap.setAttribute('viewBox', [b.x, b.y, b.width, b.height].join(' '));
        wrap.setAttribute('width', b.width);
        wrap.setAttribute('height', b.height);
        wrap.appendChild(svg.cloneNode(true));
        var data = new XMLSerializer().serializeToString(wrap);
        var url = (window.URL || window.webkitURL).createObjectURL(new Blob([data], { type: 'image/svg+xml;charset=utf-8' }));
        var scale = 2;
        var canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(b.width * scale));
        canvas.height = Math.max(1, Math.round(b.height * scale));
        var ctx = canvas.getContext('2d');


        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, -8, canvas.width, canvas.height);
            (window.URL || window.webkitURL).revokeObjectURL(url);
            var base64 = canvas.toDataURL('image/png').split(',')[1];

            callback(null, base64);
        };

        img.onerror = function (e) {
            (window.URL || window.webkitURL).revokeObjectURL(url);
            callback(e, null);
        };

        img.src = url;
    }
};

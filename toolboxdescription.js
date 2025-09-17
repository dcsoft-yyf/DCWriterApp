var toolboxdescription = {
  "title": "Toolbar Description",
  "formatVersion": "1.0",
  "mainMenus": [
    {
      "id": "File",
      "text": "File",
      "childItems": [
        {
          "id": "FileNew",
          "text": "New",
          "description": "Clear document content in current tab.",
          "commandName": "FileNew",
          "icon": "new.bmp"
        },
        {
          "id": "FileOpen",
          "text": "Open...",
          "description": "Create new tab and open local file (*.xml)",
          "commandName": "FileOpen",
          "icon": "open.bmp"
        },
        {
          "id": "FileOpenDemo",
          "text": "Open Demo File...",
          "description": "Show demo file list dialog and open.",
          "commandName": "FileOpenDemo",
          "icon": "open.bmp"
        },
        {
          "id": "FileDowload",
          "text": "Download as XML...",
          "description": "Download current document as XML file",
          "commandName": "DownloadAsXml",
          "icon": "xml.bmp"
        },
        {
          "text": "-",
          "description": "This is a separator"
        },
        {
          "id": "FilePageSettings",
          "text": "Page Settings...",
          "description": "Open page settings dialog.",
          "commandName": "FilePageSettings",
          "icon": "pagesettings.bmp"
        },
        {
          "id": "FilePrint",
          "text": "Print...",
          "description": "Print current document.",
          "icon": "print.bmp"
        },
        {
          "id": "FilePrintCurrentPage",
          "text": "Print Current Page...",
          "icon": "print.bmp"
        },
        {
          "id": "FilePrintSelection",
          "text": "Print Selection...",
          "icon": "print.bmp"
        },
        {
          "text": "-",
          "description": "This is a separator"
        },
        {
          "id": "FileClose",
          "text": "Close Document",
          "icon": "close.bmp"
        }
      ]
    }
  ],
  "toolBars": [
    {
      "id": "ToolbarStart",
      "title": "Start",
      "groups": [
        {
          "text": "File",
          "childItems": [
            {
              "type": "button",
              "id": "btnOpen",
              "text": "Open",
              "commandName": "fileopen",
              "icon": "Open"
            },
            {
              "type": "button",
              "id": "btnSaveXml",
              "text": "Save XML",
              "commandName": "SaveXml",
              "icon": "SaveXml"
            },
            {
              "type": "button",
              "id": "btnSavePdf",
              "text": "Save PDF",
              "commandName": "SavePdf",
              "icon": "SavePdf"
            }
          ]
        },
        {
          "text": "Clipboard",
          "childItems": [
            {
              "type": "button",
              "id": "btnPaste",
              "text": "Paste",
              "commandName": "Paste",
              "icon": "paste"
            },
            {
              "type": "button",
              "id": "btnCut",
              "text": "Cut",
              "commandName": "Cut",
              "icon": "cut"
            },
            {
              "type": "button",
              "id": "btnCopy",
              "text": "Copy",
              "commandName": "Copy",
              "icon": "copy"
            },
            {
              "type": "button",
              "id": "btnFormatBrush",
              "text": "Format Painter",
              "commandName": "FormatBrush",
              "icon": "FormatBrush"
            }
          ]
        },
        {
          "text": "General",
          "childItems": [
            {
              "type": "button",
              "id": "btnUndo",
              "text": "Undo",
              "commandName": "Undo",
              "icon": "Undo"
            },
            {
              "type": "button",
              "id": "btnRedo",
              "text": "Redo",
              "commandName": "Redo",
              "icon": "Redo"
            }
          ]
        },
        {
          "text": "Font",
          "class": "font",
          "childItems": [
            {
              "type": "select",
              "id": "btnFontName",
              "commandName": "FontName",
              "childItems": [
                { "label": "SimSun", "value": "SimSun" },
                { "label": "A-Himalaya", "value": "A-Himalaya" },
                { "label": "Arial", "value": "Arial" },
                { "label": "Arial Black", "value": "Arial Black" },
                { "label": "Arial Narrow", "value": "Arial Narrow" },
                {
                  "label": "Arial Rounded MT Bold",
                  "value": "Arial Rounded MT Bold"
                },
                { "label": "Calibri", "value": "Calibri" },
                { "label": "Calibri Light", "value": "Calibri Light" },
                { "label": "DengXian", "value": "DengXian" },
                { "label": "DengXian", "value": "DengXian" },
                { "label": "DengXian Light", "value": "DengXian Light" },
                { "label": "DengXian Light", "value": "DengXian Light" },
                { "label": "FangSong", "value": "FangSong" },
                { "label": "FangSong", "value": "FangSong" },
                { "label": "KaiTi", "value": "KaiTi" },
                { "label": "KaiTi", "value": "KaiTi" },
                {
                  "label": "Microsoft Himalaya",
                  "value": "Microsoft Himalaya"
                },
                {
                  "label": "Microsoft JhengHei UI",
                  "value": "Microsoft JhengHei UI"
                },
                {
                  "label": "Microsoft JhengHei UI Light",
                  "value": "Microsoft JhengHei UI Light"
                },
                {
                  "label": "Microsoft Sans Serif",
                  "value": "Microsoft Sans Serif"
                },
                { "label": "Microsoft YaHei", "value": "Microsoft YaHei" },
                { "label": "Microsoft YaHei", "value": "Microsoft YaHei" },
                {
                  "label": "Microsoft YaHei Light",
                  "value": "Microsoft YaHei Light"
                },
                { "label": "Microsoft YaHei Light", "value": "Microsoft YaHei Light" },
                {
                  "label": "Microsoft YaHei UI",
                  "value": "Microsoft YaHei UI"
                },
                {
                  "label": "Microsoft YaHei UI Light",
                  "value": "Microsoft YaHei UI Light"
                },
                {
                  "label": "MingLiU_HKSCS-ExtB",
                  "value": "MingLiU_HKSCS-ExtB"
                },
                { "label": "MingLiU_HKSCS-ExtB", "value": "MingLiU_HKSCS-ExtB" },
                { "label": "MingLiU-ExtB", "value": "MingLiU-ExtB" },
                { "label": "MingLiU-ExtB", "value": "MingLiU-ExtB" },
                { "label": "NSimSun", "value": "NSimSun" },
                { "label": "NSimSun", "value": "NSimSun" },
                { "label": "PMingLiU-ExtB", "value": "PMingLiU-ExtB" },
                { "label": "PMingLiU-ExtB", "value": "PMingLiU-ExtB" },
                { "label": "SimHei", "value": "SimHei" },
                { "label": "SimHei", "value": "SimHei" },
                { "label": "SimSun", "value": "SimSun" },
                { "label": "SimSun-ExtB", "value": "SimSun-ExtB" },
                { "label": "STCaiyun", "value": "STCaiyun" },
                { "label": "STCaiyun", "value": "STCaiyun" },
                { "label": "STFangsong", "value": "STFangsong" },
                { "label": "STFangsong", "value": "STFangsong" },
                { "label": "STHupo", "value": "STHupo" },
                { "label": "STHupo", "value": "STHupo" },
                { "label": "STKaiti", "value": "STKaiti" },
                { "label": "STKaiti", "value": "STKaiti" },
                { "label": "STLiti", "value": "STLiti" },
                { "label": "STLiti", "value": "STLiti" },
                { "label": "STSong", "value": "STSong" },
                { "label": "STSong", "value": "STSong" },
                { "label": "STXihei", "value": "STXihei" },
                { "label": "STXihei", "value": "STXihei" },
                { "label": "STXingkai", "value": "STXingkai" },
                { "label": "STXingkai", "value": "STXingkai" },
                { "label": "STXinwei", "value": "STXinwei" },
                { "label": "STXinwei", "value": "STXinwei" },
                { "label": "STZhongsong", "value": "STZhongsong" },
                { "label": "STZhongsong", "value": "STZhongsong" },
                { "label": "Times New Roman", "value": "Times New Roman" },
                { "label": "Wingdings", "value": "Wingdings" },
                { "label": "Wingdings 2", "value": "Wingdings 2" },
                { "label": "Wingdings 3", "value": "Wingdings 3" },
                { "label": "Microsoft JhengHei", "value": "Microsoft JhengHei" },
                {
                  "label": "Microsoft JhengHei",
                  "value": "Microsoft JhengHei"
                },
                { "label": "Microsoft JhengHei Light", "value": "Microsoft JhengHei Light" },
                {
                  "label": "Microsoft JhengHei Light",
                  "value": "Microsoft JhengHei Light"
                },
                { "label": "FangSong_GB2312", "value": "FangSong_GB2312" },
                { "label": "FangSong_GB2312", "value": "FangSong_GB2312" },
                {
                  "label": "ShutiFang XiangJiaHong Brush Script",
                  "value": "ShutiFang XiangJiaHong Brush Script"
                },
                { "label": "Arial Unicode MS", "value": "Arial Unicode MS" }
              ]
            },
            {
              "type": "select",
              "id": "btnFontSize",
              "commandName": "FontSize",
              "childItems": [
                { "label": "Extra Large", "value": "63" },
                { "label": "Very Large", "value": "54" },
                { "label": "Initial", "value": "42" },
                { "label": "Small Initial", "value": "36" },
                { "label": "Size 1", "value": "26.25" },
                { "label": "Small Size 1", "value": "24" },
                { "label": "Size 2", "value": "21.75" },
                { "label": "Small Size 2", "value": "18" },
                { "label": "Size 3", "value": "15.75" },
                { "label": "Small Size 3", "value": "15" },
                { "label": "Size 4", "value": "14.25" },
                { "label": "Small Size 4", "value": "12" },
                { "label": "Size 5", "value": "10.5" },
                { "label": "Small Size 5", "value": "9" },
                { "label": "Size 6", "value": "7.5" },
                { "label": "Small Size 6", "value": "6.75" },
                { "label": "Size 7", "value": "5.25" },
                { "label": "Size 8", "value": "4.5" },
                { "label": "8", "value": "8" },
                { "label": "9", "value": "9" },
                { "label": "10", "value": "10" },
                { "label": "11", "value": "11" },
                { "label": "12", "value": "12" },
                { "label": "14", "value": "14" },
                { "label": "16", "value": "16" },
                { "label": "18", "value": "18" },
                { "label": "20", "value": "20" },
                { "label": "22", "value": "22" },
                { "label": "24", "value": "24" },
                { "label": "26", "value": "26" },
                { "label": "28", "value": "28" },
                { "label": "36", "value": "36" },
                { "label": "48", "value": "48" },
                { "label": "72", "value": "72" }
              ]
            },
            {
              "type": "br",
              "id": "",
              "commandName": "",
              "childItems": null
            },
            {
              "type": "button",
              "id": "btnBold",
              "text": "Bold",
              "commandName": "Bold",
              "icon": "Bold"
            },
            {
              "type": "button",
              "id": "btnitalic",
              "text": "Italic",
              "commandName": "Italic",
              "icon": "Italic"
            },
            {
              "type": "button",
              "id": "btnUnderLine",
              "text": "Underline",
              "commandName": "Underline",
              "icon": "UnderLine"
            },
            {
              "type": "button",
              "id": "btnStrikethrough",
              "text": "Strikethrough",
              "commandName": "Strikeout",
              "icon": "Strikethrough"
            },
            {
              "type": "colorPicker",
              "id": "btnFontColor",
              "text": "Font Color",
              "commandName": "ColorString",
              "icon": "FontColor"
            },
            {
              "type": "colorPicker",
              "id": "btnFontBackgroundColor",
              "text": "Font Background Color",
              "commandName": "BackgroundColorString",
              "icon": "FontBackgroundColor"
            },
            {
              "type": "button",
              "id": "btnSuperscript",
              "text": "Superscript",
              "commandName": "Superscript",
              "icon": "Superscript"
            },
            {
              "type": "button",
              "id": "btnSubscript",
              "text": "Subscript",
              "commandName": "Subscript",
              "icon": "Subscript"
            },
            {
              "type": "button",
              "id": "btnFontborder",
              "text": "Font Border",
              "commandName": "Fontborder",
              "icon": "Fontborder"
            },
            {
              "type": "button",
              "id": "btnCharacterCircle",
              "text": "Character Circle",
              "commandName": "CharacterCircle",
              "icon": "CharacterCircle"
            }
          ]
        },
        {
          "text": "Paragraph",
          "childItems": [
            {
              "type": "button",
              "id": "btnAlignLeft",
              "text": "Align Left",
              "commandName": "AlignLeft",
              "icon": "AlignLeft"
            },
            {
              "type": "button",
              "id": "btnAlignCenter",
              "text": "Center Align",
              "commandName": "AlignCenter",
              "icon": "AlignCenter"
            },
            {
              "type": "button",
              "id": "btnAlignRight",
              "text": "Right Align",
              "commandName": "AlignRight",
              "icon": "AlignRight"
            },
            {
              "type": "button",
              "id": "btnAlignDistribute",
              "text": "Justify",
              "commandName": "AlignDistribute",
              "icon": "AlignDistribute"
            },
            {
              "type": "button",
              "id": "btninsertorderedlist",
              "text": "Insert Ordered List",
              "commandName": "insertorderedlist",
              "icon": "insertorderedlist"
            },
            {
              "type": "button",
              "id": "btninsertunorderedlist",
              "text": "Insert Unordered List",
              "commandName": "insertunorderedlist",
              "icon": "insertunorderedlist"
            },
            {
              "type": "br",
              "id": "",
              "text": "",
              "commandName": "",
              "icon": ""
            },
            {
              "type": "button",
              "id": "btnIndent",
              "text": "Increase Indent",
              "commandName": "Indent",
              "icon": "Indent"
            },
            {
              "type": "button",
              "id": "btnLeftIndent",
              "text": "Decrease Indent",
              "commandName": "LeftIndent",
              "icon": "LeftIndent"
            },
            {
              "type": "dropdownList",
              "id": "btnlineSpacing",
              "text": "Line Spacing",
              "commandName": "lineSpacing",
              "icon": "lineSpacing",
              "childItems": [
                "1",
                "1.2",
                "1.5",
                "1.7",
                "2",
                "2.2",
                "2.5",
                "3",
                "<hr/>",
                "Remove Before Paragraph Spacing",
                "Remove After Paragraph Spacing"
              ]
            },
            {
              "type": "button",
              "id": "btnrowspacingTop",
              "text": "Before Paragraph Spacing",
              "commandName": "rowspacingTop",
              "icon": "rowspacingTop"
            },
            {
              "type": "button",
              "id": "btnrowspacingBottom",
              "text": "After Paragraph Spacing",
              "commandName": "rowspacingBottom",
              "icon": "rowspacingBottom"
            }
          ]
        },
        {
          "text": "Styles",
          "class": "Style",
          "childItems": [
            {
              "type": "fontStyle",
              "id": "btnfontStyle",
              "text": "Font Style",
              "commandName": "fontStyle",
              "icon": "fontStyle",
              "childItems": [
                {
                  "label": "bodyText",
                  "value": 14,
                  "fontSize": 14,
                  "fontWeight": 100
                },
                {
                  "label": "header1",
                  "value": 24,
                  "fontSize": 24,
                  "fontWeight": 700
                },
                {
                  "label": "header2",
                  "value": 22,
                  "fontSize": 22,
                  "fontWeight": 700
                },
                {
                  "label": "header3",
                  "value": 20,
                  "fontSize": 20,
                  "fontWeight": 700
                },
                {
                  "label": "header4",
                  "value": 18,
                  "fontSize": 18,
                  "fontWeight": 700
                },
                {
                  "label": "header5",
                  "value": 16,
                  "fontSize": 16,
                  "fontWeight": 700
                }
              ]
            }
          ]
        },
        {
          "text": "Mode",
          "class": "Mode",
          "childItems": [
            {
              "type": "button",
              "id": "btnReadonly",
              "text": "Read-only View Mode",
              "commandName": "Readonly",
              "icon": "Readonly"
            },
            {
              "type": "button",
              "id": "btnReadViewMode",
              "text": "Reading View Mode",
              "commandName": "ReadViewMode",
              "icon": "ReadViewMode"
            },
            {
              "type": "button",
              "id": "btnAdministratorViewMode",
              "text": "Administrator View Mode",
              "commandName": "AdministratorViewMode",
              "icon": "AdministratorViewMode"
            }
          ]
        },
        {
          "text": "Layout",
          "class": "Layout",
          "childItems": [
            {
              "type": "button",
              "id": "btnSingleColumn",
              "text": "Single Column",
              "commandName": "SingleColumn",
              "icon": "SingleColumn"
            },
            {
              "type": "button",
              "id": "btnMultiColumn",
              "text": "Multi Column",
              "commandName": "MultiColumn",
              "icon": "MultiColumn"
            },
            {
              "type": "button",
              "id": "btnHorizontal",
              "text": "Horizontal",
              "commandName": "Horizontal",
              "icon": "Horizontal"
            }
          ]
        },

        {
          "text": "Find",
          "childItems": [
            {
              "type": "button",
              "id": "btnSearch",
              "text": "Search",
              "commandName": "Search",
              "icon": "Search"
            }
          ]
        }
      ]
    },
    {
      "id": "ToolBarInsert",
      "title": "Insert",
      "groups": [
        {
          "text": "File",
          "childItems": [
            {
              "type": "button",
              "id": "btnInputFileText",
              "text": "Input",
              "commandName": "InputFileText",
              "icon": "InputFileText"
            },
            {
              "type": "button",
              "id": "btnInputFileTime",
              "text": "Time",
              "commandName": "InputFileTime",
              "icon": "InputFileTime"
            },
            {
              "type": "button",
              "id": "btnInputFileSelect",
              "text": "Select",
              "commandName": "InputFileSelect",
              "icon": "InputFileSelect"
            },
            {
              "type": "button",
              "id": "btnInputFileNumber",
              "text": "Number",
              "commandName": "InputFileNumber",
              "icon": "InputFileNumber"
            }
          ]
        },

        {
          "text": "Check",
          "childItems": [
            {
              "type": "button",
              "id": "btnRadioBox",
              "text": "Radio Button",
              "commandName": "RadioBox",
              "icon": "RadioBox"
            },
            {
              "type": "button",
              "id": "btncheckBox",
              "text": "Checkbox",
              "commandName": "checkBox",
              "icon": "checkBox"
            }
          ]
        },

        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnImage",
              "text": "Image",
              "commandName": "Image",
              "icon": "Image"
            }
          ]
        },
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnpagebreak",
              "text": "Page Break",
              "commandName": "Pagebreak",
              "icon": "Pagebreak"
            }
          ]
        },
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnPageIndex",
              "text": "Page Number",
              "commandName": "PageIndex",
              "icon": "PageIndex"
            }
          ]
        },

        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnSpecifyCharacter",
              "text": "Special Character",
              "commandName": "SpecifyCharacter",
              "icon": "SpecifyCharacter"
            }
          ]
        }
      ]
    },
    {
      "id": "ToolBarTable",
      "title": "Table",
      "groups": [
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnInsertTable",
              "text": "Insert Table",
              "commandName": "InsertTable",
              "icon": "Table"
            },
            {
              "type": "button",
              "id": "btnDeleteTable",
              "text": "Delete Table",
              "commandName": "DeleteTable",
              "icon": "DeleteTable"
            }
          ]
        },
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnMergeCells",
              "text": "Merge Cells",
              "commandName": "MergeCells",
              "icon": "MergeCells"
            },
            {
              "type": "button",
              "id": "btnSplitCells",
              "text": "Split Cells",
              "commandName": "SplitCells",
              "icon": "SplitCells"
            }
          ]
        },
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnTableBorder",
              "text": "Table Border",
              "commandName": "TableBorder",
              "icon": "TableBorder"
            }
          ]
        },
        {
          "text": "Rows and Columns",
          "childItems": [
            {
              "type": "button",
              "id": "btnInsertRowAbove",
              "text": "Insert Row Above",
              "commandName": "Table_InsertRowUp",
              "icon": "InsertRowAbove"
            },
            {
              "type": "button",
              "id": "btnInsertRowBelow",
              "text": "Insert Row Below",
              "commandName": "Table_InsertRowDown",
              "icon": "InsertRowBelow"
            },
            {
              "type": "button",
              "id": "btnInsertColumnLeft",
              "text": "Insert Column Left",
              "commandName": "Table_InsertColumnLeft",
              "icon": "InsertColumnLeft"
            },
            {
              "type": "button",
              "id": "btnInsertColumnRight",
              "text": "Insert Column Right",
              "commandName": "Table_InsertColumnRight",
              "icon": "InsertColumnRight"
            }
          ]
        },
        {
          "text": "Delete",
          "childItems": [
            {
              "type": "button",
              "id": "btnDeleteRow",
              "text": "Delete Row",
              "commandName": "Table_DeleteRow",
              "icon": "DeleteRow"
            },
            {
              "type": "button",
              "id": "btnDeleteColumn",
              "text": "Delete Column",
              "commandName": "Table_DeleteColumn",
              "icon": "DeleteColumn"
            }
          ]
        },
        {
          "text": "Alignment",
          "childItems": [
            {
              "type": "button",
              "id": "btnCellTopLeft",
              "text": "Top Left",
              "commandName": "AlignTopLeft",
              "icon": "CellTopLeft"
            },
            {
              "type": "button",
              "id": "btnCellTopMiddle",
              "text": "Top Center",
              "commandName": "AlignTopCenter",
              "icon": "CellTopMiddle"
            },
            {
              "type": "button",
              "id": "btnCellTopRight",
              "text": "Top Right",
              "commandName": "AlignTopRight",
              "icon": "CellTopRight"
            },
            {
              "type": "button",
              "id": "btnCellBottomLeft",
              "text": "Bottom Left",
              "commandName": "AlignBottomLeft",
              "icon": "CellBottomLeft"
            },
            {
              "type": "button",
              "id": "btnCellBottomMiddle",
              "text": "Bottom Center",
              "commandName": "AlignBottomCenter",
              "icon": "CellBottomMiddle"
            },
            {
              "type": "button",
              "id": "btnCellBottomRight",
              "text": "Bottom Right",
              "commandName": "AlignBottomRight",
              "icon": "CellBottomRight"
            },
            {
              "type": "button",
              "id": "btnCellCenterLeft",
              "text": "Middle Left",
              "commandName": "AlignMiddleLeft",
              "icon": "CellCenterLeft"
            },
            {
              "type": "button",
              "id": "btnCellCenterMiddle",
              "text": "Middle Center",
              "commandName": "AlignMiddleCenter",
              "icon": "CellCenterMiddle"
            },
            {
              "type": "button",
              "id": "btnCellCenterRight",
              "text": "Middle Right",
              "commandName": "AlignMiddleRight",
              "icon": "CellCenterRight"
            }
          ]
        }
      ]
    },
    {
      "id": "ToolBarPrintView",
      "title": "Print",
      "groups": [
        {
          "text": "Print",
          "childItems": [
            {
              "type": "button",
              "id": "btnPrint",
              "text": "Print All",
              "commandName": "Print",
              "icon": "Print"
            }
          ]
        },
        {
          "text": "Preview",
          "childItems": [
            {
              "type": "button",
              "id": "btnPrintPreview",
              "text": "Print Preview",
              "commandName": "PrintPreview",
              "icon": "PrintPreview"
            }
          ]
        },
        {
          "text": "关闭预览",
          "childItems": [
            {
              "type": "button",
              "id": "btnClosePrintPreview",
              "text": "Close Preview",
              "commandName": "ClosePrintPreview",
              "icon": "ClosePrintPreview"
            }
          ]
        },
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnPrintPreviewCurrentPage",
              "text": "Print Preview Current Page",
              "commandName": "PrintPreviewCurrentPage",
              "icon": "PrintPreviewCurrentPage"
            },
            {
              "type": "button",
              "id": "btnPrintCurrentPage",
              "text": "Print Current Page",
              "commandName": "PrintCurrentPage",
              "icon": "PrintCurrentPage"
            }
          ]
        },
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnPrintPageNumberbtn",
              "text": "Print Page Number",
              "commandName": "PrintPageNumberbtn",
              "icon": "PrintPageNumberbtn"
            },
            {
              "type": "button",
              "id": "btnPrintTheSpecifiedPage",
              "text": "Print Specified Page",
              "commandName": "PrintTheSpecifiedPage",
              "icon": "PrintTheSpecifiedPage"
            }
          ]
        },
        {
          "text": "",
          "childItems": [
            {
              "type": "button",
              "id": "btnPrintOddPages",
              "text": "Print Odd Pages",
              "commandName": "PrintOddPages",
              "icon": "PrintOddPages"
            },
            {
              "type": "button",
              "id": "btnPrintEvenPages",
              "text": "Print Even Pages",
              "commandName": "PrintEvenPages",
              "icon": "PrintEvenPages"
            }
          ]
        }
      ]
    }
  ],
  "ContextMenus": [
    {
      "elementType": "All",
      "id": "cmUndo",
      "text": "Undo",
      "commandName": "Undo",
      "icon": "undo.bmp"
    },
    {
      "elementType": "All",
      "id": "cmRedo",
      "text": "Redo",
      "commandName": "Redo",
      "icon": "redo.bmp"
    },
    {
      "text": "-",
      "description": "这是一个分隔符"
    },
    {
      "elementType": "All",
      "id": "cmCopy",
      "text": "Copy",
      "commandName": "Copy",
      "icon": "copy.bmp"
    },
    {
      "elementType": "All",
      "id": "cmPaste",
      "text": "Paste",
      "commandName": "Paste",
      "icon": "paste.bmp"
    },
    {
      "elementType": "All",
      "id": "cmCut",
      "text": "Cut",
      "commandName": "Cut",
      "icon": "cut.bmp"
    },
    {
      "elementType": "All",
      "id": "cmCopyAsText",
      "text": "Copy as Text",
      "commandName": "CopyAsText",
      "icon": "copy.bmp"
    },
    {
      "elementType": "All",
      "id": "cmPasteAsText",
      "text": "Paste as Text",
      "commandName": "PasteAsText",
      "icon": "paste.bmp"
    },
    {
      "text": "-",
      "description": "这是一个分隔符"
    },
    {
      "elementType": "DCInputFieldElement",
      "id": "cmInputFieldProperties",
      "text": "Field Properties",
      "commandName": "InputFieldProperties",
      "icon": "properties.bmp"
    },
    {
      "elementType": "DCImageElement",
      "id": "cmImageProperties",
      "text": "Image Properties",
      "commandName": "ImageProperties",
      "icon": "properties.bmp"
    },
    {
      "elementType": "DCCheckBoxElement",
      "id": "cmCheckBoxProperties",
      "text": "Checkbox Properties",
      "commandName": "CheckBoxProperties",
      "icon": "properties.bmp"
    },
    {
      "elementType": "DCRadioBoxElement",
      "id": "cmRadioProperties",
      "text": "Radio Button Properties",
      "commandName": "RadioProperties",
      "icon": "properties.bmp"
    },
    {
      "elementType": "DCPageInfoElement",
      "id": "cmPageInfoProperties",
      "text": "Page Info Properties",
      "commandName": "PageInfoProperties",
      "icon": "properties.bmp"
    },
    {
      "text": "-"
    },
    {
      "elementType": "DCTableElement",
      "id": "cmTableProperties",
      "text": "Table Properties",
      "commandName": "TableProperties",
      "icon": "table.bmp"
    },
    {
      "elementType": "DCTableRowElement",
      "id": "cmTableRowProperties",
      "text": "Table Row Properties",
      "commandName": "TableRowProperties",
      "icon": "tablerow.bmp"
    },
    {
      "elementType": "DCTableCellElement",
      "id": "cmTableCellProperties",
      "text": "Table Cell Properties",
      "commandName": "TableCellProperties",
      "icon": "tablecell.bmp"
    },
    {
      "text": "-"
    },
    {
      "elementType": "DCTableCellElement",
      "text": "Table Rows and Columns",
      "childItems": [
        {
          "elementType": "DCTableCellElement",
          "id": "cmDeleteRow",
          "text": "Delete Row",
          "commandName": "Table_DeleteRow"
        },
        {
          "elementType": "DCTableCellElement",
          "id": "cmDeleteColumn",
          "text": "Delete Column",
          "commandName": "Table_DeleteColumn"
        },
        {
          "text": "-"
        },
        {
          "elementType": "DCTableCellElement",
          "id": "cmInsertRowUp",
          "text": "Insert Row Above",
          "commandName": "Table_InsertRowUp"
        },
        {
          "elementType": "DCTableCellElement",
          "id": "cmInsertRowDown",
          "text": "Insert Row Below",
          "commandName": "Table_InsertRowDown"
        },
        {
          "elementType": "DCTableCellElement",
          "id": "cmInsertColumnLeft",
          "text": "Insert Column Left",
          "commandName": "Table_InsertColumnLeft"
        },
        {
          "elementType": "DCTableCellElement",
          "id": "cmInsertColumnRight",
          "text": "Insert Column Right",
          "commandName": "Table_InsertColumnRight"
        }
      ]
    }
  ]
};




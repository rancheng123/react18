/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
  // config.uiColor = '#AADC6E';

  config.language ="zh-cn";// pageData.lang == "zh" ? "zh-cn" : "en";

  // if(window.systemType == "Moblie")
  // {
  //   var _groups = [{ name: 'basicstyles', groups: ['basicstyles','cleanup']},
  //                  { name: 'colors'},{ name: 'links' },"/",
  //                  { name: 'paragraph', groups: ['indent','align'] },
  //                  { name: 'clipboard',groups: [ 'clipboard']},
	// 				{ name: 'styles' },{ name: 'others'},{name:'wraptext'}
				   
				   
	// 			   ];
  // }
  // else
  // {
  //   var _groups = [
  //       { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
  //       { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
  //           { name: 'paragraph',   groups: ['textindent',  'indent','align' ] },
  //           { name: 'colors' },"/",{ name: 'others' },{ name: 'styles' },"/",
  //           { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
  //           { name: 'links' },{name:'wraptext'}
  //       ];
  // }

  config.toolbar = [
   ['Sourcedialog'],['Bold'],['Italic'],['Underline'],['Strike'],['Subscript'],['Superscript'], ['RemoveFormat'],['Outdent'],['Indent'],
   ['JustifyLeft'],['JustifyCenter'],['JustifyRight'],['JustifyBlock'],
   ['TextColor'],['BGColor'],
   ['lineheight'],['NumberedList'],['BulletedList'],
   "/",
   ['Format'],
   ['Font'],
   ['FontSize'],
   ['Cut'], ['Copy'], ['Paste'], ['PasteText'], ['PasteFromWord'],
   ['Undo'],['Redo'],
   ['Link'],['Unlink'],['Anchor'],
   ['Table']
 ];

//   config.toolbarGroups = [
//     { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
//     { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
//     { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
//     { name: 'forms' },
//     '/',
//     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
//     { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
//     { name: 'links' },
//     { name: 'insert' },
//     '/',
//     { name: 'styles' },
//     { name: 'colors' },
//     { name: 'tools' },
//     { name: 'others' },
//     { name: 'about' }
// ];
  config.removeButtons  = 'Image,Maximize,SpecialChar,About,SpellChecker,Scayt,ShowBlocks,Blockquote';
   
  config.extraPlugins = 'colorbutton,panelbutton,list,liststyle,floatpanel,panel,button,colordialog,dialog,dialogui,richcombo,justify,font,lineheight,letterspacing,indent,indentblock,textindent,wraptext,htmlwriter,sourcedialog';

  config.allowedContent = true

  config.colorButton_enableMore = true;
  
  config.entities = false;
   
  config.htmlEncodeOutput = false;

  config.indentation = 36;
  
  // config.fontSize_sizes = "12px;13px;14px;15px;16px;17px;18px;19px;20px;21px;22px;23px;24px;25px;26px;27px;28px;29px;30px;31px;32px;33px;34px;35px;36px;37px;38px;39px;40px;41px;42px;43px;44px;45px;46px;47px;48px;49px;50px;60px;70px;";

  config.fontSize_sizes = "1.2rem;1.3rem;1.4rem;1.5rem;1.6rem;1.7rem;1.8rem;1.9rem;2rem;2.1rem;2.2rem;2.3rem;2.4rem;2.5rem;2.6rem;2.7rem;2.8rem;2.9rem;3.0rem;3.1rem;3.2rem;3.3rem;3.4rem;3.5rem;3.6rem;3.7rem;3.8rem;3.9rem;4.0rem;4.1rem;4.2rem;4.3rem;4.4rem;4.5rem;4.6rem;4.7rem;4.8rem;4.9rem;5rem;6rem;7rem;";
  //字体
  config.font_names=(()=>{
    const font = "微软雅黑,Microsoft YaHei,STHeiti Light;楷体,KaiTi,STKaiti;宋体,SimSun,STSong;仿宋,FangSong,STFangsong;方正舒体;方正姚体;隶书;华文彩体;华文细黑,STHeiti Light;华文行楷,STKaiti;华文中宋,SimSun,STSong;幼圆;汉仪立黑简,Hiragino Sans GB;正中黑简体,Hiragino Sans GB;造字工房尚黑G0v1纤细体;Arial;Arial Bold;Arial Italic;AngsanaUPC;Aparajita;ArabicTypesetting;Arial MT;Anton;Book Antiqua;Book Antiqua Bold;Broadway;Calisto MT;Chaparral Pro;Cookie;Dillenia UPC;Edwardian Script ITC;Eucrosia UPC;Forum;Formula Serial;Franklin Gothic Heavy;Futura BT;Gautami;Gill Sans MT;DUAL;HelveticaNeue;IrisUPC;Kunstler Script;KozGoPr6N;Leelawadee UI;Lucida Sans;Mr De Haviland;Monaco;MinionPro;MinionPro-Italic;MyriadPro;Museo_500;Monoton;Open Sans Condensed;Open Sans Condensed-ext;Oswald;PalaceScriptMT;Palatino;Perpetua;Roboto-Medium;SourceHanSansCN;Sacramento;SegoeUI;Simplified Arabic;Sylfaen;Times New Roman;Urdu Typesetting;Univers-CE-Medium;Univers-CE-Bold;Vani;Verdana;Vijaya;Vladimir;Vrinda";
    return window.cmsfont?window.cmsfont+font:font;
  })();

};




import Dispatcher from '@/system/tools/dispatcher'

/**
* @method changeText 修改控件文本
*/
export function changeText(id, e) {
  // window.CKEDITOR_BASEPATH = `${window.location.origin}/desktop/Public/Script/plugin/ckeditor/`; 
  window.CKEDITOR_BASEPATH = `${window.location.origin}/plugin/ckeditor/`;

  //调用ckeditor
  window.public.ckeditor.then(() => {
    let _editor = window.CKEDITOR.instances;

    if (!_editor.editor) {
      const fnName = `${id}_get`;
      const {
        data: {
          document_data
        }
      } = Dispatcher.dispatch(fnName);
      _editor = window.CKEDITOR.inline('editor');
      window.public.dom.querySelector(`#${id}`).style.visibility = "hidden";

      _editor.setData(document_data.text, {
        callback: () => {
          _editor.focus(true);
        }
      });

      _editor.on("change", change.bind(null, id));

      _editor.on("blur", blur.bind(null, id)); //动态插入个蒙层，在失去焦点后，删除掉，修复编辑器根据选中控件位置变化的问题 


      let editorShow = document.createElement("div");
      editorShow.className = "editorShow";
      document.querySelector(".property-modal").appendChild(editorShow);
    }
  });
}
/**
 * @function blur 失去焦点时执行方法
 */
function blur(id, e) {
  // property.setState((prev,prop)=>{
  //     prev.selected.editorShow = "none",
  //     prev.selected.editable = "false",
  //     prev.property.selectId = "",
  //     prev.selectedCss.minHeight = this.height;
  // });
  document.querySelector(".editorShow").remove();
  Dispatcher.dispatch(`${id}_set`, {
    args: [`document_data.text`, e.editor.getData()]
  });
  e.editor.setData(""), e.editor.destroy();
  window.public.dom.querySelector(`#${id}`).style.visibility = "visible";
  document.querySelector("#editor").remove(); //    Control.siteData.setData("document_data/dataQuery/text",e.editor.getData(),"",true);
  //    Public.storage.gets("header").setState({unclick:false});
  //    e.editor.setData(""),e.editor.destroy();
}
/**
 * @function change 修改文本时触发方法
 * @param {object} e 事件对象 
 */
function change(id, e) {
  if (e.editor.getData()) {
    Dispatcher.dispatch(`${id}_set`, {
      args: [`document_data.text`, e.editor.getData()]
    });
  }
  // let offsetHeight= window.public.dom.querySelector(`#${id}`).offsetHeight||10;
  // if(document.querySelector(".ediBox")){
  //     document.querySelector(".ediBox").style.minHeight = offsetHeight + "px";
  // }
  //document.querySelector(".ediBox").style.minHeight = _height + "px";
  //e.editor.setData(""),e.editor.destroy();
  // const _height = e.editor.element.$.offsetHeight; 
  // //如果文本当前高度与初始奥杜的差大于2，更改选中框高度
  // if(_height > 0 && Math.abs(_height - this.height) > 2)
  // {
  //     this.height = _height;
  //     document.querySelector(".ediBox").style.minHeight = _height + "px";
  // }

}

// function init(editor){
//     editor.ui.getEditableElement().parentElement.insertBefore(
//         editor.ui.view.toolbar.element,
//         editor.ui.getEditableElement()
//     );
// }
// function blur(id,event,editor){
//     Dispatcher.dispatch(`${id}_set`,{
//         args:[`document_data.text`,editor.getData()]
//     })
//     reactDom.unmountComponentAtNode(document.querySelector("#editor"));
// }
// function focus(id){
//     Dispatcher.dispatch(`${id}_set`,{
//         args:[`document_data.text`,""]
//     })
// }

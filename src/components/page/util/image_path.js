const ImagePath = {
  /**
  * @method imageUri 返回图片拼接好的路径
  * @date 2019-11-14
  * @author sxt
  * @param {object} prop{uri:图片路径,quality:图片质量,dataRetain:"原格式"} 属性对象
  * return {string} 图片链接路径
  */
  imageUri(prop) {
    if (prop) {
      let uri = prop.uri,
          dataRetain = prop.dataRetain || "noRetain",
          quality = prop[`quality`];

      if (uri && quality) {
        const index = uri.indexOf("@!");

        if (index >= 0) {
          uri = uri.substring(0, index);
        }

        if (quality != "original") {
          uri = `${uri}@!${dataRetain == "retain" ? "w" : "jw"}${parseInt(quality)}`;
        }

        return uri;
      } else {
        return uri;
      }
    }
  }

};

export default ImagePath;

//# sourceURL=webpack:///./components/page/util/image_path.js?
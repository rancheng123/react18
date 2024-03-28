// import {} from "../resource/image/image_resource_controler"
async function resourceManager(type) {
  let _type = type.slice(0, 1).toUpperCase() + type.slice(1);

  return import(`./${type}/${type}_resource_controler`).then(module => {
    return module[`${_type}ResourceControler`];
  });
}

export default resourceManager;

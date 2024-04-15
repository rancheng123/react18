export const Console = {
  log(siteId){
      siteId == window.pageData.siteId 
      &&
      console.log.apply(this,[...arguments].slice(1))
  }
}
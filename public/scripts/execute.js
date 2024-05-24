(() => {
    // 链接顶部底部绑定事件
    const backDom = document.querySelectorAll("div[data-functionback");
    backDom.forEach(v => {
        v.addEventListener("click", (event) => {
            let value = event.target.getAttribute("data-functionback");
            if (value) {
                let _path = value.split("/")
                let _dir = _path[2]
                //头部、底部时
                if (/top|bottom/.test(_dir)) {
                    document.documentElement.scrollTop = _dir == "top" ? 0 : document.documentElement.scrollHeight;
                }

                event.preventDefault();
            }
        })
    })



    // 链接弹框绑定事件
    const lightboxDom = document.querySelectorAll("div[data-lightbox");
    lightboxDom.addEventListener('click', () => {
        const popupContainer = document.getElementById('popupContainer')
        popupContainer.style.display = 'block'
    })
})


function upload(selector, options = {}) {
  const input = document.querySelector(selector)

  const car = document.getElementById("car")
  const resiz = document.getElementById("for__resize")
  const content = document.getElementById("content")



  const open = document.createElement('button')
  open.classList.add('btn', 'btn-primary')
  open.textContent = 'Отркыть изображение'

  if (options.multi) {
    input.setAttribute('multiple', true)
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }


  input.insertAdjacentElement('afterend', open)

  const triggerInput = () => input.click()
  const changeHandler = event => {
    if (!event.target.files.length) {
      return
    }

    const files = Array.from(event.target.files)

    content.innerHTML = ''
    const img = document.getElementById('resize__img')
    if (img) {
      img.parentNode.removeChild(img)
    }

    files.forEach(file => {
      if (!file.type.match('image')) {
        return
      }

      const reader = new FileReader()


      reader.onload = ev => {
        const src = ev.target.result
        content.insertAdjacentHTML('afterbegin',
          `<div class="for__resize" id="for__resize" data-name="${file.name}">
            <img src="${src}" alt="${file.name}" class="resize__img" id="resize__img"/>
            <i class="bi bi-arrow-clockwise" id="bi"></i>
            <div class="resizer ne" data-name="${file.name}"></div>
            <div class="resizer nw" data-name="${file.name}"></div>
            <div class="resizer sw" data-name="${file.name}"></div>
            <div class="resizer se" data-name="${file.name}"></div>
          </div>
        `)
        let rotate = document.getElementById('bi')
        let currentRotate = 0;
        let img = document.querySelector('.resize__img')

        rotate.addEventListener("click", function () {
          currentRotate = currentRotate ? 0 : 90;
          img.style.transform = "rotate(" + currentRotate + "deg)";
          img.style.transition = "transform 1s";
        })

        const el = document.querySelector(".for__resize")
        let isResizeng = false
        el.addEventListener('mousedown', mousedown)

        function mousedown(e) {
          window.addEventListener('mousemove', mousemove)
          window.addEventListener('mouseup', mouseup)

          let prevX = e.clientX;
          let prevY = e.clientY;

          function mousemove(e) {
            if (!isResizeng) {
              let newX = prevX - e.clientX
              let newY = prevY - e.clientY

              const rect = el.getBoundingClientRect()

              el.style.left = rect.left - newX + "px";
              el.style.top = rect.top - newY + "px";

              prevX = e.clientX
              prevY = e.clientY
            }
          }

          function mouseup() {
            window.removeEventListener('mousemove', mousemove)
            window.removeEventListener('mouseup', mouseup)
          }
        }
        const resizers = document.querySelectorAll(".resizer")
        let currentResizer;
        let res = document.getElementById("for__resize")

        for (let resizer of resizers) {
          resizer.addEventListener('mousedown', mousedown)

          function mousedown(e) {
            currentResizer = e.target
            isResizeng = true

            let prevX = e.clientX
            let prevY = e.clientY

            window.addEventListener('mousemove', mousemove)
            window.addEventListener('mouseup', mouseup)

            function mousemove(e) {

              const rect = el.getBoundingClientRect()

              if (currentResizer.classList.contains("se") && currentResizer.dataset.name == res.dataset.name) {
                el.style.width = rect.width - (prevX - e.clientX) + "px"
                el.style.height = rect.height - (prevY - e.clientY) + "px"
              }
              else if (currentResizer.classList.contains("sw") && currentResizer.dataset.name == res.dataset.name) {
                el.style.width = rect.width + (prevX - e.clientX) + "px"
                el.style.height = rect.height - (prevY - e.clientY) + "px"
                el.style.left = rect.left - (prevX - e.clientX) + "px"
              }
              else if (currentResizer.classList.contains("ne") && currentResizer.dataset.name == res.dataset.name) {
                el.style.width = rect.width - (prevX - e.clientX) + "px"
                el.style.height = rect.height + (prevY - e.clientY) + "px"
                el.style.top = rect.top - (prevY - e.clientY) + "px"
              }
              else if(currentResizer.classList.contains("nw") && currentResizer.dataset.name == res.dataset.name){
                el.style.width = rect.width + (prevX - e.clientX) + "px"
                el.style.height = rect.height + (prevY - e.clientY) + "px"
                el.style.top = rect.top - (prevY - e.clientY) + "px"
                el.style.left = rect.left - (prevX - e.clientX) + "px"
              }

              prevX = e.clientX;
              prevY = e.clientY;
            }

            function mouseup() {
              window.removeEventListener('mousemove', mousemove)
              window.removeEventListener('mouseup', mouseup)
              isResizeng = false
            }
          }
        }

      }

      reader.readAsDataURL(file)
    })
  }

  open.addEventListener('click', triggerInput)
  input.addEventListener('change', changeHandler)


}


upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg']
})








import anime from 'animejs';

export function galeryBanner(iten) {
  var currentImage = -1;
  var inerContent = document.createElement("aside")
  inerContent.classList.add("bunnerButtons")
  var container = document.createElement('div');
  
  var images = iten.getElementsByClassName('ban');
  var updates = false;
  var animating = false;
  var lastTimeout = null;

  var startUpdate = () => {
    console.log("start")
    if (lastTimeout) clearTimeout(lastTimeout);
    if (updates) return
    updates = true;
    lastTimeout = timeOut;
    lastTimeout();
  }

  var loopImages = () => {
    if (updates && lastTimeout) {
      showIten(currentImage + 1)
      lastTimeout()
    }
  }

  var timeOut = () => setTimeout(loopImages, 7000)


  var stopUpdate = () => {
    console.log("stop")
    clearTimeout(lastTimeout)
    lastTimeout = null;
    updates = false;
  }

  var showIten = (iten) => {
    if (iten === currentImage || animating) return;
    iten = iten > images.length - 1 ? 0 : iten;
    console.log(iten);
    animating = true
    if (currentImage > -1) {
      var closeThis = images[currentImage]
      anime({
        targets: images[currentImage].getElementsByTagName("a"),
        duration: 1800,
        opacity: 0,
        elasticity: 2
      })
      anime({
        targets: images[currentImage].getElementsByClassName("img"),
        duration: 500,
        opacity: 0,
        elasticity: 2
      })
      anime({
        targets: images[currentImage].getElementsByTagName("h2"),
        duration: 800,
        opacity: 0,
        elasticity: 2,
        delay: function(el, i) {
          return 200 + 15 * i;
        }
      })
      anime({
        targets: images[currentImage].getElementsByClassName("bkg"),
        duration: 1200,
        opacity: 0,
        elasticity: 2,
        delay: 500,
        complete: function(anim){
          // images[currentImage].setAttribute("style" , "display:none;")
          anime({
            targets: closeThis,
            duration: 0,
            right: ["-100%",-105],
            elasticity: 0
          })
        }
      })
    }

    currentImage = iten;
    // images[currentImage].setAttribute("style" , "display:block;")    

    
    anime({
      targets: images[currentImage],
      duration: 0,
      right: 0,
      elasticity: 0,
      delay: 1,
    })

    
    anime({
      targets: images[currentImage].getElementsByClassName("bkg"),
      duration: 2500,
      opacity: 1,
      elasticity: 1,
      delay: 950,
    })
    anime({
      targets: images[currentImage].getElementsByTagName("h2"),
      duration: 1100,
      opacity: 1,
      elasticity: 1,
      marginLeft:["25em" , 0],
      delay: function(el, i) {
        return 1000 + 100 * i;
      }
    })
    anime({
      targets: images[currentImage].getElementsByTagName("a"),
      duration: 800,
      opacity: 1,
      elasticity: 1,
      delay: 1800,
      complete: function(anim) {
        animating = false
      }
    })
    anime({
      targets: images[currentImage].getElementsByClassName("img"),
      duration: 800,
      opacity: 1,
      elasticity: 1,
      delay: 1800,      
      delay: 2100
    })

  }


  var buttonClick = (iten) => {
    var result = 0;
    if (iten === 'next') {
      result = currentImage + 1 === images.length ? 0 : currentImage + 1
    } else {
      result = currentImage === 0 ? images.length - 1 : currentImage - 1
    }
    showIten(result)
  }

  var createButton = (iten) => {
    var button = document.createElement('div')
    button.classList.add(iten);
    var icon = document.createElement('i')
    icon.classList.add("fa");
    icon.classList.add((iten === "next" ? "fa-angle-right" : "fa-angle-left"));
    button.appendChild(icon)
    container.appendChild(button)
    button.addEventListener("click", (evt) => buttonClick(iten))
  }

  createButton('prev')
  createButton('next')

  inerContent.appendChild(container);
  iten.appendChild(inerContent);

  showIten(0);

  return {
    stop: stopUpdate,
    start: startUpdate
  }

}


// WEBPACK FOOTER //
// ./src/components/bannerdefault/index.js
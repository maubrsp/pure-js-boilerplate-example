import anime from 'animejs';

const createButtonImage = (iten, actions) => {


  var onItenClicked = (iten) => {
    actions.stop();
    console.log("clicked", iten)
    var inerContent = document.createElement("aside")
    inerContent.classList.add("imageModal")
    inerContent.innerHTML = iten.innerHTML;
    var bts = document.createElement("div")
    bts.classList.add("buttons")
    var resultBts = '<div class="prev"><i class="fa fa-angle-left"></i></div><div class="next"><i class="fa fa-angle-right"></i></div>';
    bts.innerHTML = resultBts;
    inerContent.appendChild(bts);
    document.body.appendChild(inerContent);

    var updates = false;
    var animating = false;
    var lastTimeout = null;
    var currentImage = -1;
    var images = inerContent.getElementsByClassName('img');



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
        showImgIten(currentImage + 1)
        lastTimeout()
      }
    }

    var timeOut = () => setTimeout(loopImages, 12500)


    var stopUpdate = () => {
      console.log("stop")
      clearTimeout(lastTimeout)
      lastTimeout = null;
      updates = false;
    }

    var showImgIten = (iten) => {
      if (iten === currentImage || animating) return;
      iten = iten > images.length - 1 ? 0 : iten;
      console.log(iten, "show");
      animating = true
      if (currentImage > -1) {
        anime({
          targets: images[currentImage],
          duration: 1500,
          opacity: 0,
          left: 0,
          top: -50,
          translateY: -50,
          elasticity: 2
        })
      }
      currentImage = iten;
      anime({
        targets: images[currentImage],
        duration: 1450,
        opacity: 1,
        top: ["-50%", 33],
        translateY: ["50%", -33],
        left: 0,
        elasticity: 2,
        delay: 10,
        complete: function(anim) {
          animating = false
        }

      })
    }

    currentImage = 1;
    showImgIten(0);

    inerContent.getElementsByClassName("prev")[0].addEventListener("click", (evt) => {
      console.log("prev")
      evt.stopImmediatePropagation();
      evt.preventDefault()
      showImgIten(currentImage <= 0 ? images.length - 1 : currentImage - 1)
    })
    inerContent.getElementsByClassName("next")[0].addEventListener("click", (evt) => {
      console.log("next")
      evt.preventDefault()
      evt.stopImmediatePropagation();
      showImgIten(currentImage + 1)
    })
    inerContent.addEventListener("click", (evt) => closeModal(document.body.getElementsByClassName("imageModal")[0]))

    anime({
      targets: inerContent,
      width: ["10vw", 120],
      height: ["10vh", 120],
      duration: 750,
      top: ['40%', -10],
      left: ['40%', -10],
      elasticity: 5
    })

  }

  var closeModal = (iten) => {

    anime({
      targets: iten,
      width: ["120vw", 10],
      height: ["120vh", 10],
      opacity: 0,
      duration: 550,
      top: ['-10%', 40],
      left: ['-10%', 40],
      elasticity: 2,
      complete: function(anim) {
        document.body.removeChild(iten);
        actions.start();
      }
    })

  }


  var onItenHover = (iten) => {
    //console.log("hovered", iten , iten.getElementsByClassName("letter"))
    console.log("hover", iten)

  }


  var onItenOut = (iten) => {
    console.log("out", iten)
  }

  console.log("add image buttons", iten)
  iten.addEventListener("click", (evt) => onItenClicked(iten))
  iten.addEventListener("mouseover", (evt) => onItenHover(iten))
  iten.addEventListener("mouseout", (evt) => onItenOut(iten))


}

export function galeryItens(dom, scope) {

  var updates = false;
  var animating = false;
  var currentImage = 0;

  var images = dom.getElementsByClassName("iten");
  var buttons = dom.getElementsByClassName("buttons")[0].getElementsByTagName("div");
  var lastTimeout = null;
  console.log("mount gallerry")

  var startUpdate = () => {
    console.log("start")
    if (lastTimeout !== null) clearTimeout(lastTimeout);
    if (updates === true) return
    updates = true;
    lastTimeout = timeOut;
    loopImages();
  }

  var loopImages = () => {
    if (updates && lastTimeout) {
      showIten(currentImage + 1)
      lastTimeout()
    }
  }

  var timeOut = () => setTimeout(loopImages, 8500)


  var stopUpdate = () => {
    console.log("stop")
    clearTimeout(lastTimeout)
    lastTimeout = null;
    updates = false;
    anime({
      targets: images[currentImage],
      duration: 50,
      // left: ['0%', -100],
      opacity: 0,
      elasticity: 0,
      complete: () =>{
        
      }
    })
    anime({
      targets: buttons[currentImage],
      duration: 100,
      opacity: 0.5,
      scale: 1,
      elasticity: 2,
      delay: 0
    })
  }

  var showIten = (iten ) => {
    if (iten === currentImage || animating) return;
    iten = iten > images.length - 1 ? 0 : iten;
    console.log("show itens carrossel");
    // console.log(iten);
    animating = true
    let hasDelay = false;
    if (currentImage > -1) {
      anime({
        targets: images[currentImage],
        duration: 800,
        // left: ['0%', -100],
        opacity: 0,
        elasticity: 0
      })
      anime({
        targets: buttons[currentImage],
        duration: 250,
        opacity: 0.5,
        scale: 1,
        elasticity: 2,
        delay: 10
      })
      hasDelay = true;
    }
    currentImage = iten;
    anime({
      targets: images[currentImage],
      duration: 750,
      // left: ['100%', 0],
      opacity: 1,
      elasticity: 4,
      delay: hasDelay === true ? 300 : 0,
      complete: function(anim) {
        animating = false
      }

    })
    anime({
      targets: images[currentImage].getElementsByTagName("img"),
      duration: 950,
      // left: ['100%', 0],
      opacity: [0,1],
      scale: [0.7,1],
      elasticity: 100,
      delay: hasDelay === true ? 450 : 0,

    })
    anime({
      targets: buttons[currentImage],
      duration: 250,
      opacity: 1,
      scale: 1.2,
      elasticity: 2,
      delay: 10
    })

  }


  var buttonClick = (iten) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout)
      lastTimeout = null
    }
    showIten(iten)
  }

  var createButton = (ref) => {
    var button = buttons[ref]
    button.addEventListener("click", (evt) => buttonClick(ref))
  }

  for (var i = 0; i < images.length; i++) {
    createButton(i);
  }

  showIten(0);

  // var menuScrool = scrollMonitor.create(dom);
  scope.enterViewport = () => {
    console.log("enter view port")
    startUpdate();
  };

  scope.exitViewport = () => {
    console.log("exit view port" , lastTimeout)
    stopUpdate();
  };

}



// export function galeryClientes(dom) {
//   console.log("init galleru cliente", dom);
//   var itens = []

//   var iten = dom.getElementsByClassName("itens")[0].getElementsByTagName("section")

//   var startAnime = () => {
//     for (var i = 0; i < itens.length; i++) {
//       itens[i].start();
//     }
//   }

//   var stopAnime = () => {
//     for (var i = 0; i < itens.length; i++) {
//       itens[i].stop();
//     }
//   }


//   var menuScrool = scrollMonitor.create(dom);
//   menuScrool.enterViewport(val => {
//     console.log("enter view port")
//     startAnime()
//   });

//   menuScrool.exitViewport(val => {
//     console.log("exit view port")
//     stopAnime();
//   });

//   for (var i = 0; i < iten.length; i++) {
//     var gal = makeGallery(iten[i], {
//       start: startAnime,
//       stop: stopAnime
//     })
//     itens.push(gal);
//   }


//   return {
//     stop: () => {
            
//     },
//     start: () => {
      
//     }
//   }
// }

const makeGallery = (iten, actions) => {
  console.log(iten, "<<<<<")

  var updates = false;
  var animating = false;
  var currentImage = 0;

  var images = iten.getElementsByClassName("img");
  var buttons = iten.getElementsByClassName("buttons")[0].getElementsByTagName("div");
  var lastTimeout = null;


  var startUpdate = () => {
    console.log("start")
    if (lastTimeout) clearTimeout(lastTimeout);
    if (updates) return
    updates = true;
    lastTimeout = timeOut;
    loopImages();
  }

  var loopImages = () => {
    if (updates && lastTimeout) {
      showIten(currentImage + 1)
      lastTimeout()
    }
  }

  var timeOut = () => setTimeout(loopImages, 4500)


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
      anime({
        targets: images[currentImage],
        duration: 1500,
        left: ['0%', -100],
        opacity: 0,
        elasticity: 2
      })
      anime({
        targets: buttons[currentImage],
        duration: 250,
        opacity: 0.5,
        scale: 1,
        elasticity: 2,
        delay: 10
      })
    }
    currentImage = iten;
    anime({
      targets: images[currentImage],
      duration: 750,
      left: ['100%', 0],
      opacity: 1,
      elasticity: 2,
      delay: 10,
      complete: function(anim) {
        animating = false
      }

    })
    anime({
      targets: buttons[currentImage],
      duration: 250,
      opacity: 1,
      scale: 1.2,
      elasticity: 2,
      delay: 10
    })

  }


  var buttonClick = (iten) => {
    showIten(iten)
  }

  var createButton = (ref) => {
    var button = buttons[ref]
    button.addEventListener("click", (evt) => buttonClick(ref))
  }

  for (var i = 0; i < images.length; i++) {
    createButton(i);
  }


  showIten(0);

  //createButtonImage(iten.getElementsByClassName("galery")[0], actions);


  return {
    stop: stopUpdate,
    start: startUpdate
  }

}

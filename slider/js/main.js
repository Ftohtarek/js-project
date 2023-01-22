class Slider {
    // require variable 
    imgs = document.querySelectorAll("#home img")
    sliderImg = document.getElementById("slider-img")
    slider = document.getElementById("slider")
    nextIcon = document.getElementById("next");
    prevIcon = document.getElementById("prev");
    closeIcon = document.getElementById("close")
    currentIndex = 0;


    constructor() {
        /* Events */
        /* Intiate Event in image to open slider  */
        this.imgs.forEach((img, index) => {
            img.addEventListener("click", (event) => {
                this.open(index)
            })
        })
        // clickable Event 
        /* close icon Event */
        this.closeIcon.addEventListener('click', this.close)
        // close when click out side img scope
        window.addEventListener("click", (e) => { e.target.id == 'slider' ? this.close() : null })
        /* next icon Event */
        this.nextIcon.addEventListener('click', this.next)
        /* prev icon Event */
        this.prevIcon.addEventListener('click', this.prev)

        // key event 
        window.addEventListener('keyup', (event) => {
            event.key == ' ' ? this.open(0) : null
            event.key == 'ArrowRight' ? this.next() : null
            event.key == 'ArrowLeft' ? this.prev() : null
            event.key == 'Escape' ? this.close() : null
        })

    }

    setImgSrc() {
        /* get img src from imgs list by gloabel index 
            then set it to slide background img */
        this.sliderImg.style.backgroundImage = `url(${this.imgs[this.currentIndex].src})`
    }
    open = (index) => {
        this.currentIndex = index
        this.slider.classList.add("open")
        this.setImgSrc()
    }
    close = () => {
        this.slider.classList.remove("open")
    }
    next = () => {
        this.currentIndex == this.imgs.length - 1 ? this.currentIndex = 0 : this.currentIndex += 1
        this.setImgSrc()
    }
    prev = () => {
        this.currentIndex == 0 ? this.currentIndex = this.imgs.length - 1 : this.currentIndex -= 1
        this.setImgSrc()
    }

}

new Slider()


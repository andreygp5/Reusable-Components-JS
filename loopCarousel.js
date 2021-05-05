class loopCarousel {
  constructor({ slider, nextBtn, prevBtn, transition }) {
    this.slider = slider;

    this.nextBtn = nextBtn;
    this.prevBtn = prevBtn;

    this.transition = transition;

    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);

    this.nextBtn.addEventListener("click", this.slideRight);
    this.prevBtn.addEventListener("click", this.slideLeft);
  }

  slideLeft() {
    this.slider.style.transition = `0s`;
    this.prevBtn.disabled = true;

    this.moveElements(true);

    this.slider.style.marginLeft = `-${this.getMarginLeft()}px`;
    window.getComputedStyle(this.slider).marginLeft;
    this.slider.style.transition = `${this.transition}s`;
    this.slider.style.marginLeft = `0px`;

    setTimeout(() => this.prevBtn.disabled = false, this.transition * 1000)
  }
  slideRight() {
    this.slider.style.transition = `${this.transition}s`;
    this.slider.style.marginLeft = `-${this.getMarginLeft()}px`;
    this.nextBtn.disabled = true;

    setTimeout(() => {
      this.moveElements(false);

      this.slider.style.transition = `0s`;
      this.slider.style.marginLeft = `0px`;

      this.nextBtn.disabled = false;
    }, this.transition * 1000)
  }

  moveElements(isLastElem) {
    const moveElement = isLastElem ? "lastElementChild" : "firstElementChild";
    const method = isLastElem ? "prepend" : "append";
    for (let i = 0; i < this.slidesToFlip; i++) {
      const elem = this.slider[moveElement].cloneNode(true);
      this.slider[method](elem);
      this.slider[moveElement].remove();
    }
  }

  setSlidesToFlip(slidesToFlip) {
    this.slidesToFlip = slidesToFlip;
  }

  setRowsAmount(rowsAmount) {
    this.rowsAmount = rowsAmount;
  }

  getMarginLeft() {
    const { itemWidth, gapWidth } = this.getItemInfo();

    return (itemWidth + gapWidth) * this.slidesToFlip;
  }

  getItemInfo() {
    const gapWidth = parseInt(getComputedStyle(this.slider).rowGap);
    const itemWidth = this.slider.firstElementChild.offsetWidth;

    return { gapWidth, itemWidth };
  }

}
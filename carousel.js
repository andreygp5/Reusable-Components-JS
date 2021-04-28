class Carousel {
  constructor({ slider, sliderItem, amountOfItems, nextBtn, prevBtn }) {
    this.slider = slider;

    this.sliderItem = sliderItem;
    this.amountOfItems = amountOfItems;

    this.nextBtn = nextBtn;
    this.prevBtn = prevBtn;

    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);

    this.nextBtn.addEventListener("click", this.slideRight);
    this.prevBtn.addEventListener("click", this.slideLeft);
  }

  slideLeft() {
    let translateX = this.getExistingTransform() + this.getSizeToTransform(this.getAvailbaleSlidesAmount(true));

    const { gapWidth, itemWidth } = this.getItemInfo();

    // No slides left
    if (this.getExistingTransform() === 0) {
      translateX = this.getSliderWidth() - (itemWidth + gapWidth) * this.visibleItems;
      this.slider.style.transform = `translateX(-${translateX}px)`;
    } else {
      this.slider.style.transform = `translateX(${translateX}px)`;
    }
  }
  slideRight() {
    const translateX = this.getExistingTransform() - this.getSizeToTransform(this.getAvailbaleSlidesAmount());

    // No slides right
    if (this.getExistingTransform() - this.getVisibleWidth() <= -this.getSliderWidth()) {
      this.slider.style.transform = `translateX(0px)`;
    } else {
      this.slider.style.transform = `translateX(${translateX}px)`;
    }
  }

  getAvailbaleSlidesAmount(left = false) {
    const { itemWidth } = this.getItemInfo();

    let widthLeft = this.getSliderWidth() - this.getExistingTransform() - this.getVisibleWidth();
    if (left) widthLeft = -this.getExistingTransform();

    const slidesAvailable = Math.floor(widthLeft / itemWidth);

    return slidesAvailable >= this.slidesToFlip ? this.slidesToFlip : slidesAvailable;
  }

  setSlidesToFlip(slidesToFlip) {
    this.slidesToFlip = slidesToFlip;
  }

  getSizeToTransform(slidesAmount) {
    const { gapWidth, itemWidth } = this.getItemInfo();

    return (itemWidth + gapWidth) * slidesAmount;
  }

  getSliderWidth() {
    const { gapWidth, itemWidth } = this.getItemInfo();

    return (itemWidth + gapWidth) * (this.amountOfItems / this.rowsAmount);
  }

  getVisibleWidth() {
    const { gapWidth, itemWidth } = this.getItemInfo();

    return (itemWidth + gapWidth) * this.visibleItems;
  }

  setVisibleItems(visibleItems) {
    this.visibleItems = visibleItems;
  }

  setRowsAmount(rowsAmount) {
    this.rowsAmount = rowsAmount;
  }

  getExistingTransform() {
    const existingTransform = this.slider.style.transform.match(/(-?\d*)px/) || 0;
    return +(existingTransform !== 0 ? existingTransform[1] : 0);
  }

  getItemInfo() {
    const gapWidth = parseInt(getComputedStyle(this.slider).rowGap);
    const itemWidth = this.sliderItem.offsetWidth;

    return { gapWidth, itemWidth };
  }

}
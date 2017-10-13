def((Tip) => {

  const QUESTION = 'data:image/svg+xml;base64,' + btoa(`
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg viewBox="0 0 1025 1024" version="1" xmlns="http://www.w3.org/2000/svg">
      <path d="M505 0C222 3-3 236 0 518 3 801 236 1027 518 1023 801 1020 1027 787 1023 505 1020 222 787-3 505 0L505 0 505 0ZM512 877 509 877C467 876 437 844 438 802 440 761 470 731 511 731L513 731C556 732 586 763 585 807 583 848 553 877 512 877L512 877 512 877ZM699 496C688 512 663 531 633 554L599 577C580 592 569 605 565 618 562 629 560 631 560 652L560 658 431 658 431 647C433 603 434 577 452 555 481 521 546 480 549 479 558 472 566 464 571 456 585 437 591 423 591 409 591 389 585 371 573 354 562 339 540 331 509 331 478 331 457 340 445 360 432 380 425 402 425 424L425 429 292 429 292 423C296 343 325 285 379 251 413 230 455 219 504 219 568 219 623 234 666 265 709 296 731 342 731 402 731 436 720 467 699 496L699 496 699 496Z" fill="#000"></path>
    </svg>
  `);

  return class extends Tip {
    init() {
console.log(!('$value' in this))
      if (!('$value' in this)) this.value = void 0;
    }
    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      if (!value) value = {};
      this.$value = value;
      super.value = { data: `<img src="${value.icon || QUESTION}" />`, tip: value.tip };
    }
    get styleSheet() {
      return `
        :scope {
          box-sizing: border-box;
          padding: 3px;
          height: 28px;
          align-items: center;
          justify-content: center;
          display: flex;
          img {
            width: 16px;
            height: 16px;
          }
        }
      `;
    }
  };

});

import Cookies from 'js-cookie';

export class A11yElement {
  checkboxElement: any;
  mainClass: string;

  constructor(checkboxElement: any, mainClass: string) {
    this.checkboxElement = checkboxElement;
    this.mainClass = mainClass;
    this.check();
    this.listenClick();
  }

  toggle() {
    if (this.checkboxElement.checked) {
      this.enable();
      Cookies.set(this.mainClass, true, { expires: 300, sameSite: 'strict', secure: true });
    } else {
      this.disable();
      Cookies.remove(this.mainClass);
    }
  }

  enable() {
    document.getElementsByTagName('html')[0].classList.add(this.mainClass);
    this.checkboxElement.checked = true;
  }

  disable() {
    document.getElementsByTagName('html')[0].classList.remove(this.mainClass);
    this.checkboxElement.checked = false;
  }

  check() {
    if (Cookies.get(this.mainClass) == 'true') {
      this.enable();
    } else {
      this.disable();
    }
  }

  listenClick() {
    this.checkboxElement.addEventListener('change', () => {
      this.toggle();
    });
  }
}

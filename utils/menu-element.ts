export class Menu {
  button: any;
  submenu: any;
  menuID: string;

  constructor(button: any) {
    this.button = button;
    this.menuID = button.getAttribute('aria-controls');
    this.submenu = document.getElementById(this.menuID);
    this.listenClick();
  }

  /**
   * Toggle all buttons aria (open and close)
   */
  toggleButtonsAria() {
    if (this.button.getAttribute('aria-expanded') == 'true') {
      document.querySelectorAll(`[aria-controls='${this.menuID}']`).forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
      });
    } else {
      document.querySelectorAll(`[aria-controls='${this.menuID}']`).forEach((button) => {
        button.setAttribute('aria-expanded', 'true');
      });
    }
  }

  toggleSubMenu() {
    if (this.submenu.getAttribute('aria-hidden') == 'true') {
      this.submenu.setAttribute('aria-hidden', 'false');
    } else {
      this.submenu.setAttribute('aria-hidden', 'true');
    }
  }

  listenClick() {
    this.button.addEventListener('click', () => {
      this.toggleButtonsAria();
      this.toggleSubMenu();
    });
  }
}

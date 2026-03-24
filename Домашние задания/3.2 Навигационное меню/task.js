const menuLinks = Array.from(document.querySelectorAll('.menu__link'));

menuLinks.forEach((link) => {
  link.onclick = () => {
    const menuItem = link.closest('.menu__item');
    const subMenu = menuItem.querySelector('.menu_sub');

    if (!subMenu) {
      return true;
    }

    const activeSubMenus = Array.from(document.querySelectorAll('.menu_sub.menu_active'));

    activeSubMenus.forEach((activeSubMenu) => {
      if (activeSubMenu !== subMenu) {
        activeSubMenu.classList.remove('menu_active');
      }
    });

    subMenu.classList.toggle('menu_active');
    return false;
  };
});

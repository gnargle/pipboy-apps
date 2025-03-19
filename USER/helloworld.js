// Print "Hello World!" on the screen, then 3 seconds later, print some more text.
Pip.typeText("Hello World!").then(() =>
  setTimeout(() => {
    Pip.typeText("Nice app!").then(() => {
      setTimeout(() => {
        // 3 seconds after that, return to the apps menu
        showMainMenu();
        submenuApps();
      }, 3000)
    })
  }, 3000)
)
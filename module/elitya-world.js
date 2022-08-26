import ElityaItemSheet from "./sheets/elityaItemSheet.js";

Hooks.once("init",() => {
    console.log("Elitya | initialisation du systeme");
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("elitya-world", ElityaItemSheet, {makeDefault: true});
});
import ElityaItemSheet from "./sheets/elityaItemSheet.mjs";
import ElityaActorSheet from "./sheets/elityaActorSheet.mjs";
import { ELITYAWORLD } from "./helpers/config.mjs";
import { preloadHandlebarsTemplates } from "./helpers/template.mjs"

Hooks.once("init",function() {
    console.log("Elitya | initialisation du systeme");
    

    CONFIG.ELITYAWORLD = ELITYAWORLD;

    console.log("ELitya | configuration des classes et fiches");
    //CONFIG.Item.documentClass = ElityaItem;
    
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("elitya-world", ElityaItemSheet, {makeDefault: true});
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("elitya-world", ElityaActorSheet, {makeDefault : true});

    preloadHandlebarsTemplates();

});

Hooks.once("ready", function() {
    console.log("Elitya | le jeu est prêt !");
});
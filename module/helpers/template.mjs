/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @returns {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([
  
      // Shared Partials
      "systems/elitya-world/templates/actor/parts/actor-effects.hbs",
      "systems/elitya-world/templates/actor/parts/actor-ability-block.hbs"
  
      // Actor Sheet Partials
      
  
      // Item Sheet Partials
      //"systems/elitya-world/templates/itemsparts/item-action.html",
      //"systems/elitya-world/templates/itemsparts/item-activation.html",
      //"systems/elitya-world/templates/itemsparts/item-advancement.html",
      //"systems/elitya-world/templates/itemsparts/item-description.html",
      //"systems/elitya-world/templates/itemsparts/item-mountable.html",
      //"systems/elitya-world/templates/itemsparts/item-spellcasting.html",
  
      // Advancement Partials
      //"systems/dnd5e/templates/advancement/parts/advancement-controls.html"
    ]);
  };
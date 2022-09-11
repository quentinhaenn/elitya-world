import {ELITYAWORLD} from "../helpers/config.mjs"

export default class ElityaActorSheet extends ActorSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["elityaworld", "sheet", "actor","character"],
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".tabs", contentSelector: ".sheet-body", initial: "attributes" }]
        });
    }

    get template() {
        return `systems/elitya-world/templates/actor/${this.actor.type}-sheet.hbs`
    }


    async getData() {
        const context = await super.getData();
        
        console.log("Elitya | récupération des data context");
        console.log(context);
        context.config = CONFIG.ELITYAWORLD;
        
        const actor = context.actor;
        const source = actor.toObject();

        this._prepareCharacterData(actor);
        this._prepareItems(context);

        foundry.utils.mergeObject(context, {
            source: source.system,
            system: actor.system,
            labels: actor.labels
        })
        console.log(actor);
        
        return context
    }

    


    _prepareItems(context) {
        const weapons = [];
        const armors = [];
        const others = [];
        const consumables = [];
        const spells = {
            water:[],
            earth:[],
            fire:[],
            common: []
        };

        for (let i of context.items) {
            i.img = i.img || DEFAULT_TOKEN;
            switch (i.type) {
                case 'weapon' :
                    weapons.push(i);
                    break;
                case 'armor' :
                    armors.push(i);
                    break;
                case 'item' :
                    others.push(i);
                    break;
                case 'spell' :
                    if (i.system.magicType !=undefined) {
                        spells[i.system.magicType].push(i);
                    }
                    break;
                case 'consumable' :
                    consumables.push(i);
                    break;
            }
        }
         const actorItems = {
            weapons: weapons,
            armors: armors,
            consumables: consumables,
            others: others,
        }
        context.actorItems = actorItems;
        context.actorSpells = spells;
    }

    _prepareCharacterData(context) {
        for (let [k,v] of Object.entries(context.system.abilities)){
            v.label = game.i18n.localize(ELITYAWORLD.abilities[k]) ?? k;
        }
    }

    async _updateObject(...args) {
        await super._updateObject(...args);
    }


    activateListeners(html) {
        super.activateListeners(html);

    }

}
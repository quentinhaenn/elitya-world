import {ELITYAWORLD} from "../helpers/config.mjs"

export default class ElityaActorSheet extends ActorSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["elityaworld", "sheet", "actor","character"],
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        return `systems/elitya-world/templates/actor/${this.actor.type}-sheet.hbs`
    }


    async getData() {
        const context = await super.getData();
        
        console.log("Elitya | récupération des data context");
        console.log(context.actor);
        context.config = CONFIG.ELITYAWORLD;
        
        const actor = context.actor;
        const source = actor.toObject();

        for (let [k,v] of Object.entries(actor.system.abilities)){
            v.label = game.i18n.localize(context.config.abilities[k]) ?? k;
        }

        foundry.utils.mergeObject(context, {
            source: source.system,
            system: actor.system,
            labels: actor.labels
        })
        console.log(actor);
        
        return context
    }

    


    _prepareItems(context) {
        const gear = [];
        const consumables = [];
        const spells = {
            "water":[],
            "earth":[],
            "fire":[],
            "common": []
        };

        for (let i of context.items) {
            i.img = i.img || DEFAULT_TOKEN;
            if((i.type === 'weapon') || (i.type === 'armor') || (i.type === 'item')){
                gear.push(i)
            }

            else if (i.type === 'spell') {
                if(i.data.magicType != undefined) {
                    spells[i.data.magicType].push(i);
                }
            }

            else if (i.type === 'consumable') {
                consumables.push(i);
            }
        }

        context.gear = gear;
        context.consumables = consumables;
        context.spells = spells;
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
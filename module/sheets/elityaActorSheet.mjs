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
        });
        
        return context;
    }

    


    _prepareItems(context) {
        const weapons = [];
        const armors = [];
        const others = [];
        const consumables = [];
        const spells = {
            air : [],
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

        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".item-edit").click(this._onItemEdit.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));


        super.activateListeners(html);

    }

    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        let type = header.dataset.type.slice(0,-1);
        console.log(type)
        if(type === 'other') type='item';
        const itemData = {
            name: game.i18n.format("ELITYAWORLD.NewItem", {type: game.i18n.localize(`ELITYAWORLD.ItemType${type.capitalize()}`)}),
            type: type,
            system: foundry.utils.deepClone(header.dataset)
        };
        delete itemData.system.type;
        return this.actor.createEmbeddedDocuments("Item",[itemData]);
    }

    _onItemEdit(event) {
        event.preventDefault();
        const li = event.currentTarget.closest(".item");
        const item = this.actor.items.get(li.dataset.itemId);
        return item.sheet.render(true);
    }

    _onItemDelete(event) {
        const li = event.currentTarget.closest(".item");
        const item = this.actor.items.get(li.dataset.itemId);
        if (!item) return;
        return item.delete();
    }

}
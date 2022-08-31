import { ELITYAWORLD } from "../helpers/config.mjs";

export default class ElityaActorSheet extends ActorSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["elityaworld", "sheet", "actor", "character"],
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        return `systems/elitya-world/templates/actor/${this.actor.data.type}-sheet.html`
    }


    getData() {
        const context = super.getData();
        
        console.log(`Elitya | récupération des data context : \n ${context}`)

        const actorData = context.actor.data;

        context.data = actorData.data;
        context.flags = actorData.flags;

        switch(actorData.type) {
            case 'character':
                this._prepareItems(context);
                this._prepareCharacterData(context);
                break;
            case 'npc':
                this._prepareItems(context);
                break;
        }

        context.rollData = context.actor.getRollData();

        console.log(context)
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
        for (let [k,v] of Object.entries(context.data.abilities)){
            v.label = game.i18n.localize(ELITYAWORLD.abilities[k]) ?? k;
        }
    }


    activateListeners(html) {

        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });


        if(!this.isEditable) return;

        html.find('.item-create').click(this._onItemCreate.bind(this));

        html.find('item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });

        html.find('.rollable').click(this._onRoll.bind(this));
    }


    async _onItemCreate(event) {
        event.preventDefault();

        const header = event.currentTarget;
        const type = header.dataset.type;
        const data = duplicate(header.dataset);
        const name = game.i18n.format(ELITYAWORLD.NewItem, {itemType: type.capitalize()});

        const itemData = {
            name: name,
            type: type,
            data: data
        };

        delete itemData.data["type"];

        return await Item.create(itemData, {parent: this.actor});
    }

    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        if (dataset.roll) {
            let roll = new Roll(dataset.roll, this.actor.data.data);
            let label = dataset.label ? `Rolling ${dataset.label}` : '';
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: label
            });
        }
    }

}
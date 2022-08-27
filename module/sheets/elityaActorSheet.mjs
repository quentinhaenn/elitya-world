export class ElityaActorSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 600,
            height: 600
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

        if (actorData.type == 'character') {
            this._prepareItems(context);
            this._prepareCharacterData(context);
        }

        if(actorData.type == 'npc'){
            this._prepareItems(context);
        }

        if(actorData.type == 'monster') {
            this._prepareMonsterData(context);
        }


        context.rollData = context.actor.getRollData();

        return context
    }

    


    _prepareItems(context) {
        const gear = [];
        const consumables = [];
        const spells = {
            "eau":[],
            "terre":[],
            "feu":[],
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
            v.label = game.i18n.localize(CONFIG.ELITYAWORLD.abilities[k]) ?? k;
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
    }


    async _onItemCreate(event) {
        event.preventDefault();

        const header = event.currentTarget;
        const type = header.dataset.type;
        const data = duplicate(header.dataset);
        const name = `New ${type.capitalize()}`;

        const itemData = {
            name: name,
            type: type,
            data: data
        };

        delete itemData.data["type"];

        return await Item.create(itemData, {parent: this.actor});
    }

}
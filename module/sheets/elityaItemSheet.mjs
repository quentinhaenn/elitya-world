export default class ElityaItemSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['elityaworld', 'sheet', 'item'],
            width: 520,
            height: 480,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }


    get template(){
        console.log(`elitya | Récupération du fichier html ${this.item.data.type}-sheet.`);

        return `systems/elitya-world/templates/item/${this.item.data.type}-sheet.html`;
    }


    async getData(options){
        const context = super.getData(options);
        const itemData = context.data;
        
        context.rollData = {};
        let actor = this.object?.parent ?? null;

        if(actor) {
            context.rollData = actor.getRollData();
        }
        
        context.item = itemData;
        context.data = itemData.data;
        context.flags = itemData.flags;

        console.log(context.data);
        return context
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.options.editable) return;

    }
}
export default class ElityaItemSheet extends ItemSheet {


    static get defaultOptions() {
        return mergeObject(super.defaultOptions , {
            width: 530,
            height: 340,
            classes: ["elityaworld", "sheet", "item", "weapon"]
        });
    }

    get template() {
        console.log("Elitya | Getting HTML item template");
        return `systems/elitya-world/templates/item/${this.item.type}-sheet.hbs`
    }

    async getData(options) {
        const context = await super.getData(options);
        context.config = CONFIG.ELITYAWORLD; 
        const item = context.item;
        const source = item.toObject();

        foundry.utils.mergeObject(context, {
            source: source.system,
            system: item.system,
            labels: item.labels
        })
        console.log(context.item)
        return context;
    }

    async _updateObject(...args) {
        await super._updateObject(...args);
    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}
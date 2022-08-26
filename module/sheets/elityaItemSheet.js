export default class ElityaItemSheet extends ItemSheet {
    get template(){
        console.log(`elitya | Récupération du fichier html ${this.item.data.type}-sheet.`);

        return `systems/elitya-world/templates/itemSheet/${this.item.data.type}-sheet.html`;
    }


    async getData(){
        const context = super.getData();
        const itemData = context.item.data;
        
        context.data = itemData.data;
        context.flags = itemData.flags;

        console.log(context.data);
        return context
    }
}
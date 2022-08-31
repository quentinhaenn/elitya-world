export default class ElityaItem extends Item {

    prepareData() {
        super.prepareData();
    }

    getRollData() {
        if(!this.actor) return null;

        const rollData = this.actor.getRollData();
        rollData.item = foundry.utils.deepClone(this.data.data);

        return rollData;
    }

    async roll() {
        const item = this.data;

        const speaker = ChatMessage.getSpeaker({ actor: this.actor });
        const rollMode = game.settings.get('core','rollMode');
        const label = `[${item.type}] ${item.name}`;

        if (!this.data.action) {
            ChatMessage.create({
                speaker: speaker,
                rollMode: rollMode,
                flavor: label,
                content: item.data.itemDescription.value ?? ''
            });
        }
        else {
            const rollData = this.getRollData();

            const roll = new this.roll(rollData.item.action.formula, rollData);

            roll.toMessage({
                speaker: speaker,
                rollMode: rollMode,
                flavor: label,
            });
            return roll;
        }
    }
}
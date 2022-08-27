export class ElityaActor extends Actor {

    prepareData() {
        super.prepareData();
    }

    prepareBaseData() {

    }


    prepareDerivedData() {
        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags.elityaworld || {};

        this._prepareCharacterData(actorData);
        this._prepareNpcData(actorData);
        this._prepareMonsterData(actorData);
    }

    _prepareCharacterData(actorData){
        if (actorData.type !== 'character') return;

        const data = actorData.data;

        for (let [key, ability] of Object.entries(data.abilities)) {
            ability.mod = "novice";
        }
    }

    _prepareNpcData(actorData){
        if (actorData.type !== 'npc') return;

        const data = actorData.data;

        data.xp = "experience"
    }


    _prepareMonsterData(actorData){
        if (actorData.type !== 'monster') return ;

        const data = actorData.data;

        data.xp = "experience"
    }


    getRollData() {
        const data = super.getRollData();

        this._getCharacterRollData(data);
        this._getNpcRollData(data);
        this._getMonsterRollData(data);

        return data;
    }

    _getCharacterRollData(data) {
        if(this.data.type !== 'character') return;

        if(data.abilities) {
            for(let [k,v] of Object.entries(data.abilities)){
                data[k] = foundry.utils.deepClone(v);
            }
        }

        if (data.attributes.level) {
            data.lvl = data.attributes.level.value ?? 0;
        }

    }

    _getNpcRollData(data) {
        if (this.data.type !== 'npc') return;

    }

    _getMonsterRollData(data){
        if(this.data.type !== 'monster') return;

        
    }
}
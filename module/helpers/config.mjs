export const ELITYAWORLD = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */
 ELITYAWORLD.abilities = {
  "phy": "ELITYAWORLD.AbilityStr",
  "dex": "ELITYAWORLD.AbilityDex",
  "int": "ELITYAWORLD.AbilityInt",
  "cha": "ELITYAWORLD.AbilityCha",
  "agi": "ELITYAWORLD.AbilityAgi",
  "fur": "ELITYAWORLD.AbilityFur"
};

ELITYAWORLD.abilityAbbreviations = {
  "phy": "ELITYAWORLD.AbilityStrAbbr",
  "dex": "ELITYAWORLD.AbilityDexAbbr",
  "int": "ELITYAWORLD.AbilityIntAbbr",
  "cha": "ELITYAWORLD.AbilityChaAbbr",
  "agi": "ELITYAWORLD.AbilityAgiAbbr",
  "fur": "ELITYAWORLD.AbilityFurAbbr"
};

ELITYAWORLD.skills = {
  "heavyWWea" :{label: "ELITYAWORLD.SkillHeavyWea", ability: "phy" } ,
  "mel" :{label: "ELITYAWORLD.SkillMel", ability: "phy" },
  "par" :{label: "ELITYAWORLD.SkillPar", ability: "phy" },
  "for" :{label: "ELITYAWORLD.SkillFor", ability: "phy" },
  "lightWea" : {label: "ELITYAWORLD.SkillLightWea", ability: "dex" },
  "aim" : {label: "ELITYAWORLD.SkillAim", ability: "dex" },
  "cra" : {label: "ELITYAWORLD.SkillCra", ability: "dex" },
  "pol" : {label: "ELITYAWORLD.SkillPol", ability: "cha" },
  "speech" : {label: "ELITYAWORLD.SkillSpeech", ability: "cha" },
  "worldKno" : {label: "ELITYAWORLD.SkillWorldKno", ability: "int" },
  "inv" : {label: "ELITYAWORLD.SkillInv", ability: "int" },
  "alc" : {label: "ELITYAWORLD.SkillAlc", ability: "int" },
  "acc" : {label: "ELITYAWORLD.SkillAcc", ability: "agi" },
  "cli" : {label: "ELITYAWORLD.SkillCli", ability: "agi" },
  "dod" : {label: "ELITYAWORLD.SkillDod", ability: "agi" },
  "cam" : {label: "ELITYAWORLD.SkillCam", ability: "fur" },
  "tra" : {label: "ELITYAWORLD.SkillTra", ability: "fur" },
  "spi" : {label: "ELITYAWORLD.SkillSpi", ability: "fur" }
}

ELITYAWORLD.weaponTypes = {
  none:"",
  dagger : "ELITYAWORLD.Dagger",
  axe : "ELITYAWORLD.Axe",
  longSword : "ELITYAWORLD.LongSword"
}
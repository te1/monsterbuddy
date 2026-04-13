# Monster Buddy Data - Monster Hunter Stories 3: Twisted Reflection

## Data Sources

- In-game Monsterpedia
- [Monster Hunter Wiki](https://monsterhunterwiki.org)
- [Data Mining](https://docs.google.com/spreadsheets/d/1JvLmNY7l2jOKCk7QbUYmeK87xvzQzXVUJIgFX9bYaqk)
- [Monstie Stats](https://www.reddit.com/r/MonsterHunterStories/comments/1rzobtn/i_made_a_table_documenting_every_single_monsties) by [norahike](https://www.reddit.com/user/norahike)
- [Monstie List, Gene List and Monstie Builder Sheet](https://www.reddit.com/r/MonsterHunterStories/comments/1s7lq5l/monster_hunter_stories_3_monstie_list_gene_list) by [AzuClone](https://www.reddit.com/user/AzuClone)
- [Guide to buff/debuff strengths of various moves](https://www.reddit.com/r/MonsterHunterStories/comments/1s753dy/wip_guide_to_buffdebuff_strengths_of_various_moves) by [DarkestSamus](https://www.reddit.com/user/DarkestSamus)
- [Building the perfect Monstie, a complete guide](https://www.reddit.com/r/MonsterHunterStories/comments/1shua27/building_the_perfect_monstie_a_complete_guide) by [Masuku68](https://www.reddit.com/user/Masuku68)
- [Monstie Damage Calc (Google Sheets)](https://www.reddit.com/r/MonsterHunterStories/comments/1s91lvf/monstie_damage_calc_google_sheets) by [rmosley753](https://www.reddit.com/user/rmosley753)
- [Egg Skills, Egg Powers, Monsties](https://www.reddit.com/r/MonsterHunterStories/comments/1rw0tkb/a_comprehensive_list_for_egg_skills_and_egg) by [Fit-Variation-1875](https://www.reddit.com/user/Fit-Variation-1875)

## Notes

- Stats "tendencies" convert to raw stats
  - stamina -> startingStamina
    - 4 -> 30
    - 7 -> 50
    - 10 -> 70
  - recovery -> rawRecovery
    - 4 -> 4
    - 7 -> 8
    - 10 -> 12
  - speed = rawSpeed - 5
  - crit -> rawCrit
    - 1 -> 0%
    - 6 -> 10%
    - 8 -> 15%
    - 10 -> 20%

- 'STAB' is 10%, e.g. a fire monster (or dual element fire) will deal 10% increased fire damage

- Crit damage modifier is x1.5

- Ailment resistance converts to hit chance
  - +2 -> 0%
  - +1 -> 30%
  - -1 -> 70%
  - -2 -> 100%

- Buffs / debuffs usually last 3 turns
  - Guard and Power Charge last 1 turn
  - Boltcall's Power Charge lasts 2 turns
  - Bishaten Embers extends debuff duration by 2 turns

- "stacking" buffs / debuffs start at S
  - Repeated applications increase the size (S -> M, M -> L) and refresh the duration

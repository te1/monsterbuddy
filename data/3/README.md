# Monster Buddy Data - Monster Hunter Stories 3: Twisted Reflection

## Data Sources

- In-game Monsterpedia
- [Monster Hunter Wiki](https://monsterhunterwiki.org)
- [Data Mining](https://docs.google.com/spreadsheets/d/1JvLmNY7l2jOKCk7QbUYmeK87xvzQzXVUJIgFX9bYaqk)
- [Monstie Stats](https://www.reddit.com/r/MonsterHunterStories/comments/1rzobtn/i_made_a_table_documenting_every_single_monsties) by [norahike](https://www.reddit.com/user/norahike)
- [Monstie List, Gene List and Monstie Builder Sheet](https://www.reddit.com/r/MonsterHunterStories/comments/1s7lq5l/monster_hunter_stories_3_monstie_list_gene_list) by [AzuClone](https://www.reddit.com/user/AzuClone)
- [Guide to buff/debuff strengths of various moves](https://www.reddit.com/r/MonsterHunterStories/comments/1s753dy/wip_guide_to_buffdebuff_strengths_of_various_moves) by [DarkestSamus](https://www.reddit.com/user/DarkestSamus)
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

- Ailment resistance converts to hit chance
  - +2 -> 0%
  - +1 -> 30%
  - -1 -> 70%
  - -2 -> 100%

<template>
  <div>
    <AppTopBar heading="Monster Buddy" />

    <p class="mb-6 text-base text-justify">
      <b>Monster Buddy</b> is a companion app for Monster Hunter Stories 2: Wings of Ruin can help you to learn or remember information useful during combat and general gameplay. It's not a complete guide, walkthrough or advanced character / gene planner (yet).
    </p>

    <div class="flex flex-col items-center">
      <div class="relative inline-block w-[180px] h-[200px]">
        <AttackTypeIcon
          class="absolute top-0 left-0 right-0 mx-auto w-[70px] h-[70px]"
          type="power"
        />
        <AttackTypeIcon
          class="absolute bottom-[25px] left-0 w-[70px] h-[70px]"
          type="speed"
        />
        <AttackTypeIcon
          class="absolute bottom-[25px] right-0 w-[70px] h-[75px]"
          type="technical"
        />
        <FaIcon
          class="absolute top-[45px] right-[10px] !w-12 !h-12 rotate-[85deg] text-gray-500 dark:text-cool-400"
          :icon="['fas', 'share']"
        />
        <FaIcon
          class="absolute top-[45px] left-[10px] !w-12 !h-12 rotate-[330deg] text-gray-500 dark:text-cool-400"
          :icon="['fas', 'share']"
        />
        <FaIcon
          class="absolute bottom-[0px] left-0 right-0 mx-auto !w-12 !h-12 rotate-[215deg] text-gray-500 dark:text-cool-400"
          :icon="['fas', 'share']"
        />
      </div>
    </div>

    <div class="prose prose-sm dark:prose-dark">
      <h3>
        Features
      </h3>

      <ul>
        <li>
          <NuxtLink
            class="link"
            to="/monsters/"
          >Monster list</NuxtLink> with attack patterns, weapon and elemental weaknesses
        </li>

        <li>
          <NuxtLink
            class="link"
            to="/monsties/"
          >Monstie list</NuxtLink> with attack types, retreat conditions, locations and stats
        </li>

        <li>
          <NuxtLink
            class="link"
            to="/eggs/"
          >Visual egg list</NuxtLink> with search, sorting and filtering
        </li>
      </ul>

      <h3>
        Spoiler Warning
      </h3>

      <p class="text-justify">
        This contains names and images of monsters, names of locations, information that can make combat easier, information on which monsters can become monsties, etc. If you don't want that information just yet proceed at your own discretion.
      </p>

      <h3>
        Sources for data and images
      </h3>

      <ul>
        <li>
          In-game field guide
        </li>

        <li>
          <a
            class="link"
            href="https://monsterhunter.fandom.com/wiki/Monster_Hunter_Wiki"
            target="_blank"
            rel="noopener"
          >Monster Hunter Wiki</a> (shout-out to <a
            class="link"
            href="https://monsterhunter.fandom.com/wiki/User:YukiHerz"
            target="_blank"
            rel="noopener"
          >YukiHerz</a>)
        </li>

        <li>
          <a
            class="link"
            href="https://mhst.kiranico.com/mhs2"
            target="_blank"
            rel="noopener"
          >MHStories 2</a> by <a
            class="link"
            href="https://twitter.com/kiranico_db"
            target="_blank"
            rel="noopener"
          >Kiranico</a>
        </li>

        <li>
          <a
            class="link"
            href="https://docs.google.com/spreadsheets/d/1QzM9X34IfACPtRa_yWq2BZUidWJqs0l2K_Gs2023bO0"
            target="_blank"
            rel="noopener"
          >MHStories 2 data</a> by iSharingan
        </li>

        <li>
          <a
            class="link"
            href="https://www.youtube.com/watch?v=Ss3Mgqe9dTo"
            target="_blank"
            rel="noopener"
          >ULTIMATE CHEAT SHEET! Deviant &amp; Elder Dragon Farm Notes Monster Hunter Stories 2</a> by <a
            class="link"
            href="https://www.youtube.com/channel/UCDjnmVdkM0tGprGlKo4LY3Q"
            target="_blank"
            rel="noopener"
          >Paradise Central</a>
        </li>

        <li>
          <a
            class="link"
            href="https://docs.google.com/spreadsheets/d/1h4BMaeHa89KFgxHoCNxbhH2BLYj5kUjl88uwZ7BQr4o"
            target="_blank"
            rel="noopener"
          >Type Usage</a> by <a
            class="link"
            href="https://www.reddit.com/user/The_Weasel_King"
            target="_blank"
            rel="noopener"
          >The_Weasel_King</a>
        </li>

        <li>
          <a
            class="link"
            href="https://www.reddit.com/r/MonsterHunterStories/comments/oo8fpi/monster_attacktype_chart"
            target="_blank"
            rel="noopener"
          >Monster Attack-Type Chart</a> by <a
            class="link"
            href="https://www.reddit.com/user/RPGwannabe"
            target="_blank"
            rel="noopener"
          >RPGwannabe</a>
        </li>

        <li>
          <a
            class="link"
            href="https://docs.google.com/spreadsheets/d/1h4BMaeHa89KFgxHoCNxbhH2BLYj5kUjl88uwZ7BQr4o"
            target="_blank"
            rel="noopener"
          >MH Stories 2 : Attack Types, Weakness &amp; Eggs</a> by <a
            class="link"
            href="https://www.reddit.com/user/Criwok"
            target="_blank"
            rel="noopener"
          >Criwok</a>
        </li>

        <li>
          <a
            class="link"
            href="https://www.kurimucardgame.com/mhs2-monster-weakness-en"
            target="_blank"
            rel="noopener"
          >Monster Hunter Stories 2 Full Picture Monster’s weaknesses</a> by <a
            class="link"
            href="https://www.kurimucardgame.com"
            target="_blank"
            rel="noopener"
          >Kurimu</a>
        </li>

        <li>
          <a
            class="link"
            href="https://docs.google.com/spreadsheets/d/1ayBCZ7WrkXniGTjKlkf7JFTzJA_0ZcaLYf5A_MEhxN4"
            target="_blank"
            rel="noopener"
          >MHS2</a> by <a
            class="link"
            href="https://www.reddit.com/user/dorgesilas"
            target="_blank"
            rel="noopener"
          >dorgesilas</a>
        </li>
      </ul>

      <h3>
        Other great resources
      </h3>

      <ul>
        <li>
          <a
            class="link"
            href="http://tactools.net/MHS2/Monstie/Builder"
            target="_blank"
            rel="noopener"
          >Monstie Gene Builder/Planning tool</a> by <a
            class="link"
            href="https://www.reddit.com/user/booclarke"
            target="_blank"
            rel="noopener"
          >booclarke</a>
        </li>

        <li>
          <a
            class="link"
            href="https://docs.google.com/spreadsheets/d/1O1SZ_p9EFBmu7O9WbmvHISE82ZqVHWWV95vHRHZ3r1M"
            target="_blank"
            rel="noopener"
          >All-in-one spreadsheet</a> by <a
            class="link"
            href="https://www.reddit.com/user/aericee"
            target="_blank"
            rel="noopener"
          >Riikapii</a>
        </li>

        <li>
          <b>YouTube</b>

          <ul class="!mt-0">
            <li>
              <a
                class="link"
                href="https://www.youtube.com/channel/UCDjnmVdkM0tGprGlKo4LY3Q"
                target="_blank"
                rel="noopener"
              >Paradise Central</a>
            </li>

            <li>
              <a
                class="link"
                href="https://www.youtube.com/channel/UCmX7voYVvCB0flpoltNlnhg"
                target="_blank"
                rel="noopener"
              >TwoSixNine</a>
            </li>

            <li>
              <a
                class="link"
                href="https://www.youtube.com/c/ArekkzGaming"
                target="_blank"
                rel="noopener"
              >Arekkz Gaming</a>
            </li>

            <li>
              <a
                class="link"
                href="https://www.youtube.com/channel/UCXe5uvP9kHKRG1LTMYDiscQ"
                target="_blank"
                rel="noopener"
              >Poogie Boogie</a>
            </li>

            <li>
              <a
                class="link"
                href="https://www.youtube.com/c/RageGamingVideosReal"
                target="_blank"
                rel="noopener"
              >RageGamingVideos</a>
            </li>

            <li>
              <a
                class="link"
                href="https://www.youtube.com/channel/UCj5rxzvXpiPASGNw4-z_BbA"
                target="_blank"
                rel="noopener"
              >Tidus69</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { makeHead } from '~/services/utils';

  export default {
    name: 'PageIndex',

    head() {
      return makeHead({
        canonical: 'https://monsterbuddy.app',
      });
    },
  };
</script>

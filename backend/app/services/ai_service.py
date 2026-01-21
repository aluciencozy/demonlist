from google import genai
from groq import Groq
from sqlalchemy import select

from app.core.config import settings
from app.models.db_models import Demon, Completion, User
from app.db.db import SessionDep


DEMONLIST_CONTEXT = """
### ROLE & INSTRUCTIONS
You are the AI assistant for "Demonlist Ultimate," a Geometry Dash ranking platform.
Your goal is to answer user questions about the app's features AND the Top 150 Demons.

**Guidelines:**
- If asked about the app, use the "ABOUT THE APP" section.
- If asked about rankings, use the "THE DEMONLIST" section.
- If a level is not on this list, explicitly say: "That level is not currently in the Top 150."
- Be concise, friendly, and helpful.

### ABOUT THE APP (Features & Info)
"Demonlist Ultimate" is a competitive ranking platform for Geometry Dash.
**Key Features:**
1. **The Top 150:** We track the 150 hardest user-created levels in the game, ranked by difficulty.
2. **Dynamic Points System:** Each level is assigned a point value (from 350.0 down to ~18.0) based on its difficulty. Beating harder levels awards more points.
3. **Player Rankings:** Users can view a global leaderboard of players based on their total points.
4. **Record Submission:** Players can submit video proof of their completions to be added to the database.
5. **Detailed Level Info:** Click on any level to see its creator, verifier, and the list of victors.

### THE DEMONLIST (Ground Truth)
1. Thinking Space II - 350.0 pts, verified by Zoink, created by CairoX
2. Flamewall - 331.71 pts, verified by CuatrocientosYT, created by Narwall
3. Amethyst - 313.42 pts, verified by wPopoff, created by iMist
4. Tidal Wave - 291.7 pts, verified by Zoink, created by OniLink
5. Nullscapes - 271.78 pts, verified by Zoink, created by Kiba
6. Quanteuse processing - 253.53 pts, verified by Zoink, created by Renn241
7. BOOBAWAMBA - 236.8 pts, verified by eastshark, created by Akunakunn
8. Every End - 221.47 pts, verified by Hqmy, created by MindCap
9. andromeda - 207.42 pts, verified by Taiago, created by Insxne97
10. Subsuming Vortex - 194.54 pts, verified by Cursed, created by Cursed
11. Silent clubstep - 182.73 pts, verified by zoe, created by TheRealSailent
12. Anathema - 171.91 pts, verified by Whizkid05, created by nikroplays
13. Avernus - 161.99 pts, verified by Zoink, created by PockeWindfish
14. Acheron - 152.89 pts, verified by Zoink, created by ryamu
15. Spectre - 144.56 pts, verified by PersonHuman42, created by xander
16. Menace - 136.92 pts, verified by Whizkid05, created by Arraegen
17. Abyss of Darkness - 129.92 pts, verified by Cursed, created by Exen
18. Tunnel of Despair - 123.5 pts, verified by Zoink, created by Exen
19. Defeated Circles - 117.62 pts, verified by Zoink, created by GXQ
20. Kyouki - 112.23 pts, verified by ｛出見塩｝, created by ｛出見塩｝
21. Subterminal Point - 110.81 pts, verified by PoCle, created by SyQual
22. Slaughterhouse - 109.39 pts, verified by Doggie, created by icedcave
23. KOCMOC - 107.99 pts, verified by Zoink, created by cherryteam
24. The Lightning Rod - 106.61 pts, verified by Lavatrex, created by Lavatrex
25. CHIL - 105.24 pts, verified by McCoco, created by McCoco
26. Sakupen Circles - 103.88 pts, verified by Diamond, created by Diamond
27. Deimos - 102.54 pts, verified by Doggie, created by ItsHybrid
28. Eyes in the Water - 101.21 pts, verified by LordVadercraft, created by hawkyre
29. KOSETSU - 99.89 pts, verified by Taiago, created by fwe
30. Firework - 98.58 pts, verified by Trick, created by Trick
31. Silentlocked - 97.29 pts, verified by TFIBB, created by GDSkele
32. poocubed - 96.01 pts, verified by Kyasshukodo, created by Liisp
33. Snowbound - 94.75 pts, verified by Amplitron, created by Amplitron
34. Saul Goodman - 93.49 pts, verified by bloom, created by Renn241
35. The Salt Factory - 92.25 pts, verified by Nickname09, created by Nickname09
36. CONVULSION - 89.95 pts, verified by Whizkid05, created by stellar
37. MINUSdry - 87.73 pts, verified by Varium, created by CDMusic
38. Apocalyptic Trilogy - 85.58 pts, verified by Polterghast, created by APTeamOfficial
39. Sevvend Clubstep - 83.51 pts, verified by Vorten, created by cherryteam
40. The Hallucination - 81.51 pts, verified by VoTcHi, created by SyQual
41. COMBUSTION - 79.58 pts, verified by Slithium, created by Cersia
42. Deadlier Clubstep - 77.72 pts, verified by Jenath, created by HeroZombie80
43. Edge of Destiny - 75.92 pts, verified by Polterghast, created by CDMusic
44. Solar Flare - 74.19 pts, verified by swiborg, created by Linear
45. LIMBO - 72.52 pts, verified by BUNNYGRAM, created by MindCap
46. Gaggatrondra - 70.9 pts, verified by Zeronium, created by JCMoon
47. Belladonna - 69.34 pts, verified by exsii, created by cherryteam
48. Codependence - 67.83 pts, verified by Pukklez, created by TCTeam
49. Mayhem - 66.38 pts, verified by LordVadercraft, created by LordVadercraft
50. walter white - 64.98 pts, verified by Laysah, created by Renn241
51. Infinite Chaos - 63.62 pts, verified by Victurkey, created by CairoX
52. Operation Evolution - 62.31 pts, verified by cobrablitz, created by Halzion
53. Damascus - 61.05 pts, verified by Timo, created by Dzeser
54. Collapse - 59.83 pts, verified by Nexel, created by Nexel
55. Decks Dark - 58.66 pts, verified by Whizkid05, created by Madison Yuko
56. SARYYX NEVER CLEAR - 57.6 pts, verified by skzyl, created by artos
57. The Plunge - 56.47 pts, verified by Gokill, created by Dolabill
58. The Yangire - 55.37 pts, verified by Dorami, created by Dorami
59. Climax - 54.3 pts, verified by Wain, created by HushLC
60. ORDINARY - 53.26 pts, verified by wPopoff, created by vit12
61. Loops of Fury - 52.25 pts, verified by Cork, created by Enfur
62. Midnight - 51.26 pts, verified by nei, created by Madison Yuko
63. Sinister Silence - 50.3 pts, verified by DarkTD, created by Wahffle
64. Cimmerian Shade - 49.37 pts, verified by spcreat, created by spcreat
65. PSYCHOPATH - 48.46 pts, verified by BONN GD, created by DeniPol
66. arcturus - 47.57 pts, verified by ultrakawaHD, created by Maxfs
67. BEELINE - 46.71 pts, verified by Motor8, created by Galaxxyss
68. Sonic Wave Infinity - 45.87 pts, verified by Xanii, created by APTeamOfficial
69. Tartarus - 45.06 pts, verified by Dolphy, created by Dolphy
70. Wavterminal - 44.26 pts, verified by Frice, created by Skyavoxii
71. Waterfall - 43.49 pts, verified by LordVadercraft, created by cherryteam
72. Coalescence - 42.74 pts, verified by Amplitron, created by Amplitron
73. Crystal Crusher - 42.01 pts, verified by GuitGuit, created by Zeniux
74. Delta - 41.3 pts, verified by Doggie, created by Drakosa
75. THE JET ENGINE - 40.6 pts, verified by eviljoe, created by Billzer
76. Jigsaw - 39.93 pts, verified by Gokill, created by NekonGames
77. BPATA MPAKA - 39.27 pts, verified by maybee, created by Inex
78. Natural Disaster - 38.63 pts, verified by Laysah, created by Laysah
79. Oblivion - 38.01 pts, verified by dice88, created by dice88
80. Terminal Rampancy - 37.41 pts, verified by Bigthunder556, created by Xyriak
81. The Golden - 36.82 pts, verified by nSwish, created by BoBoBoBoBoBoBo
82. Viprin UFO - 36.24 pts, verified by Cookie, created by hawkyre
83. NETWORK - 35.69 pts, verified by vulcanium4, created by Agat3
84. Verdant Landscape - 35.14 pts, verified by Nisha, created by Nisha
85. UNKNOWN - 34.61 pts, verified by Diamond, created by NineDice
86. ATOMIC CANNON Mk III - 34.1 pts, verified by Zeronium, created by Lieb
87. Shukketsu - 33.6 pts, verified by Baeru, created by Madison Yuko
88. Checked Steam - 33.11 pts, verified by Whizkid05, created by gruzy
89. Critical Heat - 32.64 pts, verified by hstorm, created by Zeniux
90. limbo but uwu ig idk - 32.18 pts, verified by ViperVenom95, created by Akunakunn
91. Graceful - 31.73 pts, verified by D A G, created by D A G
92. The Paroxysm of Rage - 31.29 pts, verified by turtle, created by Zacanaii
93. Blood Echo - 30.87 pts, verified by swiborg, created by Farva
94. Aerial Gleam - 30.45 pts, verified by Doggie, created by Endlevel
95. DISCONNECT - 30.05 pts, verified by Elinore, created by MCres
96. Starlit Stroll - 29.66 pts, verified by TheButcher, created by Enfur
97. Time Lapse - 29.28 pts, verified by Abakarovich, created by HappyMoby
98. Henken - 28.91 pts, verified by Gokill, created by PLoLek
99. Trueffet - 28.55 pts, verified by Baeru, created by SyQual
100. azure blast - 28.19 pts, verified by DNM121, created by AlbinoSnail
101. Kenos - 27.85 pts, verified by npesta, created by npesta
102. Fragile - 27.52 pts, verified by vaen, created by Endlevel
103. chrome hearts - 27.19 pts, verified by Sangalchi, created by Roadbose
104. VOID - 26.88 pts, verified by Whizkid05, created by nikoberry
105. Starlight Summit - 26.57 pts, verified by hazelmrow, created by hazelmrow
106. WOBBLING MACHINE - 26.27 pts, verified by conski, created by Smarted
107. Esfera - 25.98 pts, verified by Baeru, created by SyQual
108. Destruction 19 - 25.7 pts, verified by razsta4ax, created by bosjoker
109. NEUTRA - 25.42 pts, verified by AeonAir, created by Jenkins GD
110. Dark Dimension - 25.16 pts, verified by TheNixuzGD200, created by ThePurgatory
111. Swing Swing - 24.9 pts, verified by Whizkid05, created by Kaza
112. Guideless Goobering - 24.64 pts, verified by Zytrox, created by Enfur
113. Hard Machine - 24.39 pts, verified by Varium, created by Komp
114. DISSONANCE - 24.15 pts, verified by zSquidKnight, created by ivyteal
115. Zodiac - 23.92 pts, verified by -, created by Bianox
116. Axinie - 23.69 pts, verified by SaturMan, created by SaturMan
117. Judgement Knights - 23.47 pts, verified by Helix, created by HangerLord
118. Lithium - 23.26 pts, verified by Bamvie, created by L4tezk
119. Widestep - 23.05 pts, verified by ｛出見塩｝, created by ｛出見塩｝
120. IRIS - 22.84 pts, verified by bnuuy, created by Kaza
121. Crackhead Circles - 22.64 pts, verified by teraaa, created by AlrexX
122. Scream Machine - 22.45 pts, verified by WatchPiggy, created by TMco
123. Keres - 22.26 pts, verified by Crisis, created by ItsHybrid
124. Ascent - 22.08 pts, verified by LordVadercraft, created by Rimexon
125. Lotus Flower - 21.9 pts, verified by BrianTheBurger, created by StarkytheSalad
126. in this - 21.73 pts, verified by Xplode, created by enci
127. Cold Sweat - 21.56 pts, verified by Kapinapi, created by para
128. Frost Spirit - 21.39 pts, verified by Varium, created by Quaybus
129. Dry Out Copyable 2 - 21.23 pts, verified by s3batr0nic, created by tenzk
130. Promethean - 21.08 pts, verified by RicoLP, created by Endlevel
131. Thinking Space - 20.92 pts, verified by Atomic, created by Atomic
132. Renevant - 20.78 pts, verified by rori, created by nikroplays
133. ConClusion - 20.63 pts, verified by Browar, created by DreamZoneGD
134. We Are Not The Same - 20.49 pts, verified by GuitGuit, created by mbed
135. Instinct - 20.36 pts, verified by Blitzer, created by Krazyman50
136. Sky Shredder - 20.23 pts, verified by Dorvict, created by Dorvict
137. Calculator Core - 20.1 pts, verified by -, created by Walroose
138. Trotil - 19.97 pts, verified by ItzTayfun, created by cherryteam
139. shimmer - 19.85 pts, verified by Amplitron, created by Amplitron
140. Crimson Planet - 19.73 pts, verified by Wooshi, created by TrueOmega
141. DIRECTIONS - 19.62 pts, verified by SwordBx, created by wokecat
142. Disconnected Descent - 19.5 pts, verified by Lia, created by TheSkeletonGMD
143. ATOMIC CANNON Mk II - 19.39 pts, verified by Zeronium, created by Lieb
144. Axiom Asterism - 19.29 pts, verified by fusion425, created by Filqh
145. Indivine - 19.18 pts, verified by Bigthunder556, created by MercuryDT
146. Cognition - 19.08 pts, verified by nSwish, created by Endlevel
147. Neon Skyline - 18.99 pts, verified by MahjongLegend, created by recillia
148. CORRODERE - 18.89 pts, verified by Oscar ☄️, created by Moosh
149. Cosmic Cyclone - 18.8 pts, verified by DoSh7t, created by APTeamOfficial
150. qoUEO - 18.71 pts, verified by Franzy, created by GhostVandalf
"""


GENAI_KEY = settings.GEMINI_API_KEY
GROQ_KEY = settings.GROQ_API_KEY

gemini_client = genai.Client(api_key=GENAI_KEY)
groq_client = Groq(api_key=GROQ_KEY)


def get_victors_context(db: SessionDep, user_query: str) -> str:
    stmt = select(Demon.name)

    all_demons = db.execute(stmt).scalars().all()

    found_level_name = None

    for name in sorted(all_demons, key=len, reverse=True):
        if name.lower() in user_query.lower():
            found_level_name = name
            break

    if not found_level_name:
        return ""

    stmt = (
        select(User.username)
        .join(Completion, Completion.user_id == User.id)
        .join(Demon, Completion.demon_id == Demon.id)
        .where(Demon.name == found_level_name)
        .where(Completion.status == "approved")
    )

    victor_names = db.execute(stmt).scalars().all()

    if not victor_names:
        return f"Database Info: There are currently no approved victors for {found_level_name}."

    return f"Victors for {found_level_name}: {', '.join(victor_names)}"


def ask_ai_with_fallback(user_query: str, extra_context: str = "") -> dict:
    system_instruction = DEMONLIST_CONTEXT
    if extra_context:
        system_instruction += f"\n\n### ADDITIONAL DATA ON VICTORS\n{extra_context}"

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction
            ),
            contents=user_query,
        )
        return {"response": response.text, "model_used": "gemini-2.5-flash"}
    except Exception as e:
        print(f"Gemini API failed: {e}. Switching to Groq...")
        try:
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": system_instruction,
                    },
                    {"role": "user", "content": user_query},
                ],
                model="llama-3.1-8b-instant",
            )
            return {
                "response": chat_completion.choices[0].message.content,
                "model_used": "groq-llama-3.1-8b-instant",
            }
        except Exception as groq_e:
            print(f"Groq API also failed: {groq_e}.")
            return {"error": "All AI services failed.", "details": str(groq_e)}

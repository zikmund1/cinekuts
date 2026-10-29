# CINEKUTS — produktová specifikace

> Hlavní produktový dokument pro novou verzi webu. Aktualizujte jej spolu s rozhodnutími, která mění rozsah, uživatelský zážitek, datový model nebo architekturu.

## 1. Produktová vize

CINEKUTS je nezávislé filmové médium, které spojuje vlastní recenze, videoobsah a AI asistenta pro doporučování filmů a seriálů.

**Hlavní myšlenka:** Stop scrolling. Start watching.

Produkt má uživateli rychle pomoci vybrat titul pro konkrétní situaci a současně nabídnout důvěryhodný redakční kontext. AI není náhradou redakce ani databáze filmů; je konverzační vrstvou nad ověřenými katalogovými a redakčními daty.

## 2. Cíle a principy

### Cíle MVP

1. Zkrátit cestu od příchodu na web k relevantnímu doporučení.
2. Zpřístupnit vlastní recenze, hodnocení, kolekce a videa v jednotném produktu.
3. Ověřit, zda anonymní AI chat vede k otevření detailu filmu a následné akci „chci sledovat“.
4. Udržet provozní náklady předvídatelné a nízké.
5. Umožnit redakci spravovat obsah bez zásahu vývojáře.

### Produktové principy

- **Rozhodnutí místo katalogu:** rozhraní má snižovat zahlcení, ne nabízet nekonečný feed.
- **Tři dobré volby:** výchozí odpověď chatu obsahuje nejvýše tři odlišná doporučení s krátkým zdůvodněním.
- **Data před domněnkou:** dostupné tituly, metadata a redakční obsah pocházejí z databáze; model vybírá a vysvětluje nad dodanými kandidáty.
- **Redakční hlas je viditelný:** vlastní recenze a CINEKUTS hodnocení mají jasnou prioritu a nesmějí být vydávány za text AI.
- **Spoilery pouze na vyžádání:** spoilerový obsah je ve výchozím stavu skrytý a jeho zobrazení je vědomá akce.
- **Bez registrace:** první doporučení nesmí vyžadovat účet.
- **Postupné rozšiřování:** účty, watchlist, komunita a monetizace nejsou součástí MVP.
- **Přístupnost a rychlost:** klíčová cesta musí fungovat na mobilu, s klávesnicí a při pomalejším připojení.

## 3. Primární uživatelská cesta

1. Návštěvník otevře minimalistickou dark-mode homepage.
2. Dominantní AI chat nabídne několik jednoduchých příkladů dotazu, například podle nálady, žánru, délky nebo dostupného času.
3. Uživatel napíše požadavek; chat může položit nejvýše jednu užitečnou doplňující otázku, pokud bez ní nelze vybrat kvalitně.
4. Backend získá kandidáty z databáze a předá omezený kontext vyměnitelnému AI poskytovateli.
5. Odpověď zobrazí ideálně tři filmové karty a stručně vysvětlí, proč každá odpovídá zadání. Nesmí obsahovat neověřené faktické údaje.
6. Uživatel otevře detail titulu, redakční recenzi, související video nebo požádá o jiné doporučení.

Konverzace je v MVP anonymní a krátkodobá. Historie se uchovává pouze v rozsahu nutném pro návaznost relace a měření produktu; přesná doba uchování musí být nastavena před veřejným spuštěním a popsána v zásadách soukromí.

## 4. Rozsah MVP

### 4.1 Homepage

- responzivní minimalistický dark-mode design;
- AI chat jako dominantní prvek nad přehybem;
- jasný slogan a krátké vysvětlení hodnoty;
- návrhy startovacích dotazů;
- pod chatem omezený výběr aktuálního redakčního obsahu a tematických kolekcí;
- žádný nekonečný feed jako primární navigace;
- funkční stav bez JavaScriptu alespoň pro navigaci a editorial; chat může být React island.

### 4.2 AI doporučovací chat

- vstupy: nálada, žánr, délka, období, preference, omezení a předchozí zprávy v rámci relace;
- odpověď: běžně tři rozdílné tituly, každý s krátkým důvodem a odkazem na detail;
- možnost „zkusit jiné“, upřesnit požadavek a bezpečně začít novou konverzaci;
- databázové vyhledání kandidátů před voláním modelu;
- strukturovaný, validovaný výstup modelu; model nesmí vymýšlet ID, URL, hodnocení ani metadata;
- transparentní označení AI odpovědi a stručné upozornění, že doporučení může být nepřesné;
- spoilery ve vstupu i výstupu zakázané, dokud je uživatel výslovně nepovolí;
- limity podle anonymní relace/IP v souladu se soukromím, globální rozpočtový strop a ochrana proti zneužití;
- srozumitelné stavy načítání, vyčerpání limitu, nedostupnosti modelu a prázdných výsledků;
- degradace bez AI: nabídnout relevantní kolekce nebo filtrované tituly.

### 4.3 Filmové karty

Minimální obsah karty:

- plakát s alternativním textem nebo bezpečný placeholder;
- lokalizovaný název, případně originální název;
- rok, typ (film/seriál) a stopáž, jsou-li ověřené;
- CINEKUTS hodnocení pouze tehdy, pokud existuje;
- krátké zdůvodnění doporučení v kontextu chatu;
- odkaz na kanonický detail.

### 4.4 Detail titulu

- kanonická URL podle stabilního slugu a interního ID;
- ověřená metadata a zdroj/provenience;
- CINEKUTS hodnocení a recenze, pokud existují;
- spoiler-free perex, spoilerové části skryté za explicitním ovládacím prvkem;
- související CINEKUTS video, pokud je přiřazené;
- podobné tituly získané z databáze, nikoli volnou improvizací modelu;
- základní SEO metadata a strukturovaná data pouze z ověřených údajů.

Informace o streamovací dostupnosti není součástí MVP, dokud nebude zajištěn licenčně a provozně spolehlivý zdroj.

### 4.5 Editorial a kolekce

- publikované a rozepsané recenze;
- redakční hodnocení s jasně definovanou stupnicí;
- tematické kolekce s ručním pořadím titulů a vlastním úvodem;
- vazba recenze/titulu na YouTube video přes veřejné video ID nebo URL;
- oddělení spoiler-free a spoilerové části;
- autor, datum publikace a datum poslední významné aktualizace.

### 4.6 Základní administrace

- autentizace pouze pro oprávněné členy redakce;
- CRUD pro tituly, recenze, kolekce a vazby na videa;
- koncept, náhled, publikace a stažení z publikace;
- serverová validace, audit základních změn a ochrana administračních rout;
- importy musí být opakovatelné a nesmějí bez kontroly přepsat redakční obsah.

Admin může být zpočátku jednoduché chráněné rozhraní nebo ověřený databázový/CMS panel. Volba se provede po auditu skutečného Astro projektu; vlastní plnohodnotný CMS není podmínkou první iterace.

### 4.7 Analytika

Měřit pouze události potřebné pro produktová rozhodnutí:

- zahájení chatu, odeslání dotazu, úspěšná/chybová odpověď a dosažení limitu;
- zobrazení doporučených karet a otevření detailu z doporučení;
- otevření recenze, kolekce a YouTube odkazu/přehrávače;
- anonymizované technické metriky: latence retrievalu, latence/poskytovatel modelu, tokeny či účtované jednotky a odhad nákladu;
- žádný plný text konverzací v běžné produktové analytice; případný diagnostický záznam musí být minimalizovaný, časově omezený a bez citlivých údajů.

Primární produktový ukazatel MVP: **podíl úspěšných chatových relací, ve kterých uživatel otevře alespoň jeden doporučený detail**. Doplňkové ukazatele: úspěšnost odpovědí, opakování dotazu, latence p95, náklad na úspěšnou relaci a míra přechodu na redakční obsah.

## 5. Obsahový a datový model

Minimální domény:

- `titles`: film/seriál, názvy, slug, rok, stopáž, žánry, země, synopse bez spoilerů, externí ID, obrázky a zdroj metadat;
- `reviews`: titul, autor, stav, spoiler-free perex/tělo, volitelná spoilerová část, hodnocení, data publikace;
- `collections`: název, slug, úvod, stav a ručně řazené položky;
- `videos`: YouTube ID, název a vazby na tituly/recenze/kolekce;
- `recommendation_sessions`: náhodné ID, omezený kontext, timestamps a stav souhlasu/retence;
- `recommendation_events`: technický výsledek, vybraná interní ID, latence, poskytovatel/model, spotřeba a bezpečně odvozené analytické atributy;
- `editor_users` a audit změn, pokud je administrační vrstva implementuje sama.

PostgreSQL/Supabase je preferovaný kandidát. Databázová vrstva nemá být pevně svázaná s UI ani s jedním AI poskytovatelem. Schéma, migrace, seed data a oprávnění patří do verzování; servisní klíče pouze na server.

## 6. Doporučovací architektura

Navržený tok:

1. normalizovat a bezpečně omezit vstup;
2. odvodit strukturované preference (např. žánr, nálada, maximální délka) bez přidávání faktů;
3. SQL/full-text/facetové vyhledání a případně vektorové řazení nad vlastní databází;
4. vytvořit rozmanitou sadu ověřených kandidátů;
5. předat modelu jen potřebná pole kandidátů a krátký konverzační kontext;
6. vyžádat strukturovaný výstup s interními ID a zdůvodněním;
7. validovat odpověď, dohledat finální data podle ID a renderovat je z databáze;
8. při chybě modelu použít deterministické pořadí kandidátů.

Rozhraní poskytovatele má být malé a vyměnitelné, například `recommend(input, candidates, context) -> RecommendationResult`. Provider adaptér řeší autentizaci, timeout, retry pravidla, mapování strukturovaného výstupu a měření spotřeby. Retrieval, validace, rate limiting a produktová pravidla zůstávají mimo adaptér.

### Výběr AI modelu

Před produkční volbou porovnat **Ministral 8B, Gemini 2.5 Flash-Lite a GPT-6 Luna** na stejné sadě anonymizovaných českých scénářů. Nevybírat pouze podle ceny za token. Hodnotit:

- přesnost výběru pouze z dodaných kandidátů;
- kvalitu a stručnost češtiny;
- dodržení spoilerů, filtrů a strukturovaného schématu;
- p50/p95 latenci a chybovost;
- cenu za úspěšnou relaci včetně opakování;
- dostupnost, rate limits, podmínky zpracování dat a snadnost provozu.

Modelové verze, ceny a limity se mění; konkrétní vítěz a datum benchmarku se doplní do rozhodovacího záznamu až podle aktuální dokumentace a měření. Musí existovat konfigurovatelný primární provider, bezpečný fallback a možnost AI zcela vypnout.

## 7. Cílová technická architektura

Pro web preferovat existující Astro projekt, jakmile bude nalezen nebo připojen:

- Astro pro routy, obsahové stránky, SEO a serverové endpointy;
- React island pouze pro stavový chat a případné malé interaktivní prvky;
- server-side API pro doporučení, limity a přístup k tajným klíčům;
- PostgreSQL/Supabase za repository/service vrstvou;
- schema validation na všech hranicích;
- obrázky s jasným zdrojem, optimalizací a fallbackem;
- oddělené konfigurace pro lokální vývoj, preview a produkci;
- automatické testy pro retrieval, provider kontrakt, spoiler policy, limity a kritickou uživatelskou cestu.

Veřejný web nesmí přímo používat lokální OAuth tokeny, soukromé YouTube Analytics API ani soubory reportů z tohoto repozitáře.

## 8. Stav tohoto repozitáře a konflikty

Tento checkout je správný webový projekt: Astro 4 se statickým výstupem, obsahovými kolekcemi a dark-mode UI. Obsahuje routy homepage, recenzí, detailu titulu a kolekcí, Kuts Score, veřejné YouTube vazby, filtrování recenzí, režim coming-soon a testy podpůrné logiky. Ukázkové tituly jsou označené jako `sample` a produkční build je skrývá; to je důležitá bezpečnostní vlastnost, kterou je nutné zachovat.

Zachovat a postupně rozšířit:

- současné URL `/`, `/reviews`, `/title/[slug]` a `/collections/[slug]`;
- Astro Content Collections, existující obsah a redakční Kuts Score;
- dark vizuální jazyk, responzivní komponenty, reduced-motion chování a statickou degradaci;
- produkční filtr ukázkového obsahu, preview build a coming-soon build;
- veřejné vazby na YouTube a TMDB attribution.

Konflikty a omezení:

- současný hosting podle README přijímá pouze statický výstup; AI chat, rate limiting, tajné klíče a databázové dotazy proto potřebují samostatný serverless/API runtime nebo změnu hostingu;
- kurátorovaný redakční katalog je správný pro CINEKUTS obsah, ale příliš úzký pro obecné doporučování. Širší katalog kandidátů musí být oddělený od příznaku, že titul má vlastní recenzi;
- homepage dnes upřednostňuje mediální stěnu a recenze, zatímco nová vize vyžaduje dominantní chat;
- text „No algorithms decide what’s good“ je třeba zachovat významově: hodnocení a redakční názor zůstávají lidské, AI pouze pomáhá hledat mezi ověřenými tituly;
- schema zatím nemá stopáž, explicitní spoiler-free/spoilerové části, provenienci metadat, podobné tituly ani doporučovací atributy v potřebném rozsahu;
- není zapojen React, databáze, CMS, serverový endpoint ani produkční analytika;
- repozitář byl připojen jako nový Git pracovní strom bez prvního commitu a bez nastaveného `origin`. Před větší implementací je vhodné vytvořit ověřený baseline commit a připojit správný vzdálený repozitář;
- privátní YouTube Analytics konektor je samostatný projekt. Jeho OAuth tokeny, vlastnická data a lokální reporty nesmějí vstoupit do tohoto veřejného webu.

Doporučení: ponechat statický Astro frontend a první verzi redakčního obsahu, ale provozovat doporučovací API odděleně. Supabase/PostgreSQL může obsloužit širší katalog, redakční administraci a serverovou retrieval vrstvu. Veřejný web nesmí volat AI poskytovatele ani databázové service-role klíče přímo z prohlížeče.

## 9. Implementační roadmapa

### Fáze 0 — stabilizace baseline a technická rozhodnutí

- nastavit a ověřit GitHub `origin`, vytvořit první commit současného funkčního stavu a nechat jej projít testy/buildem;
- potvrdit produkční hosting, deploy proces, vlastnictví domény a podporované runtime možnosti;
- zdokumentovat současné URL, produkční/preview/coming-soon buildy a publikační filtr;
- rozhodnout o serverless/API hostingu, Supabase projektu, správě tajemství a minimální administraci;
- potvrdit jazyk produktu; současné UI i obsah jsou anglicky, zatímco interní produktová dokumentace je česky;
- oddělit redakční pokrytí od širšího katalogu doporučovacích kandidátů.

**Výstup:** reprodukovatelný baseline, schválený deployment a rozhodnutí o datové/API vrstvě. Před dokončením této fáze nedělat velké změny aplikace.

### Fáze 1 — produktový a datový základ

- definovat design tokeny, základní layout a přístupné dark-mode komponenty;
- navrhnout databázové schéma, migrace, provenance metadat a redakční workflow;
- připravit malý kurátorovaný seed katalog a několik skutečných recenzí/kolekcí;
- zavést stabilní routy detailu a redirect plán ze současných URL;
- nastavit soukromí, retenci, serverovou validaci a minimální analytické události.

**Exit kritéria:** obsah lze bezpečně vytvořit a zobrazit; žádná současná funkční URL není bez rozhodnutí ztracena.

### Fáze 2 — vertikální řez bez závislosti na AI

- postavit responzivní homepage s finálním směrem vizuálu;
- implementovat filmové karty, detail titulu, recenzi a kolekci;
- zavést retrieval API s filtry a deterministickým rankingem;
- zobrazit tři doporučení z databáze i při vypnutém provideru;
- přidat spoilerové ovládání a přístupnost.

**Exit kritéria:** celá primární cesta funguje s databázovými doporučeními bez externího modelu.

### Fáze 3 — AI vrstva a kontrola nákladů

- zavést provider-neutral rozhraní a adaptéry pro kandidátní modely;
- připravit eval dataset a měřit kvalitu, latenci, schéma a náklady;
- vybrat primární model a fallback na základě benchmarku;
- implementovat anonymní session context, rate limits, rozpočtový kill switch, timeout a bezpečnou degradaci;
- nepersistovat plné prompty bez explicitně schváleného diagnostického režimu.

**Exit kritéria:** model vybírá pouze existující kandidáty, odpovědi procházejí validací, limity i fallback jsou otestované a znám náklad na úspěšnou relaci.

### Fáze 4 — redakční provoz a integrace

- dodat minimální chráněnou administraci;
- propojit tituly, recenze, kolekce a veřejná YouTube videa;
- nastavit workflow koncept–náhled–publikace;
- případné agregované metriky z tohoto analytického konektoru exportovat pouze jako interní podklady, nikoli přes veřejný endpoint;
- sepsat provozní postupy, zálohy a obnovu.

### Fáze 5 — hardening a spuštění

- end-to-end test mobilní i desktopové cesty;
- accessibility, performance, SEO a security review;
- load/cost test doporučovacího endpointu a ověření limitů;
- kontrola analytiky, soukromí, chybových stavů a rollbacku;
- postupný rollout s monitoringem chyb, latence, nákladů a konverze.

## 10. Definition of Done pro MVP

MVP je připravené k veřejnému spuštění, když:

- homepage a všechny klíčové stránky jsou responzivní, přístupné a mají definované prázdné/chybové stavy;
- anonymní chat vrací validovaná doporučení z databáze a nikdy nevystavuje tajné klíče;
- při výpadku AI zůstává použitelná deterministická cesta;
- detail, recenze, kolekce a základní administrace fungují včetně oprávnění;
- spoilery jsou výchozím stavem skryté a pokryté testy;
- existují rate limits, rozpočtový strop, měření nákladů a provozní alarmy;
- byly zachovány nebo vědomě přesměrovány současné funkční URL a integrace;
- je proveden základní accessibility, performance, security a privacy review;
- existuje rollback a záloha obsahu/databáze.

## 11. Mimo rozsah MVP

- uživatelské účty a profily;
- synchronizovaný watchlist;
- komentáře, komunitní hodnocení a další komunitní funkce;
- personalizace napříč zařízeními;
- předplatné, reklama, affiliate monetizace a paywall;
- automaticky generované redakční recenze;
- garantovaná streamovací dostupnost bez ověřeného datového partnera.

## 12. Otevřená rozhodnutí

Před implementací v Astro repozitáři je nutné potvrdit:

1. zdroj a licenční podmínky filmových metadat a plakátů;
2. Supabase vs. jiný PostgreSQL hosting a způsob redakční autentizace;
3. zda stačí Supabase Studio/existující CMS, nebo je nutný vlastní admin;
4. hosting serverového AI endpointu při zachování statického Astro frontendu;
5. přesná pravidla retence konverzací a volba privacy-friendly analytiky;
6. jazyk veřejného produktu a případná lokalizační strategie;
7. redakční stupnice hodnocení a pravidla pro spoilerové členění;
8. aktuální benchmark a produkční volba AI modelu;
9. cílový měsíční rozpočet a limity požadavků;
10. způsob napojení veřejného YouTube obsahu bez zpřístupnění soukromé analytiky.

## 13. Řízení změn

- Produktová nebo architektonická změna musí aktualizovat tento dokument nebo přidat odkazovaný rozhodovací záznam.
- Hypotézy, ceny a limity externích služeb musí mít datum ověření; nesmějí se považovat za trvalé.
- Rozšíření rozsahu MVP vyžaduje výslovné rozhodnutí a popis dopadu na čas, náklady a soukromí.
- Stávající funkční části se nemažou ani nepřepisují bez inventury, migračního plánu a ověření regresí.

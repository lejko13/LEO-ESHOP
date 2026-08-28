// Central content source for the site's legal pages, structured the same
// way as data/products/index.js — one object per slug, mapped over by the
// shared Legal.jsx page component. Every field is bilingual ({ en, sk })
// and read through the pick() helper from useLanguage(). Fictional
// placeholder copy, but shaped like a real e-commerce store's policy pages.

export const legalPages = {
  terms: {
    title: { en: "Terms of Service", sk: "Obchodné podmienky" },
    updated: "August 2026",
    sections: [
      {
        heading: { en: "0. Seller Identification", sk: "0. Identifikačné údaje predávajúceho" },
        body: {
          en: "LEO FUDALY, [Full name / company name], with registered address at [Address], Company ID (IČO): [IČO], Tax ID (DIČ): [DIČ], registered in [Trade Register / Živnostenský register — registration details]. Contact e-mail: [Contact e-mail]. (Fill in your real business details here before launch — see the note left for you alongside this change.)",
          sk: "LEO FUDALY, [Meno / názov spoločnosti], so sídlom/miestom podnikania [Adresa], IČO: [IČO], DIČ: [DIČ], zapísaný v [Obchodný register / Živnostenský register — údaje o zápise]. Kontaktný e-mail: [Kontaktný e-mail]. (Pred spustením webu si sem doplň svoje reálne firemné údaje — pozri poznámku k tejto úprave.)",
        },
      },
      {
        heading: { en: "1. Acceptance of Terms", sk: "1. Prijatie podmienok" },
        body: {
          en: "By accessing or placing an order through LEO FUDALY, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.",
          sk: "Prístupom na LEO FUDALY alebo zadaním objednávky súhlasíte s týmito obchodnými podmienkami. Ak s nimi nesúhlasíte, túto stránku prosím nepoužívajte.",
        },
      },
      {
        heading: { en: "2. Orders & Payment", sk: "2. Objednávky a platba" },
        body: {
          en: "All orders are subject to availability and confirmation. Prices are listed in EUR and include applicable taxes unless stated otherwise. We reserve the right to refuse or cancel any order. The order is confirmed once payment has been successfully processed; a purchase contract is concluded at that moment.",
          sk: "Všetky objednávky podliehajú dostupnosti a potvrdeniu. Ceny sú uvedené v EUR a zahŕňajú príslušné dane, pokiaľ nie je uvedené inak. Vyhradzujeme si právo odmietnuť alebo zrušiť akúkoľvek objednávku. Objednávka je potvrdená úspešným spracovaním platby; kúpna zmluva je uzavretá v tomto okamihu.",
        },
      },
      {
        heading: { en: "3. Shipping & Delivery", sk: "3. Doprava a dodanie" },
        body: {
          en: "Estimated delivery times are provided at checkout and are not guaranteed. Risk of loss passes to you upon delivery to the shipping carrier.",
          sk: "Predpokladané doby dodania sú uvedené pri pokladni a nie sú garantované. Riziko straty prechádza na vás odovzdaním zásielky prepravcovi.",
        },
      },
      {
        heading: {
          en: "4. Right of Withdrawal (14-Day Return)",
          sk: "4. Právo na odstúpenie od zmluvy (14 dní)",
        },
        body: {
          en: "In accordance with EU consumer protection law (Directive 2011/83/EU, implemented in Slovakia by Act No. 102/2014 Coll.), you have the right to withdraw from your purchase within 14 calendar days of receiving your order, without giving any reason. To exercise this right, contact us at [Contact e-mail] with your order details before the 14-day period expires. Items must be returned unworn, unwashed, and in their original condition with tags attached; you are responsible for the direct cost of returning the goods unless stated otherwise. Once we receive and inspect the returned item, we will refund the full purchase price (including standard delivery cost) within 14 days, using the same payment method you used to pay, unless you agree otherwise. This right of withdrawal does not apply to goods made to your specifications or clearly personalized (e.g. custom / made-to-order pieces arranged via our contact form).",
          sk: "V súlade s právom EU na ochranu spotrebiteľa (smernica 2011/83/EU, na Slovensku implementovaná zákonom č. 102/2014 Z. z.) máte právo odstúpiť od kúpnej zmluvy do 14 kalendárnych dní od prevzatia objednávky, a to bez uvedenia dôvodu. Na uplatnenie tohto práva nás kontaktujte na [Kontaktný e-mail] s údajmi o vašej objednávke pred uplynutím 14-dňovej lehoty. Tovar musí byť vrátený nenosený, neopraný a v pôvodnom stave s visačkami; priame náklady na vrátenie tovaru znášate vy, pokiaľ nie je uvedené inak. Po prijatí a kontrole vráteného tovaru vám vrátime plnú kúpnu cenu (vrátane štandardných nákladov na doručenie) do 14 dní, a to rovnakým spôsobom platby, aký ste použili, pokiaľ sa nedohodneme inak. Toto právo na odstúpenie sa nevzťahuje na tovar vyrobený podľa vašich požiadaviek alebo jednoznačne prispôsobený na mieru (napr. zákazkové kusy dohodnuté cez kontaktný formulár).",
        },
      },
      {
        heading: { en: "5. Warranty & Complaints", sk: "5. Záruka a reklamácie" },
        body: {
          en: "Goods carry the statutory warranty period. If you receive a defective or damaged item, contact us at [Contact e-mail] with your order number and photos of the issue, and we will arrange a repair, replacement, or refund in line with applicable consumer protection law.",
          sk: "Na tovar sa vzťahuje zákonná záručná doba. Ak dostanete chybný alebo poškodený tovar, kontaktujte nás na [Kontaktný e-mail] s číslom objednávky a fotografiami problému, a zariadime opravu, výmenu alebo vrátenie peňazí v súlade s platnými predpismi na ochranu spotrebiteľa.",
        },
      },
      {
        heading: { en: "6. Limitation of Liability", sk: "6. Obmedzenie zodpovednosti" },
        body: {
          en: "LEO FUDALY is not liable for indirect, incidental, or consequential damages arising from the use of this site or its products, to the fullest extent permitted by law.",
          sk: "LEO FUDALY nezodpovedá za nepriame, náhodné ani následné škody vyplývajúce z používania tejto stránky alebo jej produktov, v maximálnom rozsahu povolenom zákonom.",
        },
      },
      {
        heading: {
          en: "7. Dispute Resolution",
          sk: "7. Alternatívne riešenie sporov",
        },
        body: {
          en: "If you are not satisfied with how we have handled your complaint, you may contact the Slovak Trade Inspection Authority (Slovenská obchodná inšpekcia, www.soi.sk) as the competent alternative dispute resolution body, or submit a complaint via the EU Online Dispute Resolution platform at ec.europa.eu/consumers/odr.",
          sk: "Ak nie ste spokojní so spôsobom vybavenia vašej reklamácie, môžete sa obrátiť na Slovenskú obchodnú inšpekciu (www.soi.sk) ako príslušný subjekt alternatívneho riešenia sporov, alebo podať návrh cez platformu EU na riešenie sporov online na ec.europa.eu/consumers/odr.",
        },
      },
      {
        heading: { en: "8. Governing Law", sk: "8. Rozhodné právo" },
        body: {
          en: "These Terms of Service are governed by the laws of the Slovak Republic, without prejudice to any mandatory consumer protection rights you have under the law of your country of residence.",
          sk: "Tieto obchodné podmienky sa riadia právnym poriadkom Slovenskej republiky, bez toho, aby boli dotknuté akékoľvek kogentné práva na ochranu spotrebiteľa podľa práva krajiny vášho bydliska.",
        },
      },
    ],
  },
  privacy: {
    title: { en: "Privacy Policy", sk: "Zásady ochrany súkromia" },
    updated: "August 2026",
    sections: [
      {
        heading: { en: "0. Data Controller", sk: "0. Prevádzkovateľ" },
        body: {
          en: "The controller of your personal data is LEO FUDALY, [Full name / company name], registered address at [Address], Company ID (IČO): [IČO], contact e-mail: [Contact e-mail]. (Fill in your real business details here before launch.)",
          sk: "Prevádzkovateľom vašich osobných údajov je LEO FUDALY, [Meno / názov spoločnosti], so sídlom/miestom podnikania [Adresa], IČO: [IČO], kontaktný e-mail: [Kontaktný e-mail]. (Pred spustením webu si sem doplň svoje reálne firemné údaje.)",
        },
      },
      {
        heading: {
          en: "1. Information We Collect",
          sk: "1. Informácie, ktoré zhromažďujeme",
        },
        body: {
          en: "We collect information you provide directly, such as your name, email, shipping address, and payment details, as well as data collected automatically through cookies and similar technologies.",
          sk: "Zhromažďujeme informácie, ktoré nám poskytnete priamo, ako meno, e-mail, doručovaciu adresu a platobné údaje, ako aj údaje zbierané automaticky pomocou cookies a podobných technológií.",
        },
      },
      {
        heading: {
          en: "2. How We Use Your Information",
          sk: "2. Ako používame vaše informácie",
        },
        body: {
          en: "We use your information to process orders, provide customer support, improve our site, and — where you've opted in — send marketing communications such as newsletters.",
          sk: "Vaše informácie používame na spracovanie objednávok, poskytovanie zákazníckej podpory, zlepšovanie stránky a — ak ste s tým súhlasili — na zasielanie marketingovej komunikácie, napríklad newslettera.",
        },
      },
      {
        heading: {
          en: "3. Legal Basis for Processing",
          sk: "3. Právny základ spracúvania",
        },
        body: {
          en: "We process your data to perform a contract with you (processing your order), to comply with legal obligations (e.g. accounting records), based on your consent (e.g. the newsletter), and based on our legitimate interest (e.g. preventing fraud, improving the site) — in line with Article 6 of the GDPR.",
          sk: "Vaše údaje spracúvame na plnenie zmluvy s vami (vybavenie objednávky), na splnenie zákonných povinností (napr. účtovné doklady), na základe vášho súhlasu (napr. newsletter), a na základe nášho oprávneného záujmu (napr. prevencia podvodov, zlepšovanie stránky) — v súlade s článkom 6 GDPR.",
        },
      },
      {
        heading: { en: "4. Cookies & Tracking", sk: "4. Cookies a sledovanie" },
        body: {
          en: "This site uses cookies to remember your preferences and analyze traffic. You can accept or decline non-essential cookies via the banner shown on your first visit, and control cookie behavior at any time through your browser settings.",
          sk: "Táto stránka používa cookies na zapamätanie vašich preferencií a analýzu návštevnosti. Nepodstatné cookies môžete prijať alebo odmietnuť cez lištu zobrazenú pri prvej návšteve, a správanie cookies môžete kedykoľvek ovládať aj v nastaveniach prehliadača.",
        },
      },
      {
        heading: { en: "5. Data Sharing", sk: "5. Zdieľanie údajov" },
        body: {
          en: "We share data with service providers who help us operate the store — such as our payment processor (Stripe) and database provider (Supabase), which may process or store data outside the European Economic Area under appropriate safeguards (e.g. Standard Contractual Clauses) — and shipping carriers. We do not sell your personal information to third parties.",
          sk: "Údaje zdieľame s poskytovateľmi služieb, ktorí nám pomáhajú prevádzkovať obchod — napríklad s platobným spracovateľom (Stripe) a poskytovateľom databázy (Supabase), ktorí môžu údaje spracúvať alebo uchovávať aj mimo Európskeho hospodárskeho priestoru na základe primeraných záruk (napr. štandardných zmluvných doložiek) — a s prepravcami. Vaše osobné údaje nepredávame tretím stranám.",
        },
      },
      {
        heading: {
          en: "6. Data Retention",
          sk: "6. Doba uchovávania údajov",
        },
        body: {
          en: "We retain order and invoicing data for as long as required by applicable accounting and tax law, and other personal data only for as long as necessary for the purposes described in this policy, after which it is deleted or anonymized.",
          sk: "Údaje o objednávkach a fakturačné údaje uchovávame tak dlho, ako to vyžadujú platné účtovné a daňové predpisy, a ostatné osobné údaje len tak dlho, ako je to potrebné na účely opísané v týchto zásadách, potom sú vymazané alebo anonymizované.",
        },
      },
      {
        heading: { en: "7. Your Rights", sk: "7. Vaše práva" },
        body: {
          en: "Depending on your location, you may have the right to access, correct, delete, restrict or object to the processing of your personal data, and the right to data portability. Contact us at [Contact e-mail] to exercise these rights. If you believe your data has been processed unlawfully, you also have the right to lodge a complaint with the Office for Personal Data Protection of the Slovak Republic (Úrad na ochranu osobných údajov SR, www.dataprotection.gov.sk) or your local supervisory authority.",
          sk: "V závislosti od vašej lokality môžete mať právo na prístup, opravu, vymazanie, obmedzenie spracúvania alebo namietanie proti spracúvaniu vašich osobných údajov, ako aj právo na prenosnosť údajov. Ak si chcete tieto práva uplatniť, kontaktujte nás na [Kontaktný e-mail]. Ak sa domnievate, že vaše údaje boli spracované protiprávne, máte tiež právo podať sťažnosť na Úrad na ochranu osobných údajov SR (www.dataprotection.gov.sk) alebo na miestne príslušný dozorný orgán.",
        },
      },
    ],
  },
  accessibility: {
    title: { en: "Accessibility Statement", sk: "Vyhlásenie o prístupnosti" },
    updated: "August 2026",
    sections: [
      {
        heading: { en: "1. Our Commitment", sk: "1. Náš záväzok" },
        body: {
          en: "LEO FUDALY is committed to ensuring digital accessibility for people of all abilities. We continually work to improve the user experience for everyone.",
          sk: "LEO FUDALY sa zaväzuje zabezpečiť digitálnu prístupnosť pre ľudí so všetkými schopnosťami. Neustále pracujeme na zlepšovaní používateľského zážitku pre všetkých.",
        },
      },
      {
        heading: {
          en: "2. Standards We Follow",
          sk: "2. Štandardy, ktoré dodržiavame",
        },
        body: {
          en: "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, level AA, across this site's pages and interactive features.",
          sk: "Snažíme sa dodržiavať pravidlá Web Content Accessibility Guidelines (WCAG) 2.1 na úrovni AA naprieč stránkami a interaktívnymi prvkami tejto stránky.",
        },
      },
      {
        heading: { en: "3. Feedback", sk: "3. Spätná väzba" },
        body: {
          en: "If you encounter any barriers while using this site, please let us know through our contact page so we can address the issue.",
          sk: "Ak pri používaní tejto stránky narazíte na akékoľvek prekážky, dajte nám prosím vedieť cez kontaktnú stránku, aby sme mohli problém vyriešiť.",
        },
      },
      {
        heading: {
          en: "4. Ongoing Improvements",
          sk: "4. Priebežné zlepšovanie",
        },
        body: {
          en: "Accessibility is an ongoing effort. We periodically review our site and update it to reflect current standards and best practices.",
          sk: "Prístupnosť je nepretržitý proces. Stránku pravidelne kontrolujeme a aktualizujeme tak, aby odrážala aktuálne štandardy a osvedčené postupy.",
        },
      },
    ],
  },
};

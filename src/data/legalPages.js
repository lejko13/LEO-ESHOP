// Central content source for the site's legal pages, structured the same
// way as data/products/index.js — one object per slug, mapped over by the
// shared Legal.jsx page component. Every field is bilingual ({ en, sk })
// and read through the pick() helper from useLanguage(). Fictional
// placeholder copy, but shaped like a real e-commerce store's policy pages.

export const legalPages = {
  terms: {
    title: { en: "Terms of Service", sk: "Obchodné podmienky" },
    updated: "September 2026",
    sections: [
      {
        heading: { en: "0. Seller Identification", sk: "0. Identifikačné údaje predávajúceho" },
        body: {
          en: "The operator of the LEO FUDALY online store is Leo Fudaly, with place of business at Krátka 91/8A, 059 01 Spišská Belá, Slovak Republic. Company ID (IČO): 57726256, Tax ID (DIČ): 1131312732. The seller is not a VAT payer. Registered in the Trade Licensing Register of the Slovak Republic, District Office Kežmarok, trade register number: 730-23517. Contact e-mail: leo.fudaly@gmail.com. Hereinafter referred to as the \u201cseller\u201d.",
          sk: "Prevádzkovateľom internetového obchodu LEO FUDALY je Leo Fudaly, s miestom podnikania Krátka 91/8A, 059 01 Spišská Belá, Slovenská republika. IČO: 57726256, DIČ: 1131312732. Predávajúci nie je platiteľom DPH. Zapísaný v Živnostenskom registri Slovenskej republiky, Okresný úrad Kežmarok, číslo živnostenského registra: 730-23517. Kontaktný e-mail: leo.fudaly@gmail.com. Ďalej len ako „predávajúci“.",
        },
      },
      {
        heading: { en: "1. General Provisions", sk: "1. Všeobecné ustanovenia" },
        body: {
          en: "These Terms of Service govern the rights and obligations between the seller and the customer when purchasing goods through the LEO FUDALY online store. A consumer is a natural person who, when concluding and performing a consumer contract, is not acting within the scope of their business activity or profession. By submitting an order, the customer confirms that they have read and agree to these Terms of Service. The Terms of Service are available to the customer on the online store's website.",
          sk: "Tieto obchodné podmienky upravujú práva a povinnosti medzi predávajúcim a zákazníkom pri nákupe tovaru prostredníctvom internetového obchodu LEO FUDALY. Spotrebiteľom je fyzická osoba, ktorá pri uzatváraní a plnení spotrebiteľskej zmluvy nekoná v rámci predmetu svojej podnikateľskej činnosti alebo povolania. Odoslaním objednávky zákazník potvrdzuje, že sa oboznámil s týmito obchodnými podmienkami a že s nimi súhlasí. Obchodné podmienky sú zákazníkovi dostupné na webovej stránke internetového obchodu.",
        },
      },
      {
        heading: { en: "2. Order and Conclusion of the Purchase Contract", sk: "2. Objednávka a uzatvorenie kúpnej zmluvy" },
        body: {
          en: "The customer selects the goods, their size, colour, quantity, and any other available attributes through the online store. Before submitting the order, the customer has the opportunity to review and correct the entered details. Before submitting the order, the customer is informed in particular about the main characteristics of the goods, the final price of the goods, the delivery costs, the available payment methods, and the available delivery methods. By submitting the order, the customer becomes obliged to pay the order price, if the order involves such an obligation. The purchase contract is concluded upon confirmation of the order by the seller, or upon successful receipt of payment, if the order process of the online store is set up that way. After the order is created, the customer receives a confirmation at the e-mail address provided with the order. The seller reserves the right to cancel the order, in particular if the goods are no longer available, an obvious technical error occurred in the price, the payment could not be processed, or the order cannot be fulfilled for objective reasons. If the customer has already paid for the order, the amount paid will be refunded in such a case.",
          sk: "Zákazník si vyberá tovar, jeho veľkosť, farbu, množstvo a ďalšie dostupné vlastnosti prostredníctvom internetového obchodu. Pred odoslaním objednávky má zákazník možnosť skontrolovať a opraviť zadané údaje. Pred odoslaním objednávky je zákazník informovaný najmä o hlavnom charaktere tovaru, konečnej cene tovaru, nákladoch na dopravu, dostupných spôsoboch platby a dostupných spôsoboch doručenia. Odoslaním objednávky vzniká zákazníkovi povinnosť zaplatiť cenu objednávky, ak objednávka túto povinnosť zahŕňa. Kúpna zmluva je uzatvorená potvrdením objednávky zo strany predávajúceho, prípadne úspešným prijatím platby, ak je tak nastavený proces objednávky v internetovom obchode. Po vytvorení objednávky dostane zákazník potvrdenie na e-mailovú adresu uvedenú pri objednávke. Predávajúci si vyhradzuje právo objednávku zrušiť najmä v prípade, ak tovar už nie je dostupný, došlo k zjavnej technickej chybe v cene, platbu nebolo možné spracovať, alebo objednávku nie je možné z objektívnych dôvodov splniť. Ak už zákazník objednávku zaplatil, zaplatená suma mu bude v takom prípade vrátená.",
        },
      },
      {
        heading: { en: "3. Prices and Payment Terms", sk: "3. Ceny a platobné podmienky" },
        body: {
          en: "All prices in the online store are stated in euros (€). The seller is not a VAT payer. The delivery price is displayed separately before the order is completed. Before submitting the order, the customer is informed of the total amount they are required to pay. Payment can be made using the methods listed at checkout, in particular by payment card, via Apple Pay or Google Pay where available, through the Stripe payment service, or another method indicated in the online store.",
          sk: "Všetky ceny v internetovom obchode sú uvedené v eurách (€). Predávajúci nie je platiteľom DPH. Cena dopravy sa zobrazuje samostatne pred dokončením objednávky. Zákazník je pred odoslaním objednávky informovaný o celkovej sume, ktorú je povinný zaplatiť. Platbu je možné uskutočniť spôsobmi uvedenými v pokladni internetového obchodu, najmä platobnou kartou, službou Apple Pay alebo Google Pay, ak sú dostupné, prostredníctvom platobnej služby Stripe, prípadne iným spôsobom uvedeným v internetovom obchode.",
        },
      },
      {
        heading: { en: "4. Shipping and Delivery", sk: "4. Doprava a dodanie" },
        body: {
          en: "The available delivery options and their price are shown to the customer before the order is completed. Goods may be delivered in particular through Packeta or another carrier specified with the order. The customer is required to provide correct and complete information needed to deliver the order. The estimated delivery time stated in the online store is indicative only, unless expressly stated otherwise. The risk of damage to or loss of the goods generally passes to the consumer at the moment the goods are taken over by the consumer or by a third party designated by the consumer who is not the carrier.",
          sk: "Dostupné možnosti dopravy a ich cena sú zákazníkovi zobrazené pred dokončením objednávky. Tovar môže byť doručovaný najmä prostredníctvom spoločnosti Packeta alebo iného dopravcu uvedeného pri objednávke. Zákazník je povinný uviesť správne a úplné údaje potrebné na doručenie objednávky. Predpokladaný termín dodania uvedený v internetovom obchode je orientačný, pokiaľ nie je výslovne uvedené inak. Nebezpečenstvo poškodenia alebo straty tovaru prechádza na spotrebiteľa spravidla až v okamihu, keď tovar prevezme spotrebiteľ alebo ním určená tretia osoba, ktorá nie je dopravcom.",
        },
      },
      {
        heading: { en: "5. Consumer's Right to Withdraw from the Contract", sk: "5. Právo spotrebiteľa odstúpiť od zmluvy" },
        body: {
          en: "In the case of a contract concluded at a distance, the consumer has the right to withdraw from the contract without giving any reason within 14 days of taking delivery of the goods. To exercise the right of withdrawal, it is sufficient for the consumer to send the seller an unambiguous statement of withdrawal from the contract by e-mail to leo.fudaly@gmail.com, stating in particular the order number, the date the order was placed and received, and their name and address. The consumer is required to send the goods back or hand them over to the seller no later than 14 days from the date of withdrawal from the contract. The cost of returning the goods is borne by the consumer, unless the seller expressly states that it will bear this cost itself. The consumer is liable for any diminished value of the goods resulting from handling the goods beyond what is necessary to establish their nature, characteristics, and functioning.",
          sk: "Spotrebiteľ má pri zmluve uzavretej na diaľku právo odstúpiť od zmluvy bez uvedenia dôvodu v lehote 14 dní od prevzatia tovaru. Na uplatnenie práva na odstúpenie od zmluvy stačí, ak spotrebiteľ zašle predávajúcemu jednoznačné vyhlásenie o odstúpení od zmluvy e-mailom na adresu leo.fudaly@gmail.com, v ktorom uvedie najmä číslo objednávky, dátum objednania a prevzatia tovaru a svoje meno a adresu. Spotrebiteľ je povinný tovar zaslať späť alebo ho odovzdať predávajúcemu najneskôr do 14 dní odo dňa odstúpenia od zmluvy. Náklady na vrátenie tovaru znáša spotrebiteľ, pokiaľ predávajúci výslovne neuvedie, že ich znáša sám. Spotrebiteľ zodpovedá za zníženie hodnoty tovaru, ktoré vzniklo v dôsledku zaobchádzania s tovarom nad rámec toho, čo je potrebné na zistenie jeho vlastností a funkčnosti.",
        },
      },
      {
        heading: { en: "6. Refund of Payments after Withdrawal", sk: "6. Vrátenie platieb po odstúpení od zmluvy" },
        body: {
          en: "In the case of valid withdrawal from the contract, the seller will refund the payments received from the consumer within the statutory period. The refund will be made using the same payment method the customer used to pay, unless the customer and the seller agree otherwise. The seller may withhold the refund until the goods have been delivered back, or until the consumer has proven that the goods have been sent back, whichever occurs first, unless the law provides otherwise. If the consumer chose a more expensive delivery method than the cheapest standard method offered by the seller, the seller is not required to refund the price difference beyond the cost of the cheapest standard delivery.",
          sk: "Pri platnom odstúpení od zmluvy predávajúci vráti spotrebiteľovi prijaté platby v zákonnej lehote. Platba bude vrátená rovnakým spôsobom, aký zákazník použil pri platbe, pokiaľ sa zákazník s predávajúcim nedohodne inak. Predávajúci môže s vrátením platby počkať do okamihu, kým mu bude tovar doručený späť, alebo kým spotrebiteľ preukáže, že tovar odoslal späť, podľa toho, ktorá skutočnosť nastane skôr, ak zákon neustanovuje inak. Ak si spotrebiteľ zvolil drahší spôsob doručenia než najlacnejší štandardný spôsob ponúkaný predávajúcim, predávajúci nie je povinný vracať rozdiel v cene nad rámec najlacnejšieho štandardného doručenia.",
        },
      },
      {
        heading: { en: "7. Exceptions to the Right of Withdrawal", sk: "7. Výnimky z práva na odstúpenie" },
        body: {
          en: "The right of withdrawal may not apply in cases established by law. For this online store, this may in particular concern goods made to the customer's specifications or clearly personalised to their individual requirements. If a customer therefore orders a product made individually to order, for example according to specific dimensions, modifications, or a design agreed with the customer, they may not have the right to the standard 14-day withdrawal.",
          sk: "Právo odstúpiť od zmluvy sa nemusí uplatniť v prípadoch stanovených zákonom. Pri tomto internetovom obchode môže ísť najmä o tovar vyrobený podľa špecifikácií zákazníka alebo tovar jednoznačne prispôsobený jeho osobným požiadavkám. Ak si teda zákazník objedná výrobok vyrobený individuálne na mieru, napríklad podľa osobitných rozmerov, úprav alebo dizajnu dohodnutého so zákazníkom, nemusí mať právo na bežné 14-dňové odstúpenie od zmluvy.",
        },
      },
      {
        heading: { en: "8. Condition of Returned Goods", sk: "8. Stav vráteného tovaru" },
        body: {
          en: "After delivery, the consumer may reasonably try out the goods in the manner necessary to establish their nature, characteristics, and functioning. Goods must not be automatically rejected merely because they have been unpacked or reasonably tried out. However, if the value of the goods is diminished as a result of excessive use or handling beyond what is necessary for such trial, the seller may take this into account when settling the withdrawal.",
          sk: "Spotrebiteľ môže tovar po doručení primerane vyskúšať spôsobom potrebným na zistenie jeho povahy, vlastností a funkčnosti. Tovar nemusí byť automaticky odmietnutý iba preto, že bol rozbalený alebo primerane vyskúšaný. Ak však dôjde k zníženiu hodnoty tovaru v dôsledku nadmerného používania alebo zaobchádzania nad rámec potrebného vyskúšania, predávajúci môže túto skutočnosť zohľadniť pri vysporiadaní odstúpenia.",
        },
      },
      {
        heading: { en: "9. Liability for Defects and Complaints", sk: "9. Zodpovednosť za vady a reklamácie" },
        body: {
          en: "The seller is liable for defects in the goods pursuant to the relevant provisions of the Civil Code. For new consumer goods, the seller is liable for a defect that the goods had upon delivery and which becomes apparent within two years of delivery. If the customer discovers a defect, they may notify the seller, in particular by e-mail at leo.fudaly@gmail.com. When making a complaint, we recommend stating the customer's name, order number, product name, description of the defect, and, if possible, photographs of the defect; photographs are not a condition for the customer's statutory rights to arise, but they can speed up the assessment of the complaint. Subject to the statutory conditions being met, the customer has the right, in particular, to repair of the product, replacement of the product, a reasonable discount on the price, or withdrawal from the contract. For a remediable defect, the consumer may choose repair or replacement, unless the chosen method is impossible or would represent disproportionate costs compared to the other method. A defect must be claimed within two months of its discovery, and at the latest within the statutory liability period for defects.",
          sk: "Predávajúci zodpovedá za vady tovaru podľa príslušných ustanovení Občianskeho zákonníka. Pri novom spotrebnom tovare predávajúci zodpovedá za vadu, ktorú mal tovar pri dodaní a ktorá sa prejaví do dvoch rokov od dodania tovaru. Ak zákazník zistí vadu, môže ju oznámiť predávajúcemu najmä e-mailom na adrese leo.fudaly@gmail.com. Pri reklamácii odporúčame uviesť meno zákazníka, číslo objednávky, názov produktu, opis vady a prípadne fotografie vady; fotografie nie sú podmienkou vzniku zákonných práv zákazníka, môžu však urýchliť posúdenie reklamácie. Zákazník má pri splnení zákonných podmienok právo najmä na opravu výrobku, výmenu výrobku, primeranú zľavu z ceny alebo odstúpenie od zmluvy. Spotrebiteľ si môže pri odstrániteľnej vade zvoliť opravu alebo výmenu, pokiaľ zvolený spôsob nie je nemožný alebo by oproti druhému spôsobu predstavoval neprimerané náklady. Vadu je potrebné vytknúť do dvoch mesiacov od jej zistenia, najneskôr v rámci zákonnej doby zodpovednosti za vady.",
        },
      },
      {
        heading: { en: "10. Product Information", sk: "10. Informácie o produktoch" },
        body: {
          en: "The seller strives to display photographs, colours, dimensions, and product characteristics as accurately as possible. However, the appearance of colours may vary slightly depending on the display type, device settings, or lighting conditions. Handmade or individually made products may exhibit minor variations that do not affect the product's functionality. Such natural variations are not considered a defect, provided the product corresponds to the agreed characteristics and its usual purpose.",
          sk: "Predávajúci sa snaží zobrazovať fotografie, farby, rozmery a vlastnosti produktov čo najpresnejšie. Vzhľad farieb sa však môže mierne líšiť v závislosti od typu displeja, nastavení zariadenia alebo svetelných podmienok. Pri ručne vyrábaných alebo individuálne vyrábaných produktoch sa môžu vyskytnúť drobné odchýlky, ktoré nemajú vplyv na funkčnosť výrobku. Takéto prirodzené odchýlky sa neposudzujú ako vada, pokiaľ výrobok zodpovedá dohodnutým vlastnostiam a bežnému účelu použitia.",
        },
      },
      {
        heading: { en: "11. Customer Obligations", sk: "11. Povinnosti zákazníka" },
        body: {
          en: "The customer is required to provide truthful and correct information when placing an order. The customer is responsible, in particular, for the accuracy of their name, e-mail address, phone number, delivery address, and chosen pickup point or Z-BOX. If the customer provides incorrect information that prevents or complicates delivery, they are required to contact the seller without delay.",
          sk: "Zákazník je povinný pri vytváraní objednávky uvádzať pravdivé a správne údaje. Zákazník je zodpovedný najmä za správnosť mena, e-mailovej adresy, telefónneho čísla, dodacej adresy a zvoleného výdajného miesta alebo Z-BOXu. Ak zákazník uvedie nesprávne údaje, ktoré znemožnia alebo skomplikujú doručenie, je povinný bezodkladne kontaktovať predávajúceho.",
        },
      },
      {
        heading: { en: "12. Uncollected Shipments", sk: "12. Nevyzdvihnuté zásielky" },
        body: {
          en: "If the customer, without good reason, fails to take delivery of the ordered shipment, this fact alone does not constitute a proper withdrawal from the contract. If the customer wishes to withdraw from the contract, they must communicate their decision to the seller in a manner that clearly indicates their withdrawal from the contract. The seller may assert demonstrable claims arising in connection with a breach of the customer's obligations, where such a right is granted to it by law.",
          sk: "Ak zákazník bezdôvodne neprevezme objednanú zásielku, táto skutočnosť sama osebe nepredstavuje riadne odstúpenie od zmluvy. Ak chce zákazník od zmluvy odstúpiť, musí svoje rozhodnutie oznámiť predávajúcemu spôsobom umožňujúcim jednoznačne určiť, že od zmluvy odstupuje. Predávajúci si môže uplatniť preukázateľné nároky vzniknuté v súvislosti s porušením povinností zákazníka, ak mu takéto právo priznáva zákon.",
        },
      },
      {
        heading: { en: "13. Alternative Resolution of Consumer Disputes", sk: "13. Alternatívne riešenie spotrebiteľských sporov" },
        body: {
          en: "If the consumer is not satisfied with the way the seller has handled their complaint or other request for remedy, they may ask the seller for redress. If the seller responds negatively or fails to respond to the request within 30 days, the consumer may, under the conditions laid down by law, submit a proposal for alternative dispute resolution. The competent alternative dispute resolution body may in particular be the Slovak Trade Inspection Authority (Slovenská obchodná inšpekcia); current information is available on its website.",
          sk: "Ak spotrebiteľ nie je spokojný so spôsobom, akým predávajúci vybavil jeho reklamáciu alebo inú žiadosť o nápravu, môže predávajúceho požiadať o nápravu. Ak predávajúci odpovie zamietavo alebo na žiadosť neodpovie do 30 dní, spotrebiteľ môže za podmienok stanovených zákonom podať návrh na alternatívne riešenie spotrebiteľského sporu. Príslušným subjektom alternatívneho riešenia sporov môže byť najmä Slovenská obchodná inšpekcia; aktuálne informácie sú dostupné na jej webovej stránke.",
        },
      },
      {
        heading: { en: "14. Protection of Personal Data", sk: "14. Ochrana osobných údajov" },
        body: {
          en: "The seller processes customers' personal data in accordance with applicable personal data protection laws. Personal data may be processed in particular for the purposes of receiving and handling the order, processing payment, delivering the shipment, communicating with the customer, handling a complaint or withdrawal, and fulfilling tax and accounting obligations. Detailed information on the processing of personal data is provided in a separate document, the Privacy Policy.",
          sk: "Predávajúci spracúva osobné údaje zákazníkov v súlade s platnými právnymi predpismi o ochrane osobných údajov. Osobné údaje môžu byť spracúvané najmä na účely prijatia a vybavenia objednávky, spracovania platby, doručenia zásielky, komunikácie so zákazníkom, vybavenia reklamácie alebo odstúpenia a splnenia daňových a účtovných povinností. Podrobné informácie o spracúvaní osobných údajov sú uvedené v samostatnom dokumente Zásady ochrany osobných údajov.",
        },
      },
      {
        heading: { en: "15. Third-Party Payment and Delivery Services", sk: "15. Platobné a dopravné služby tretích strán" },
        body: {
          en: "When processing an order, third-party services may be used to the extent necessary, in particular providers of payment or delivery services. For payment, Stripe may be used, for example. For delivery, Packeta or another carrier indicated during the ordering process may be used, for example. Their own terms and privacy policies may apply to the services the customer uses through them.",
          sk: "Pri spracovaní objednávky môžu byť v potrebnom rozsahu využité služby tretích strán, najmä poskytovatelia platobných alebo dopravných služieb. Pri platbe môže byť využívaná napríklad spoločnosť Stripe. Pri doručení môže byť využívaná napríklad spoločnosť Packeta alebo iný dopravca uvedený v objednávkovom procese. Ich vlastné podmienky a zásady ochrany osobných údajov sa môžu uplatňovať na služby, ktoré zákazník prostredníctvom nich využíva.",
        },
      },
      {
        heading: { en: "16. Intellectual Property", sk: "16. Duševné vlastníctvo" },
        body: {
          en: "The content of the online store, in particular photographs, graphics, design, logos, texts, and other elements created by the seller, is protected by the relevant legal regulations. Without the seller's consent, it is not permitted to copy, distribute, or use these materials for commercial purposes without authorisation.",
          sk: "Obsah internetového obchodu, najmä fotografie, grafika, dizajn, logá, texty a ďalšie prvky vytvorené predávajúcim, sú chránené príslušnými právnymi predpismi. Bez súhlasu predávajúceho nie je dovolené tieto materiály neoprávnene kopírovať, šíriť alebo používať na komerčné účely.",
        },
      },
      {
        heading: { en: "17. Limitation of Liability", sk: "17. Obmedzenie zodpovednosti" },
        body: {
          en: "The seller is not liable for outages of the online store caused by technical problems, third-party interference, or circumstances beyond its reasonable control. However, no provision of these Terms of Service limits or excludes the consumer's statutory rights or the seller's liability that cannot be excluded under applicable law.",
          sk: "Predávajúci nezodpovedá za výpadky internetového obchodu spôsobené technickými problémami, zásahom tretej strany alebo okolnosťami, ktoré nemohol primerane ovplyvniť. Žiadne ustanovenie týchto obchodných podmienok však neobmedzuje ani nevylučuje zákonné práva spotrebiteľa alebo zodpovednosť predávajúceho, ktorú nemožno podľa právnych predpisov vylúčiť.",
        },
      },
      {
        heading: { en: "18. Changes to the Terms of Service", sk: "18. Zmena obchodných podmienok" },
        body: {
          en: "The seller may change or update these Terms of Service to a reasonable extent. A specific order is governed by the Terms of Service in effect at the time it was submitted. The current version of the Terms of Service will be published on the online store's website.",
          sk: "Predávajúci môže tieto obchodné podmienky v primeranom rozsahu meniť alebo aktualizovať. Na konkrétnu objednávku sa vzťahujú obchodné podmienky platné v čase jej odoslania. Aktuálne znenie obchodných podmienok bude zverejnené na stránke internetového obchodu.",
        },
      },
      {
        heading: { en: "19. Governing Law", sk: "19. Rozhodné právo" },
        body: {
          en: "Legal relationships arising between the seller and the customer are governed by the laws of the Slovak Republic. If the customer is a consumer residing in another Member State of the European Union, this provision does not affect their rights arising from the mandatory provisions of the legal regulations applicable to them.",
          sk: "Právne vzťahy vznikajúce medzi predávajúcim a zákazníkom sa riadia právnym poriadkom Slovenskej republiky. Ak je zákazník spotrebiteľom s bydliskom v inom členskom štáte Európskej únie, týmto ustanovením nie sú dotknuté jeho práva vyplývajúce z kogentných ustanovení právnych predpisov, ktoré sa na neho vzťahujú.",
        },
      },
      {
        heading: { en: "20. Final Provisions", sk: "20. Záverečné ustanovenia" },
        body: {
          en: "These Terms of Service take effect on the date of their publication on the online store's website. If any provision of these Terms of Service is invalid or unenforceable, this does not affect the validity of the remaining provisions.",
          sk: "Tieto obchodné podmienky nadobúdajú účinnosť dňom ich zverejnenia na internetovom obchode. Ak je niektoré ustanovenie týchto obchodných podmienok neplatné alebo nevykonateľné, nemá to vplyv na platnosť ostatných ustanovení.",
        },
      },
    ],
  },
  privacy: {
    title: { en: "Privacy Policy", sk: "Zásady ochrany súkromia" },
    updated: "September 2026",
    sections: [
      {
        heading: { en: "0. Data Controller", sk: "0. Prevádzkovateľ" },
        body: {
          en: "The controller of personal data processed through the LEO FUDALY online store is Leo Fudaly, with place of business at Krátka 91/8A, 059 01 Spišská Belá, Slovak Republic. Company ID (IČO): 57726256, Tax ID (DIČ): 1131312732, e-mail: leo.fudaly@gmail.com. Registered in the Trade Licensing Register of the Slovak Republic, District Office Kežmarok, trade register number 730-23517. Hereinafter referred to as the \u201ccontroller\u201d.",
          sk: "Prevádzkovateľom osobných údajov spracúvaných prostredníctvom internetového obchodu LEO FUDALY je Leo Fudaly, s miestom podnikania Krátka 91/8A, 059 01 Spišská Belá, Slovenská republika. IČO: 57726256, DIČ: 1131312732, e-mail: leo.fudaly@gmail.com. Zapísaný v Živnostenskom registri Slovenskej republiky, Okresný úrad Kežmarok, číslo živnostenského registra 730-23517. Ďalej len ako „prevádzkovateľ“.",
        },
      },
      {
        heading: { en: "1. What Personal Data We Process", sk: "1. Aké osobné údaje spracúvame" },
        body: {
          en: "Depending on how the online store is used, we may process in particular your first and last name, e-mail address, phone number, billing and delivery address, order details, information about the chosen delivery method and pickup point, payment information, data needed to issue an accounting or tax document, communication with the customer, your IP address and technical device data, as well as data collected through cookies and similar technologies. The controller generally does not receive complete payment card data — the payment details needed to process a payment are handled by the payment service provider, such as Stripe.",
          sk: "V závislosti od spôsobu používania internetového obchodu môžeme spracúvať najmä meno a priezvisko, e-mailovú adresu, telefónne číslo, fakturačnú a doručovaciu adresu, údaje o objednávke, informácie o zvolenom spôsobe dopravy a výdajnom mieste, informácie o platbe, údaje potrebné na vystavenie účtovného alebo daňového dokladu, komunikáciu so zákazníkom, IP adresu a technické údaje o zariadení, ako aj údaje získané prostredníctvom cookies a podobných technológií. Prevádzkovateľ spravidla nezískava kompletné údaje o platobnej karte — platobné údaje potrebné na vykonanie platby spracúva poskytovateľ platobných služieb, napríklad Stripe.",
        },
      },
      {
        heading: { en: "2. Purposes of Processing", sk: "2. Na aké účely údaje používame" },
        body: {
          en: "We use personal data in particular to receive and process orders, to conclude and perform the purchase contract, to receive and verify payment, to deliver the order, to issue an invoice or other accounting document, to communicate with the customer, to handle complaints and withdrawals, to fulfil legal, accounting, and tax obligations, to protect the online store and prevent fraud, to analyse and improve the functioning of the website where consent is required for this, and to send marketing communications where the customer has given the relevant consent or another legal basis exists.",
          sk: "Osobné údaje používame najmä na prijatie a spracovanie objednávky, uzatvorenie a plnenie kúpnej zmluvy, prijatie a overenie platby, doručenie objednávky, vystavenie faktúry alebo iného účtovného dokladu, komunikáciu so zákazníkom, vybavenie reklamácií a odstúpení od zmluvy, plnenie zákonných, účtovných a daňových povinností, ochranu internetového obchodu a prevenciu podvodov, analýzu a zlepšovanie fungovania webovej stránky, ak je na to potrebný súhlas, a zasielanie marketingovej komunikácie, ak na to zákazník udelil príslušný súhlas alebo existuje iný zákonný právny základ.",
        },
      },
      {
        heading: { en: "3. Legal Basis for Processing", sk: "3. Právne základy spracúvania" },
        body: {
          en: "We process personal data in particular on the basis of performance of a contract — for example when processing and delivering an order; compliance with a legal obligation — for example when retaining accounting and tax documents; consent — for example for marketing communications or the use of optional analytics or marketing cookies where consent is required; and legitimate interest — for example to protect the online store, prevent fraud, or protect the controller's legal claims, where these interests are not overridden by the rights and freedoms of the data subject. The processing of personal data takes place in particular under Article 6 of the GDPR.",
          sk: "Osobné údaje spracúvame najmä na základe plnenia zmluvy — napríklad pri spracovaní a doručení objednávky; splnenia zákonnej povinnosti — napríklad pri uchovávaní účtovných a daňových dokladov; súhlasu — napríklad pri marketingovej komunikácii alebo pri použití nepovinných analytických či marketingových cookies, ak sa súhlas vyžaduje; a oprávneného záujmu — napríklad pri ochrane internetového obchodu, prevencii podvodov alebo ochrane právnych nárokov prevádzkovateľa, ak nad týmito záujmami neprevažujú práva a slobody dotknutej osoby. Spracúvanie osobných údajov prebieha najmä podľa článku 6 nariadenia GDPR.",
        },
      },
      {
        heading: { en: "4. Cookies and Similar Technologies", sk: "4. Cookies a podobné technológie" },
        body: {
          en: "The online store may use cookies and similar technologies. Necessary cookies may be used without consent where they are required for the proper functioning of the online store, for example for the shopping cart or site security to work. We use analytics, marketing, or other optional cookies only where an appropriate legal basis exists for their use, in particular the user's consent. The user may change or withdraw their consent to optional cookies at any time through the cookie settings on the website. More detailed information may be provided in a separate Cookie Policy.",
          sk: "Internetový obchod môže používať cookies a podobné technológie. Nevyhnutné cookies môžu byť používané bez súhlasu, ak sú potrebné na riadne fungovanie internetového obchodu, napríklad na fungovanie košíka alebo bezpečnosti stránky. Analytické, marketingové alebo iné nepovinné cookies používame iba vtedy, ak na ich používanie existuje príslušný právny základ, najmä súhlas používateľa. Používateľ môže svoj súhlas s nepovinnými cookies kedykoľvek zmeniť alebo odvolať prostredníctvom nastavení cookies na stránke. Podrobnejšie informácie môžu byť uvedené v samostatných Zásadách používania cookies.",
        },
      },
      {
        heading: { en: "5. Who Personal Data May Be Shared With", sk: "5. Komu môžu byť osobné údaje poskytnuté" },
        body: {
          en: "Personal data may, to the extent necessary, be provided to service providers who help us operate the online store. This may include in particular Stripe — payment processing, Supabase — database and technical services, carriers and delivery companies such as Packeta or another carrier chosen by the customer, hosting and technical infrastructure providers, an accountant or accounting service provider where we use one, and public authorities where we are required by law to provide data. We provide these recipients only with the data necessary to fulfil the specific purpose. We do not sell customers' personal data to third parties.",
          sk: "Osobné údaje môžu byť v nevyhnutnom rozsahu poskytnuté poskytovateľom služieb, ktorí nám pomáhajú prevádzkovať internetový obchod. Môže ísť najmä o spoločnosť Stripe — spracovanie platieb, spoločnosť Supabase — databázové a technické služby, dopravcov a doručovateľské spoločnosti, napríklad Packeta alebo iného dopravcu vybraného zákazníkom, poskytovateľov hostingu a technickej infraštruktúry, účtovníka alebo poskytovateľa účtovných služieb, ak ich využívame, a orgány verejnej moci, ak nám povinnosť poskytnúť údaje vyplýva zo zákona. Týmto subjektom poskytujeme iba údaje potrebné na splnenie konkrétneho účelu. Osobné údaje zákazníkov nepredávame tretím stranám.",
        },
      },
      {
        heading: { en: "6. Transfer of Data Outside the European Economic Area", sk: "6. Prenos údajov mimo Európskeho hospodárskeho priestoru" },
        body: {
          en: "Some providers of technical or payment services may process personal data outside the European Economic Area. Where such a transfer occurs, appropriate safeguards under the GDPR are used, such as an adequacy decision or standard contractual clauses.",
          sk: "Niektorí poskytovatelia technických alebo platobných služieb môžu spracúvať osobné údaje aj mimo Európskeho hospodárskeho priestoru. Ak k takémuto prenosu dochádza, používajú sa príslušné mechanizmy ochrany podľa GDPR, napríklad rozhodnutie o primeranosti alebo štandardné zmluvné doložky.",
        },
      },
      {
        heading: { en: "7. Data Retention Period", sk: "7. Doba uchovávania údajov" },
        body: {
          en: "We retain personal data only for the period necessary for the purpose for which it was obtained. Data relating to orders, invoices, and accounting documents is retained for the period required by applicable tax and accounting regulations. Data needed to perform the contract is retained for the duration of the contractual relationship and subsequently for the period necessary to protect and assert legal claims. Data processed on the basis of consent is processed until the consent is withdrawn or until the period for which it was granted expires. After the relevant period ends, the data will be deleted or anonymised, unless the law requires its further retention.",
          sk: "Osobné údaje uchovávame iba počas obdobia potrebného na účel, na ktorý boli získané. Údaje týkajúce sa objednávok, faktúr a účtovných dokladov uchovávame počas obdobia vyžadovaného platnými daňovými a účtovnými predpismi. Údaje potrebné na plnenie zmluvy uchovávame počas trvania zmluvného vzťahu a následne počas obdobia potrebného na ochranu a uplatňovanie právnych nárokov. Údaje spracúvané na základe súhlasu spracúvame do jeho odvolania alebo do uplynutia doby, na ktorú bol súhlas udelený. Po skončení príslušnej doby budú údaje vymazané alebo anonymizované, ak ich ďalšie uchovávanie nevyžaduje zákon.",
        },
      },
      {
        heading: { en: "8. Marketing Communications", sk: "8. Marketingová komunikácia" },
        body: {
          en: "We may send marketing e-mails or a newsletter only where we have an appropriate legal basis for doing so. Where marketing is based on consent, the user may withdraw that consent at any time. Unsubscribing from marketing communications is possible via the link included in the marketing e-mail or by contacting leo.fudaly@gmail.com. Withdrawing consent does not affect the lawfulness of processing carried out before its withdrawal.",
          sk: "Marketingové e-maily alebo newsletter môžeme zasielať iba v prípadoch, keď na to máme príslušný právny základ. Ak je marketing založený na súhlase, používateľ môže tento súhlas kedykoľvek odvolať. Odhlásenie z marketingovej komunikácie je možné prostredníctvom odkazu uvedeného v marketingovom e-maile alebo kontaktovaním adresy leo.fudaly@gmail.com. Odvolanie súhlasu nemá vplyv na zákonnosť spracúvania vykonaného pred jeho odvolaním.",
        },
      },
      {
        heading: { en: "9. Security of Personal Data", sk: "9. Bezpečnosť osobných údajov" },
        body: {
          en: "We take appropriate technical and organisational measures to protect personal data against unauthorised access, loss, misuse, damage, unauthorised alteration, or disclosure. Access to personal data is limited to persons or service providers who need it to fulfil a specific purpose.",
          sk: "Prijímame primerané technické a organizačné opatrenia na ochranu osobných údajov pred neoprávneným prístupom, stratou, zneužitím, poškodením, neoprávnenou zmenou alebo zverejnením. Prístup k osobným údajom majú iba osoby alebo poskytovatelia služieb, ktorí ich potrebujú na splnenie konkrétneho účelu.",
        },
      },
      {
        heading: { en: "10. Rights of the Data Subject", sk: "10. Práva dotknutej osoby" },
        body: {
          en: "In accordance with the GDPR, you may in particular have the right to request access to your personal data, request correction of incorrect data, request erasure of personal data, request restriction of processing, object to processing, request data portability, withdraw your consent to processing, and lodge a complaint with a supervisory authority. You may exercise your rights by contacting the controller at leo.fudaly@gmail.com. Before handling a request, we may, to a reasonable extent, require verification of the identity of the person submitting it.",
          sk: "V súlade s GDPR môžete mať najmä právo požadovať prístup k svojim osobným údajom, požadovať opravu nesprávnych údajov, požadovať vymazanie osobných údajov, požadovať obmedzenie spracúvania, namietať proti spracúvaniu, na prenosnosť údajov, odvolať svoj súhlas so spracúvaním a podať sťažnosť dozornému orgánu. Svoje práva si môžete uplatniť kontaktovaním prevádzkovateľa na adrese leo.fudaly@gmail.com. Pred vybavením žiadosti môžeme v primeranom rozsahu požadovať overenie totožnosti osoby, ktorá žiadosť podáva.",
        },
      },
      {
        heading: { en: "11. Supervisory Authority", sk: "11. Dozorný orgán" },
        body: {
          en: "If you believe that we are processing your personal data in violation of the applicable regulations, you have the right to lodge a complaint with the supervisory authority — the Office for Personal Data Protection of the Slovak Republic (Úrad na ochranu osobných údajov SR). Current contact information is available on the official website of the Office for Personal Data Protection of the Slovak Republic.",
          sk: "Ak sa domnievate, že vaše osobné údaje spracúvame v rozpore s právnymi predpismi, máte právo podať sťažnosť dozornému orgánu — Úradu na ochranu osobných údajov Slovenskej republiky. Aktuálne kontaktné informácie sú dostupné na oficiálnej webovej stránke Úradu na ochranu osobných údajov SR.",
        },
      },
      {
        heading: { en: "12. Payments", sk: "12. Platby" },
        body: {
          en: "Payments in the online store may be processed through Stripe. The operator of the online store generally does not have access to the complete payment card number or the card's security code. Stripe processes payment data in accordance with its own terms and privacy policy.",
          sk: "Platby v internetovom obchode môžu byť spracúvané prostredníctvom spoločnosti Stripe. Prevádzkovateľ internetového obchodu spravidla nemá prístup ku kompletnému číslu platobnej karty ani k bezpečnostnému kódu karty. Stripe spracúva platobné údaje podľa vlastných podmienok a zásad ochrany osobných údajov.",
        },
      },
      {
        heading: { en: "13. Delivery", sk: "13. Doprava" },
        body: {
          en: "For the purpose of delivering an order, the customer's personal data may need to be provided to the selected carrier. This concerns in particular the first and last name, phone number, e-mail, delivery address or chosen pickup point, and data needed to identify the shipment. This data is provided only to the extent necessary to deliver the order.",
          sk: "Na účely doručenia objednávky môžu byť potrebné osobné údaje zákazníka poskytnuté vybranému dopravcovi. Ide najmä o meno a priezvisko, telefónne číslo, e-mail, adresu doručenia alebo zvolené výdajné miesto a údaje potrebné na identifikáciu zásielky. Tieto údaje sú poskytované iba v rozsahu potrebnom na doručenie objednávky.",
        },
      },
      {
        heading: { en: "14. Minors", sk: "14. Maloleté osoby" },
        body: {
          en: "The online store is not intended for the knowing collection of children's personal data in a manner contrary to applicable law. If we discover that personal data has been obtained unlawfully, we will take appropriate steps to remove it.",
          sk: "Internetový obchod nie je určený na vedomé zhromažďovanie osobných údajov detí spôsobom, ktorý by bol v rozpore s platnými právnymi predpismi. Ak zistíme, že osobné údaje boli získané neoprávnene, prijmeme primerané kroky na ich odstránenie.",
        },
      },
      {
        heading: { en: "15. Changes to This Privacy Policy", sk: "15. Zmeny zásad ochrany súkromia" },
        body: {
          en: "We may update this policy from time to time, in particular in the event of changes to the services we use, the way personal data is processed, or applicable legal regulations. The current version will always be published on the online store's website.",
          sk: "Tieto zásady môžeme priebežne aktualizovať, najmä v prípade zmeny používaných služieb, spôsobu spracúvania osobných údajov alebo právnych predpisov. Aktuálna verzia bude vždy zverejnená na internetovom obchode.",
        },
      },
    ],
  },
};

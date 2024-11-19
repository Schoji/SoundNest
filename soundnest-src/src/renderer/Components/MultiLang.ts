import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// const statute = '\
//             Korzystasz z naszej super aplikacji? Gratulacje, jesteś szczęściarzem! Ale zanim zaczniesz, mamy dla Ciebie krótki, zabawny regulamin. W końcu to tylko formalność… prawda? \
//             Aplikacja „Studio Nagrań” to Twoje wirtualne centrum zarządzania muzycznym imperium. Tworzysz, edytujesz, przypisujesz twórców do utworów, utwory do płyt, a może i siebie do wielkiej sławy! \
//             Zanim zaczniesz, musisz się zalogować. A jeśli nie masz konta, rejestracja czeka. Adminów nie ma bez kont! Proste. \
//         §2. Interfejs:\
//             Nasz interfejs jest tak intuicyjny, że nawet koty mogłyby z niego korzystać (ale po co im studio nagrań?). Okienka są wszędzie – wielookienkowość to nasz standard.\
//             Masz do wyboru dwie wersje graficzne: jasną (dla rannych ptaszków) i ciemną (dla sowonocy). Dostosuj wygląd do swojego nastroju lub fazy księżyca, albo pozwól systemowi zrobić to za Ciebie.\
//             Możesz dodać własne logo studia. Tak, Twoje piękne logo może się pojawić na każdym kroku. Zmieniaj je dowolnie, bo kto powiedział, że stabilność to priorytet?\
//             Skróty klawiszowe są, bo kto by się chciał męczyć z myszką?\
//         §3. Admini i ich Supermoce:\
//             Pierwsza osoba, która się zarejestruje, zyskuje tytuł admina. To jak bycie królem wszechświata… no dobra, może nie wszechświata, ale tego studia!\
//             Admin może powoływać innych adminów. Jeśli jednak chcesz awansować, pamiętaj: musisz być grzeczny i uprzejmy (no chyba, że już jesteś adminem, to możesz wszystko).\
//             Usunięcie admina? Tylko jeśli nie jest tym pierwszym, wybranym. Ten pierwszy to jak Gandalf: nie ruszamy bez jego zgody.\
//             Admin, który chce abdykować, musi wyznaczyć następcę. Nikt nie zostaje bez opiekuna!\
//         §4. Zwykli użytkownicy – nie bójcie się, macie też swoje prawa!\
//             Zwykły użytkownik może przeglądać dane. Nic więcej. Ale za to z klasą!\
//             Każdy może zarządzać swoim profilem – zdjęcia, hasła, dane adresowe, żeby każdy wiedział, gdzie wysłać Twoje złote płyty.\
//             Jak zapomnisz hasło? Spoko, trzymamy tylko bezpieczne skróty SHA1(SHA1(hasła)). My Twoich haseł nie znamy, więc nie pytaj!\
//         §5. Baza danych i inne techniczne bajery:\
//             Dane trzymamy w bazie danych. Jak jej nie ma? Spokojnie, aplikacja stworzy nową, bo kto by się tym martwił.\
//             Nie ważne, jaką masz bazę danych – MySQL, PostgreSQL, SQLite, MongoDB. Nasza aplikacja dogada się z każdą z nich, więc możesz spać spokojnie.\
//             Backup? Zawsze dobry pomysł. Możesz zrobić zapasową kopię w ZIPie – płyty, utwory, dane… Wszystko, czego dusza zapragnie.\
//         §6. Sklepik, sprzedaż i wirtualna gotówka:\
//             Tak, jest sklep! Możesz sprzedawać swoje arcydzieła: płyty, utwory, a może nawet siebie. Każdy nowy użytkownik dostaje trochę wirtualnej kasy na start. Na zakupy!\
//             Po zalogowaniu? Twoje dane są już w systemie. Klik, klik i gotowe. Nie musisz nic wprowadzać. Ale jak jesteś niezalogowany, cóż, musisz sobie trochę popisać.\
//             Masz kupione utwory? Super! Możesz je wydrukować – paragonik czy lista zakupów – nie ma sprawy.\
//         §7. Wirtualna sprzedaż między użytkownikami:\
//             Masz płytę, którą chcesz przekazać kumplowi z innego komputera? Aplikacja Ci na to pozwoli – transferuj płyty, utwory, a nawet obrazki. Pieniążki same się przeliczą!\
//         §8. Demo dla niezdecydowanych:\
//             Dla tych, którzy jeszcze nie wiedzą, że to najlepsza aplikacja świata, mamy wersję demo. Nie ma tam wszystkich opcji, ale hej, spróbuj i poczuj magię. Chcesz więcej? Wpisz klucz odblokowujący!\
//         §9. Regulamin – zawsze dostępny, choćby z kosmosu:\
//             W aplikacji znajdziesz magiczny przycisk „Regulamin”. Jeśli z jakiegoś powodu zniknie (kosmici?), aplikacja przywróci go automatycznie z krótką formułką, którą też polubisz.\
//         §10. Na koniec...:\
//             Korzystaj mądrze i pamiętaj: Twój sukces to nasz sukces!'


//todo: store information about user prefered lang in database
i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: {
        //Sidebar
        store: "Store",
        library: "Library",
        studios: "Studios",
        studio: "Studio",
        tradeOffers: "Trade Offers",
        adminPanel: "Admin Panel",
        cart: "Cart",
        //Library
        yourLibrary: "Your Library",
        username: "User name",
        surname: "Surname",
        preferedTheme: "Prefered theme",
        credits: "Credits",
        //Admin
        delete: "Delete",
        addAdmin: "Add Admin",
        deleteAdmin: "Delete Admin",
        users: "Users",
        album: "Album",
        product: "Product",
        remove: "Remove",
        //Cart
        totalCost: "Total cost",
        noCartItems: "Your cart is empty. Add some products to proceed.",
        cartOf: "Cart of",
        //PurchaseHistory
        purchaseHistory: "Purchase history of",
        //Settings
        save: "Save",
        cancel: "Cancel",
        exportUserInfo: "Export user information",
        //CreateItem
        nameOfTrack: "Name of the track",
        producer: "Producer",
        songDuration: "Song duration in seconds",
        createYourItem: "Create your item",
        createItem: "Create item",
      }
    },
    pl: {
      translation: {
        //Sidebar
        store: "Sklep",
        library: "Biblioteka",
        studios: "Studia",
        studio: "Studio",
        tradeOffers: "Oferty wymiany",
        adminPanel: "Panel administracyjny",
        cart: "Koszyk",
        //Library
        yourLibrary: "Twoja biblioteka",
        username: "Nazwa użytkownika",
        surname: "Nazwisko",
        preferedTheme: "Preferowany motyw",
        credits: "Kredyty",
        //Admin
        delete: "Usuń",
        addAdmin: "Dodaj administratora",
        deleteAdmin: "Usuń administratora",
        users: "Użytkownicy",
        album: "Album",
        product: "Produkt",
        remove: "Usuń",
        //Cart
        totalCost: "Całkowity koszt",
        noCartItems: "Twój koszyk jest pusty. Dodaj produkty, aby kontynuować.",
        cartOf: "Koszyk użytkownika",
        //PurchaseHistory
        purchaseHistory: "Historia zakupów użytkownika",
        //Settings
        save: "Zapisz",
        cancel: "Anuluj",
        exportUserInfo: "Eksportuj informacje o użytkowniku",
        //CreateItem
        nameOfTrack: "Nazwa utworu",
        producer: "Producent",
        songDuration: "Czas trwania utworu w sekundach",
        createYourItem: "Utwórz swój przedmiot",
        createItem: "Utwórz przedmiot"
      },
    },
    de: {
      translation: {
        //Sidebar
        store: "Geschäft",
        library: "Bibliothek",
        studios: "Studios",
        studio: "Studio",
        tradeOffers: "Tauschangebote",
        adminPanel: "Admin-Panel",
        cart: "Warenkorb",
        //Library
        yourLibrary: "Deine Bibliothek",
        username: "Benutzername",
        surname: "Nachname",
        preferedTheme: "Bevorzugtes Thema",
        credits: "Credits",
        //Admin
        delete: "Löschen",
        addAdmin: "Admin hinzufügen",
        deleteAdmin: "Admin entfernen",
        users: "Benutzer",
        album: "Album",
        product: "Produkt",
        remove: "Entfernen",
        //Cart
        totalCost: "Gesamtkosten",
        noCartItems: "Dein Warenkorb ist leer. Füge Produkte hinzu, um fortzufahren.",
        cartOf: "Warenkorb von",
        //PurchaseHistory
        purchaseHistory: "Kaufhistorie von",
        //Settings
        save: "Speichern",
        cancel: "Abbrechen",
        exportUserInfo: "Benutzerinformationen exportieren",
        //CreateItem
        nameOfTrack: "Titel des Songs",
        producer: "Produzent",
        songDuration: "Songdauer in Sekunden",
        createYourItem: "Erstelle deinen Artikel",
        createItem: "Artikel erstellen"
      }
    },
  }
})


import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { backend_address } from './global'
import { useEffect, useState } from 'react'

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
        addToCart: "Add to Cart",
        //PurchaseHistory
        purchaseHistory: "Purchase history",
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
        //Item
        viewDetails: "View Details",
        albumDetails: "Album Details",
        otherProducts: "Other Products",
        //CreateStudio
        createYourStudio: "Create Your Studio",
        studioImagePreview: "Here is a quick preview of your studio image!",
        uploadPhoto: "Upload photo",
        studioName: "How would you like your studio to be called?",
        placeholderName: "Name",
        studioDesc: "Tell us more about your studio!",
        placeholderDesc: "Description",
        createStudioNotif: "*You will be able to make changes later on",
        createStudio: "Create Studio",
        nameLengthNotif: "*Name should contain between 3 and 30 characters",
        descLengthNotif: "*Description should contain between 10 and 100 characters",
        nameLengthError: "Provide a valid studio name (between 3 and 30 characters long).",
        descLengthError: "Provide a valid studio description (between 10 and 100 characters long).",
        nameTakenError: "Studio name is already taken.",
        //Edit studio
        editYourStudio: "Edit Your Studio.",
        studioNameEdit: "What would you like your studio to be renamed to?",
        //Studio
        studioDetails: "Studio Details",
        studioOwned: "Studio is owned by",
        otherStudios: "Other studios",
        //Studios
        studioDeletionMessage: "This action cannot be undone. Are you 100% sure?",
        confirm: "Confirm",
        learnMore: "Learn More",
        myStudios: "My Studios",
        edit: "Edit",
        //TopBar
        search: "Search",
        //Menu
        darkMode: "Dark Mode",
        termsOfUse: "Terms of Use",
        settings: "Settings",
        addFunds: "Add Funds",
        logout: "Logout",
        //DecideTradeOffers
        tradeFrom: "Trade from",
        youGet: "You get",
        youGive: "You give",
        accept: "Accept",
        decline: "Decline",
        user1Products: "User 1 Products",
        user2Products: "User 2 Products",
        sendTradeoffer: "Send Tradeoffer",
        //Tradeoffers
        itemsYouGive: "Items you will give",
        itemsYouReceive: "Items you will receive",
        noPendingTradeoffers: "You have no pending trade offers.",
        historyTradeoffer: "History of your trade offers",
        trader: "Trader",
        yourItems: "Your items",
        traderItems: "Trader's items",
        date: "Date",
        noPreviousTrades: "You have no previous trades.",
        //User
        userDetails: "User Details",
        tradeOffer: "Trade Offer",
        checkout: "Checkout",
      }
    },
    pl: {
      translation: {
        //Sidebar
        store: "Sklep",
        library: "Biblioteka",
        studios: "Studia",
        studio: "Studio",
        tradeOffers: "Oferty Wymiany",
        adminPanel: "Panel Admina",
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
        addToCart: "Dodaj do koszyka",
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
        createItem: "Utwórz przedmiot",
        //Item
        viewDetails: "Zobacz szczegóły",
        albumDetails: "Szczegóły albumu",
        otherProducts: "Inne produkty",
        //CreateStudio
        createYourStudio: "Utwórz swoje studio",
        studioImagePreview: "Oto szybki podgląd obrazu Twojego studia!",
        uploadPhoto: "Prześlij zdjęcie",
        studioName: "Jak chciałbyś nazwać swoje studio?",
        placeholderName: "Nazwa",
        studioDesc: "Opowiedz nam więcej o swoim studiu!",
        placeholderDesc: "Opis",
        createStudioNotif: "*Będziesz mógł wprowadzić zmiany później",
        createStudio: "Utwórz Studio",
        nameLengthNotif: "*Nazwa powinna zawierać od 3 do 30 znaków",
        descLengthNotif: "*Opis powinien zawierać od 10 do 100 znaków",
        nameLengthError: "Podaj prawidłową nazwę studia (od 3 do 30 znaków).",
        descLengthError: "Podaj prawidłowy opis studia (od 10 do 100 znaków).",
        nameTakenError: "Nazwa studia jest już zajęta.",
        //EditStudio
        editYourStudio: "Edytuj swoje studio.",
        studioNameEdit: "Jak chciałbyś nazwać swoje studio?",
        //Studio
        studioDetails: "Szczegóły studia",
        studioOwned: "Studio należy do",
        otherStudios: "Inne studia",
        //Studios
        studioDeletionMessage: "Tej operacji nie można cofnąć. Czy jesteś pewien na 100%?",
        confirm: "Potwierdź",
        learnMore: "Dowiedz się więcej",
        myStudios: "Moje studia",
        edit: "Edytuj",
        //TopBar
        search: "Szukaj",
        //Menu
        darkMode: "Tryb ciemny",
        termsOfUse: "Regulamin",
        settings: "Ustawienia",
        addFunds: "Dodaj środki",
        logout: "Wyloguj",
        //DecideTradeOffers
        tradeFrom: "Oferta wymiany od",
        youGet: "Otrzymujesz",
        youGive: "Dajesz",
        accept: "Akceptuj",
        decline: "Odrzuć",
        user1Products: "Produkty użytkownika 1",
        user2Products: "Produkty użytkownika 2",
        sendTradeoffer: "Wyślij ofertę wymiany",
        //Tradeoffers
        itemsYouGive: "Przedmioty, które oddasz",
        itemsYouReceive: "Przedmioty, które otrzymasz",
        noPendingTradeoffers: "Nie masz żadnych oczekujących ofert wymiany.",
        historyTradeoffer: "Historia twoich ofert wymiany",
        trader: "Handlarz",
        yourItems: "Twoje przedmioty",
        traderItems: "Przedmioty handlarza",
        date: "Data",
        noPreviousTrades: "Nie masz wcześniejszych transakcji.",
        //User
        userDetails: "Szczegóły użytkownika",
        tradeOffer: "Oferta wymiany",
        checkout: "Do kasy"
      }
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
        addToCart: "In den Warenkorb legen",
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
        createItem: "Artikel erstellen",
        //Item
        viewDetails: "Details anzeigen",
        albumDetails: "Albumdetails",
        otherProducts: "Andere Produkte",
        //CreateStudio
        createYourStudio: "Erstelle dein Studio",
        studioImagePreview: "Hier ist eine schnelle Vorschau deines Studio-Bildes!",
        uploadPhoto: "Foto hochladen",
        studioName: "Wie möchtest du dein Studio nennen?",
        placeholderName: "Name",
        studioDesc: "Erzähle uns mehr über dein Studio!",
        placeholderDesc: "Beschreibung",
        createStudioNotif: "*Du kannst später Änderungen vornehmen",
        createStudio: "Studio erstellen",
        nameLengthNotif: "*Der Name sollte zwischen 3 und 30 Zeichen enthalten",
        descLengthNotif: "*Die Beschreibung sollte zwischen 10 und 100 Zeichen enthalten",
        nameLengthError: "Geben Sie einen gültigen Studionamen ein (zwischen 3 und 30 Zeichen).",
        descLengthError: "Geben Sie eine gültige Studio-Beschreibung ein (zwischen 10 und 100 Zeichen).",
        nameTakenError: "Der Studio-Name ist bereits vergeben.",
        //EditStudio
        editYourStudio: "Studio bearbeiten.",
        studioNameEdit: "Wie möchtest du dein Studio umbenennen?",
        //Studio
        studioDetails: "Studio-Details",
        studioOwned: "Studio gehört zu",
        otherStudios: "Andere Studios",
        //Studios
        studioDeletionMessage: "Diese Aktion kann nicht rückgängig gemacht werden. Bist du dir zu 100% sicher?",
        confirm: "Bestätigen",
        learnMore: "Mehr erfahren",
        myStudios: "Meine Studios",
        edit: "Bearbeiten",
        //TopBar
        search: "Suchen",
        //Menu
        darkMode: "Dunkler Modus",
        termsOfUse: "Nutzungsbedingungen",
        settings: "Einstellungen",
        addFunds: "Guthaben hinzufügen",
        logout: "Abmelden",
        //DecideTradeOffers
        tradeFrom: "Tauschangebot von",
        youGet: "Du bekommst",
        youGive: "Du gibst",
        accept: "Annehmen",
        decline: "Ablehnen",
        user1Products: "Produkte von Benutzer 1",
        user2Products: "Produkte von Benutzer 2",
        sendTradeoffer: "Tauschangebot senden",
        //Tradeoffers
        itemsYouGive: "Gegenstände, die du gibst",
        itemsYouReceive: "Gegenstände, die du bekommst",
        noPendingTradeoffers: "Du hast keine ausstehenden Tauschangebote.",
        historyTradeoffer: "Historie deiner Tauschangebote",
        trader: "Händler",
        yourItems: "Deine Gegenstände",
        traderItems: "Gegenstände des Händlers",
        date: "Datum",
        noPreviousTrades: "Du hast keine vorherigen Transaktionen.",
        //User
        userDetails: "Benutzerdetails",
        tradeOffer: "Tauschangebot",
        checkout: "Zur Kasse"
      },
    }
  }
})


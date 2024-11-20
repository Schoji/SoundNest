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
        //Item
        viewDetails: "View Details",
        albumDetails: "Album Details",
        otherProducts: "Other Products",
        //CreateStudio
        createYourStudio: "Create Your Studio",
        createStudio: "Create Studio",
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
        createStudio: "Utwórz studio",
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
        createStudio: "Studio erstellen",
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


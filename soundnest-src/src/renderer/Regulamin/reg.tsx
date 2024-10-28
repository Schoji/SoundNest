import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import BottomBar from '../BottomBar/BottomBar';
import './reg.css';

export default function Regulamin() {
  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <p>§1. Wstęp:
          <ol>
            <li>Korzystasz z naszej super aplikacji? Gratulacje, jesteś szczęściarzem! Ale zanim zaczniesz, mamy dla Ciebie krótki, zabawny regulamin. W końcu to tylko formalność… prawda?</li>
            <li>Aplikacja „Studio Nagrań” to Twoje wirtualne centrum zarządzania muzycznym imperium. Tworzysz, edytujesz, przypisujesz twórców do utworów, utwory do płyt, a może i siebie do wielkiej sławy!</li>
            <li>Zanim zaczniesz, musisz się zalogować. A jeśli nie masz konta, rejestracja czeka. Adminów nie ma bez kont! Proste.</li>
          </ol>
        </p>
        <p>§2. Interfejs:
          <ol>
            <li>Nasz interfejs jest tak intuicyjny, że nawet koty mogłyby z niego korzystać (ale po co im studio nagrań?). Okienka są wszędzie – wielookienkowość to nasz standard.</li>
            <li>Masz do wyboru dwie wersje graficzne: jasną (dla rannych ptaszków) i ciemną (dla sowonocy). Dostosuj wygląd do swojego nastroju lub fazy księżyca, albo pozwól systemowi zrobić to za Ciebie.</li>
            <li>Możesz dodać własne logo studia. Tak, Twoje piękne logo może się pojawić na każdym kroku. Zmieniaj je dowolnie, bo kto powiedział, że stabilność to priorytet?</li>
            <li>Skróty klawiszowe są, bo kto by się chciał męczyć z myszką?</li>
        </ol>
        </p>
        <p>§3. Admini i ich Supermoce:
          <ol>
            <li>Pierwsza osoba, która się zarejestruje, zyskuje tytuł admina. To jak bycie królem wszechświata… no dobra, może nie wszechświata, ale tego studia!</li>
            <li>Admin może powoływać innych adminów. Jeśli jednak chcesz awansować, pamiętaj: musisz być grzeczny i uprzejmy (no chyba, że już jesteś adminem, to możesz wszystko).</li>
            <li>Usunięcie admina? Tylko jeśli nie jest tym pierwszym, wybranym. Ten pierwszy to jak Gandalf: nie ruszamy bez jego zgody.</li>
            <li>Admin, który chce abdykować, musi wyznaczyć następcę. Nikt nie zostaje bez opiekuna!</li>
          </ol>
        </p>
        <p>§4. Zwykli użytkownicy – nie bójcie się, macie też swoje prawa!
          <ol>
            <li>Zwykły użytkownik może przeglądać dane. Nic więcej. Ale za to z klasą!</li>
            <li>Każdy może zarządzać swoim profilem – zdjęcia, hasła, dane adresowe, żeby każdy wiedział, gdzie wysłać Twoje złote płyty.</li>
            <li>Jak zapomnisz hasło? Spoko, trzymamy tylko bezpieczne skróty SHA1(SHA1(hasła)). My Twoich haseł nie znamy, więc nie pytaj!</li>
          </ol>
        </p>
        <p>§5. Baza danych i inne techniczne bajery:
          <ol>
            <li>Dane trzymamy w bazie danych. Jak jej nie ma? Spokojnie, aplikacja stworzy nową, bo kto by się tym martwił.</li>
            <li>Nie ważne, jaką masz bazę danych – MySQL, PostgreSQL, SQLite, MongoDB. Nasza aplikacja dogada się z każdą z nich, więc możesz spać spokojnie.</li>
            <li>Backup? Zawsze dobry pomysł. Możesz zrobić zapasową kopię w ZIPie – płyty, utwory, dane… Wszystko, czego dusza zapragnie.</li>
          </ol>
        </p>
        <p>§6. Sklepik, sprzedaż i wirtualna gotówka:
          <ol>
            <li>Tak, jest sklep! Możesz sprzedawać swoje arcydzieła: płyty, utwory, a może nawet siebie. Każdy nowy użytkownik dostaje trochę wirtualnej kasy na start. Na zakupy!</li>
            <li>Po zalogowaniu? Twoje dane są już w systemie. Klik, klik i gotowe. Nie musisz nic wprowadzać. Ale jak jesteś niezalogowany, cóż, musisz sobie trochę popisać.</li>
            <li>Masz kupione utwory? Super! Możesz je wydrukować – paragonik czy lista zakupów – nie ma sprawy.</li>
          </ol>
        </p>
        <p>§7. Wirtualna sprzedaż między użytkownikami:
          <ol>
            <li>Masz płytę, którą chcesz przekazać kumplowi z innego komputera? Aplikacja Ci na to pozwoli – transferuj płyty, utwory, a nawet obrazki. Pieniążki same się przeliczą!</li>
          </ol>
        </p>
        <p>§8. Demo dla niezdecydowanych:
          <ol>
            <li>Dla tych, którzy jeszcze nie wiedzą, że to najlepsza aplikacja świata, mamy wersję demo. Nie ma tam wszystkich opcji, ale hej, spróbuj i poczuj magię. Chcesz więcej? Wpisz klucz odblokowujący!</li>
          </ol>
        </p>
        <p>§9. Regulamin – zawsze dostępny, choćby z kosmosu:
          <ol>
            <li>W aplikacji znajdziesz magiczny przycisk „Regulamin”. Jeśli z jakiegoś powodu zniknie (kosmici?), aplikacja przywróci go automatycznie z krótką formułką, którą też polubisz.</li>
          </ol>
        </p>
        <p>§10. Na koniec...:
          <ol>
            <li>Korzystaj mądrze i pamiętaj: Twój sukces to nasz sukces!</li>
          </ol>
        </p>
      </div>
      <BottomBar />
    </div>
  );
}

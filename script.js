// החלף את ה-URL הזה ב-Web App URL מה-Google Apps Script שלך
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwsO5aSRJe3EESVPj-b5ehAx5AjTT4QQywR7-g8Bmv4qjvjuLwJ9HbTmzi0pFaVVFKYBA/exec';

const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('n') || "אורח/ת";
const guestPhone = urlParams.get('p') || "לא ידוע";

// עדכון הודעת הפתיחה
document.getElementById('guest-greeting').innerText = `שלום ${guestName},`;

function sendRSVP(status) {
    if (status === 'לא מגיע/ה') {
        // שולח מיד עם 0 אורחים
        executeSubmit(status, 0);
    } else {
        // מציג את בחירת הכמות ומחביא את הכפתורים הראשונים
        document.querySelector('.button-group').style.display = 'none';
        document.getElementById('guests-count-area').style.display = 'block';
    }
}

function confirmFinalRSVP() {
    const count = document.getElementById('guests-count').value;
    executeSubmit('מגיע/ה', count);
}

function executeSubmit(status, count) {
    const rsvpSection = document.getElementById('rsvp-section');
    const thankYouSection = document.getElementById('thank-you');

    rsvpSection.style.opacity = '0.5';
    rsvpSection.style.pointerEvents = 'none';

    const data = {
        name: guestName,
        phone: guestPhone,
        attendance: status,
        guests: count
    };

    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
    }).then(() => {
        rsvpSection.style.display = 'none';
        thankYouSection.style.display = 'block';
    });
}
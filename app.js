/* =====================================================================
   Konfigurasi & data bersama — Pemilihan Ketua Angkatan 43
   ===================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyChdS_3saHCcB0QKHaWKMlpgZjZr7kPA2s",
  authDomain: "angkatan43-49d17.firebaseapp.com",
  databaseURL: "https://angkatan43-49d17-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "angkatan43-49d17",
  storageBucket: "angkatan43-49d17.firebasestorage.app",
  messagingSenderId: "684196514874",
  appId: "1:684196514874:web:b17a594420233daf0b3903",
  measurementId: "G-604ZTF99PF"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const CANDIDATES = [
  { id: "X1", nama: "Latry Amitasari",                    kelas: "X.1" },
  { id: "X2", nama: "Afifah Naufarizza Qotrun Nada",      kelas: "X.2" },
  { id: "X3", nama: "Fazli Rasyad Ibrahim",               kelas: "X.3" },
  { id: "X4", nama: "Mochammad Fito Arrosyid",            kelas: "X.4" },
  { id: "X5", nama: "Keisha Citra Kirana",                kelas: "X.5" },
  { id: "X6", nama: "Cut Zhevina Latysa Acbar",           kelas: "X.6" },
];

/* ---- kunci Firebase tidak boleh mengandung . # $ [ ] ---- */
function sanitizeKey(str) {
  return String(str).replace(/[.#$/\[\]]/g, "_");
}

/* ---- identitas pemilih di perangkat ini ---- */
function getVoterId() {
  let id = localStorage.getItem("angkatan43_voter_id");
  if (!id) {
    id = "v-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 11);
    localStorage.setItem("angkatan43_voter_id", id);
  }
  return id;
}

function hasVotedLocally() {
  return localStorage.getItem("angkatan43_has_voted") === "true";
}

function markVotedLocally(candidateId) {
  localStorage.setItem("angkatan43_has_voted", "true");
  if (candidateId) localStorage.setItem("angkatan43_voted_for", candidateId);
}

/* ---- deteksi IP publik perangkat, untuk cegah vote ganda lintas akun/browser ---- */
async function getClientIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || null;
  } catch (e) {
    console.warn("Tidak bisa mendeteksi IP:", e);
    return null;
  }
}


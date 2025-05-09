const apiUrl = "https://api.mymemory.translated.net/get";
const languages = {
  "en": "English",
  "uz": "Uzbek",
  "ru": "Russian",
  "de": "German",
  "fr": "French",
  "es": "Spanish",
  "zh": "Chinese"
};

document.addEventListener("DOMContentLoaded", () => {
  const inputLang = document.getElementById("inputLang");
  const outputLang = document.getElementById("outputLang");

  Object.entries(languages).forEach(([code, name]) => {
    inputLang.innerHTML += `<option value="${code}">${name}</option>`;
    outputLang.innerHTML += `<option value="${code}">${name}</option>`;
  });

 
  inputLang.value = "uz";
  outputLang.value = "ru";
});

document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;
  const fromLang = document.getElementById("inputLang").value;
  const toLang = document.getElementById("outputLang").value;

  if (!text) return;

  try {
    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
    const data = await response.json();
    document.getElementById("outputText").value = data.responseData.translatedText;
  } catch (error) {
    document.getElementById("outputText").value = "Xatolik yuz berdi!";
    console.error(error);
  }
});

document.querySelectorAll(".speak-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.getAttribute("data-target"));
    const lang = btn.closest(".translation-box").querySelector("select").value;
    const utterance = new SpeechSynthesisUtterance(target.value);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  });
});
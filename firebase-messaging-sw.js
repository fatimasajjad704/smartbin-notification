importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey           : "AIzaSyDGevihHfNrGCZz7SCnzj5ZRCgiBDRg0GQ",
  authDomain       : "smartbin-386a3.firebaseapp.com",
  projectId        : "smartbin-386a3",
  storageBucket    : "smartbin-386a3.appspot.com",
  messagingSenderId: "376722285195",
  appId            : "1:376722285195:web:852a05780ed758381eea8e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log("Background message:", payload);
  const title = payload.notification.title || "SmartBin Alert";
  const body  = payload.notification.body  || "Check your bin!";
  self.registration.showNotification(title, {
    body : body,
    icon : "/icon.png",
    tag  : "smartbin-alert"
  });
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});

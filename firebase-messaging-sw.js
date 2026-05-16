// ⚠️ This file MUST be named exactly:
// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// ── Same config as index.html ──
firebase.initializeApp({
  apiKey           : "AIzaSyDGevihHfNrGCZz7SCnzj5ZRCgiBDRg0GQ",
  authDomain       : "smartbin-386a3.firebaseapp.com",
  projectId        : "smartbin-386a3",
  storageBucket    : "smartbin-386a3.appspot.com",
  messagingSenderId: "376722285195",
  appId            : "1:376722285195:android:8b24f659d83bda6f1eea8e"  // ⚠️ fix this
});

const messaging = firebase.messaging();

// ── Handle background notifications ──
messaging.onBackgroundMessage(payload => {
  console.log("Background message:", payload);

  const title = payload.notification.title || "SmartBin Alert";
  const body  = payload.notification.body  || "Check your bin!";

  self.registration.showNotification(title, {
    body : body,
    icon : "/icon.png",
    badge: "/icon.png",
    tag  : "smartbin-alert",
    data : { url: self.location.origin }
  });
});

// ── Notification click — open the page ──
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/")
  );
});

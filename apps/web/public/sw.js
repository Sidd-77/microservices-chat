self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    console.log('New notification received:', data);

    const options = {
      body: data.notification.body,
      icon: data.notification.icon, // Use the icon from the payload
      image: data.notification.image, // Use the image from the payload
      badge: data.notification.badge, // Use the badge from the payload
      vibrate: data.notification.vibrate || [100, 50, 100], // Use vibrate pattern from the payload
      data: data.notification.data, // Pass additional data for future use
    };

    event.waitUntil(
      self.registration.showNotification(data.notification.title, options)
    );
  } else {
    console.error('Push event received but no data found.');
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received.');

  event.notification.close();

  const clickActionUrl = event.notification.data?.clickAction || '/'; // Use a click action URL if provided

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let client of clientList) {
        if (client.url === clickActionUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(clickActionUrl);
      }
    })
  );
});

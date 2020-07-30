
const publicKey = 'BCtlq4HfJ3HYFuypFUndurGZgXNnmjB_sveSgo_X_hmP8M91cCA8pSpf_PJZsRFhy2e5o66TOs7KvofHpVfuv7k';


//check if the browser supports service worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
};
function clickme() {
    send().catch(err => console.error(err))
}
//register service worker ,register push , send push
async function send() {
    //register service worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    })

    //sending the subscription object
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
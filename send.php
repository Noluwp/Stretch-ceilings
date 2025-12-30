<?php
// --- ВАШИ НАСТРОЙКИ ---
$token = "6536588763:AAHIu8o_5vLuf5T4ACZZfs7thJ4GeKAGjqA";
$chat_id = "1674952556";
// ----------------------

$name = $_POST['name'];
$phone = $_POST['phone'];

$txt = "🚀 *Новая заявка!*\n\n👤 Имя: $name\n📞 Телефон: $phone";

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=Markdown&text=" . urlencode($txt), "r");

if ($sendToTelegram) {
    http_response_code(200);
} else {
    http_response_code(500);
}
?>
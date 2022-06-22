<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// ОТ кого письмо
$mail->setForm('info@fls.guru', "Сайт Клининговой компании")
// КОМУ отправить
$mail->addAddress('alinakharakh@gmail.com');
// Тема письма
$mail->Subject = 'Новая заявка на сайте клининговой компании';

// Тело письма
$body = '<h1>У Вас новая заявка на сайте клининговой компании</h1>';

if(thrim(!empty($_POST['name']))) {
	$body = '<p><strong>Имя:</strong> '$_POST['name'].'</p>'
}
if(thrim(!empty($_POST['phone']))) {
	$body = '<p><strong>Телефон:</strong> '$_POST['phone'].'</p>'
}

// Прикрепить файл
if(!empty($_FILES['file']['tmp_name'])) {
	// путь загрузки файла
	$filePath = _DIR_ ."/files/" . $_FILES['file']['tmp_name'];
	// грузим файл
	if(copy($_FILES['file']['tmp_name'], $filePath)) {
		$fileAttach = $filePath;
		$body.='<p><strong>Файл в приложении</strong></p>';
		$mail->addAttachment($fileAttach);
	}
}

$mail->Body = $body;

// Отправка
if(!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);


?>
<?php
/**
 * Requer a biblioteca "PHP Email Form".
 * Mais informações: https://bootstrapmade.com/php-email-form/
 */

// Endereço de email para recebimento
$receiving_email_address = 'contact@example.com';
$php_email_form = '../assets/vendor/php-email-form/php-email-form.php';

if (!file_exists($php_email_form)) {
    die('Não foi possível carregar a biblioteca "PHP Email Form"!');
}

include($php_email_form);

$contact = new PHP_Email_Form;
$contact->ajax = true;
$contact->to = $receiving_email_address;

// Validar e atribuir nome
$name = $_POST['name'] ?? '';
if (empty($name)) die('Nome é obrigatório.');
$contact->from_name = $name;

// Validar e atribuir email
$email = $_POST['email'] ?? '';
if (empty($email)) die('Email é obrigatório.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) die('Email inválido.');
$contact->from_email = $email;

// Validar e atribuir assunto
$subject = $_POST['subject'] ?? '';
if (empty($subject)) die('Assunto é obrigatório.');
$contact->subject = $subject;

// Validar mensagem
$message = $_POST['message'] ?? '';
if (empty($message)) die('Mensagem é obrigatória.');

$contact->add_message($name, 'De');
$contact->add_message($email, 'Email');
$contact->add_message($message, 'Mensagem', 10);

echo $contact->send();
?>
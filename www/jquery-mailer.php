<?php
	header("Content-Type: text/html; charset=utf-8");
	
	# Configuration
	#
	define('DESTINATION', 'anjutalove@gmail.com');
	define('DESTINATION2', 'likamoon@list.ru');
	define('SCRIPT_URI',  'jquery-mailer.php');
		
	###############################################################
	
	function ok ($e = '') {
		header("Content-Type: application/json");
		print json_encode(array("status" => "ok", "error" => $e));
		exit();
	}
	
	function not_ok ($e) {
		header("Content-Type: application/json");
		print json_encode(array("status" => "not ok", "error" => $e));
		exit();
	}
		
	#Форма обратной связи
	if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST["formType"] == "feedback" )
	{				
		
		$_subject = isset($_POST["formSubject"]) ? filter_var($_POST['formSubject'], FILTER_SANITIZE_STRING) :  null;		
		$subject = "Заявка с сайта Skoda: " . $_subject ;	
		
		$message = "Информация:		
		Телефон:            ".(isset($_POST["phone"]) ?             filter_var($_POST['phone'],            FILTER_SANITIZE_STRING) :  null)."		
		Заявка: 				$_subject 
		Время заявки:       ".date("Y-m-d H:i:s")."
		";
		
		$headers =  "From: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Reply-To: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Content-type: text/plain; charset=\"utf-8\"" . "\r\n" .
		"X-Mailer: PHP/" . phpversion();

		if ( mail(DESTINATION, $subject, $message, $headers) && mail(DESTINATION2, $subject, $message, $headers) )
        ok();
		else
        not_ok("Ошибка. Возможно функция mail отключена. Обратитесь к хостинг-провайдеру.");		
	}

	#Форма ПОДДЕРЖАТЬ
	// elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST["formType"] == "support" )
	// {	
	// 	$_subject = isset($_POST["formSubject"]) ? filter_var($_POST['formSubject'], FILTER_SANITIZE_STRING) :  null;		
	// 	$subject = "Заявка с сайта Яблоко: " . $_subject ;		
		
		
	// 	$message = "Информация:
	// 	Банк:            ".(isset($_POST["bank"]) ?             filter_var($_POST['bank'],            FILTER_SANITIZE_STRING) :  null)."	
	// 	Фамилия:            ".(isset($_POST["secondname"]) ?             filter_var($_POST['secondname'],            FILTER_SANITIZE_STRING) :  null)."	
	// 	Имя:            ".(isset($_POST["name"]) ?             filter_var($_POST['name'],            FILTER_SANITIZE_STRING) :  null)."		
	// 	Отчество:            ".(isset($_POST["patronymic"]) ?             filter_var($_POST['patronymic'],            FILTER_SANITIZE_STRING) :  null)."		
	// 	Телефон:            ".(isset($_POST["phone"]) ?             filter_var($_POST['phone'],            FILTER_SANITIZE_STRING) :  null)."
	// 	Почта:            ".(isset($_POST["email"]) ?             filter_var($_POST['email'],            FILTER_SANITIZE_STRING) :  null)."        
	// 	Паспорт:            ".(isset($_POST["passport-serial"]) ? filter_var($_POST['passport-serial'], FILTER_SANITIZE_STRING) :  null)." ".(isset($_POST["passport-number"]) ? filter_var($_POST['passport-number'], FILTER_SANITIZE_STRING) :  null)."		
	// 	Дата рождения:             ".(isset($_POST["dob-day"]) ? filter_var($_POST['dob-day'], FILTER_SANITIZE_STRING) :  null)." ".(isset($_POST["dob-month"]) ? filter_var($_POST['dob-month'], FILTER_SANITIZE_STRING) :  null)."  ".(isset($_POST["dob-year"]) ? filter_var($_POST['dob-year'], FILTER_SANITIZE_STRING) :  null)."				
	// 	Субъект РФ:           ".(isset($_POST["subject"]) ?             filter_var($_POST['subject'],            FILTER_SANITIZE_STRING) :  null)."        
	// 	Город:           ".(isset($_POST["city"]) ?             filter_var($_POST['city'],            FILTER_SANITIZE_STRING) :  null)."     
	// 	Адрес:             ул. ".(isset($_POST["address-street"]) ? filter_var($_POST['address-street'], FILTER_SANITIZE_STRING) :  null).", д. ".(isset($_POST["address-house"]) ? filter_var($_POST['address-house'], FILTER_SANITIZE_STRING) :  null).", к. ".(isset($_POST["address-building"]) ? filter_var($_POST['address-building'], FILTER_SANITIZE_STRING) :  null).", кв. ".(isset($_POST["address-apartment"]) ? filter_var($_POST['address-apartment'], FILTER_SANITIZE_STRING) :  null)."	   	      
	// 	Сумма: 		".(isset($_POST["pay"]) ?             filter_var($_POST['pay'],            FILTER_SANITIZE_STRING) :  null)."
	// 	Заявка: 				$_subject 
	// 	Время заявки:       ".date("Y-m-d H:i:s")."
	// 	";
		
	// 	$headers =  "From: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
	// 	"Reply-To: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
	// 	"Content-type: text/plain; charset=\"utf-8\"" . "\r\n" .
	// 	"X-Mailer: PHP/" . phpversion();

	// 	if ( mail(DESTINATION, $subject, $message, $headers) && mail(DESTINATION2, $subject, $message, $headers) )
    //     ok();
	// 	else
    //     not_ok("Ошибка. Возможно функция mail отключена. Обратитесь к хостинг-провайдеру.");		
	// }

	elseif ($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		not_ok("Все поля обязательны к заполнению");
	}		
	
?>
"use strict"
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);
	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		// formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				// formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка отправки(");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);
			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
})

$(function () {
	$('.conditions__slider').slick({
		dots: true,
		arrows: true,
		prevArrow: '<button class="slick-prev"><img class="slider-img" src="images/up1.svg" alt=""></button>',
		nextArrow: '<button class="slick-next"><img class="slider-img" src="images/down1.svg" alt=""></button>',
		vertical: true,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 870,
				settings: {
					dots: true,
					arrows: false,
					// vertical: false,
					autoplaySpeed: 2000
				}
			}
		]
	});
	$('.review__slider').slick({
		dots: true,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 2,
		vertical: false,
		responsive: [
			{
				breakpoint: 795,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: false,
				}
			}
		]
	});
	$('.wedo__slider').slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: false,
		autoplay: true,
		autoplaySpeed: 4000
	});

	$('.menu__burger').on('click', function () {
		$('.menu__list').toggleClass('menu__list--active');
		$(this).toggleClass("open");
	});
});

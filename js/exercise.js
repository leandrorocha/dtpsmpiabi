let mcqCard = document.querySelectorAll('.mcq-card');

(function () {
	mcqCard.forEach(mcq => {
		let answerOption = mcq.querySelectorAll('.mcq__answers li');
		let submitButton = mcq.querySelector('.mcq__submit button');
		let submitFeedback = mcq.querySelector('.mcq__submit--feedback');
		let submitAnswerFeedback = mcq.querySelector('.mcq__answer--feedback');
		// let feedbackText = answerOption.getAttribute('data-feedback');
		let score = 0;

		// Select option, clear the others and enable submit
		answerOption.forEach(option => {
			option.addEventListener('click', function () {
				answerSelect(option);
			});
		});

		//Submit button to check only selected class option.
		if (submitButton) {
			submitButton.addEventListener('click', function () {
				if (submitButton.getAttribute('type') === 'submit' && submitButton.getAttribute('aria-disabled') === 'false') {
					butttonCheck();
				} else {
					buttonReset();
				}
			});
		}

		function answerSelect(e) {
			if (submitButton.getAttribute('type') === 'submit') {
				for (let i = 0; i < answerOption.length; i++) {
					const element = answerOption[i];
					element.classList.remove('mcq__answers--selected');
				}
				e.classList.add('mcq__answers--selected');
				submitButton.setAttribute('aria-disabled', 'false');
			}
		}

		function incorrectAnswer(event) {
			feedbackText = event.getAttribute('data-feedback');

			event.classList.remove('mcq__answers--selected');
			event.classList.add('mcq__answers--incorrect');

			submitFeedback.innerHTML = `<span class="material-symbols-rounded">cancel</span> <strong>Resposta errada!</strong><br><span class="feedback__content">` + feedbackText + `</span>`;
			submitFeedback.classList.remove('d-none', 'mcq__submit__feedback--correct');
			submitFeedback.classList.add('mcq__submit__feedback--incorrect');
		}

		function correctAnswer(event) {
			feedbackText = event.getAttribute('data-feedback');

			event.classList.remove('mcq__answers--selected');
			event.classList.add('mcq__answers--correct');

			submitFeedback.innerHTML = `<span class="material-symbols-rounded">check_circle</span> <strong>Resposta correta!</strong><br><span class="feedback__content">` + feedbackText + `</span>`;
			submitFeedback.classList.remove('d-none', 'mcq__submit__feedback--incorrect');
			submitFeedback.classList.add('mcq__submit__feedback--correct');

			if (submitAnswerFeedback) {
				submitAnswerFeedback.classList.remove('d-none');
			}
		}

		function blockAnswerOption() {
			for (let i = 0; i < answerOption.length; i++) {
				const element = answerOption[i];

				element.classList.add('mcq__answers--blocked');
			}
		}

		function butttonCheck() {
			if (submitButton.getAttribute('type') === 'submit') {
				score++;

				for (let i = 0; i < answerOption.length; i++) {
					const element = answerOption[i];

					if (element.classList.contains('mcq__answers--selected')) {
						if (!element.hasAttribute('correct')) {
							console.log('errou');
							incorrectAnswer(element);
							blockAnswerOption();
						} else {
							console.log('acertou');
							correctAnswer(element);
							blockAnswerOption();
						}
					}
				}
				submitButton.setAttribute('type', 'reset');
				submitButton.innerHTML = 'Recomeçar';
			}
		}

		function buttonReset() {
			if (submitButton.getAttribute('type') === 'reset') {
				for (let i = 0; i < answerOption.length; i++) {
					const element = answerOption[i];

					element.classList.remove('mcq__answers--correct', 'mcq__answers--incorrect', 'mcq__answers--blocked', 'mcq__answers--selected');
					submitButton.setAttribute('type', 'submit');
					submitButton.innerHTML = 'Conferir';
					submitButton.setAttribute('aria-disabled', 'true');
				}

				if (submitFeedback.classList.contains('mcq__submit__feedback--correct')) {
					score = 0;
				}
				submitFeedback.classList.remove('mcq__submit__feedback--correct', 'mcq__submit__feedback--incorrect');
				submitFeedback.classList.add('d-none');

				if (submitAnswerFeedback) {
					submitAnswerFeedback.classList.add('d-none');
				}
			}
		}
	});
})();



// EXERCICIOS DE V ou F
const submitButton = document.getElementById("submitButton");

// Habilitar o botão somente quando todas as perguntas forem respondidas
document.getElementById("questionnaire").addEventListener("change", () => {
	const allAnswered = Array.from(document.querySelectorAll("[name^='question']"))
		.filter(input => input.checked).length === 5;
	submitButton.classList.toggle("disabled", !allAnswered);
});

// Lógica para checar as respostas e exibir feedback
submitButton.addEventListener("click", () => {
	if (submitButton.classList.contains("disabled")) return;

	const questions = document.querySelectorAll(".question-container");
	let allCorrect = true;

	// Verificar respostas e exibir feedback
	questions.forEach((question, index) => {
		const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`).value;
		const correctAnswer = question.getAttribute("data-answer");
		const feedbackEl = question.querySelector(".feedback");
		feedbackEl.style.display = "block"; // Exibe o feedback

		if (selectedAnswer !== correctAnswer) {
			allCorrect = false;
		}
		
		// Bloquear todas as respostas
		const inputs = question.querySelectorAll("input[type='radio']");
		inputs.forEach(input => input.disabled = true);
	});

	// Mudar o texto do botão para "Recomeçar" se tiver erros, e adicionar evento para recomeçar
	if (allCorrect) {
		submitButton.innerText = "Parabéns, todas as respostas estão corretas!";
		submitButton.classList.add("disabled");
	} else {
		submitButton.innerText = "Recomeçar";
		submitButton.classList.add("disabled");
		submitButton.onclick = () => location.reload();
	}
});
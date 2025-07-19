document.addEventListener("DOMContentLoaded", function () {
	const nameInput = document.querySelector("#name");
	const lastNameInput = document.querySelector("#last-name");
	const emailInput = document.querySelector("#email");
	const generalSelectInput = document.querySelector("#general");
	const supportSelectInput = document.querySelector("#support");
	const textarea = document.querySelector("#textarea");
	const checkbox = document.querySelector("#confirmation");
	const submitBtn = document.querySelector(".form__btn");
	const options = [generalSelectInput, supportSelectInput];
	const textInputs = [nameInput, lastNameInput, emailInput, textarea];
	const nameRegexp = /^[a-zA-Z]{3,}$/;
	const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

	const handleForm = (e) => {
		e.preventDefault();
		checkIfEmpty(textInputs);
		checkRadios(options, generalSelectInput);
		checkIfChecked(checkbox);
		checkIfCorrect(nameInput, nameRegexp, 3, "Only letters allowed!");
		checkIfCorrect(lastNameInput, nameRegexp, 3, "Only letters allowed!");
		checkIfCorrect(textarea, undefined, 15);
		checkEmail(emailInput, emailRegexp);
		checkErrors();
	};

	const checkIfEmpty = (arr) => {
		arr.forEach((input) => {
			const value = input.value.trim();
			const formBox = input.parentElement;
			const errorTxt = formBox.querySelector(".error-txt");
			if (value === "") {
				errorTxt.textContent = "This field is required";
				errorTxt.style.visibility = "visible";
				addError(input);
			} else {
				errorTxt.style.visibility = "hidden";
				removeError(input);
			}
		});
	};
	const addError = (input) => {
		input.closest(".form__box").classList.add("error");
	};
	const removeError = (input) => {
		input.closest(".form__box").classList.remove("error");
	};
	const checkRadios = (options, input) => {
		let atLeastOnechecked = options.some((option) => option.checked);
		const parent = input.closest(".form__box");
		const errorTxt = parent.querySelector(".error-txt");
		if (!atLeastOnechecked) {
			errorTxt.style.visibility = "visible";
			errorTxt.textContent = "Please select a query type";
			addError(input);
		} else {
			errorTxt.style.visibility = "hidden";
			removeError(input);
		}
	};

	const checkIfChecked = (input) => {
		const parent = input.parentElement;
		const errorTxt = parent.querySelector(".error-txt");
		if (!input.checked) {
			errorTxt.style.visibility = "visible";
			errorTxt.textContent =
				"To submit this form, please consent to being contacted";
			addError(input);
		} else {
			errorTxt.style.visibility = "hidden";
			removeError(input);
		}
	};
	const checkIfCorrect = (input, regexp, min, msg) => {
		let minValue = min;
		const parent = input.parentElement;
		const errorTxt = parent.querySelector(".error-txt");
		const label = parent.querySelector("label");
		if (input.value.trim().length < min && input.value.trim() !== "") {
			errorTxt.style.visibility = "visible";
			errorTxt.textContent = `${label.textContent.slice(
				0,
				-1
			)} should contain min. ${minValue} characters!`;
			addError(input);
		} else if (
			regexp !== undefined &&
			!regexp.test(input.value.trim()) &&
			input.value.trim() !== ""
		) {
			errorTxt.style.visibility = "visible";
			errorTxt.textContent = msg;
			addError(input);
		}
	};
	const checkEmail = (input, regexp) => {
		const parent = input.parentElement;
		const errorTxt = parent.querySelector(".error-txt");
		if (!regexp.test(input.value) && input.value.trim() !== "") {
			errorTxt.style.visibility = "visible";
			errorTxt.textContent = "Invalid email address!";
			addError(input);
		}
	};
	const checkErrors = () => {
		let errorCount = 0;
		const allInputs = document.querySelectorAll("input");

		allInputs.forEach((input) => {
			const formBox = input.closest(".form__box");
			if (formBox.classList.contains("error")) {
				errorCount++;
			}
		});
		if (errorCount === 0) {
			window.location.href = window.location.pathname + "?status=sent";
		}
	};
	const sentMsg = () => {
		const params = new URLSearchParams(window.location.search);
		if (params.get("status") === "sent") {
			const statusMsg = document.querySelector(".message-status-box");
			setTimeout(() => {
				statusMsg.classList.add("active");
			}, 50);
			setTimeout(() => {
				statusMsg.classList.remove("active");
			}, 5000);
		}
	};
	sentMsg();

	submitBtn.addEventListener("click", handleForm);
});

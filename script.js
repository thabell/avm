console.log(localStorage);
/*localStorage.clear();*/
/*-------------------some fun for cycling with Timeout*/
function cycl_with_Timeout(mseconds, max_count, cycled_function, args) {
	var i = 0;
	function recurs_cycl() {
		cycled_function(args);
		setTimeout(function() {
			i++;
			if (i < max_count) { recurs_cycl(); }
		}, mseconds);
	}
	recurs_cycl();
}
/* -------------------/some fun for cycling with Timeout*/


/* ------ slider ------ */
try {
	var slider = null;
	var button_previousList = document.querySelectorAll(".button-previous");
	var button_nextList = document.querySelectorAll(".button-next");
	var pagination__itemListAll = document.querySelectorAll(".pagination__item");
	var slider__itemList = new Array();
	var pagination__itemList = new Array();
	var slider__active_idx = null;
	var slider__item__active = null;

/*здесь должна быть расстановка visually-hidden по умолчанию из состояния нормального вида слайдов без js*/

	function setSlider(fire) {
		slider = fire.closest(".slider");
		slider__itemList = slider.querySelectorAll(".slider__item");
		pagination__itemList = slider.querySelectorAll(".pagination__item");
		pagination__itemList.forEach(function callback(element, index, array) {
			if (index > slider__itemList.length - 1) { return; }
			if (element.classList.contains("pagination__item--active")) {
				slider__active_idx = index; 
				slider__item__active = slider__itemList.item(slider__active_idx);
				return;
			}
		});
	}

	function slider__previous_slide(){

		var old_active = slider__item__active;
		old_active.classList.add("slider_item_right_out");
		pagination__itemList.item(slider__active_idx).classList.remove("pagination__item--active");

		var slider__new_active_idx = null;

		if (slider__active_idx != 0) {
			slider__new_active_idx = slider__active_idx - 1;
		} else {
			slider__new_active_idx = slider__itemList.length - 1;
		}

		slider__itemList.item(slider__new_active_idx).classList.add("slider__item--active");
		slider__itemList.item(slider__new_active_idx).classList.add("slider_item_left_in");

		pagination__itemList.item(slider__new_active_idx).classList.add("pagination__item--active");

		setTimeout(function() {
			old_active.classList.remove("slider__item--active");
			old_active.classList.remove("slider_item_right_out"); /*возможно зесь лучше пользоваться добавлением/убиранием visually-hidden для более простой стилизации в css*/
		}, 490);

		setTimeout(function() {
			slider__itemList.item(slider__new_active_idx).classList.remove("slider_item_left_in");
		}, 510);	
	}

	for (var i = 0; i < button_previousList.length; i++) {
		button_previousList.item(i).addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			slider__previous_slide();
		});
	}

	function slider__next_slide(){


		var old_active = slider__item__active;

		var slider__new_active_idx = null;

		if (slider__active_idx != slider__itemList.length - 1) {
			slider__new_active_idx = slider__active_idx + 1;
		} else {
			slider__new_active_idx = 0;
			old_active.classList.add("slider_item_left_out_fix");
		}

		old_active.classList.add("slider_item_left_out");
		pagination__itemList.item(slider__active_idx).classList.remove("pagination__item--active");

		slider__itemList.item(slider__new_active_idx).classList.add("slider__item--active");
		slider__itemList.item(slider__new_active_idx).classList.add("slider_item_right_in");

		pagination__itemList.item(slider__new_active_idx).classList.add("pagination__item--active");

		setTimeout(function() {
			old_active.classList.remove("slider__item--active");
			old_active.classList.remove("slider_item_left_out"); /*возможно зесь лучше пользоваться добавлением/убиранием visually-hidden для более простой стилизации в css*/
			old_active.classList.remove("slider_item_left_out_fix");
		}, 490);

		setTimeout(function() {
			slider__itemList.item(slider__new_active_idx).classList.remove("slider_item_right_in");
		}, 510);
	}

	for (var i = 0; i < button_nextList.length; i++) {
		button_nextList.item(i).addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			slider__next_slide();
		});
	}

	var slider__clicked_idx = null;
	function set_sl_nd_prev_from_pag(fire){
		slider__previous_slide();
		setSlider(fire);
	}
	function set_sl_nd_next_from_pag(fire){
		slider__next_slide();
		setSlider(fire);
	}
	pagination__itemListAll.forEach(function callback(element, index, array) {
		element.addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			pagination__itemList.forEach(function callback(element, index, array) {
				if (index > slider__itemList.length - 1) { return; }
				if (element == event.target) {
					slider__clicked_idx = index;
					return;
				}
			});
			if ((slider__clicked_idx - slider__active_idx) > 0) {
			    var count_of_steps_to_go = slider__clicked_idx - slider__active_idx;
			    /*console.log(count_of_steps_to_go);*/
			    cycl_with_Timeout(286, count_of_steps_to_go, set_sl_nd_next_from_pag, event.target);
			} else if ((slider__clicked_idx - slider__active_idx) < 0) {
			    var count_of_steps_to_go = slider__active_idx - slider__clicked_idx;
			    cycl_with_Timeout(286, count_of_steps_to_go, set_sl_nd_prev_from_pag, event.target);
			}
		});
	});
} catch (error) { console.log("Slider works not"); }
/* ------ /slider ------ */

if (location.href.includes("systems")) {
	/* ---------------- systems ------------------ */
	input = document.querySelector(".systems-input");

	input_one = input.querySelector(".input-one");
	input_one_system_from = input_one.querySelector("input[name='system_from']");
	input_one_system_to = input_one.querySelector("input[name='system_to']");
	input_one_system_more_to = input_one.querySelector("input[name='system_more_to']");
	input_one_start = input_one.querySelector("input[name='start']");
	input_one_system_from.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_one_system_to.focus();
			}
		});
	input_one_system_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_one_system_more_to.focus();
			}
		});
	input_one_system_more_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_one_start.focus();
			}
		});
	input_one_start.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				systems_submit_event(event);
			}
		});

	input_multi = input.querySelector(".input-multi");
	input_multi_system_from = input_multi.querySelector("input[name='system_from']");
	input_multi_system_to = input_multi.querySelector("input[name='system_to']");
	input_multi_system_more_to = input_multi.querySelector("input[name='system_more_to']");
	input_multi_start = input_multi.querySelector("input[name='start']");
	input_multi_finish = input_multi.querySelector("input[name='finish']");
	input_multi_step = input_multi.querySelector("input[name='step']");

	input_multi_system_from.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_system_to.focus();
			}
		});
	input_multi_system_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_system_more_to.focus();
			}
		});
	input_multi_system_more_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_start.focus();
			}
		});
	input_multi_start.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_finish.focus();
			}
		});
	input_multi_finish.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_step.focus();
			}
		});
	input_multi_step.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				systems_submit_event(event);
			}
		});

	submit = document.querySelector(".systems-submit")
	submit_button = submit.querySelector(".submit-button");
	submit_button.addEventListener("click", function(event) {
		event.preventDefault();
		systems_submit_event(event);
	});
	function systems_submit_event(event) {
		system_from = 10;
		system_to = 10;
		system_more_to = 10;
		start = 1;
		finish = 1;
		step = 1;
		input_one = input.querySelector(".input-one.slider__item--active");
		input_multi = input.querySelector(".input-multi.slider__item--active");
		result = document.querySelector(".result");
		result.innerHTML = '';
		if (input_one) {
	/*		console.log("one");
			console.log(input_one);*/
			input_one_system_from.classList.remove("bad-input");
			input_one_system_to.classList.remove("bad-input");
			input_one_system_more_to.classList.remove("bad-input");
			input_one_start.classList.remove("bad-input");
			check_correct_input = true;
			if (!input_one_system_from.value || !Number.isInteger(Number(input_one_system_from.value)) || Number(input_one_system_from.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Из какой системы счисления (S)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_system_from.classList.add("bad-input");
				input_one_system_from.focus();
			}
			if (!input_one_system_to.value || !Number.isInteger(Number(input_one_system_to.value)) || Number(input_one_system_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'В какую систему счисления (P)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_system_to.classList.add("bad-input");
				input_one_system_to.focus();
			}
			if (!input_one_system_more_to.value || !Number.isInteger(Number(input_one_system_more_to.value)) || Number(input_one_system_more_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Еще в какую систему счисления (Q)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_system_more_to.classList.add("bad-input");
				input_one_system_more_to.focus();
			}
			if (!input_one_start.value || !is_value_in_system(input_one_start.value, input_one_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Число для перевода'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_start.classList.add("bad-input");
				input_one_start.focus();
			}
			if (check_correct_input) {
				event.preventDefault();
	/*			result.append("calculating 'one'");*/
				var ans1 = get_value_from_system_to_system(input_one_start.value, input_one_system_from.value, input_one_system_to.value);
				var ans2 = get_value_from_system_to_system(input_one_start.value, input_one_system_from.value, input_one_system_more_to.value);
				result.innerHTML = "<h2><span class='h2-bright'>Результат</span> перевода</h2><div class='result-line result-header'><div class='result-item'>" + input_one_system_from.value + "</div><div class='result-item'>" + input_one_system_to.value + "</div><div class='result-item'>" + input_one_system_more_to.value + "</div></div><div class='result-line'><div class='result-item'>" + input_one_start.value + "</div><div class='result-item'>" + ans1 + "</div><div class='result-item'>" + ans2 + "</div></div>";
				
				history_item = [];
				history_item.push([input_one_system_from.value, input_one_system_to.value, input_one_system_more_to.value]);
				history_item.push([input_one_start.value, ans1, ans2]);
				systems_history = JSON.parse(localStorage.getItem("systems_history"));
				if (systems_history && systems_history.length > 0) {
					systems_history.push(history_item);
				} else {
					systems_history = [];
					systems_history[0] = history_item;
				}
				for (; systems_history.length > 5; ) {
					systems_history.shift();
				}
				localStorage.setItem("systems_history", JSON.stringify(systems_history));
				console.log(localStorage);

				refreshHistory();
			}
		} else if (input_multi) {
	/*		console.log("multi");
			console.log(input_multi);*/
			input_multi_system_from.classList.remove("bad-input");
			input_multi_system_to.classList.remove("bad-input");
			input_multi_system_more_to.classList.remove("bad-input");
			input_multi_start.classList.remove("bad-input");
			input_multi_finish.classList.remove("bad-input");
			input_multi_step.classList.remove("bad-input");
			check_correct_input = true;
			if (!input_multi_system_from.value || !Number.isInteger(Number(input_multi_system_from.value)) || Number(input_multi_system_from.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Из какой системы счисления (S)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_system_from.classList.add("bad-input");
				input_multi_system_from.focus();
			}
			if (!input_multi_system_to.value || !Number.isInteger(Number(input_multi_system_to.value)) || Number(input_multi_system_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'В какую систему счисления (P)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_system_to.classList.add("bad-input");
				input_multi_system_to.focus();
			}
			if (!input_multi_system_more_to.value || !Number.isInteger(Number(input_multi_system_more_to.value)) || Number(input_multi_system_more_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Еще в какую систему счисления (Q)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_system_more_to.classList.add("bad-input");
				input_multi_system_more_to.focus();
			}
			if (!input_multi_start.value || !is_value_in_system(input_multi_start.value, input_multi_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Начало промежутка (A)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_start.classList.add("bad-input");
				input_multi_start.focus();
			}
			if (!input_multi_finish.value || !is_value_in_system(input_multi_finish.value, input_multi_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Конец промежутка (B)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_finish.classList.add("bad-input");
				input_multi_finish.focus();
			}
			if (!input_multi_step.value || !is_value_in_system(input_multi_step.value, input_multi_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Шаг промежутка для перевода (C)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_step.classList.add("bad-input");
				input_multi_step.focus();
			}
			if (check_correct_input) {
				event.preventDefault();
				/*			result.append("calculating 'multi'");*/
				history_item = [];
				history_item.push([input_multi_system_from.value, input_multi_system_to.value, input_multi_system_more_to.value]);
				result.innerHTML = "<h2><span class='h2-bright'>Результат</span> перевода</h2><div class='result-line result-header'><div class='result-item'>" + input_multi_system_from.value + "</div><div class='result-item'>" + input_multi_system_to.value + "</div><div class='result-item'>" + input_multi_system_more_to.value + "</div></div>";

				input_multi_start10 = get_value_from_system_to_decimal(input_multi_start.value, input_multi_system_from.value);
				input_multi_finish10 = get_value_from_system_to_decimal(input_multi_finish.value, input_multi_system_from.value);
				input_multi_step10 = get_value_from_system_to_decimal(input_multi_step.value, input_multi_system_from.value);

				if (input_multi_start10 > input_multi_finish10) {
					temp = input_multi_start10;
					input_multi_start10 = input_multi_finish10;
					input_multi_finish10 = temp;
				}

				for (var i = 0; input_multi_start10 < input_multi_finish10; input_multi_start10 += input_multi_step10) {
					input_multi_start_ORIG = get_value_from_decimal_to_system(input_multi_start10, input_multi_system_from.value);
					var ans1 = get_value_from_system_to_system(input_multi_start_ORIG, input_multi_system_from.value, input_multi_system_to.value);
					var ans2 = get_value_from_system_to_system(input_multi_start_ORIG, input_multi_system_from.value, input_multi_system_more_to.value);
					var new_line = document.createElement("div");
					new_line.classList = "result-line";
					new_line.innerHTML = "<div class='result-item'>" + input_multi_start_ORIG + "</div><div class='result-item'>" + ans1 + "</div><div class='result-item'>" + ans2 + "</div>";
					result.appendChild(new_line);
					history_item.push([input_multi_start_ORIG, ans1, ans2]);
				}

				systems_history = JSON.parse(localStorage.getItem("systems_history"));
				if (systems_history && systems_history.length > 0) {
					systems_history.push(history_item);
				} else {
					systems_history = [];
					systems_history[0] = history_item;
				}
				for (; systems_history.length > 5; ) {
					systems_history.shift();
				}
				localStorage.setItem("systems_history", JSON.stringify(systems_history));
				console.log(localStorage);

				refreshHistory();
			}
		}
	}

	mas_symbls = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	function is_value_in_system(value, system) {
		check = true;
		ascii_system = system.charCodeAt(system);
		system = Number(system);
		if (system > 35) {
			check = false;
			return check;
		}
		value_mas = value.split(".");
		if (value_mas.length > 2) {
			check = false;
			return check;
		}
		value_for_test = value_mas.join("");
		/*console.log(value_for_test);*/
		if (system > 10) {
			/*console.log(mas_symbls[system - 10]);*/
			ascii_system = mas_symbls[system - 10].charCodeAt(0);
			/*console.log(ascii_system);*/
			value_for_test = value_for_test.toUpperCase();
			/*console.log(value);*/
			for (var i = 0; i < value_for_test.length; i++) {
				curr_value = value_for_test[i].charCodeAt(0);
				console.log(curr_value, ascii_system - 1);
				if (curr_value >= ascii_system || (curr_value > 57 && curr_value < 65) || curr_value < 48) {
					check = false;
					break;
				}
			}
		}
		else {
			for (var i = 0; i < value_for_test.length; i++) {
				curr_value = Number(value_for_test[i]);
				if (!Number.isInteger(curr_value) || curr_value >= system) {
					check = false;
					break;
				}
			}
		}
		return check;
	}

	function get_value_from_system_to_system(value, system_from, system_to) {
		decimal_val = value;
		if (system_from != 10) {
			decimal_val = get_value_from_system_to_decimal(value, system_from);
		}
		ans_val = decimal_val;
		if (system_to != 10) {
			ans_val = get_value_from_decimal_to_system(decimal_val, system_to);
		}
		return ans_val;
	}

	function get_value_from_system_to_decimal(value, system_from) {
		value_mas = value.split(".");
	    ans = 0;
	    power = value_mas[0].length - 1;
	    curr_value = value_mas.join("");
	    for (var i = 0; i < curr_value.length; i++) {
	    	digit = Number(curr_value[i]);
	    	if (!Number.isInteger(digit)) {
				digit = change_letter_with_number(curr_value[i]);
			}
	    	ans += digit * Math.pow(Number(system_from), power);
	    	power--;
	    }
	    console.log("get_value_from_system_to_decimal", value, system_from, ans);
	    return ans;
	}

	function get_value_from_decimal_to_system(value, system_to) {
		value_mas = String(value).split(".");
		calc_result = Number(value_mas[0]);
		ans = "";
		for (; calc_result >= system_to;) {
			ostatok = calc_result % system_to;
			calc_result = (calc_result - ostatok) / system_to;
			if (ostatok > 9) {
				ostatok = change_number_with_letter(ostatok);
			}
			ans = ostatok + ans;
		}
		if (calc_result > 9) {
			calc_result = change_number_with_letter(calc_result);
		}
		ans = calc_result + ans;
		/*console.log(ans);*/
		if (value_mas.length > 1 && value_mas[1] != "0") {
			ans += ".";
			calc_result_drob = Number("0." + value_mas[1]);
			for (var i = 0; i < 10; i++) {
				calc_result_drob = calc_result_drob * system_to;
				calc_result_drob = String(calc_result_drob).split(".");
				if (Number(calc_result_drob[0]) > 9) {
					calc_result_drob[0] = change_number_with_letter(calc_result_drob[0]);
				}
				ans += calc_result_drob[0];
				if (calc_result_drob.length < 2) {
					break;
				}
				calc_result_drob = Number("0." + calc_result_drob[1]);
			}
		}
		console.log("get_value_from_decimal_to_system", value, system_to, ans);
	    return ans;
	}

	function change_number_with_letter(value) {
		return mas_symbls[value - 10];
	}
	function change_letter_with_number(value) {
		return mas_symbls.join("").indexOf(value.toUpperCase()) + 10;
	}
	/*history*/
	function refreshHistory() {
		history_content = JSON.parse(localStorage.getItem("systems_history"));
		if (history_content && history_content.length > 0) {
			history_block = document.querySelector(".systems-history");
			history_slider = history_block.querySelector(".slider");
			mas_for_delete = history_slider.querySelectorAll(".history-refreshing-item");
			for (var i = 0; i < mas_for_delete.length; i++) {
				history_slider.removeChild(mas_for_delete[i]);
			}
			history_pagination = document.querySelector(".history-pagination");
			mas_pag_for_delete = history_slider.querySelectorAll(".history-refreshing-pagination-item");
			for (var i = 0; i < mas_pag_for_delete.length; i++) {
				history_pagination.removeChild(mas_pag_for_delete[i]);
			}
			for (var i = 0; i < history_content.length; i++) {
				next_item = document.createElement("figure");
				next_item.classList = "history-item slider__item history-refreshing-item";
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_table.innerHTML = "<thead><tr><th>" + history_content[i][0][0] + "</th><th>" + history_content[i][0][1] + "</th><th>" + history_content[i][0][2] + "</th></tr></thead>";
				next_item_tbody = document.createElement("tbody");
				for (var j = 1; j < history_content[i].length; j++) {
					next_item_tr = document.createElement("tr");
					next_item_tr.innerHTML = "<td>" + history_content[i][j][0] + "</td><td>" + history_content[i][j][1] + "</td><td>" + history_content[i][j][2] + "</td>";
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				history_slider.appendChild(next_item);
				next_pagination_item = document.createElement("button");
				next_pagination_item.classList = "pagination__item history-refreshing-pagination-item";
				next_pagination_item.setAttribute("type", "button");
				next_pagination_item.innerHTML = "<span class='visually-hidden'>*</span>";
				history_pagination.appendChild(next_pagination_item);
			}
		}
	}
	refreshHistory();
	/*/history*/
	/* ---------------- /systems ------------------*/
}

if (location.href.includes("logic")) {
	/* ---------------- logic ------------------ */
	input = document.querySelector(".logic-input");
	logic_formula = input.querySelector(".logic-formula");
	/*logic_formula.focus();*/
	logic_formula.addEventListener("keydown", function function_name(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			logic_submit_event(event);
		}
	});

	submit = document.querySelector(".logic-submit")
	submit_button = submit.querySelector(".submit-button");
	submit_button.addEventListener("click", function(event) {
		event.preventDefault();
		logic_submit_event(event);
	});

	refreshHistory();

	hangMiniButtonsEvents();


	function logic_submit_event(event) {
		result = document.querySelector(".result");
		mas_for_delete = result.querySelectorAll(".result-refreshing-item");
		for (var i = 0; i < mas_for_delete.length; i++) {
			/*console.log(mas_for_delete[i]);*/
			result.removeChild(mas_for_delete[i]);
		}
		result_pagination = result.querySelector("result-pagination");
		mas_pag_for_delete = result.querySelectorAll(".result-refreshing-pagination-item");
		for (var i = 0; i < mas_pag_for_delete.length; i++) {
			result_pagination.removeChild(mas_pag_for_delete[i]);
		}
		logic_formula.classList.remove("bad-input");
		if (!logic_formula.value || !tryToParseFormula(logic_formula.value)) {
			var error_mes = document.createElement("p");
			error_mes.classList = "result-refreshing-item";
			error_mes.innerHTML = "Введите корректное значение 'Формула (F)'";
			result.appendChild(error_mes);
			logic_formula.classList.add("bad-input");
			logic_formula.focus();
		} else {
			/*var success_mes = document.createElement("p");
			success_mes.classList = "result-refreshing-item";
			success_mes.innerHTML = "calculating";
			result.appendChild(success_mes);*/

			frml_ = stripWhite(logic_formula.value)
			for_history_header = frml_;
			priority = setPriorityByBrackets(frml_);
			console.log(priority);


			table_ = calculateFormulaForTable(frml_, priority);
			/*console.log(table_);*/
			result.appendChild(drawTableInDiv(table_));

			blocks = getBlocksInfo(frml_, priority);
			console.log(blocks);
			result.appendChild(drawBlocksInDiv(blocks));
			
			function recurs_cycl() {
				setTimeout(function() {
					scheme_ = document.querySelector(".result").querySelector(".result-scheme");
					if (scheme_.classList.contains("slider__item--active")) {
						correctBlocks();
					} else {
						console.log("wait...");
						return recurs_cycl();
					}
				}, 2000);
			}
			recurs_cycl();

			history_item = table_;
			history_item.unshift(for_history_header);
			/*console.log(table_);*/
			logic_history = JSON.parse(localStorage.getItem("logic_history"));
			if (logic_history && logic_history.length > 0) {
				logic_history.push(history_item);
			} else {
				logic_history = [];
				logic_history.push(history_item);
			}
			for (; logic_history.length > 5; ) {
				logic_history.shift();
			}
			localStorage.setItem("logic_history", JSON.stringify(logic_history));
			console.log(localStorage);

			refreshHistory();
		}
		document.querySelector(".table.pagination__item").click();
	}
	function tryToParseFormula(formula) {
		check = true;
		/*f-|↓&+⊕→↔()*/
		formula = formula.toUpperCase();
		is_turn_f_number = true;
		for (var i = 0; i < formula.length; i++) {
			curr_char_code = formula[i].charCodeAt(0);
			/*console.log(formula[i], curr_char_code);*/
			if (curr_char_code == 32) {
			} else if (curr_char_code == 40 || curr_char_code == 41 || curr_char_code == 45) {
			} else if (is_turn_f_number) {
				if (curr_char_code == 70 || curr_char_code < 65 || curr_char_code > 90) {
					check = false;
					break;
				} else {
					is_turn_f_number = false;
				}
			} else {
				if (curr_char_code != 38 &&  curr_char_code != 43 && curr_char_code != 124 && curr_char_code != 8594 && curr_char_code != 8595 && curr_char_code != 8596 && curr_char_code != 8853) {
					check = false;
					break;
				} else {
					is_turn_f_number = true;
				}
			}
		}
		return check;
	}
	function stripWhite(formula) {
		formula = formula.toUpperCase();
		new_formula = "";
		for (var i = 0; i < formula.length; i++) {
			curr_char_code = formula[i].charCodeAt(0);
			if (curr_char_code == 32) {
			} else {
				new_formula += formula[i];
			}
		}
		return new_formula;
	}
/*(((-(B&A))+A)+(C⊕D) ) ⊕ (A⊕D)*/
	function setPriorityByBrackets(formula) {
		/*sequence_f_acts = [];
		sequence_f_acts.push("");*/
		idxs_of_operands_in_order = [];
		index_of_act = 0;
		for (var i = 0; i < formula.length; i++) {
			if (formula[i] == "(") {
				index_of_act++;
				/*sequence_f_acts.splice(index_of_act, 0, "");*/
				idxs_of_operands_in_order.splice(index_of_act, 0, "");
			} else if (formula[i] == ")") {
				index_of_act--;
			} else {
				/*sequence_f_acts[index_of_act] = sequence_f_acts[index_of_act] + formula[i];*/
				if (formula[i].charCodeAt(0) < 65 || formula[i].charCodeAt(0) > 90) {
					idxs_of_operands_in_order[index_of_act] = i;
				}
			}
		}
		/*console.log(idxs_of_operands_in_order);*/
		return idxs_of_operands_in_order;
	}


/*м.б. расставить просто скобки в самом начале ДА*/
/* МЫ ПОКА ЧТО НЕ УМЕЕМ РААСТАВЛЯТЬ ПРИОРИТЕТЫ ОПЕРАЦИЙ! ПОЖАЛУЙСТА, ПОСТАВЬТЕ ВСЕ НЕОБХОДИМЫЕ СКОБКИ САМОСТОЯТЕЛЬНО */

	/*function setPriorityByInversion(formula) {}*/

	/*function setPriorityByOperator(formula) {}*/
	/*
	function setPriorityByShaeffer(formula) {}
	function setPriorityByPirs(formula) {}
	function setPriorityByConjunction(formula) {}
	function setPriorityByDisjunction(formula) {}
	function setPriorityBySumByAbsTwo(formula) {}
	function setPriorityByImplication(formula) {}
	function setPriorityByEqual(formula) {}*/

	function calculateFormulaForTable(formula, priority) {
		set_ = getSetOfVars(formula);
		len_f_set = set_[1].length;
		ans____ = [];
		line____ = [];
		for (var i = 0; i < set_[0].length; i++) {
			line____.push(set_[0][i]);
		}
		line____.push("F");
		ans____.push(line____);
		for (; set_[1].length <= len_f_set; set_[1] = fillWithNull(String(addTwoNumbersBinary(set_[1], 1)), len_f_set)) {
			/*console.log(formula, set_, ans____);*/
			line____ = [];
			for (var i = 0; i < set_[1].length; i++) {
				line____.push(set_[1][i]);
			}
			line____.push(calculateNextLine(formula, priority, set_));
			ans____.push(line____);
		}
		return ans____;
	}

	function fillWithNull(str, leng) {
		while (str.length < leng) {
			str = "0" + str;
		}
		return str;
	}

	function addTwoNumbersBinary(number1, number2) {
		number1_in_10 = get_value_from_system_to_decimal(number1, 2);
		number2_in_10 = get_value_from_system_to_decimal(number2, 2);
		ans_in_10 = number1_in_10 + number2_in_10;
		return get_value_from_decimal_to_system(ans_in_10, 2);
	}

	function get_value_from_system_to_decimal(value, system_from) {
		value_mas = String(value).split(".");
	    ans = 0;
	    power = value_mas[0].length - 1;
	    curr_value = value_mas.join("");
	    for (var i = 0; i < curr_value.length; i++) {
	    	digit = Number(curr_value[i]);
	    	if (!Number.isInteger(digit)) {
				digit = change_letter_with_number(curr_value[i]);
			}
	    	ans += digit * Math.pow(Number(system_from), power);
	    	power--;
	    }
	    /*console.log("get_value_from_system_to_decimal", value, system_from, ans);*/
	    return ans;
	}

	function get_value_from_decimal_to_system(value, system_to) {
		value_mas = String(value).split(".");
		calc_result = Number(value_mas[0]);
		ans = "";
		for (; calc_result >= system_to;) {
			ostatok = calc_result % system_to;
			calc_result = (calc_result - ostatok) / system_to;
			if (ostatok > 9) {
				ostatok = change_number_with_letter(ostatok);
			}
			ans = ostatok + ans;
		}
		if (calc_result > 9) {
			calc_result = change_number_with_letter(calc_result);
		}
		ans = calc_result + ans;
		/*console.log(ans);*/
		if (value_mas.length > 1 && value_mas[1] != "0") {
			ans += ".";
			calc_result_drob = Number("0." + value_mas[1]);
			for (var i = 0; i < 10; i++) {
				calc_result_drob = calc_result_drob * system_to;
				calc_result_drob = String(calc_result_drob).split(".");
				if (Number(calc_result_drob[0]) > 9) {
					calc_result_drob[0] = change_number_with_letter(calc_result_drob[0]);
				}
				ans += calc_result_drob[0];
				if (calc_result_drob.length < 2) {
					break;
				}
				calc_result_drob = Number("0." + calc_result_drob[1]);
			}
		}
		/*console.log("get_value_from_decimal_to_system", value, system_to, ans);*/
	    return ans;
	}

	function getSetOfVars(formula) {
		set_of_variables = [];
		set_of_variables[0] = []; /*names*/
		set_of_variables[1] = ""; /*values*/ /*прибавлять двоично*/
		for (var i = 0; i < formula.length; i++) {
			curr_char_code = formula[i].charCodeAt(0);
			/*console.log(formula_string[i], curr_char_code);*/
			if (curr_char_code >= 65 && curr_char_code <= 90) {
				if (set_of_variables[0].includes(formula[i])) {
				} else {
					/*console.log("+++", formula_string[i]);*/
					set_of_variables[0].push(formula[i]);
					set_of_variables[1] += "0";
				}
			}
		}

		/*console.log("new_set_of_variables", set_of_variables);*/
		for (var i = 0; i < set_of_variables[0].length; i++) {
			for (var j = 0; j < set_of_variables[0].length - 1; j++) {
				if (set_of_variables[0][j].charCodeAt(0) > set_of_variables[0][j + 1].charCodeAt(0)) {
					temp = set_of_variables[0][j];
					set_of_variables[0][j] = set_of_variables[0][j + 1];
					set_of_variables[0][j + 1] = temp;
				}
			}
		}
		str0 = "";
		for (var i = 0; i < set_of_variables[0].length; i++) {
			str0 += set_of_variables[0][i];
		}
		set_of_variables[0] = str0;
		/*console.log("new_set_of_variables", set_of_variables);*/
		return set_of_variables;
	}

	function calculateNextLine(formula_, priority_, set_of_variables) {
		activated_frml = [];
		for (var i = 0; i < formula_.length; i++) {
			activated_frml.push(formula_[i]);
		}
		for (var i = priority_.length - 1; i >= 0; i--) {
			operand = activated_frml[priority_[i]].charCodeAt(0);
			vars = [];
			if (operand != 45) {/*не инверсия*/
				vars.push(activated_frml[priority_[i] - 1]);
			}
			vars.push(activated_frml[priority_[i] + 1]);
			/*console.log(vars);*/
			for (var j = 0; j < vars.length; j++) {
				if (vars[j] != "0" && vars[j] != "1") {
					vars[j] = set_of_variables[1][set_of_variables[0].indexOf(vars[j])];
				}
				if (vars[j] == "0") {
					vars[j] = false;
				} else if (vars[j] == "1") {
					vars[j] = true;
				}
			}
			solution = 0;
			switch (operand) {
				case 38:
					if (vars[0] && vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 43:
					if (vars[0] || vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 45:
					if (vars[0]) {
						solution = "0";
					} else {
						solution = "1";
					}
					break;
				case 124:
					if (!(vars[0] && vars[1])) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 8594:
					if (vars[0] && !vars[1]) {
						solution = "0";
					} else {
						solution = "1";
					}
					break;
				case 8595:
					if (!(vars[0] || vars[1])) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 8596:
					if (vars[0] == vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 8853:
					if (vars[0] != vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				default:
					alert("error");
					return;
			}
			start_of_cut = priority_[i];
			finish_of_cut = priority_[i] + 1;
			if (operand != 45) {/*не инверсия*/
				start_of_cut--;
			}
			for (var j = start_of_cut - 1; j >= 0; j--) {
				if ((activated_frml[j] == "0") || (activated_frml[j] == "1")) {
					start_of_cut--;
				} else if (activated_frml[j] == "(") {
					start_of_cut--;
					break;
				} else {
					break;
				}
			}
			for (var j = finish_of_cut + 1; j < activated_frml.length; j++) {
				if ((activated_frml[j] == "0") || (activated_frml[j] == "1")) {
					finish_of_cut++;
				} else if (activated_frml[j] == ")") {
					finish_of_cut++;
					break;
				} else {
					break;
				}
			}
			for (var j = start_of_cut; j <= finish_of_cut; j++) {
				activated_frml[j] = solution;
			}
			/*console.log(activated_frml, priority_, set_of_variables, vars, operand, solution);*/
		}
		/*console.log(set_of_variables, "sooooolllllll", solution);*/

		return solution;
	}

	function drawTableInDiv(table__) {
		var table_div  = document.createElement("div");
		table_div.classList = "result-table slider__item slider__item--active result-refreshing-item";
		var first_line = document.createElement("div");
		first_line.classList = "result-line result-header";
		html_f_first_line = "";
		for (var i = 0; i < table__[0].length; i++) {
			html_f_first_line = html_f_first_line + "<div class='result-item'>" + table__[0][i] + "</div>";
		}
		first_line.innerHTML = html_f_first_line;
		table_div.appendChild(first_line);
		for (var i = 1; i < table__.length; i++) {
			var new_line = document.createElement("div");
			new_line.classList = "result-line";
			html_f_new_line = "";
			for (var j = 0; j < table__[i].length; j++) {
				html_f_new_line = html_f_new_line + "<div class='result-item'>" + table__[i][j] + "</div>";
			}
			new_line.innerHTML = html_f_new_line;
			table_div.appendChild(new_line);
		}
		return table_div;
	}

	function getBlocksInfo(formula_, priority_) {
		blocks_info = [];
		new_block_id = 0;
		new_line_id = 0;

		names_of_vars = getSetOfVars(formula_)[0];
		for (var i = 0; i < names_of_vars.length; i++) {
			next_block = {};
			next_block.value = names_of_vars[i];
			next_block.line = 0;
			next_block.id = new_block_id;
			next_block.operation = 0;
			new_block_id++;
			blocks_info.push(next_block);
		}
		new_line_id += 2;

		activated_frml = [];
		for (var i = 0; i < formula_.length; i++) {
			activated_frml.push(formula_[i]);
		}
		mas_for_formulas = activated_frml.slice(0);
		mas_for_ids = activated_frml.slice(0);

		for (var i = priority_.length - 1; i >= 0; i--) {

			next_block = {};
			next_block.value = "";
			next_block.formula = "";
			
			next_block.operation = activated_frml[priority_[i]].charCodeAt(0);;
			next_block.variables_ids = [];
			next_block.id = new_block_id;
			new_block_id++;
			next_block.line = new_line_id;
			new_line_id++;

			// operand = activated_frml[priority_[i]].charCodeAt(0);
			vars = [];
			if (next_block.operation != 45) {/*не инверсия*/
				vars.push("");
				for (var j = priority_[i] - 1; j >= 0; j--) {
					if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j].charCodeAt(0) >= 65 && activated_frml[j].charCodeAt(0) <= 90)) {
						vars[0] = activated_frml[j] + vars[0];
					} else if (activated_frml[j] == "_") {
					} else {
						break;
					}
				}
				vars.push("");
				for (var j = priority_[i] + 1; j < activated_frml.length; j++) {
					if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j].charCodeAt(0) >= 65 && activated_frml[j].charCodeAt(0) <= 90)) {
						vars[1] = vars[1] + activated_frml[j];
					} else if (activated_frml[j] == "_") {
					} else {
						break;
					}
				}
			} else {
				vars.push("");
				for (var j = priority_[i] + 1; j < activated_frml.length; j++) {
					if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j].charCodeAt(0) >= 65 && activated_frml[j].charCodeAt(0) <= 90)) {
						vars[0] = vars[0] + activated_frml[j];
					} else if (activated_frml[j] == "_") {
					} else {
						break;
					}
				}
			}

			/*console.log("VAAAARS", vars, next_block.operation);*/

			for (var j = 0; j < vars.length; j++) {
				if (vars[j].charCodeAt(0) >= 65 && vars[j].charCodeAt(0) <= 90) {
					for (var k = 0; k < blocks_info.length; k++) {
						if (blocks_info[k].value == vars[j]) {
							next_block.variables_ids.push(blocks_info[k].id);
						}
					}
				} else {
					next_block.variables_ids.push(vars[j]);
				}
			}

			for (var j = 0; j < vars.length; j++) {
				if (vars[j].charCodeAt(0) >= 65 && vars[j].charCodeAt(0) <= 90) {
				} else {
					for (var k = 0; k < blocks_info.length; k++) {
						if (String(blocks_info[k].id) == vars[j]) {
							vars[j] = "(" + blocks_info[k].formula + ")";
						}
					}
				}
			}

			/*console.log(vars);*/

			if (next_block.operation != 45) {
				next_block.formula = vars[0] + activated_frml[priority_[i]] + vars[1];
			} else {
				next_block.formula = activated_frml[priority_[i]] + vars[0];
			}
			/*next_block.value = next_block.formula;*/


			middle_cut = priority_[i];
			start_of_cut = priority_[i];
			finish_of_cut = priority_[i] + 1;
			if (next_block.operation != 45) {/*не инверсия*/
				start_of_cut--;
			}
			for (var j = start_of_cut - 1; j >= 0; j--) {
				if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j] == "_")) {
					start_of_cut--;
				} else if (activated_frml[j] == "(") {
					start_of_cut--;
					break;
				} else {
					break;
				}
			}
			for (var j = finish_of_cut + 1; j < activated_frml.length; j++) {
				if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j] == "_")) {
					finish_of_cut++;
				} else if (activated_frml[j] == ")") {
					finish_of_cut++;
					break;
				} else {
					break;
				}
			}
			for (var j = start_of_cut; j <= finish_of_cut; j++) {
				activated_frml[j] = "_";
			}
			/*console.log(String(next_block.id)[0], String(next_block.id).length, middle_cut, activated_frml[middle_cut + 0]);*/
			for (var j = 0; j < String(next_block.id).length; j++) {
				activated_frml[middle_cut + j] = String(next_block.id)[j];
			}

			blocks_info.push(next_block);

			/*console.log(activated_frml, next_block.formula, next_block.variables_ids, next_block.operation, next_block.id, next_block.line);*/
		}
		last_block = {}
		last_block.value = "F";
		last_block.operation = 0;
		last_block.line = new_line_id;
		last_block.id = new_block_id;
		last_block.variables_ids = new_block_id - 1;
		blocks_info.push(last_block);

		return blocks_info;
	}

	function drawBlocksInDiv(blocks) {
		var result_scheme = document.createElement("div");
		result_scheme.classList = "result-scheme slider__item result-refreshing-item";
		overflow_wrapper = document.createElement("div");
		overflow_wrapper.classList = "result-scheme-for-overflow-wrapper";
		new_line = document.createElement("div");
		new_line.classList = "result-scheme-result-line result-header";
		number_of_line = 0;
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].line > number_of_line) {
				number_of_line++;
				overflow_wrapper.appendChild(new_line);
				new_line = document.createElement("div");
				new_line.classList = "result-scheme-result-line";
			}
			new_block = document.createElement("div");
			new_block.classList = "result-scheme-result-item";
			new_block.innerHTML = blocks[i].value;
			new_block.setAttribute("id", blocks[i].id);
			new_block.setAttribute("line", blocks[i].line);
			new_block.setAttribute("formula", blocks[i].formula);
			new_block.setAttribute("title", blocks[i].formula);
			new_block.setAttribute("operation", blocks[i].operation);
			new_block.setAttribute("variables_ids", blocks[i].variables_ids);
			new_span_for_pseudo = document.createElement("span");
			new_span_for_pseudo.classList = "q0";
			new_block.appendChild(new_span_for_pseudo);
			new_span_for_pseudow = document.createElement("span");
			new_span_for_pseudow.classList = "q1";
			new_block.appendChild(new_span_for_pseudow);
			new_span_for_pseudoz = document.createElement("span");
			new_span_for_pseudoz.classList = "z";
			new_block.appendChild(new_span_for_pseudoz);
			new_b_for_pseudo = document.createElement("b");
			new_block.appendChild(new_b_for_pseudo);
			new_line.appendChild(new_block);
		}
		new_line.classList = "result-scheme-result-line result-header";
		overflow_wrapper.appendChild(new_line);
		result_scheme.appendChild(overflow_wrapper);
		return result_scheme;
	}

	function correctBlocks() {
		scheme = document.querySelector(".result").querySelector(".result-scheme");
		first_line_items = scheme.querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		count_f_first_itms = first_line_items.length;
		/*console.log(scheme.offsetHeight);*/
		height_f_scheme = scheme.offsetHeight;
		// dist = height_f_scheme / count_f_first_itms / 2;
		for (var i = 0; i < first_line_items.length; i++) {
			dist = first_line_items[i].offsetTop - 262;
			first_line_items[i].setAttribute("distance", dist);
			// dist += height_f_scheme / count_f_first_itms;
			first_line_items[i].innerHTML = "<input type='text' placeholder='" + first_line_items[i].innerHTML[0] + "'>";
			first_line_items[i].addEventListener("keydown", function function_name(event) {
				if ((event.key === " ") || (event.key === "Enter")) {
					event.preventDefault();
					submit_blocks_event();
				} else if (event.key === "ArrowDown") {
					event.preventDefault();
					next_block_event(event.target);
				} else if (event.key === "ArrowUp") {
					event.preventDefault();
					prev_block_event(event.target);
				}
			});
		}
		items = scheme.querySelectorAll(".result-scheme-result-item");
		for (var i = 0; i < items.length; i++) {
			if (items[i].getAttribute("id") > count_f_first_itms - 1) {
				distance_vars = [];
				distance = 0;
				ids = items[i].getAttribute("variables_ids").split(",");
				for (var j = 0; j < ids.length; j++) {
					for (var k = 0; k < items.length; k++) {
						if (items[k].getAttribute("id") == String(ids[j])) {
							/*console.log(items[k]);*/
							distance_vars.push(Number(items[k].getAttribute("distance")));
						}
					}
					
				}
				for (var j = 0; j < distance_vars.length; j++) {
					distance += distance_vars[j];
				}
				distance /= distance_vars.length;
				/*console.log(distance_vars, distance);*/
				if (distance_vars.length > 1) {
					selector = ".result-scheme-result-item" + "[id='" + items[i].getAttribute("id") + "'] span.q" + 0;
					pseudo = scheme.querySelector(selector);
					pseudo.style.width = "5px";
					diffrnce = Math.abs(distance_vars[0] - distance);
					pseudo.style.height = (diffrnce - 30) + "px";
					pseudo.style.top = "-" + (diffrnce - 45) + "px";

					selector = ".result-scheme-result-item" + "[id='" + items[i].getAttribute("id") + "'] span.q" + 1;
					pseudo = scheme.querySelector(selector);
					pseudo.style.width = "5px";
					diffrnce = Math.abs(distance_vars[1] - distance);
					pseudo.style.height = (diffrnce - 20) + "px";
					pseudo.style.top = 60 + "px";
					// for (var j = 0; j < distance_vars.length; j++) {
					// 	
					// 	/*console.log(selector);*/
					// 	pseudo.style.top = diffrnce * 2 * ((-1) ** j) / (2 ** j) + 10 + "px";
					// }
				}
				/*console.log(distance);*/
				items[i].style.marginTop = String(distance) + "px";
				items[i].setAttribute("distance", distance);
			}
			distance_vars = [];
		}
	}

	function submit_blocks_event(argument) {
		set_of_vars = [];
		first_line_items = document.querySelector(".result-scheme").querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		for (var i = 0; i < first_line_items.length; i++) {
			set_of_vars.push(first_line_items[i].querySelector("input").value);
		}
		/*console.log(set_of_vars);*/
		for (var i = 0; i < set_of_vars.length; i++) {
			if (String(set_of_vars[i]) == "0") {
				set_of_vars[i] = "0";
			} else if (String(set_of_vars[i]) == "1") {
				set_of_vars[i] = "1";
			} else {
				first_line_items[i].innerHTML = "<input type='text' value='0'>";
				set_of_vars[i] = "0";
			}
		}
		/*console.log(set_of_vars);*/
		newstrr = "";
		for (var i = 0; i < set_of_vars.length; i++) {
			newstrr += set_of_vars[i];
		}
		set_of_vars = newstrr;
		logic_formula = document.querySelector(".logic-formula");

		frml_ = stripWhite(logic_formula.value)
		priority = setPriorityByBrackets(frml_);
		got_set = getSetOfVars(frml_);
		got_set[1] = set_of_vars;
		sol = calculateNextLine(frml_, priority, got_set);
		items = document.querySelector(".result-scheme").querySelectorAll(".result-scheme-result-item");
		items[items.length - 1].innerHTML = sol;
	}

	function next_block_event(trgt) {
		first_line_items = document.querySelector(".result-scheme").querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		/*console.log("-------", trgt);*/
		for (var i = 0; i < first_line_items.length; i++) {
			/*console.log(first_line_items[i]);*/
			if (first_line_items[i].querySelector("input") === trgt || first_line_items[i] === trgt) {
				if (i + 1 < first_line_items.length) {
					first_line_items[i + 1].querySelector("input").focus();
				} else {
					first_line_items[0].querySelector("input").focus();
				}
				break;
			}
		}
	}

	function prev_block_event(trgt) {
		first_line_items = document.querySelector(".result-scheme").querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		/*console.log("-------", trgt);*/
		for (var i = 0; i < first_line_items.length; i++) {
			/*console.log(first_line_items[i]);*/
			if (first_line_items[i].querySelector("input") === trgt || first_line_items[i] === trgt) {
				if (i - 1 >= 0) {
					first_line_items[i - 1].querySelector("input").focus();
				} else {
					first_line_items[first_line_items.length - 1].querySelector("input").focus();
				}
				break;
			}
		}
	}

	/*history*/
	function refreshHistory() {
		history_content = JSON.parse(localStorage.getItem("logic_history"));
		if (history_content && history_content.length > 0) {
			history_block = document.querySelector(".logic-history");
			history_slider = history_block.querySelector(".slider");
			mas_for_delete = history_slider.querySelectorAll(".history-refreshing-item");
			for (var i = 0; i < mas_for_delete.length; i++) {
				history_slider.removeChild(mas_for_delete[i]);
			}
			history_pagination = document.querySelector(".history-pagination");
			mas_pag_for_delete = history_slider.querySelectorAll(".history-refreshing-pagination-item");
			for (var i = 0; i < mas_pag_for_delete.length; i++) {
				history_pagination.removeChild(mas_pag_for_delete[i]);
			}
			for (var i = 0; i < history_content.length; i++) {
				next_item = document.createElement("figure");
				next_item.classList = "history-item slider__item history-refreshing-item";
				next_item_header = document.createElement("h3");
				next_item_header.innerHTML = history_content[i][0];
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_thead = document.createElement("thead");
				first_line = document.createElement("tr");
				html_f_first_line = "";
				for (var k = 0; k < history_content[i][1].length; k++) {
					html_f_first_line = html_f_first_line + "<th>" + history_content[i][1][k] + "</th>";
				}
				first_line.innerHTML = html_f_first_line;
				next_item_thead.appendChild(first_line);
				next_item_table.appendChild(next_item_thead);
				next_item_tbody = document.createElement("tbody");
				for (var j = 2; j < history_content[i].length; j++) {
					next_item_tr = document.createElement("tr");
					html_f_next_line = "";
					for (var k = 0; k < history_content[i][j].length; k++) {
						html_f_next_line = html_f_next_line + "<td>" + history_content[i][j][k] + "</td>";
					}
					next_item_tr.innerHTML = html_f_next_line;
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				next_item.appendChild(next_item_header);
				history_slider.appendChild(next_item);
				next_pagination_item = document.createElement("button");
				next_pagination_item.classList = "pagination__item history-refreshing-pagination-item";
				next_pagination_item.setAttribute("type", "button");
				next_pagination_item.innerHTML = "<span class='visually-hidden'>*</span>";
				history_pagination.appendChild(next_pagination_item);
			}
		}
	}
	/*/history*/

	function hangMiniButtonsEvents() {
		operands_butts = input.querySelector(".operands");
		operands_butts.querySelector(".button-45").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "-";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-124").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "|";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8595").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "↓";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-38").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "&";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-43").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "+";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8853").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "⊕";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8594").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "→";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8596").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "↔";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-40").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "(";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-41").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + ")";
			logic_formula.focus();
		});
	}
	/* ---------------- /logic ------------------ */
}

if (location.href.includes("user")) {
	/* ---------------- user ------------------ */
	history_content_systems = JSON.parse(localStorage.getItem("systems_history"));
	if (history_content_systems && history_content_systems.length > 0) {
		systems_items = document.querySelectorAll(".history-wrapper-light");
		for (var i = 0; i < systems_items.length; i++) {
			systems_items[i].innerHTML = "<h2><span class='h2-bright'>Перевод</span> между системами</h2>";
		}
		for (var i = 0; i < systems_items.length; i++) {
			if (history_content_systems.length < i + 1) {
				break;
			} else {
				next_item = document.createElement("figure");
				next_item.classList = "history-item";
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_table.innerHTML = "<thead><tr><th>" + history_content_systems[i][0][0] + "</th><th>" + history_content_systems[i][0][1] + "</th><th>" + history_content_systems[i][0][2] + "</th></tr></thead>";
				next_item_tbody = document.createElement("tbody");
				for (var j = 1; j < history_content_systems[i].length; j++) {
					next_item_tr = document.createElement("tr");
					next_item_tr.innerHTML = "<td>" + history_content_systems[i][j][0] + "</td><td>" + history_content_systems[i][j][1] + "</td><td>" + history_content_systems[i][j][2] + "</td>";
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				systems_items[i].appendChild(next_item);
			}
		}
	}
	history_content_logic = JSON.parse(localStorage.getItem("logic_history"));
	if (history_content_logic && history_content_logic.length > 0) {
		logic_items = document.querySelectorAll(".history-wrapper-dark");
		for (var i = 0; i < logic_items.length; i++) {
			logic_items[i].innerHTML = "<h2><span class='h2-bright'>Вычисление</span> алгебры логики</h2>";
		}
		for (var i = 0; i < logic_items.length; i++) {
			if (history_content_logic.length < i + 1) {
				break;
			} else {
				next_item = document.createElement("figure");
				next_item.classList = "history-item";
				next_item_header = document.createElement("h3");
				next_item_header.innerHTML = history_content_logic[i][0];
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_thead = document.createElement("thead");
				first_line = document.createElement("tr");
				html_f_first_line = "";
				for (var k = 0; k < history_content_logic[i][1].length; k++) {
					html_f_first_line = html_f_first_line + "<th>" + history_content_logic[i][1][k] + "</th>";
				}
				first_line.innerHTML = html_f_first_line;
				next_item_thead.appendChild(first_line);
				next_item_table.appendChild(next_item_thead);
				next_item_tbody = document.createElement("tbody");
				for (var j = 2; j < history_content_logic[i].length; j++) {
					next_item_tr = document.createElement("tr");
					html_f_next_line = "";
					for (var k = 0; k < history_content_logic[i][j].length; k++) {
						html_f_next_line = html_f_next_line + "<td>" + history_content_logic[i][j][k] + "</td>";
					}
					next_item_tr.innerHTML = html_f_next_line;
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				next_item.appendChild(next_item_header);
				logic_items[i].appendChild(next_item);
			}
		}
	}

	document.querySelectorAll(".history-wrapper-light, .history-wrapper-dark").forEach(function callback(element, index, array) {
		item_h2 = element.querySelector("h2");
		// console.log(index + " " + item_h2);
		item_figure = element.querySelector("figure");
		// console.log(index + " " + item_figure);
		if (!item_figure) {
			item_h2.classList.add("visually-hidden");
		}
	});
	/* ---------------- /user ------------------ */
}
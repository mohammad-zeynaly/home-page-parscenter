$(document).ready(function () {

	//#region alert

	$('button[data-bs-dismiss="alert"][aria-label="Close"]').click(function () {
		const alert = $(this).parent('[role="alert"]');
		alert.removeClass("show");
		setTimeout(() => {
			alert.remove();
		}, 1000)
	})

	//#endregion

});
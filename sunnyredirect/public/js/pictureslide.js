$(document).ready(function() {
	var handle;
	function viewSlide() {
		var slider = $("#slider");
		slider.find("img.scape_visible").removeClass("scape_visible");
        //현재 화면에 보여지는 img를 찾아서 removeClass를 호출하여 보이지 않게 처리한다.
		slider.find("img:first").appendTo(slider).addClass("scape_visible");//처음은 여기로 옴(보이도록 하고 뒤에추가)
		//그후 img중에서 첫번재 요소를 선택하여 appendTo(slider)메서드를 호출함으로써 마지막에 추가
	}
	
	$("#slideStart").click(function() {
		handle = setInterval(viewSlide, 2000);
	});
	$("#slideStop").click(function() {
		clearInterval(handle);
	});	
	viewSlide();//처음에 보여지도록 처리
});
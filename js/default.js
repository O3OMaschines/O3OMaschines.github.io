var opened = '';
			function show(a) {
				if(a=="menu"){//открытие меню на мобилке
					document.getElementById('pop-ups-bg').style.display = "block";
					setTimeout(function (){
						document.getElementById('pop-ups-bg').style.opacity = ".3";
						document.getElementById('mobile-menu').style.left = "0";
						opened = a;
					}, 10);
				}
			}
			function close(a){//закрытие всего, что открыто
				if(a=="menu"){
					document.getElementById('mobile-menu').style.left = "-100%";
					document.getElementById('pop-ups-bg').style.opacity = "0";
					setTimeout(function (){
						document.getElementById('pop-ups-bg').style.display = "none";
						opened = '';
					}, 300);
				}
				else if(a=="gallery"){//закрытие галереи
		var l = document.getElementById('gallery-pop-up').getElementsByClassName('pict');
					document.getElementById('pop-ups-bg').style.opacity = "0";
						document.getElementById('gallery-pop-up').style.opacity = "0";
						document.getElementById('closegallery').style.opacity = "0";
						document.getElementById('gallery-pop-up').style.transform = "scale(.9,.9)";
					setTimeout(function (){
						document.getElementById('pop-ups-bg').style.display = "none";
						document.getElementById('gallery-pop-up').style.display = "none";
						document.getElementById('closegallery').style.display = "none";
						for(var i=0; i<l.length; i++){
			l[i].style.transform = "translateY(20px)";
			l[i].style.opacity = '0';
		}
					}, 300);
				}
			}
			document.getElementById('bars').onclick = function(){
				show('menu');
			}
			document.getElementById('closem').onclick = function(){
				close(opened);
			}
			document.getElementById('closegallery').onclick = function(){
				close(opened);
			}
			document.getElementById('pop-ups-bg').onclick = function(){
				close(opened);
			}
			function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
			document.addEventListener("scroll", function (e) {//прилипание меню при скролле
				if(document.body.scrollTop > getCoords(document.getElementsByClassName('sub-header')[0]).top + document.getElementsByClassName('sub-header')[0].clientHeight){
					document.getElementById('menu').style.position = 'fixed';
					document.getElementById('selector').style.position = 'fixed';
					document.getElementById('border').style.transform = "scale(1,1)";
					document.getElementById('menu').style.top = '0';
				}
				else{
					document.getElementById('menu').style.position = 'absolute';
					document.getElementById('selector').style.position = 'absolute';
					document.getElementById('border').style.transform = "scale(0,0)";
					document.getElementById('menu').style.top = '';
				}

			});
				document.getElementById('selector').style.left = getCoords(document.getElementById('mainselected')).left-document.getElementById('selector').clientWidth/2+ document.getElementById('mainselected').clientWidth/2 +'px';
			
			window.addEventListener("resize", function () {
			document.getElementById('selector').style.left = getCoords(document.getElementById('mainselected')).left-document.getElementById('selector').clientWidth/2+ document.getElementById('mainselected').clientWidth/2 +'px';
			})
			var arr = document.getElementById('menu').getElementsByClassName('mel');
			for(var i=0; i<arr.length; i++){//таскатель треугольника в меню
				if(arr[i].id != "mainselected"){arr[i].onmouseover = function () {
									document.getElementById('selector').style.top = '-11px';
									var mainSelected = this;
									setTimeout(function () {
										document.getElementById('selector').style.left = getCoords(mainSelected).left-document.getElementById('selector').clientWidth/2+ mainSelected.clientWidth/2 +'px';
									}, 150);
									setTimeout(function () {
										document.getElementById('selector').style.top = '0';
									}, 300);
								}
								arr[i].onmouseout = function(){
									document.getElementById('selector').style.top = '-11px';
									setTimeout(function () {
										document.getElementById('selector').style.left = getCoords(document.getElementById('mainselected')).left-document.getElementById('selector').clientWidth/2+ document.getElementById('mainselected').clientWidth/2 +'px';
									}, 150);
									setTimeout(function () {
										document.getElementById('selector').style.top = '0';
									}, 300);	
								}}
			}
window.mobileDetection = {//детектор мобилки
    Android:function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry:function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS:function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera:function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows:function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any:function () {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
    }
};
var UsAg = mobileDetection.any();
if (String(UsAg) !== "null"){
	var hammer = new Hammer(document.body);
			hammer.on('pan', function (e) {
				if(e.additionalEvent == 'panright' && e.distance > 200 && opened!='gallery'){
					document.getElementById('bars').onclick();
				}
			});
				var list = document.getElementById('gallery-pop-up').getElementsByClassName('list')[0];
				var listHammer = new Hammer(list);

				var start = getCoords(list.getElementsByClassName('shell')[0]).left;
				var last = 0;
			listHammer.on('pan', function (e) {
					list.getElementsByClassName('shell')[0].style.transform = "translateX(" + (start + e.deltaX) + 'px)';
					last = e.deltaX;
			});
				list.addEventListener("touchend", function () {
				start = getCoords(list.getElementsByClassName('shell')[0]).left;
			});
			}
var images = document.getElementsByClassName('comp');
for(var i=0; i<images.length; i++){
	images[i].onclick = function () {
		open(this.dataset.originalSource, this.dataset.project);
	}
}
function open(originalSource, project) {//открытие галереи
	var xhr = new XMLHttpRequest;
	xhr.open('GET', './gallery.php?s='+project, true);//подтаскиваем список картинок, видосов и описание
	xhr.send();
	xhr.onreadystatechange = function () {
		if(xhr.status == 200){
			window.sProject = xhr.responseText;
			window.sProject = JSON.parse(sProject);
			document.getElementsByClassName('list')[0].innerHTML = '';//чистим список картинок
			for (var i = 0; i<sProject.content.length; i++) {
				var pic = document.createElement('div');
				pic.classList.add('pict');
				if(originalSource == sProject.content[i].source)pic.classList.add('selected');
				if(sProject.content.type != 'video')pic.innerHTML = "<img src='"+sProject.content[i].source+"'>";//если картинка
				else pic.innerHTML = "<img data-watch="+sProject.content[i].source+" src='"+sProject.content[i].preview+"> <img src='/images/play.png' class='play-btt'>";//если видос
				document.getElementsByClassName('list')[0].appendChild(pic);
			}
			}
			document.getElementById('gallery-pop-up').getElementsByClassName('description')[0].innerHTML = "<div class=\"top\">"+sProject.descriptionTop+"</div><div class=\"bottom\">"+sProject.descriptionBottom+"</div><div class=\"txt\">"+sProject.txt+"</div>";
			document.getElementById('frame-image').src = originalSource;//вставляем выбранную картинку


	var v = document.getElementById('selected-img');//запускаем анимации открытия галереи
	opened = 'gallery';
	document.getElementById('pop-ups-bg').style.display = "block";
	document.getElementById('gallery-pop-up').style.display = "block";
	document.getElementById('closegallery').style.display = "block";

	setTimeout(function (){
		document.getElementById('pop-ups-bg').style.opacity = ".3";
		document.getElementById('gallery-pop-up').style.opacity = "1";
		document.getElementById('closegallery').style.opacity = "1";
		document.getElementById('gallery-pop-up').style.transform = "scale(1,1)";
	}, 10);
	setTimeout(function (){
		var l = document.getElementById('gallery-pop-up').getElementsByClassName('pict');
		for(var i=0; i<l.length; i++){
			l[i].style.transform = "translateY(0px)";
			l[i].style.opacity = '1';
			l[i].style.transitionDelay = (0.03*i)+'s';
			l[i].ondragstart = function () {
				return false;
			}
		}
	},210);
		}
	}
for(var i=0; i<document.getElementsByTagName('img').length; i++){//запрещаем перетаскивание картинок
	document.getElementsByTagName('img')[i].ondragstart = function () {
		return false;
	}
}
var ffr=0;
// sloader
	function loadAll(){
		if(document.getElementsByClassName('sload')[0]){
			document.getElementsByClassName('sload')[ffr].src = (document.getElementsByClassName('sload')[ffr].dataset.src)?document.getElementsByClassName('sload')[ffr].dataset.src:"";
		document.getElementsByClassName('sload')[ffr].onload = function(){
			if(ffr<document.getElementsByClassName('sload').length){
				loadAll();
			}
			this.style.opacity = "1";
		}
		document.getElementsByClassName('sload')[ffr].onerror = function(){
			if(ffr<document.getElementsByClassName('sload').length){
				loadAll();
			}
			this.style.opacity = "1";
		}
		ffr++;
		}
		
	}
// /sloader
	loadAll();
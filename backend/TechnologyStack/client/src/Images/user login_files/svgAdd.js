$(function(){

	var userAgent = window.navigator.userAgent.toLowerCase();

	if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {	
		taiou(); //一番下に書いてあります。	
	}else if (userAgent.indexOf('chrome') != -1) {
	}else if (userAgent.indexOf('safari') != -1) {		
		taiou();
	}

	getY();

	//IE,Safari用の初期 設定
	sizeNumber=0;
	colorSelect=0; //色は灰色
	type=".png"; 
	srcTxt="http://icon-rainbow.com/i/"+imgID+"/"+imgID+colorSelect+"_"+sizeNumber;
	
	
	if($.cookie("open-panel")){
		$("#fileDown").animate({"bottom" : "0px" }, 150);
			
	}
	
	// シングルページ用の読み込み	
	$("#svgArea").load(svgData);
  	
	
	
    ls = localStorage;

	changeC=0;
	var bgflag=0;
	
		//クッキーに色の設定なかったら、#666666にしなさい
	if($.cookie("dColor")){
		defaultColor=$.cookie("dColor");
	}else{
		defaultColor="#4b4b4b"
	}
	
	iniC03=defaultColor;	

	$("input#iconSingleColor").ColorPickerSliders({
		color:iniC03,
		placement: 'right',
		swatches: false,
		sliders: false,
		hsvpanel: true,
		hsl: 1,
			onchange: function(container, color) {
                    var span = $(".st0");
					span.css("fill", color.tiny.toRgbString());
					
					ten=(color.tiny.toRgbString());		
					$.cookie("dColor",ten, { expires: 7 }); //クッキーに登録					
			}
	});
	


	
	setTimeout("push()", 500);
	
	//保存のマーク押したら
	$("#colorBox01").on('click', function(){

		if($.cookie("dColor") && $.cookie("n2Color")){
			
			if( $.cookie("dColor") == $.cookie("n1Color") ){
				//alert("同じやん");
			}else{
					
			//1個目のカラーを取って2個目の背景にし登録
			colorNext=$("#colorBox02").css("background-color");
			$("#colorBox03").css("background",colorNext);
			$.cookie("n2Color",colorNext, { expires: 7 });				
			
			color01=$.cookie("dColor");			
			$.cookie("n1Color",color01, { expires: 7 });

			iniC03=color01;
			$("#colorBox02").css("background",color01);
			
			//SVGの着色
			
			setTimeout("svgColorChange()", 100);
				
			}
		}else{
		
			touroku01=$.cookie("dColor");
				
			iniC03=touroku01;
		
			$(this).css("background",iniC03);
			
			$("#colorBox02").css("background",touroku01);
			
			$.cookie("n2Color",touroku01, { expires: 7 });
			
			setTimeout("svgColorChange()", 100);

		}
		
	});
	
	
		$("ul#size li").on('click', function(){
  		var cnumber = $("ul#size li").index(this);
		
		$("ul#size li").removeClass();
		$(this).addClass("on");	
		
		if(cnumber==0){
			$("#graph02,svg").css({width:"16px",height:"16px"});
			sizeNumber=16;		
				
		}else if(cnumber==1){
			$("#graph02,svg").css({width:"32px",height:"32px"});
			sizeNumber=32;					
						
		}else if(cnumber==2){
			$("#graph02,svg").css({width:"48px",height:"48px"});	
			sizeNumber=48;			
						
		}else if(cnumber==3){
			$("#graph02,svg").css({width:"64px",height:"64px"});
			sizeNumber=64;
						
		}else if(cnumber==4){
			$("#graph02,svg").css({width:"128px",height:"128px"});
			sizeNumber=128;
					
		}else if(cnumber==5){
			$("#graph02,svg").css({width:"256px",height:"256px"});	
			sizeNumber=256;
				
		}else if(cnumber==6){
			$("#graph02,svg").css({width:"512px",height:"512px"});	
			sizeNumber=512;
						
		}
		
		changePass();
		
	});

	
	

	$("#colorBox02").on('click', function(){
		tada=$.cookie("n1Color");	
		iniC03=tada;
		
		$(this).css("background",iniC03);
		
		setTimeout("svgColorChange()", 200);

	});	
	
	$("#colorBox03").on('click', function(){
						
		ga=$.cookie("n2Color");	
		iniC03=ga;
		
		$(this).css("background",iniC03);
		
		setTimeout("svgColorChange()", 200);
	});	

	//くっきーのクリア
	$("#colorBox04").on('click', function(){
			$.removeCookie("n1Color");
			$.removeCookie("n2Color");
			$.removeCookie("dColor");
			alert("くりあ！");
	});
	
	if($.cookie("n1Color")){	
		defaultThumb01=$.cookie("n1Color");
		defaultThumb02=$.cookie("n2Color");
	}else{	
		//デフォルトの淡い2色
		defaultThumb01="rgb(58, 171, 210)";
		defaultThumb02="rgb(223, 86, 86)";
		$.cookie("n1Color",defaultThumb01, { expires: 7 });
		$.cookie("n2Color",defaultThumb02, { expires: 7 });
	}
	
	
	if($.cookie("n1Color")){			
		  $("#colorBox02").css("background",defaultThumb01);
	}

	if($.cookie("n2Color")){
		  $("#colorBox03").css("background",defaultThumb02);
	}
	
	setTimeout("svgColorChange()", 200);

	
	/*一括ダウンロードの初期カラー*/
	colorN=0;
	svgNumber=0;
	sizeN=256;

    //init
    $(document).ready(viewStorage);
	
	
    //イベント登録
    $("#save_btn").on("click", setlocalStorage);
    $("#display_btn").on("click", viewStorage);
    $("#clear_btn").on("click", removeallStorage);


    // localStorageへの初期値
    // localStorageへの格納
    function setlocalStorage() {
      var key = imgNum;
      var value = nowTime;

      // key,valueに値が入っているかチェック
      if (key && value) {
        ls.setItem(key, value);

      }
	  viewStorage();
    }

$(document).on("click", ".bgmainImg", function(){
		//クリックされたのは何番目か
		
		imgNum = $(".bgmainImg").data("icon");	
		nowTime = $.now();
		viewStorage();		
		setlocalStorage();
		
		downAll();
		
});


$(document).on("click", ".addData", function(){
		imgNum = $(".addData").data("icon");	
		nowTime = $.now();
		viewStorage();		
		setlocalStorage();
		
		
		//開閉の処理
		if($.cookie("open-panel")){
			//クッキーあれば
		}else{
			$("#fileDown").animate({"bottom" : "0px" }, 150);
			$.cookie("open-panel", { expires: 7,  path: "/" });	
			
		}			
		
		setTimeout("downAll()", 200);
		
});





$(document).on("click", "#selectColor li", function(){
	
	$("#selectColor li").removeClass();
	$(this).addClass("on");

	Nc=$("#selectColor li").index(this);
	
	
	//changeC=5;
	
	if(Nc==0){ selectColor="#1dace0"; changeC=3
	}else if(Nc==1){ selectColor="#f4a840"; changeC=4;
	}else if(Nc==2){ selectColor="#e1564b"; changeC=5;
	}else if(Nc==3){ selectColor="#8e5ba2"; changeC=7;
	}else if(Nc==4){ selectColor="#30b27f"; changeC=6;
	}else if(Nc==5){ selectColor="#a5896a"; changeC=8;
	}else if(Nc==6){ selectColor="#2eb8bd"; changeC=9;
	}else if(Nc==7){ selectColor="#cc1d65"; changeC=10;
	}else if(Nc==8){ selectColor="#ffffff"; changeC=2; bgflag=1;
	}else if(Nc==9){ selectColor="#364148"; changeC=0;
	}else if(Nc==10){ selectColor="#000000"; changeC=1;
	}
	
	
	
	
	
	if(bgflag==0){
		$("#topMaincolumn ul li").css("background","#ffffff");
		ini="vcolor";
		
	
	//白いカラーを選択したときの対応	
	}else{
		$("#topMaincolumn ul li").css({
			"background":"#666 url(img/i10_bg_img.png)",
			"background-size":"cover"
		})
		ini="white";
		bgflag=0;
	}
	
	iniC03=selectColor;
	
	
	$(".selectLi").css("background",selectColor);

	$.cookie("bColor",selectColor,{ expires: 7,  path: "/" });
	$.cookie("zColor",changeC,{ expires: 7,  path: "/" });

	$.cookie("iniColor",ini,{ expires: 7,  path: "/" });
	
	$("#topMaincolumn .default img").each(function(){
		$(this).attr("src",$(this).attr("src").replace(/([0-9]{5})([0-9]*)(_64)/g, "$1"+changeC+"$3"));
	});	
	
	viewStorage();
	setTimeout("svgColorChange()", 100);

});	



	
 

/*座標の取得*/
function getY(){
	/*id名head1を取得*/
	var ele = document.getElementById("mainImg");
	var bounds = ele.getBoundingClientRect();
	/*id名head1のx座標を取得*/
	xwidth = bounds.left;
	
	hantei=String(xwidth);
	//alert(hantei);
	
	if (hantei.indexOf(".") >= 0) {
		//alert("なおします");
		$("#Maincolumn #mainImg").css("margin-left","0.5px");
	}else{
		//alert("じゃない");
	}
}


// localStorageからすべて削除
function removeallStorage() {
      ls.clear();
      location.reload();
}


	$(document).on("click", "#addArea li", function(){
			$(this).hide();
			var index02 = $("#addArea li").index(this);
			var imgNum02 = $("#addArea li:nth-child("+(index02+1)+") img").data("icon");
			
			
		$('#addArea').html(
			$('#addArea li').sort(function(a, b) {
				return parseInt($(b).attr('id'), 10) - parseInt($(a).attr('id'), 10);
			})
		);
				
		  ls.removeItem(imgNum02);
		  location.reload();

	});

	
	
	
	$("ul#color3 li").on('click', function(){
  		var cnumber02 = $("ul#color3 li").index(this);
		$("ul#color3 li").removeClass();
		
		if(cnumber02==0){
			colorSelect=0;
			$("svg,.st0").css("fill","#4b4b4b");
		}else if(cnumber02==1){
			colorSelect=1;
			$("svg,.st0").css("fill","#000000");
		}else if(cnumber02==2){
			colorSelect=2;
			$("svg,.st0").css("fill","#ffffff");
		}
					
		$(this).addClass("on");
		
		changePass();
		
	});
	
	push();
	$("#graph02,svg").css({width:"512px",height:"512px"});
	
});


	function svgColorChange(){
	
		$("input#iconSingleColor").trigger("colorpickersliders.updateColor", iniC03);	
		$('input#iconSingleColor').focus();
		$('input#iconSingleColor').blur();

	}
	




    // localStorageからのデータの取得と表示
function viewStorage() {
      //いったん中身を空にする
		 $("#list span").empty();
		 $("#addArea").empty();
		 $("#shirabe").empty();
	 	
		seticonNumber=0;
		slength=ls.length-2;
		
		
		$("span#ren").html(slength);
		
      // localStorageすべての情報の取得
      for (var i=0; i < ls.length; i++) {
		  
		var _key = ls.key(i);
		var ten = _key + ls.getItem(_key);
		dai = ls.getItem(_key);
		
				
		idx=_key.indexOf("icon");
		if(idx != -1) {
			//alert("文字列 icon が見つかりました"); 
		

		$("#ren span").append(ten);
		$("#addArea").append('<li id="'+dai+'"><img src="/i/'+_key+'/'+_key+changeC+'.svg" data-icon="'+_key+'"></li>');

		$("#change").append('<g id='+_key+'>あ</g>');		
		$("#"+_key).load("img/"+_key+".txt");		
		
		$("#shirabe").append('i/'+_key+'/'+_key+changeC+'_'+sizeN+'.png,');
		
		seticonNumber++;		
		
		}
     }	
	 
	 	$("#shirabe02").html($("#shirabe").html());
		
		
	 
	 		 //ローカルストレージ内のicon登録の数だけだしてますよ
		 importantNumber=seticonNumber;
		 $("span#ren").html(importantNumber);
		 
		 downAll();
}




 $(function(){ 
 	
	sideHeight=250;
	
	//開く
	$(".openSide").click(function(){	
		$("#fileDown").animate({"bottom" : "0px" }, 150);		
		$.cookie("open-panel",{ expires: 7,  path: "/" });
		
	});

	//閉じる
	$(".closeSide").click(function(){	
		$("#fileDown").animate({"bottom" : "-300px" }, 150);	
		$(".openSide").show();		
		$.removeCookie("open-panel");
	});	
	
	
	

	
});


function svgShow(){
		ren=$("#change").html();		  
		$("#txt").html(ren);
		
		
}




/******************************************************************************************************************************************************************/

//*PNG側のダウンロード作業です。
function ddo(){
	

	snap_width=$("#graph02").width();
	
	ddi(); 
}

function ddi(){	
	//ボタンを押した時点での#svg内のhtmlと高さ、横幅を変数にいれといて、、
	snap_height=$("#cap_inner02").height();
	snap_width=$("#cap_inner02").width();
	svgText = $("#cap_inner02").html();

	//svgをcanvasにしますよ。
	
	canvg();
	 html2canvas($("#graph02"), {
        onrendered: function(canvas) {        
		document.getElementById("ss").href = canvas.toDataURL("image/png");	
 		document.getElementById("ss").click();
	again();   
 	}
 });
}


function svg(){

		svgTxt=$("#svgArea").html();	  
	  	//alert(svgTxt);	
		var stxt = svgTxt;
		var blob = new Blob([ stxt ], { type: "svg/plain" });
		//var url = window.webkitURL.createObjectURL(blob);
		var url = window.URL.createObjectURL(blob);
		document.getElementById("export").href = url;
		
				
		setTimeout("svgDown()", 100);
		
}

function svgDown(){
		document.getElementById("export").click();
}


//*JPG側のダウンロード作業です。
function jjo(){
	jji(); 
}

function jji(){
	

	//ボタンを押した時点での#svg内のhtmlと高さ、横幅を変数にいれといて、、
	snap_height=$("#cap_inner02").height();
	snap_width=$("#cap_inner02").width();
	svgText = $("#cap_inner02").html();
	
	$("#graph02").css("background","#fff");

	//svgをcanvasにしますよ。
	canvg();
	 html2canvas($("#graph02"), {
        onrendered: function(canvas) {        
          document.getElementById("jj").href = canvas.toDataURL("image/jpeg");	
 
	   		document.getElementById("jj").click();
			
	$("#graph02").css("background","none");
	again();
	
 	}
 });
}



//変数にいれといた要素を解凍します。高さ、横幅も再設定です。
function again(){	
	$("#cap_inner02").empty();
	
	$(function(){
	setTimeout(function(){
			$("#cap_inner02").remove();
	//$("#again").prepend("<div id='graph02'>Hello</div>");
	$("#again").after("<div id='cap_inner02'></div>");
	$("#cap_inner02").html(svgText);
	
	$("#cap_inner02").css({
		"height":snap_height,
		"width":snap_width
		})

	},1000);
	});	
	


}



/*一括ダウンロード系のスクリプト*/

$(function(){
	
	
	$("ul#size02 li").on('click', function(){
  		var cnumber = $("ul#size02 li").index(this);
		
		$("ul#size02 li").removeClass();
		$(this).addClass("on");
			
		if(cnumber==0){
			sizeN=16;	
		}else if(cnumber==1){
			sizeN=24;				
		}else if(cnumber==2){
			sizeN=32;				
		}else if(cnumber==3){
			sizeN=48;				
		}else if(cnumber==4){
			sizeN=64;				
		}else if(cnumber==5){
			sizeN=128;			
		}else if(cnumber==6){
			sizeN=256;			
		}else if(cnumber==7){
			sizeN=512;				
		}
		viewStorage();
		downAll();
	});
	
	
	
	$("ul#colorBox li").on('click', function(){
  		var cnumber02 = $("ul#colorBox li").index(this);
		$("ul#colorBox li").removeClass();
		
		if(cnumber02==0){
			colorN=0;
			svgNumber=0;
		}else if(cnumber02==1){
			colorN=1;
			svgNumber=1;
		}else if(cnumber02==2){
			colorN=2;
			svgNumber=2;
		}
					
		$(this).addClass("on");
		
		viewStorage();
		downAll();
		
	
	});
	

	// ダウンロードの拡張子の選択 文字列の変更
	$("ul#downBtn02 li").on('click', function(){
  		cnumber = $("ul#downBtn02 li").index(this);
		$("ul#downBtn02 li").removeClass();	
		
		txt = $("#shirabe").html();
		
		if(cnumber==0){
			//PNGに拡張子 変更			
				$("#shirabe02").text(txt.replace(/(\.gif|\.jpg|\.png|\.svg|\.ai|\.eps)/g,'.png'));			
		}else if(cnumber==1){
			//JPGに拡張子 変更
				$("#shirabe02").text(txt.replace(/(\.gif|\.jpg|\.png|\.svg|\.ai|\.eps)/g,'.jpg'));	
				
		}else if(cnumber==2){
			//JPGに拡張子 変更
				$("#shirabe02").text(txt.replace(/_([0-9]*)\.([a-z]{3})/g,".svg"));	
				
				//$(this).attr("src",$(this).attr("src").replace(/([0-9]{5})([0-9]*)(_64)/g, "$12$3"));				
				
		}else{
			//SVGに拡張子 変更
				$("#shirabe02").text(txt.replace(/(.)_([0-9]*)\.([a-z]{3})/g,".eps"));
			//サイズの部分を削除する
				//$("#shirabe").text(txt.replace(/_256/g,''));
			
		}
		
	
		$(this).addClass("on");
		downAll();
	});	
	

	setTimeout("downAll()", 50);
});	



function changePass(){
	
	srcTxt="/i/"+imgID+"/"+imgID+colorSelect+"_"+sizeNumber;
	
	$("#downBtnIE li:nth-child(1) a").attr('href',srcTxt+".png");
	$("#downBtnIE li:nth-child(2) a").attr('href',srcTxt+".jpg");
	
	
	$("#downBtnIE li:nth-child(1) a").attr('download',srcTxt+".png");
	$("#downBtnIE li:nth-child(2) a").attr('download',srcTxt+".jpg");
	
	src02 = srcTxt.replace(/(\_16|\_32|\_48|\_64|\_128|\_256|\_512)/g,'');
	
	$("#downBtnIE li:nth-child(3) a").attr('href',src02+".svg");
	$("#downBtnIE li:nth-child(3) a").attr('download',src02+".svg");	
	
}
	


function downAll(){
	shirabetxt= $("#shirabe02").html();
	shirabetxt = shirabetxt.slice(0, -1); 
	var hoshiino=shirabetxt;
	$("#togetherVal").val(hoshiino);

}


// ■■Download　ポップアップ
var sec=5; //初期値を5秒にする。
var fileType="";
var newscroll=0;

//ポップアップ表示の設定
$(function(){

	$("#downImg02 li:nth-child(1)").click(function(){
	
	fileType="ai";
		
		$("#glayLayer").fadeIn('fast');
		scrollTop=$(window).scrollTop();//スクロールの高さ取得
		$("#overLayer").fadeIn('fast').css("top",scrollTop+"px");
		
		$("#dlBtnboxBtn a").text("illustrator Ai");
		cdTimer();
	});
	


	$("#downImg02 li:nth-child(2)").click(function(){
		
		fileType="eps";	
		
		$("#glayLayer").fadeIn('fast');
		scrollTop=$(window).scrollTop();//スクロールの高さ取得
		$("#overLayer").fadeIn('fast').css("top",scrollTop+"px");

		$("#dlBtnboxBtn a").text("photoshop EPS");
		cdTimer();
	});

	
		//popup を閉じる
	$("#glayLayer,#btnClose").click(function(){
		$("#glayLayer,#overLayer").fadeOut('fast');

	});	
	
	
	function cdTimer(){
		dltimer = setInterval(function(){
	     // 実行される処理
		 	if(sec>0){
				sec=sec-1;
				$("div#dlBtnbox p span").html(sec);
			}else{
				clearInterval(dltimer);
				$("#dlBtnbox p").hide();
				$("#dlBtnboxBtn").show();
				$("#dlBtnboxBtn a").attr('href','/i/'+imgID+'/'+imgID+fileType+'.zip')
			}
		}, 1000);
	}


	
});



function taiou(){
		$("#downBtnIE,#color3").css("display","block");
		$("#downBtn,#mainColor").css("display","none");
		$("btnWeb").css("display","none");
}





$(function(){
	
	setTimeout("push()", 600);
	
});



function push(){
  $("ul#size li:nth-child(6)").click();	
  
  //document.getElementById("s256").click();
  $("svg").css({opacity:"1"});
  
  
  
}



		
		



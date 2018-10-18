// 引入头部和尾部
$(".footer_detail").load("../html/footer.html");
$(".header_detail").load("../html/header.html");

//详情页图片轮播

function Swiper() {
	this.box = $(".J_img");
	this.oLiImg = $("#J_sliderView>img");
	this.selectBot = $(".ul-pager>.ul_item>a");
	this.page = $(".page_cut>a");
	this.next = 0;
	this.iNow = 0;
	this.timer = null;
	this.init();
}

$.extend(Swiper.prototype, {
	init: function() {
		this.autoPlay();
		this.dotEach();
		this.mouseover();
		this.mouseout();
		this.pageLclick();
		this.pageRclick();
	},
	autoPlay: function() {
		this.timer = setInterval(function() {
			if(this.next == this.oLiImg.length - 1) {
				this.next = 0;
			} else {
				this.next++;
			}
			this.cutImg();
		}.bind(this), 3000)

	},
	cutImg: function() {
		this.oLiImg.eq(this.iNow).stop(true).fadeTo(500, 0);
		this.oLiImg.eq(this.next).stop(true).fadeTo(500, 1);
		this.selectBot.eq(this.next).addClass("active").parent().siblings().children().eq(0).end().removeClass("active");
		this.iNow = this.next;
	},
	dotEach: function() {
		this.selectBot.each($.proxy(this.dotClick, this));
	},
	dotClick: function(i) {

		this.selectBot.eq(i).on("click", i, $.proxy(this.dotShow, this));
	},
	dotShow: function(event) {
		var index = event.data;

		this.selectBot.eq(index).addClass("active").parent().siblings().children().eq(0).end().removeClass("active");
		this.oLiImg.eq(index).fadeTo(500, 1).siblings().fadeTo(500, 0);
		this.iNow = index;
		this.next = this.iNow;
	},
	mouseover: function() {
		this.box.on("mouseover", $.proxy(this.overStop, this));
	},
	overStop: function() {
		clearInterval(this.timer)
	},
	mouseout: function() {
		this.box.on("mouseout", $.proxy(this.overStart, this));
	},
	overStart: function() {
		this.autoPlay();
	},
	pageLclick: function() {
		this.page.eq(0).on("click", $.proxy(this.imgShow, this));
	},
	imgShow: function() {
		if(this.next == 0) {
			this.next = this.oLiImg.length - 1;
		} else {
			this.next--;
		}
		this.cutImg();
	},
	pageRclick: function() {
		this.page.eq(1).on("click", $.proxy(this.imgPlay, this));
	},
	imgPlay: function() {
		if(this.next == this.oLiImg.length - 1) {
			this.next = 0;
		} else {
			this.next++;
		}
		this.cutImg();
	}
})

//详情页保障服务

function DetailFunction() {
	this.qualitify = $(".qualitify>li");
	this.icon = $(".icon_t>em");
	this.severice = $(".severice_t");
	this.jHeader = $(".j_header");
	this.bstop = true;
	this.init();
}

$.extend(DetailFunction.prototype, {
	init: function() {
		this.quaClick();
		this.navTop();
	},
	quaClick: function(i) {
		this.qualitify.eq(0).click(function() {
			this.qualitify.eq(0).css("borderColor", "#ff6700");
			this.qualitify.eq(1).css("borderColor", "#e0e0e0");
			this.qualitify.eq(1).css("borderTopColor", "#ff6700");

			this.severice.eq(0).css("color", "#ff6700");
			this.severice.eq(1).css("color", "#333");
			this.icon.eq(0).css({
				"background": "#ff6700",
				"borderColor": "#ff6700",
				"fontWeight": "700"
			});
			this.icon.eq(1).css({
				"background": "#ff6700",
				"borderColor": "#ff6700",
				"fontWeight": "700"
			})
			this.icon.eq(2).css({
				"background": "#fff",
				"borderColor": "#b0b0b0"
			})
			this.icon.eq(3).css({
				"background": "#fff",
				"borderColor": "#b0b0b0"
			})
		}.bind(this))

		this.qualitify.eq(1).click(function() {

			this.qualitify.eq(1).css("borderColor", "#ff6700");
			this.qualitify.eq(0).css("borderColor", "#e0e0e0");
			this.severice.eq(1).css("color", "#ff6700");
			this.severice.eq(0).css("color", "#333");
			this.icon.eq(2).css({
				"background": "#ff6700",
				"borderColor": "#ff6700",
				"fontWeight": "700"
			});
			this.icon.eq(3).css({
				"background": "#ff6700",
				"borderColor": "#ff6700",
				"fontWeight": "700"
			})
			this.icon.eq(0).css({
				"background": "#fff",
				"borderColor": "#b0b0b0"
			})
			this.icon.eq(1).css({
				"background": "#fff",
				"borderColor": "#b0b0b0"
			})
		}.bind(this))
	},
	navTop: function() {
		$(document).scroll(function() {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 100) {

				this.jHeader.css({
					"position": "fixed",
					"zIndex": 10000
				});

			} else {
				this.jHeader.css({
					"position": "relative",
					"zIndex": 0
				});
			}
			this.jHeader.stop(true).css("top", -65).animate({
				top: 0
			}, "slow");
		}.bind(this))

	}
})

//插入详情页数据

function InsertDetailData() {
	this.maxBoxCon = $(".max_box_con");
	this.init();
}

$.extend(InsertDetailData.prototype, {
	init: function() {
		this.cutUrl();
	},
	cutUrl: function() {
		var sid = location.href.split("?")[1];
		var str = "";
		var _this = this;
		$.ajax({
			method: "post",
			url: "../json/detail.json",
			success: function(res) {
				for(var i = 0; i < res.length; i++) {
					if(sid == res[i].id) {
						str += ` <div class="j_header">
                        <div class="xm-product-box">
                            
                            </div>
                        </div>
                    </div>
            
                    <div class="xm-buyBox">
                        <div class="x_box">
                            <div class="nav_container nav_1">
                                <div class="left_swiper">
                                    <div class="J_img">
                                        <div class="ui-wrapper">
                                            <div class="ul-viewport">
                                                <div id="J_sliderView">
                                                    <img src="../images/${res[i].img1}" alt="" class="slider done">
                                                    <img src="../images/${res[i].img2}" alt=""  class="slider">
                                                    <img src="../images/${res[i].img3}" alt="" class="slider">
                                                    <img src="../images/${res[i].img4}" alt="" class="slider">
                                                </div>
                                                <div class="ul-pager">
                                                    <div class="ul_item">
                                                        <a href="##" class="active">1</a>
                                                    </div>
                                                    <div class="ul_item">
                                                        <a href="##">2</a>
                                                    </div>
                                                    <div class="ul_item">
                                                        <a href="##">3</a>
                                                    </div>
                                                    <div class="ul_item">
                                                        <a href="##">4</a>
                                                    </div>
                                                </div>
                                                <div class="page_cut">
                                                    <a href="##" class="ui_prev left_prev">上一张</a>
                                                    <a href="##" class="ui_prev right_prev">下一张</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="right_con">
                                    <h1 class="title">${res[i].product}</h1>
                                    <p class="product_detail">${res[i].title}</p>
                                    <span class="pro_price">${res[i].price}<del>${res[i].del}</del></span>
                                    <div class="main_pro">
                                        <div class="wrap_address">
                                            <div class="wrap">
                                              
                                                <div>
                                                    <div class="address_info">
                                                        <span class="item">北京</span>
                                                        <span class="item">北京市</span>
                                                        <span class="item">东城区</span>
                                                        <span class="item">永定门外街道</span>
                                                    </div>
                                                    <span class="choose_region">修改</span>
                                                </div>
                                                <div class="product_status">${res[i].status}</div>
                                            </div>
                                        </div>
            
                                        <div class="list_wrap">
                                            <div class="color_select">
                                                <div class="step_title">${res[i].detail1}</div>
                                                <ul>
                                                    <li class="btn_color on"><a href="##"><span class="name">${res[i].desc1}</span><span class="price">${res[i].pri1}</span></a></li>
                                                    <li class="btn_color"><a href="##"><span class="name">${res[i].desc2}</span><span class="price">${res[i].pri2}</span></a></li>
                                                    <li class="btn_color"><a href="##"><span class="name">${res[i].desc3}</span><span class="price">${res[i].pri3}</span></a></li>
                                                    <li class="btn_color"><a href="##"><span class="name">${res[i].desc4}</span><span class="price">${res[i].pri4}</span></a></li>
                                                </ul>
                                            </div>
                                            <div class="choose_memory">
                                                <div class="step_title">${res[i].detail2}</div>
                                                <ul>
                                                    <li class="btn_color on"><a href="##"><img src="../images/${res[i].images}">${res[i].con}</a></li>
                                                </ul>
                                            </div>
                                            
                                            <div class="pro_list">
                                                <ul>
                                                    <li>${res[i].footer}<del>${res[i].del}</del><span>${res[i].price}</span></li>
                                                    <li class="totalprice"> 总计：${res[i].total}</li>
                                                </ul>
                                            </div>
                                            <ul class="buyBtn">
                                                <li><a href="shop.html?${res[i].id}" id="btn_B" class="btn">加入购物车</a></li>
                                            
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
					}
				}
				_this.maxBoxCon.html(str);
				this.btnColor = $(".btn_color");
				for(var i = 0; i < this.btnColor.length; i++) {
					if(this.btnColor.eq(i).text() == "") {
						this.btnColor.eq(i).css("display", "none");
					}
				}
				new Swiper();
				new DetailFunction();
				new AddshoppingCar();
			}
		})
	}
})
new InsertDetailData();

//存贮数据

function AddshoppingCar() {
	this.btn_B = $("#btn_B");
	this.id = location.href.split("?")[1];
	this.uname = $.cookie("uname");

	this.init();
}

$.extend(AddshoppingCar.prototype, {
	init: function() {
		this.btnClick();
	},
	btnClick: function() {
		this.btn_B.click(function() {

			if(this.uname != "") {

				var arr = [{
					"bid": this.id,
					"count": 1
				}];
				var json = JSON.stringify(arr);

				if(!localStorage.getItem(this.uname + "Goods")) {

					localStorage.setItem(this.uname + "Goods", json);

				} else {

					var goods = localStorage.getItem(this.uname + "Goods");

					var toJson = JSON.parse(goods);

					var flag = 0;

					for(var i = 0; i < toJson.length; i++) {
						if(toJson[i].bid == this.id) {
							toJson[i].count++;
							flag = 1;
						}
					}
					if(flag == 0) {
						var obj = {
							"bid": this.id,
							"count": 1
						}
						toJson.push(obj);
					}
					localStorage.setItem(this.uname + "Goods", JSON.stringify(toJson));
				}
			} else {
				alert("您还没有登录，请登录后再继续选购吧!!!");
			}
		}.bind(this))
	}
})
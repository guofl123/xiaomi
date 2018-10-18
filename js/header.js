//导入nav

function NavInsertData() {
	this.nav = $(".nav");
	this.box_s = $("#sus_box");
	this.boxUlLi = $("#box_ul_li");
	// this.oLi = $(".nav_m>ul>.hoverShow");
	this.suspension = $(".suspension");
	this.init();
}

$.extend(NavInsertData.prototype, {
	init: function() {
		this.navMouseover();
		this.navMouseout();
	},
	navMouseover: function() {
		var _this = this;
		this.nav.mouseover(function(event) {
			var target = event.target;

			if(target.className == "hoverShowson" || target.className == "suspension" || target.className == "hoverShow") {
				// _this.nav.mouseenter(function(event){
				_this.index = target.getAttribute("data-index");
				_this.suspension.stop(true).animate({
					height: 229
				});
				_this.suspension.css("border-top", "1px solid #e0e0e0");
				_this.box_s.css("display", "block");
				_this.getNavJSON();
				// })
			} else if(target.className == "s") {
				_this.suspension.stop(true).animate({
					height: 0
				});
				_this.box_s.css("display", "none");
				_this.suspension.css("border-top", "none");
			}
		})
	},
	navMouseout: function() {
		var _this = this;
		this.nav.mouseleave(function() {
			_this.suspension.stop(true).animate({
				height: 0
			});
			_this.box_s.css("display", "none");
			_this.suspension.css("border-top", "none");
		})
	},
	getNavJSON: function() {
		$.getJSON("../json/nav.json?new Date().getTime()", $.proxy(this.insertData, this));
	},

	insertData: function(data) {
		var str = "";
		str += `<li class="first">
            <div class="nav_sus">
                <a href="##"><img src="../images/${data[this.index-1].images1}" alt=""></a>
            </div>
            <div class="title_sus"><a href="##">${data[this.index-1].title1}</a></div>
            <p class="price_sus">${data[this.index-1].price1}</p>
            <div class="flag">
                <div class="flag_c">${data[this.index-1].flag1}</div>
            </div>
        </li>
        <li>
            <div class="nav_sus">
                <a href="##"><img src="../images/${data[this.index-1].images2}" alt=""></a>
            </div>
            <div class="title_sus"><a href="##">${data[this.index-1].title2}</a></div>
            <p class="price_sus">${data[this.index-1].price2}</p>
            <div class="flag">
                <div class="flag_c">${data[this.index-1].flag2}</div>
            </div>
        </li>
        <li>
            <div class="nav_sus">
                <a href="##"><img src="../images/${data[this.index-1].images3}" alt=""></a>
            </div>
            <div class="title_sus"><a href="##">${data[this.index-1].title3}</a></div>
            <p class="price_sus">${data[this.index-1].price3}</p>
            <div class="flag">
                <div class="flag_c">${data[this.index-1].flag3}</div>
            </div>
        </li>
        <li>
            <div class="nav_sus">
                <a href="##"><img src="../images/${data[this.index-1].images4}" alt=""></a>
            </div>
            <div class="title_sus"><a href="##">${data[this.index-1].title4}</a></div>
            <p class="price_sus">${data[this.index-1].price4}</p>
            <div class="flag">
                <div class="flag_c">${data[this.index-1].flag4}</div>
            </div>
        </li>
        <li>
            <div class="nav_sus">
                <a href="##"><img src="../images/${data[this.index-1].images5}" alt=""></a>
            </div>
            <div class="title_sus"><a href="##">${data[this.index-1].title5}</a></div>
            <p class="price_sus">${data[this.index-1].price5}</p>
            <div class="flag">
                <div class="flag_c">${data[this.index-1].flag5}</div>
            </div>
        </li>
        <li>
            <div class="nav_sus">
                <a href="##"><img src="../images/${data[this.index-1].images6}" alt=""></a>
            </div>
            <div class="title_sus"><a href="##">${data[this.index-1].title6}</a></div>
            <p class="price_sus">${data[this.index-1].price6}</p>
            <div class="flag">
                <div class="flag_c">${data[this.index-1].flag6}</div>
            </div>
        </li>`

		this.box_s.html(str);
		this.flag_c = $(".flag_c");
		this.oLi1 = $("#sus_box>li");

		for(var j = 0; j < this.flag_c.length; j++) {
			if(this.flag_c.eq(j).text() == "") {

				this.flag_c.eq(j).css("border", "none");
			}
			if(this.oLi1.eq(j).find(".title_sus").text() == "") {
				this.oLi1.eq(j).addClass("first");
			}
		}
	}
})

//用户名登录显示

function UserLogin() {
	this.header_rl = $(".header_rl");
	this.login_after = $(".login_after");
	this.account_span = $("#account_span");
	this.reset_login = $("#reset_login");
	this.init();
}

$.extend(UserLogin.prototype, {
	init: function() {
		this.getCookie();
		this.outLogin();
	},
	getCookie: function() {
		var cookie = $.cookie("uname");

		if(cookie) {
			this.header_rl.css("display", "none");
			this.login_after.css("display", "block");
			this.account_span.html(cookie);
		} else {
			this.header_rl.css("display", "block");
			this.login_after.css("display", "none");
		}
	},
	outLogin: function() {
		this.reset_login.click(function() {
			$.cookie("uname", "", {
				expires: -1,
				path: '/'
			});
			this.header_rl.css("display", "block");
			this.login_after.css("display", "none");
		}.bind(this))
	}
})
new UserLogin();

function SearchProduct() {
	this.text = $("#text");
	this.btn = $("#btn");
	this.hide = $(".hide");
	this.form_search = $(".form_search>a");
	this.init();
}

$.extend(SearchProduct.prototype, {
	init: function() {
		this.textFocus();
	},
	textFocus: function() {
		this.text.focus(function() {
			this.hide.css("display", "block");
			this.form_search.css("display", "none");
			this.text.css("borderColor", "#ff6700");
			this.btn.css("borderColor", "#ff6700");
		}.bind(this)).blur(function() {
			this.hide.css("display", "none");
			this.form_search.css("display", "inline-block");
			this.text.css("borderColor", "#e0e0e0");
			this.btn.css("borderColor", "#e0e0e0");
		}.bind(this))
	}
})

new SearchProduct();

function ShopCarSmall() {
	this.num_shop = $("#num_shop");
	this.uname = $.cookie("uname");
	this.carHover = $(".carHover");
	this.cartMenu = $(".cart-menu");
	this.shopCar = $(".shopCar");
	this.init();
}

$.extend(ShopCarSmall.prototype, {
	init: function() {
		this.numTotal();
	},
	numTotal: function() {
		var num = localStorage.getItem(this.uname + "Goods");
		this.arr = JSON.parse(num);
		var sum = 0;
		if(this.arr) {
			for(var i = 0; i < this.arr.length; i++) {
				sum += this.arr[i].count;
			}
		}
		this.num_shop.html(sum);
		if(this.num_shop.html() != 0) {
			this.carHover.css({
				"color": "#fff",
				"background": "#ff6700"
			})
			this.num_shop.css("color", "#fff");
		}
		$.getJSON("../json/shop.json", $.proxy(this.insertShop, this));
	},
	insertShop: function(data) {
		var str = "";
		if(this.arr) {
			for(var i = 0; i < data.length; i++) {
				for(var j = 0; j < this.arr.length; j++) {
					if(data[i].id == this.arr[j].bid) {
						str += `<ul class="cart-list">
                            <li>
                                <div class="cart-item">
                                    <a href="##" class="thumb"><img src="../images/${data[i].img}" alt=""></a>
                                    <a href="##" class="name">${data[i].title}</a>
                                    <span class="price">${data[i].price} × ${this.arr[j].count}</span>
                                    <a href="##?${this.arr[j].bid}" class="btn-del">x</a>
                                </div>
                            </li>
                        </ul>`
					}
				}
			}
		}
		this.cartMenu.html(str);
		this.car1Hover();
		this.cartList = $(".cart-list");
		this.cartLing();
	},
	car1Hover: function() {
		this.shopCar.mouseover(function() {
			this.cartMenu.css("display", "block");
			this.carHover.css({
				"background": "#fff",
				"color": "#ff6700"
			})
			this.num_shop.css("color", "#ff6700");
		}.bind(this)).mouseout(function() {
			this.cartMenu.css("display", "none");
			this.carHover.css({
				"background": "#ff6700",
				"color": "#fff"
			})
			this.num_shop.css("color", "#fff");
		}.bind(this))
	},
	cartLing: function() {
		this.cartList.on("click", "li", function() {
			location.href = "../html/shop.html";
		})
	}
})

new ShopCarSmall();
$(".footer_shop").load("../html/footer.html");

//插入购物车
function InsertCarData() {
	this.list_body = $(".list_body");
	this.sid = location.href.split("?")[1];
	this.uname = $.cookie("uname");
	this.init();
}

$.extend(InsertCarData.prototype, {
	init: function() {
		this.requestData();
	},
	requestData: function() {
		$.getJSON("../json/shop.json?new Data().getTime()", $.proxy(this.InsertData, this));
	},
	InsertData: function(data) {
		var num = localStorage.getItem(this.uname + "Goods");
		this.arr = JSON.parse(num);
		var html = "";
		if(this.arr) {
			for(var i = 0; i < data.length; i++) {
				for(var j = 0; j < this.arr.length; j++) {
					if(data[i].id == this.arr[j].bid) {
						html += `<div class="item_box" data-index = "${this.arr[j].bid}">
                        <div class="item_table">
                            <div class="item_row">
                                <div class="til list_check"><i class="iconfont select_single">√</i></div>
                                <div class="til list_space"><a href="##"><img src="../images/${data[i].img}" alt=""></div>
                                <div class="til list_name"><h3 class="name">${data[i].title}</h3></a></div>
                                <div class="til list_price sigle_p">${data[i].price}</div>
                                <div class="til list_num list_num_1">
                                    <div class="change-goods-num">
                                        <a href="##" class="J_minus">-</a>
                                        <input type="text" name="" class="goods-num" value="${this.arr[j].count}" autocomplete="off">
                                        <a href="##" class="J_plus">+</a>
                                    </div>
                                </div>
                                <div class="til list_total"><p class="pre-info">${Number(data[i].price.substring(0,data[i].price.length-1))*this.arr[j].count+"元"}</p></div>
                                <div class="til list_operation"><a href="##" class="del_goods">x</a></div>
                            </div>
                        </div>
                    </div>`
					}
				}
			}
		} else {
			alert("购物车没有宝贝了，快去选购吧");
		}
		this.list_body.html(html);
		new ShopBuy();
	}
})

new InsertCarData();

//购物车页面登录功能

function ShopSmallFunction() {
	this.user_name = $(".user");
	this.user = $(".user_name");
	this.account = $(".user_name>.name");
	this.userMenu = $(".user-menu");
	this.login_1 = $(".login_1");
	this.topbarInfo = $(".topbar-info");
	this.quit = $("#quit");
	this.init();
}

$.extend(ShopSmallFunction.prototype, {
	init: function() {
		this.nameHover();
		this.userShow();
		this.quitLogin();
	},
	nameHover: function() {
		this.user_name.mouseover(function() {
			this.userMenu.css("display", "block");
			this.user.css("color", "#ff6700");
		}.bind(this)).mouseout(function() {
			this.userMenu.css("display", "none");
			this.user.css("color", "#757575");
		}.bind(this))
	},
	userShow: function() {
		var cookie = $.cookie("uname");
		if(cookie) {
			this.account.html(cookie);
			this.topbarInfo.css("display", "block");
			this.login_1.css("display", "none");
		} else {
			this.topbarInfo.css("display", "none");
			this.login_1.css("display", "block");
		}
	},
	quitLogin: function() {
		this.quit.click(function() {
			$.cookie("uname", "", {
				expires: 7,
				path: '/'
			});
			// this.topbarInfo.css("display","none");
			this.login_1.css("display", "block");
			// location.href = "../html/shop.html";
		})
	}
})

new ShopSmallFunction();

function ShopBuy() {
	this.selectAll = $(".select_all");
	this.selectSingle = $(".select_single");

	this.goodsNum = $(".goods-num");
	this.preInfo = $(".pre-info");
	this.J_minus = $(".J_minus");
	this.J_plus = $(".J_plus");
	this.Singleprice = $(".sigle_p");
	this.cart_num = $(".cart_num");
	this.item_box = $(".item_box");
	this.selected = $(".selected_num");
	this.uname = $.cookie("uname");
	this.totalPrice = $(".totalPrice");
	this.delGoods = $(".del_goods");
	this.bstop = true;
	this.stop = [];
	this.sum = 0;
	this.init();
}

$.extend(ShopBuy.prototype, {
	init: function() {

		this.allClick();
		this.goodEach();
		this.countTotal();
		this.singleClick();
		this.removeEach();
		this.inputNum();
		// this.delEach();
		// this.priceTol();

	},
	allClick: function() {
		this.selectAll.click(function() {

			this.selectSingle = $(".select_single");

			if(this.bstop) {
				this.bstop = false;
				this.selectAll.css({
					"background": "#ff6700",
					"borderColor": "#ff6700"
				})

				for(var i = 0; i < this.selectSingle.length; i++) {

					this.stop[i] = 1;

				}

				this.selectSingle.css({
					"background": "#ff6700",
					"borderColor": "#ff6700"
				})
				this.selectedNum();
				this.totalPriceNum();

			} else {
				this.bstop = true;
				this.selectAll.css({
					"background": "#fff",
					"borderColor": "#e0e0e0"
				})

				this.selectSingle.css({
					"background": "#fff",
					"borderColor": "#e0e0e0"
				})
				for(var i = 0; i < this.selectSingle.length; i++) {
					this.stop[i] = 0;
				}
				this.selectedNum();
				this.totalPriceNum();

			}
		}.bind(this))
	},
	singleClick: function() {

		var _this = this;
		for(var i = 0; i < this.selectSingle.length; i++) {

			this.selectSingle.eq(i).click(function() {

				if($(this).css("backgroundColor") == "rgb(255, 103, 0)") {
					$(this).css({

						"background": "#fff",
						"borderColor": "#e0e0e0"
					})

					_this.index = $(this).parent().parent().parent().parent().index();

					//console.log( $(this).parent().parent().parent().parent().index())
					_this.stop[_this.index] = 0;
					//console.log(_this.stop)
					_this.singleChecked();
					_this.selectedNum();
					_this.totalPriceNum();

				} else {

					$(this).css({
						"background": "#ff6700",
						"borderColor": "#ff6700"
					})
					_this.index = $(this).parent().parent().parent().parent().index();

					_this.stop[_this.index] = 1;
					//console.log(_this.stop)
					_this.singleChecked();
					_this.selectedNum();
					_this.totalPriceNum();
				}
			})

		}
	},

	singleChecked: function() {
		var s = true;
		for(var i = 0; i < this.stop.length; i++) {
			if(this.stop[i] == 0) {
				s = false;
			}
		}
		if(!s) {
			this.selectAll.css({
				"background": "#fff",
				"borderColor": "#e0e0e0"
			})
			this.bstop = true;
		} else {
			this.selectAll.css({
				"background": "#ff6700",
				"borderColor": "#ff6700"
			})
			this.bstop = false;
		}
	},

	goodEach: function() {
		this.J_minus.each($.proxy(this.numClick, this));
	},
	numClick: function(i) {

		var _this = this;

		this.J_minus.eq(i).click(function() {

			var arr = JSON.parse(localStorage.getItem(_this.uname + "Goods"));

			var inputVal = $(this).next().val();

			inputVal--;

			var str = $(this).parent().parent().prev().html();

			var singlePrice = Number(str.substring(0, str.length - 1));

			var index = $(this).parent().parent().parent().parent().parent().attr("data-index");

			// var totalStr = $(this).parent().parent().next().find(".pre-info").html();

			// var totalMoney = Number(totalStr.substring(0,totalStr.length-1));

			//    console.log(totalMoney);
			for(var i = 0; i < arr.length; i++) {

				if(arr[i].bid == index) {

					if(inputVal <= 1) {

						arr[i].count = 1;

					} else {

						arr[i].count = inputVal;

					}
					$(this).next().val(arr[i].count);

					$(this).parent().parent().next().find(".pre-info").html(singlePrice * arr[i].count + "元");

					localStorage.setItem(_this.uname + "Goods", JSON.stringify(arr));

					_this.countTotal();

					_this.selectedNum(_this.stop);

					_this.totalPriceNum(_this.stop);
				}
			}
		})

		//购物车增减功能
		this.J_plus.eq(i).click(function() {

			var arr = JSON.parse(localStorage.getItem(_this.uname + "Goods"));

			var inputVal = $(this).prev().val();

			++inputVal;

			var str = $(this).parent().parent().prev().html();

			var singlePrice = Number(str.substring(0, str.length - 1));

			var index = $(this).parent().parent().parent().parent().parent().attr("data-index");

			var totalStr = $(this).parent().parent().next().find(".pre-info").html();

			var totalMoney = Number(totalStr.substring(0, totalStr.length - 1));

			//    console.log(totalMoney);
			for(var i = 0; i < arr.length; i++) {

				if(arr[i].bid == index) {

					if(inputVal > 10) {

						arr[i].count = 10;

						alert("不好意思，鉴于你花钱太多，我们不卖了");

					} else {

						arr[i].count = inputVal;

					}

					$(this).prev().val(arr[i].count);

					$(this).parent().parent().next().find(".pre-info").html(singlePrice * arr[i].count + "元");

					localStorage.setItem(_this.uname + "Goods", JSON.stringify(arr));

					_this.countTotal();

					_this.selectedNum();

					_this.totalPriceNum();

				}
			}

		})

	},

	//购物车数量统计
	countTotal: function() {

		var arr = JSON.parse(localStorage.getItem(this.uname + "Goods"));

		var sum = 0;

		for(var i = 0; i < arr.length; i++) {

			sum += arr[i].count;

		}

		this.cart_num.html("&nbsp;" + sum + "&nbsp;")
	},

	//选择确定购物的数量
	selectedNum: function() {
		var sum = 0;

		for(var i = 0; i < this.stop.length; i++) {

			if(this.stop[i] == 1) {

				sum += Number(this.goodsNum.eq(i).val());
			}
		}
		this.selected.html("&nbsp;" + sum + "&nbsp;");
	},
	totalPriceNum: function() {
		var totalMoneyCount = 0;

		for(var i = 0; i < this.stop.length; i++) {

			if(this.stop[i] == 1) {

				var str = this.preInfo.eq(i).html();

				money = Number(str.substring(0, str.length - 1));

				totalMoneyCount += money;
			}
		}
		this.totalPrice.html(totalMoneyCount);
	},

	//购物车删除功能
	removeEach: function() {

		this.delGoods.each($.proxy(this.removeList, this));
	},
	removeList: function(i) {

		var _this = this;

		this.delGoods.eq(i).click(function() {

			var index = $(this).parent().parent().parent().parent().attr("data-index");

			var newIndex = $(this).parent().parent().parent().parent().index();

			delete(_this.stop[newIndex]);

			for(var i = 0; i < _this.stop.length; i++) {

				if(_this.stop[i] == "" || typeof(_this.stop[i]) == "undefined") {

					_this.stop.splice(i, 1);

					i = i - 1;
				}
			}

			var arr = JSON.parse(localStorage.getItem(_this.uname + "Goods"));

			for(var i = 0; i < arr.length; i++) {

				if(index == arr[i].bid) {

					arr.splice(i, 1);

					// console.log(_this.stop)

					$(this).parent().parent().parent().parent().remove();

					localStorage.setItem(_this.uname + "Goods", JSON.stringify(arr));

					_this.countTotal();

					_this.selectedNum();

					_this.totalPriceNum();

				}
			}

		})
	},
	//购物输入值进行价格增加
	inputNum: function() {

		for(var i = 0; i < this.goodsNum.length; i++) {

			var _this = this;

			var arr = JSON.parse(localStorage.getItem(this.uname + "Goods"));

			this.goodsNum.eq(i).blur(function() {

				var str = $(this).parent().parent().prev().html();

				var singlePrice = Number(str.substring(0, str.length - 1));

				var val = Number($(this).val());

				var index = $(this).parent().parent().parent().parent().parent().attr("data-index");

				for(var j = 0; j < arr.length; j++) {

					if(index == arr[j].bid) {

						if(val < 1 && val != NaN) {

							val = 1;

						} else if(val > 10 && val != NaN) {

							val = 10;

						} else {
							val = 1;
						}

						arr[j].count = Number(val);

						$(this).val(arr[j].count);

						$(this).parent().parent().next().find(".pre-info").html(singlePrice * arr[j].count + "元");

						localStorage.setItem(_this.uname + "Goods", JSON.stringify(arr));
					}
				}
				_this.countTotal();

				_this.selectedNum();

				_this.totalPriceNum();
			})
		}
	}
})
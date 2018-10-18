$(".header").load("../html/header.html");

//淡入淡出轮播图

function Swiper() {
	this.box = $("#box");
	this.oLiImg = $("#imgBox>li");
	this.selectBot = $("#selectBot>div");
	this.page = $("#page>a");
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
		this.selectBot.eq(this.next).addClass("active").siblings().removeClass("active");
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

		this.selectBot.eq(index).addClass("active").siblings().removeClass("active");
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

new Swiper();

//导入content2
function InsertProduct2list() {
	this.con = $(".c2_r>ul");

	this.init();
}

$.extend(InsertProduct2list.prototype, {
	init: function() {
		this.inserData();
	},
	inserData: function() {
		$.getJSON("../json/index_con2.json?new Data().getTime()", $.proxy(this.jsonData, this))
	},
	jsonData: function(data) {
		var str = "";
		for(var i = 0; i < data.length; i++) {
			str += ` <li>
                    <a href="detail.html?${data[i].id}">
                        <img src="../images/${data[i].images}" alt="">
                        <span class="c2_log">${data[i].title}</span>
                        <p class="c2_d">${data[i].detail}</p>
                        <div class="price">
                            <span>${data[i].price}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del}</del>
                        </div>
                        <div class ="flag-saleoff">${data[i].con}</div>
                    </a>
                </li>`
		}
		this.con.append(str);
		this.flagSaleoff = $(".flag-saleoff");
		for(var i = 0; i < this.flagSaleoff.length; i++) {
			if(this.flagSaleoff.eq(i).html() == "") {
				this.flagSaleoff.eq(i).css("display", "none");
			}
		}
	}
})

new InsertProduct2list();

//导入content3
function InsertProduct3list() {
	this.con = $(".content3");
	this.oLi = $(".c3_title>.ulist>ul>li");
	this.init();
}

$.extend(InsertProduct3list.prototype, {
	init: function() {
		this.InsertData();
		this.lihover();
	},
	InsertData: function() {
		$.getJSON("../json/index_con3.json?new Data().getTime()", $.proxy(this.jsonData, this))
	},
	jsonData: function(data) {
		var str = "";
		if(data[0].id == 1) {
			str += `<div class="c3_detail">
                <div class="box">
                    <div class="c3_l">
                        <a href="##" class="img_one images"><img src="../images/${data[0].img1}" alt=""></a>
                    
                        <a href="##" class="img_two images"><img src="../images/${data[0].img2}" alt=""></a>
                        
                    </div>
                    <div class="c3_r">
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img3}" alt="">
                            <span class="c3_b">${data[0].product1}</span>
                            <p>${data[0].detail1}</p>
                            <div class="price">
                                <span>${data[0].price1}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del1}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review1}</span>
                                    <span class="author"> ${data[0].author1}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img4}" alt="">
                            <span class="c3_b">${data[0].product2}</span>
                            <p>${data[0].detail2}</p>
                            <div class="price">
                                <span>${data[0].price2}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del2}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review2}</span>
                                    <span class="author"> ${data[0].author2}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img5}" alt="">
                            <span class="c3_b">${data[0].product3}</span>
                            <p>${data[0].detail3}</p>
                            <div class="price">
                                <span>${data[0].price3}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del3}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review3}</span>
                                    <span class="author">${data[0].author3}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img6}" alt="">
                            <span class="c3_b">${data[0].product4}</span>
                            <p>${data[0].detail4}</p>
                            <div class="price">
                                <span>${data[0].price4}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del4}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review4}</span>
                                    <span class="author">${data[0].author4}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img7}" alt="">
                            <span class="c3_b">${data[0].product5}</span>
                            <p>${data[0].detail5}</p>
                            <div class="price">
                                <span>${data[0].price5}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del5}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review5}</span>
                                    <span class="author">${data[0].author5}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img8}" alt="">
                            
                            <span class="c3_b">${data[0].product6}</span>
                            <p>${data[0].detail6}</p>
                            <div class="price">
                                <span>${data[0].price6}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del6}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review6}</span>
                                    <span class="author">${data[0].author6}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img9}" alt="">
                            <span class="c3_b">${data[0].product7}</span>
                            <p>${data[0].detail7}</p>
                            <div class="price">
                                <span>${data[0].price7}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del7}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review7}</span>
                                    <span class="author">${data[0].author7}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="last_s">
                            <div class="left_last">
                                <span class="c3_b">${data[0].product8}</span>
                                <p class="price"><span>${data[0].price8}<span>元</p>
                            </div>
                            <img src="../images/${data[0].img10}" alt="">
                        </a>
                        <a href="##" class="last_s last_t">
                            <div class="left_last">
                                <span class="c3_b c3_c">浏览更多</span>
                                <p class="price hot">热门</p>
                            </div>
                            <div class="iconfont icon_arr">&#xe619;</div>
                        </a>
                    </div>
                </div>
                <div class="c3_img">
                    <a href="##"><img src="../images/${data[0].images}" alt=""></a>
                </div>
            </div>`
		}
		this.con.append(str);
		this.con_r = $(".c3_r");
		// this.oLi[0].
	},
	lihover: function() {
		this.oLi.each($.proxy(this.liDisplay, this));
	},
	liDisplay: function(i) {
		this.oLi.eq(i).on("mouseover", i, $.proxy(this.liData, this));
	},
	liData: function(event) {
		var index = event.data;
		var _this = this;
		var str = "";
		this.oLi.eq(index).addClass("active").siblings().removeClass("active");
		$.getJSON("../json/index_con3.json?new Data().getTime()", function(data) {
			for(var i = 0; i < data.length; i++) {
				if(index + 1 == data[i].id) {
					str += `<div class="c3_r">
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img3}" alt="">
                        <span class="c3_b">${data[i].product1}</span>
                        <p>${data[i].detail1}</p>
                        <div class="price">
                            <span>${data[i].price1}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del1}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review1}</span>
                                <span class="author"> ${data[i].author1}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img4}" alt="">
                        <span class="c3_b">${data[i].product2}</span>
                        <p>${data[i].detail2}</p>
                        <div class="price">
                            <span>${data[i].price2}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del2}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review2}</span>
                                <span class="author"> ${data[i].author2}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img5}" alt="">
                        <span class="c3_b">${data[i].product3}</span>
                        <p>${data[i].detail3}</p>
                        <div class="price">
                            <span>${data[i].price3}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del3}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review3}</span>
                                <span class="author">${data[i].author3}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img6}" alt="">
                        <span class="c3_b">${data[i].product4}</span>
                        <p>${data[i].detail4}</p>
                        <div class="price">
                            <span>${data[i].price4}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del4}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review4}</span>
                                <span class="author">${data[i].author4}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img7}" alt="">
                        <span class="c3_b">${data[i].product5}</span>
                        <p>${data[i].detail5}</p>
                        <div class="price">
                            <span>${data[i].price5}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del5}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review5}</span>
                                <span class="author">${data[i].author5}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img8}" alt="">
                        
                        <span class="c3_b">${data[i].product6}</span>
                        <p>${data[i].detail6}</p>
                        <div class="price">
                            <span>${data[i].price6}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del6}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review6}</span>
                                <span class="author">${data[i].author6}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img9}" alt="">
                        <span class="c3_b">${data[i].product7}</span>
                        <p>${data[i].detail7}</p>
                        <div class="price">
                            <span>${data[i].price7}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del7}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review7}</span>
                                <span class="author">${data[i].author7}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="last_s">
                        <div class="left_last">
                            <span class="c3_b">${data[i].product8}</span>
                            <p class="price"><span>${data[i].price8}<span>元</p>
                        </div>
                        <img src="../images/${data[i].img10}" alt="">
                    </a>
                    <a href="##" class="last_s last_t">
                        <div class="left_last">
                            <span class="c3_b c3_c">浏览更多</span>
                            <p class="price hot">热门</p>
                        </div>
                        <div class="iconfont icon_arr">&#xe619;</div>
                    </a>
                </div>
            </div>`
				}
			}
			_this.con_r.html(str);
		})
	}
})
new InsertProduct3list();

// 插入c4的内容

function InsertProduct4list() {
	this.con = $(".content4");

	this.oLi = $(".c4_title>.ulist>ul>li");

	this.init();
}

$.extend(InsertProduct4list.prototype, {
	init: function() {
		this.InsertData();
		this.lihover();
	},
	InsertData: function() {
		$.getJSON("../json/index_con4.json?new Data().getTime()", $.proxy(this.jsonData, this))
	},
	jsonData: function(data) {
		var str = "";
		if(data[0].id == 1) {
			str += `<div class="c4_detail">
                <div class="box">
                    <div class="c4_l">
                        <a href="##" class="img_one images"><img src="../images/${data[0].img1}" alt=""></a>
                    
                        <a href="##" class="img_two images"><img src="../images/${data[0].img2}" alt=""></a>
                        
                    </div>
                    <div class="c4_r">
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img3}" alt="">
                            <span class="c4_b">${data[0].product1}</span>
                            <p>${data[0].detail1}</p>
                            <div class="price">
                                <span>${data[0].price1}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del1}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review1}</span>
                                    <span class="author"> ${data[0].author1}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img4}" alt="">
                            <span class="c4_b">${data[0].product2}</span>
                            <p>${data[0].detail2}</p>
                            <div class="price">
                                <span>${data[0].price2}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del2}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review2}</span>
                                    <span class="author"> ${data[0].author2}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img5}" alt="">
                            <span class="c4_b">${data[0].product3}</span>
                            <p>${data[0].detail3}</p>
                            <div class="price">
                                <span>${data[0].price3}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del3}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review3}</span>
                                    <span class="author">${data[0].author3}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img6}" alt="">
                            <span class="c4_b">${data[0].product4}</span>
                            <p>${data[0].detail4}</p>
                            <div class="price">
                                <span>${data[0].price4}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del4}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review4}</span>
                                    <span class="author">${data[0].author4}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img7}" alt="">
                            <span class="c4_b">${data[0].product5}</span>
                            <p>${data[0].detail5}</p>
                            <div class="price">
                                <span>${data[0].price5}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del5}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review5}</span>
                                    <span class="author">${data[0].author5}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img8}" alt="">
                            
                            <span class="c4_b">${data[0].product6}</span>
                            <p>${data[0].detail6}</p>
                            <div class="price">
                                <span>${data[0].price6}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del6}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review6}</span>
                                    <span class="author">${data[0].author6}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img9}" alt="">
                            <span class="c4_b">${data[0].product7}</span>
                            <p>${data[0].detail7}</p>
                            <div class="price">
                                <span>${data[0].price7}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del7}</del>
                            </div>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review7}</span>
                                    <span class="author">${data[0].author7}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="last_s">
                            <div class="left_last">
                                <span class="c4_b">${data[0].product8}</span>
                                <p class="price"><span>${data[0].price8}<span>元</p>
                            </div>
                            <img src="../images/${data[0].img10}" alt="">
                        </a>
                        <a href="##" class="last_s last_t">
                            <div class="left_last">
                                <span class="c4_b c4_c">浏览更多</span>
                                <p class="price hot">热门</p>
                            </div>
                            <div class="iconfont icon_arr">&#xe619;</div>
                        </a>
                    </div>
                </div>
            </div>`
		}
		this.con.append(str);
		this.con_r = $(".c4_r");
		// this.oLi[0].
	},
	lihover: function() {
		this.oLi.each($.proxy(this.liDisplay, this));
	},
	liDisplay: function(i) {
		this.oLi.eq(i).on("mouseover", i, $.proxy(this.liData, this));
	},
	liData: function(event) {
		var index = event.data;
		var _this = this;
		var str = "";
		this.oLi.eq(index).addClass("active").siblings().removeClass("active");
		$.getJSON("../json/index_con4.json?new Data().getTime()", function(data) {
			for(var i = 0; i < data.length; i++) {
				if(index + 1 == data[i].id) {
					str += `<div class="c4_r">
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img3}" alt="">
                        <span class="c4_b">${data[i].product1}</span>
                        <p>${data[i].detail1}</p>
                        <div class="price">
                            <span>${data[i].price1}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del1}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review1}</span>
                                <span class="author"> ${data[i].author1}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img4}" alt="">
                        <span class="c4_b">${data[i].product2}</span>
                        <p>${data[i].detail2}</p>
                        <div class="price">
                            <span>${data[i].price2}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del2}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review2}</span>
                                <span class="author"> ${data[i].author2}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img5}" alt="">
                        <span class="c4_b">${data[i].product3}</span>
                        <p>${data[i].detail3}</p>
                        <div class="price">
                            <span>${data[i].price3}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del3}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review3}</span>
                                <span class="author">${data[i].author3}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img6}" alt="">
                        <span class="c4_b">${data[i].product4}</span>
                        <p>${data[i].detail4}</p>
                        <div class="price">
                            <span>${data[i].price4}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del4}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review4}</span>
                                <span class="author">${data[i].author4}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img7}" alt="">
                        <span class="c4_b">${data[i].product5}</span>
                        <p>${data[i].detail5}</p>
                        <div class="price">
                            <span>${data[i].price5}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del5}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review5}</span>
                                <span class="author">${data[i].author5}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img8}" alt="">
                        
                        <span class="c4_b">${data[i].product6}</span>
                        <p>${data[i].detail6}</p>
                        <div class="price">
                            <span>${data[i].price6}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del6}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review6}</span>
                                <span class="author">${data[i].author6}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img9}" alt="">
                        <span class="c4_b">${data[i].product7}</span>
                        <p>${data[i].detail7}</p>
                        <div class="price">
                            <span>${data[i].price7}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del7}</del>
                        </div>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review7}</span>
                                <span class="author">${data[i].author7}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="last_s">
                        <div class="left_last">
                            <span class="c4_b">${data[i].product8}</span>
                            <p class="price"><span>${data[i].price8}<span>元</p>
                        </div>
                        <img src="../images/${data[i].img10}" alt="">
                    </a>
                    <a href="##" class="last_s last_t">
                        <div class="left_last">
                            <span class="c4_b c4_c">浏览更多</span>
                            <p class="price hot">热门</p>
                        </div>
                        <div class="iconfont icon_arr">&#xe619;</div>
                    </a>
                </div>
            </div>`
				}
			}
			_this.con_r.html(str);
		})
	}
})
new InsertProduct4list();

//导入content5
function InsertProduct5list() {
	this.con = $(".content5");
	this.oLi = $(".c5_title>.ulist>ul>li");
	this.init();
}

$.extend(InsertProduct5list.prototype, {
	init: function() {
		this.InsertData();
		this.lihover();
	},
	InsertData: function() {
		$.getJSON("../json/index_con5.json?new Data().getTime()", $.proxy(this.jsonData, this))
	},
	jsonData: function(data) {
		var str = "";
		if(data[0].id == 1) {
			str += `<div class="c5_detail">
                <div class="box">
                    <div class="c5_l">
                        <a href="##" class="img_one images"><img src="../images/${data[0].img1}" alt=""></a>
                    
                        <a href="##" class="img_two images"><img src="../images/${data[0].img2}" alt=""></a>
                        
                    </div>
                    <div class="c5_r">
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img3}" alt="">
                            <span class="c5_b">${data[0].product1}</span>
                            <div class="price">
                                <span>${data[0].price1}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail1}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review1}</span>
                                    <span class="author"> ${data[0].author1}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img4}" alt="">
                            <span class="c5_b">${data[0].product2}</span>
                           
                            <div class="price">
                                <span>${data[0].price2}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail2}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review2}</span>
                                    <span class="author"> ${data[0].author2}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img5}" alt="">
                            <span class="c5_b">${data[0].product3}</span>
                          
                            <div class="price">
                                <span>${data[0].price3}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail3}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review3}</span>
                                    <span class="author">${data[0].author3}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img6}" alt="">
                            <span class="c5_b">${data[0].product4}</span>
                           
                            <div class="price">
                                <span>${data[0].price4}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail4}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review4}</span>
                                    <span class="author">${data[0].author4}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img7}" alt="">
                            <span class="c5_b">${data[0].product5}</span>
                           
                            <div class="price">
                                <span>${data[0].price5}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail5}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review5}</span>
                                    <span class="author">${data[0].author5}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img8}" alt="">
                            
                            <span class="c5_b">${data[0].product6}</span>
                            
                            <div class="price">
                                <span>${data[0].price6}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail6}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review6}</span>
                                    <span class="author">${data[0].author6}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img9}" alt="">
                            <span class="c5_b">${data[0].product7}</span>
                           
                            <div class="price">
                                <span>${data[0].price7}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail7}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review7}</span>
                                    <span class="author">${data[0].author7}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="last_s">
                            <div class="left_last">
                                <span class="c5_b">${data[0].product8}</span>
                                <p class="price"><span>${data[0].price8}<span>元</p>
                            </div>
                            <img src="../images/${data[0].img10}" alt="">
                        </a>
                        <a href="##" class="last_s last_t">
                            <div class="left_last">
                                <span class="c5_b c5_c">浏览更多</span>
                                <p class="price hot">热门</p>
                            </div>
                            <div class="iconfont icon_arr">&#xe619;</div>
                        </a>
                    </div>
                </div>
                <div class="c5_img">
                    <a href="##"><img src="../images/${data[0].images}" alt=""></a>
                </div>
            </div>`
		}
		this.con.append(str);
		this.con_r = $(".c5_r");
		// this.oLi[0].
	},
	lihover: function() {
		this.oLi.each($.proxy(this.liDisplay, this));
	},
	liDisplay: function(i) {
		this.oLi.eq(i).on("mouseover", i, $.proxy(this.liData, this));
	},
	liData: function(event) {
		var index = event.data;
		var _this = this;
		var str = "";
		this.oLi.eq(index).addClass("active").siblings().removeClass("active");
		$.getJSON("../json/index_con5.json?new Data().getTime()", function(data) {
			for(var i = 0; i < data.length; i++) {
				if(index + 1 == data[i].id) {
					str += `<div class="c5_r">
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img3}" alt="">
                        <span class="c5_b">${data[i].product1}</span>
                      
                        <div class="price">
                            <span>${data[i].price1}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail1}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review1}</span>
                                <span class="author"> ${data[i].author1}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img4}" alt="">
                        <span class="c5_b">${data[i].product2}</span>
                       
                        <div class="price">
                            <span>${data[i].price2}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail2}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review2}</span>
                                <span class="author"> ${data[i].author2}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img5}" alt="">
                        <span class="c5_b">${data[i].product3}</span>
                       
                        <div class="price">
                            <span>${data[i].price3}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail3}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review3}</span>
                                <span class="author">${data[i].author3}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img6}" alt="">
                        <span class="c5_b">${data[i].product4}</span>
                      
                        <div class="price">
                            <span>${data[i].price4}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail4}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review4}</span>
                                <span class="author">${data[i].author4}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img7}" alt="">
                        <span class="c5_b">${data[i].product5}</span>
                      
                        <div class="price">
                            <span>${data[i].price5}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail5}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review5}</span>
                                <span class="author">${data[i].author5}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img8}" alt="">
                        
                        <span class="c5_b">${data[i].product6}</span>
                        
                        <div class="price">
                            <span>${data[i].price6}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail6}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review6}</span>
                                <span class="author">${data[i].author6}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img9}" alt="">
                        <span class="c5_b">${data[i].product7}</span>
                        
                        <div class="price">
                            <span>${data[i].price7}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail7}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review7}</span>
                                <span class="author">${data[i].author7}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="last_s">
                        <div class="left_last">
                            <span class="c5_b">${data[i].product8}</span>
                            <p class="price"><span>${data[i].price8}<span>元</p>
                        </div>
                        <img src="../images/${data[i].img10}" alt="">
                    </a>
                    <a href="##" class="last_s last_t">
                        <div class="left_last">
                            <span class="c5_b c5_c">浏览更多</span>
                            <p class="price hot">热门</p>
                        </div>
                        <div class="iconfont icon_arr">&#xe619;</div>
                    </a>
                </div>
            </div>`
				}
			}
			_this.con_r.html(str);
		})
	}
})
new InsertProduct5list();

//导入content6
function InsertProduct6list() {
	this.con = $(".content6");
	this.oLi = $(".c6_title>.ulist>ul>li");
	this.init();
}

$.extend(InsertProduct6list.prototype, {
	init: function() {
		this.InsertData();
		this.lihover();
	},
	InsertData: function() {
		$.getJSON("../json/index_con6.json?new Data().getTime()", $.proxy(this.jsonData, this))
	},
	jsonData: function(data) {
		var str = "";
		if(data[0].id == 1) {
			str += `<div class="c6_detail">
                <div class="box">
                    <div class="c6_l">
                        <a href="##" class="img_one images"><img src="../images/${data[0].img1}" alt=""></a>
                    
                        <a href="##" class="img_two images"><img src="../images/${data[0].img2}" alt=""></a>
                        
                    </div>
                    <div class="c6_r">
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img3}" alt="">
                            <span class="c6_b">${data[0].product1}</span>
                            <div class="price">
                                <span>${data[0].price1}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del1}</del>
                            </div>
                            <p>${data[0].detail1}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review1}</span>
                                    <span class="author"> ${data[0].author1}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img4}" alt="">
                            <span class="c6_b">${data[0].product2}</span>
                           
                            <div class="price">
                                <span>${data[0].price2}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del2}</del>
                            </div>
                            <p>${data[0].detail2}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review2}</span>
                                    <span class="author"> ${data[0].author2}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img5}" alt="">
                            <span class="c6_b">${data[0].product3}</span>
                          
                            <div class="price">
                                <span>${data[0].price3}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del3}</del>
                            </div>
                            <p>${data[0].detail3}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review3}</span>
                                    <span class="author">${data[0].author3}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img6}" alt="">
                            <span class="c6_b">${data[0].product4}</span>
                           
                            <div class="price">
                                <span>${data[0].price4}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del4}</del>
                            </div>
                            <p>${data[0].detail4}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review4}</span>
                                    <span class="author">${data[0].author4}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img7}" alt="">
                            <span class="c6_b">${data[0].product5}</span>
                           
                            <div class="price">
                                <span>${data[0].price5}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del5}</del>
                            </div>
                            <p>${data[0].detail5}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review5}</span>
                                    <span class="author">${data[0].author5}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img8}" alt="">
                            
                            <span class="c6_b">${data[0].product6}</span>
                            
                            <div class="price">
                                <span>${data[0].price6}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del6}</del>
                            </div>
                            <p>${data[0].detail6}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review6}</span>
                                    <span class="author">${data[0].author6}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img9}" alt="">
                            <span class="c6_b">${data[0].product7}</span>
                           
                            <div class="price">
                                <span>${data[0].price7}</span>&nbsp;<span>元</span>&nbsp;<del>${data[0].del7}</del>
                            </div>
                            <p>${data[0].detail7}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review7}</span>
                                    <span class="author">${data[0].author7}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="last_s">
                            <div class="left_last">
                                <span class="c6_b">${data[0].product8}</span>
                                <p class="price"><span>${data[0].price8}<span>元</p>
                            </div>
                            <img src="../images/${data[0].img10}" alt="">
                        </a>
                        <a href="##" class="last_s last_t">
                            <div class="left_last">
                                <span class="c6_b c6_c">浏览更多</span>
                                <p class="price hot">热门</p>
                            </div>
                            <div class="iconfont icon_arr">&#xe619;</div>
                        </a>
                    </div>
                </div>
                <div class="c6_img">
                    <a href="##"><img src="../images/${data[0].images}" alt=""></a>
                </div>
            </div>`
		}
		this.con.append(str);
		this.con_r = $(".c6_r");
		// this.oLi[0].
	},
	lihover: function() {
		this.oLi.each($.proxy(this.liDisplay, this));
	},
	liDisplay: function(i) {
		this.oLi.eq(i).on("mouseover", i, $.proxy(this.liData, this));
	},
	liData: function(event) {
		var index = event.data;
		var _this = this;
		var str = "";
		this.oLi.eq(index).addClass("active").siblings().removeClass("active");
		$.getJSON("../json/index_con6.json?new Data().getTime()", function(data) {
			for(var i = 0; i < data.length; i++) {
				if(index + 1 == data[i].id) {
					str += `<div class="c6_r">
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img3}" alt="">
                        <span class="c6_b">${data[i].product1}</span>
                      
                        <div class="price">
                            <span>${data[i].price1}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del1}</del>
                        </div>
                        <p>${data[i].detail1}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review1}</span>
                                <span class="author"> ${data[i].author1}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img4}" alt="">
                        <span class="c6_b">${data[i].product2}</span>
                       
                        <div class="price">
                            <span>${data[i].price2}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del2}</del>
                        </div>
                        <p>${data[i].detail2}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review2}</span>
                                <span class="author"> ${data[i].author2}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img5}" alt="">
                        <span class="c6_b">${data[i].product3}</span>
                       
                        <div class="price">
                            <span>${data[i].price3}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del3}</del>
                        </div>
                        <p>${data[i].detail3}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review3}</span>
                                <span class="author">${data[i].author3}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img6}" alt="">
                        <span class="c6_b">${data[i].product4}</span>
                      
                        <div class="price">
                            <span>${data[i].price4}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del4}</del>
                        </div>
                        <p>${data[i].detail4}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review4}</span>
                                <span class="author">${data[i].author4}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img7}" alt="">
                        <span class="c6_b">${data[i].product5}</span>
                      
                        <div class="price">
                            <span>${data[i].price5}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del5}</del>
                        </div>
                        <p>${data[i].detail5}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review5}</span>
                                <span class="author">${data[i].author5}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img8}" alt="">
                        
                        <span class="c6_b">${data[i].product6}</span>
                        
                        <div class="price">
                            <span>${data[i].price6}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del6}</del>
                        </div>
                        <p>${data[i].detail6}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review6}</span>
                                <span class="author">${data[i].author6}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img9}" alt="">
                        <span class="c6_b">${data[i].product7}</span>
                        
                        <div class="price">
                            <span>${data[i].price7}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del7}</del>
                        </div>
                        <p>${data[i].detail7}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review7}</span>
                                <span class="author">${data[i].author7}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="last_s">
                        <div class="left_last">
                            <span class="c6_b">${data[i].product8}</span>
                            <p class="price"><span>${data[i].price8}<span>元</p>
                        </div>
                        <img src="../images/${data[i].img10}" alt="">
                    </a>
                    <a href="##" class="last_s last_t">
                        <div class="left_last">
                            <span class="c6_b c6_c">浏览更多</span>
                            <p class="price hot">热门</p>
                        </div>
                        <div class="iconfont icon_arr">&#xe619;</div>
                    </a>
                </div>
            </div>`
				}
			}
			_this.con_r.html(str);
		})
	}
})
new InsertProduct6list();

//导入content7
function InsertProduct7list() {
	this.con = $(".content7");
	this.oLi = $(".c7_title>.ulist>ul>li");
	this.init();
}

$.extend(InsertProduct7list.prototype, {
	init: function() {
		this.InsertData();
		this.lihover();
	},
	InsertData: function() {
		$.getJSON("../json/index_con7.json?new Data().getTime()", $.proxy(this.jsonData, this))
	},
	jsonData: function(data) {
		var str = "";
		if(data[0].id == 1) {
			str += `<div class="c7_detail">
                <div class="box">
                    <div class="c7_l">
                        <a href="##" class="img_one images"><img src="../images/${data[0].img1}" alt=""></a>
                    
                        <a href="##" class="img_two images"><img src="../images/${data[0].img2}" alt=""></a>
                        
                    </div>
                    <div class="c7_r">
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img3}" alt="">
                            <span class="c7_b">${data[0].product1}</span>
                            <div class="price">
                                <span>${data[0].price1}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail1}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review1}</span>
                                    <span class="author"> ${data[0].author1}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img4}" alt="">
                            <span class="c7_b">${data[0].product2}</span>
                           
                            <div class="price">
                                <span>${data[0].price2}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail2}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review2}</span>
                                    <span class="author"> ${data[0].author2}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img5}" alt="">
                            <span class="c7_b">${data[0].product3}</span>
                          
                            <div class="price">
                                <span>${data[0].price3}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail3}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review3}</span>
                                    <span class="author">${data[0].author3}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img6}" alt="">
                            <span class="c7_b">${data[0].product4}</span>
                           
                            <div class="price">
                                <span>${data[0].price4}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail4}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review4}</span>
                                    <span class="author">${data[0].author4}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img7}" alt="">
                            <span class="c7_b">${data[0].product5}</span>
                           
                            <div class="price">
                                <span>${data[0].price5}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail5}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review5}</span>
                                    <span class="author">${data[0].author5}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img8}" alt="">
                            
                            <span class="c7_b">${data[0].product6}</span>
                            
                            <div class="price">
                                <span>${data[0].price6}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail6}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review6}</span>
                                    <span class="author">${data[0].author6}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="img_p">
                            <img src="../images/${data[0].img9}" alt="">
                            <span class="c7_b">${data[0].product7}</span>
                           
                            <div class="price">
                                <span>${data[0].price7}</span>&nbsp;<span>元</span>
                            </div>
                            <p>${data[0].detail7}</p>
                            <div class="evaluate">
                                <b class="review">
                                    <span class="eval_tw">${data[0].review7}</span>
                                    <span class="author">${data[0].author7}</span>
                                </b>
                            </div>
                        </a>
                        <a href="##" class="last_s">
                            <div class="left_last">
                                <span class="c7_b">${data[0].product8}</span>
                                <p class="price"><span>${data[0].price8}<span>元</p>
                            </div>
                            <img src="../images/${data[0].img10}" alt="">
                        </a>
                        <a href="##" class="last_s last_t">
                            <div class="left_last">
                                <span class="c7_b c7_c">浏览更多</span>
                                <p class="price hot">热门</p>
                            </div>
                            <div class="iconfont icon_arr">&#xe619;</div>
                        </a>
                    </div>
                </div>
            </div>`
		}
		this.con.append(str);
		this.con_r = $(".c7_r");
		// this.oLi[0].
	},
	lihover: function() {
		this.oLi.each($.proxy(this.liDisplay, this));
	},
	liDisplay: function(i) {
		this.oLi.eq(i).on("mouseover", i, $.proxy(this.liData, this));
	},
	liData: function(event) {
		var index = event.data;
		var _this = this;
		var str = "";
		this.oLi.eq(index).addClass("active").siblings().removeClass("active");
		$.getJSON("../json/index_con7.json?new Data().getTime()", function(data) {
			for(var i = 0; i < data.length; i++) {
				if(index + 1 == data[i].id) {
					str += `<div class="c7_r">
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img3}" alt="">
                        <span class="c7_b">${data[i].product1}</span>
                      
                        <div class="price">
                            <span>${data[i].price1}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail1}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review1}</span>
                                <span class="author"> ${data[i].author1}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img4}" alt="">
                        <span class="c7_b">${data[i].product2}</span>
                       
                        <div class="price">
                            <span>${data[i].price2}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail2}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review2}</span>
                                <span class="author"> ${data[i].author2}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img5}" alt="">
                        <span class="c7_b">${data[i].product3}</span>
                       
                        <div class="price">
                            <span>${data[i].price3}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail3}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review3}</span>
                                <span class="author">${data[i].author3}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img6}" alt="">
                        <span class="c7_b">${data[i].product4}</span>
                      
                        <div class="price">
                            <span>${data[i].price4}</span>&nbsp;<span>元</span>&nbsp;<del>${data[i].del4}</del>
                        </div>
                        <p>${data[i].detail4}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review4}</span>
                                <span class="author">${data[i].author4}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img7}" alt="">
                        <span class="c7_b">${data[i].product5}</span>
                      
                        <div class="price">
                            <span>${data[i].price5}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail5}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review5}</span>
                                <span class="author">${data[i].author5}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img8}" alt="">
                        
                        <span class="c7_b">${data[i].product6}</span>
                        
                        <div class="price">
                            <span>${data[i].price6}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail6}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review6}</span>
                                <span class="author">${data[i].author6}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="img_p">
                        <img src="../images/${data[i].img9}" alt="">
                        <span class="c7_b">${data[i].product7}</span>
                        
                        <div class="price">
                            <span>${data[i].price7}</span>&nbsp;<span>元</span>
                        </div>
                        <p>${data[i].detail7}</p>
                        <div class="evaluate">
                            <b class="review">
                                <span class="eval_tw">${data[i].review7}</span>
                                <span class="author">${data[i].author7}</span>
                            </b>
                        </div>
                    </a>
                    <a href="##" class="last_s">
                        <div class="left_last">
                            <span class="c7_b">${data[i].product8}</span>
                            <p class="price"><span>${data[i].price8}<span>元</p>
                        </div>
                        <img src="../images/${data[i].img10}" alt="">
                    </a>
                    <a href="##" class="last_s last_t">
                        <div class="left_last">
                            <span class="c7_b c7_c">浏览更多</span>
                            <p class="price hot">热门</p>
                        </div>
                        <div class="iconfont icon_arr">&#xe619;</div>
                    </a>
                </div>
            </div>`
				}
			}
			_this.con_r.html(str);
		})
	}
})
new InsertProduct7list();

// 导入content8

function InsertProduct8list() {
	this.con = $(".c8_product>.c8_ul");
	this.cutL = $(".c8_title>.more>#l_page");
	this.cutR = $(".c8_title>.more>#r_page");
	this.init();
}

$.extend(InsertProduct8list.prototype, {
	init: function() {
		this.insertAjax();
		this.cutRData();
		this.cutLData();
	},
	insertAjax: function() {
		$.getJSON("../json/index_con8.json", $.proxy(this.InsertData, this))
	},
	InsertData: function(data) {
		var str = "";
		for(var i = 0; i < data.length; i++) {
			str += `<a href="##">
                    <img src="../images/${data[i].images}" alt="">
                    <p class="c8_pro">${data[i].detail}</p>
                    <span class="c8_price"><span>${data[i].price}</span>&nbsp;<span>元</span></span>
                    <i>${data[i].evalute}</i>
                </a>`
		}
		this.con.append(str);
		this.oA = $(".c8_ul>a");
		this.iw = $(".c8_ul>a").eq(0).width();
		this.con.css("width", this.iw * this.oA.length + 10 * 14);
	},
	cutRData: function() {
		this.cutR.on("click", $.proxy(this.cutRDetail, this))
	},
	cutRDetail: function() {
		this.con.stop(true).animate({
			left: -(this.iw * 5 + 74)
		})
	},
	cutLData: function() {
		this.cutL.on("click", $.proxy(this.cutLDetail, this))
	},
	cutLDetail: function() {
		this.con.stop(true).animate({
			left: 0
		})
	}
})
new InsertProduct8list();

//content10 小轮播

function ConTenSwiper(box, name, dot, ear) {
	this.box = $(box)
	this.name = $(name);
	this.dot = $(dot);
	this.prev = $(ear).eq(0);
	this.next = $(ear).eq(1);
	this.index = 0;
	this.iw = this.name.children().eq(0).width();
}

$.extend(ConTenSwiper.prototype, {
	init: function() {
		this.name.width(this.iw * this.name.children().length);
		this.mouseover();
		this.mouseout();
		this.prevClick();
		this.nextClick();
	},
	mouseover: function() {
		this.box.on("mouseover", $.proxy(this.arrShow, this))
	},
	arrShow: function() {
		this.prev.css("opacity", 1);
		this.next.css("opacity", 1);
	},
	mouseout: function() {
		this.box.on("mouseout", $.proxy(this.arrHide, this))
	},
	arrHide: function() {
		this.prev.css("opacity", 0);
		this.next.css("opacity", 0);
	},
	prevClick: function() {
		this.prev.on("click", $.proxy(this.imgCut_p, this))
	},
	imgCut_p: function() {

		if(this.index == this.name.children().length - 1) {
			this.index = this.name.children().length - 1;
		} else {
			this.index++;
		}
		this.name.stop(true).animate({
			left: -this.iw * this.index
		});
		this.dot.eq(this.index).find("span").addClass("aDot").end().siblings().find("span").removeClass("aDot");
	},
	nextClick: function() {
		this.next.on("click", $.proxy(this.imgCut_n, this))
	},
	imgCut_n: function() {
		if(this.index == 0) {
			this.index = 0;
		} else {
			this.index--;
		}
		this.name.stop(true).animate({
			left: -this.iw * this.index
		});
		this.dot.eq(this.index).find("span").addClass("aDot").end().siblings().find("span").removeClass("aDot");
	}
})

function ConTenSwiper1(box, name, dot, ear) {
	ConTenSwiper.call(this, ".first_box1", ".box>.item_1", ".dot_1>a", ".ear_1>a");
}
ConTenSwiper1.prototype = {
	constructor: ConTenSwiper1,
	__proto__: ConTenSwiper.prototype
}
new ConTenSwiper1().init();

function ConTenSwiper2(box, name, dot, ear) {
	ConTenSwiper.call(this, ".second_box2", ".box>.item_2", ".dot_2>a", ".ear_2>a");
}
ConTenSwiper2.prototype = {
	constructor: ConTenSwiper2,
	__proto__: ConTenSwiper.prototype
}
new ConTenSwiper2().init();

function ConTenSwiper3(box, name, dot, ear) {
	ConTenSwiper.call(this, ".third_box3", ".box>.item_3", ".dot_3>a", ".ear_3>a");
}
ConTenSwiper3.prototype = {
	constructor: ConTenSwiper3,
	__proto__: ConTenSwiper.prototype
}
new ConTenSwiper3().init();

function ConTenSwiper4(box, name, dot, ear) {
	ConTenSwiper.call(this, ".fourth_box4", ".box>.item_4", ".dot_4>a", ".ear_4>a");
}
ConTenSwiper4.prototype = {
	constructor: ConTenSwiper4,
	__proto__: ConTenSwiper.prototype
}
new ConTenSwiper4().init();

//右侧操作栏
function Operation() {
	this.bar_box = $(".bar_p");
	this.bar_img = $(".bar_img");
	this.bar_pop = $(".bar_pop");
	this.toTop = $(".toTop");
	this.init();
}

$.extend(Operation.prototype, {
	init: function() {
		this.oliEach();
		this.scroll();
		this.toT();
	},
	oliEach: function() {
		this.bar_box.each($.proxy(this.oliover, this));
		this.bar_box.each($.proxy(this.oliout, this))
	},
	oliover: function(i) {
		this.bar_box.eq(i).on("mouseover", i, $.proxy(this.oLiShow, this))
	},
	oLiShow: function(event) {

		var index = event.data;
		this.bar_img.eq(index).children().eq(0).css("display", "none");
		this.bar_img.eq(index).children().eq(1).css("display", "block");
		this.bar_pop.eq(index).css("display", "block");
	},
	oliout: function(i) {
		this.bar_box.eq(i).on("mouseout", i, $.proxy(this.oLiHide, this))
	},
	oLiHide: function(event) {

		var index = event.data;
		this.bar_img.eq(index).children().eq(1).css("display", "none");
		this.bar_img.eq(index).children().eq(0).css("display", "block");
		this.bar_pop.eq(index).css("display", "none");
	},
	scroll: function() {
		$(document).scroll($.proxy(this.scrollT, this));
	},
	scrollT: function() {
		var scrollTop = $(document).scrollTop();
		if(scrollTop > 100) {
			this.toTop.css("display", "block");

		} else {
			this.toTop.css("display", "none");
		}
	},
	toT: function() {
		this.toTop.on("click", $.proxy(this.topT, this))
	},
	topT: function() {
		// console.log($(document).scrollTop())
		var t = $(document).scrollTop();
		this.timer = setInterval(function() {
			if($(document).scrollTop() > 0) {
				t -= 500;
				$(document).scrollTop(t);
			} else {
				clearInterval(this.timer)
			}
		}.bind(this), 5)
	}
})

new Operation();

//小购物车
function SmallCar() {
	this.num = $(".num");
	this.bar_text = $(".bar_text").eq(0);
	this.uname = $.cookie("uname");
	this.arr = JSON.parse(localStorage.getItem(this.uname + "Goods"))
	this.init();
}

$.extend(SmallCar.prototype, {
	init: function() {
		this.numHtml();
		if(this.uname) {
			this.bar_text.html(this.uname);
		} else {
			this.bar_text.html("个人中心");
		}
	},
	numHtml: function() {
		var sum = 0;
		if(this.arr) {
			for(var i = 0; i < this.arr.length; i++) {
				sum += Number(this.arr[i].count);
			}
			this.num.html(sum);
		} else {
			this.num.html(0);
		}
	}
})
new SmallCar();

function ColockTime() {
	this.box = $(".time");
	this.init();
}

$.extend(ColockTime.prototype, {
	init: function() {
		this.timeCount();

	},
	timeCount: function() {

		var str = "";
		timer = setInterval(function() {
			this.d = new Date().getTime();
			this.D = new Date("2018-08-23 18:00:00").getTime();
			this.time = this.D - this.d;

			if(this.time <= 0) {
				str =
					`<div class="box">00</div>
                <div class="dot">:</div>
                <div class="box">00</div>
                <div class="dot">:</div>
                <div class="box">00</div>`
				this.box.html(str);
				clearInterval(timer);
			} else {
				var hours = parseInt((this.time / (1000 * 60 * 60)));
				var minutes = parseInt((this.time % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = parseInt((this.time % (1000 * 60)) / 1000);
				hours = addZero(hours);
				minutes = addZero(minutes);
				seconds = addZero(seconds);
				str =
					`<div class="box">${hours}</div>
                <div class="dot">:</div>
                <div class="box">${minutes}</div>
                <div class="dot">:</div>
                <div class="box">${seconds}</div>`
				this.box.html(str);
			}
		}.bind(this), 1000);

		function addZero(num) {
			if(num < 10) {
				num = "0" + num;
			} else {
				num = num;
			}
			return num;
		}

	}
})
new ColockTime();
// 导入footer部分

$(".footer").load("footer.html")
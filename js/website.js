var websiteObj = {
   contentimgdom:$('#web_content > img'),
	init:function (argument) {
  		this.render();
      this.bindEvent();
	},
	bindEvent:function() {
      var that = this;
      var timer = '';
      var sum = 0;
      clearInterval(timer);
      timer = setInterval(function(){
        sum++;
        sum = sum%2; 
        if(sum == 1) {
          that.contentimgdom.eq(0).animate({opacity:1},600);
          that.contentimgdom.eq(1).animate({opacity:0},800);
        }else {
          that.contentimgdom.eq(0).animate({opacity:0},600);
          that.contentimgdom.eq(1).animate({opacity:1},800);
        };

      },2000);

      function bjinit() {
          $('#web_content_box').height($('body').height()-90 > 340 ? $('body').height()-90 : 340);
          $('#web_content').height( $('#web_content').width()*652/393 );
          $('#web_erweima').height( $('#web_erweima').width()*609/420 );
      };
      bjinit();
      $(window).resize(function () {  
          bjinit();
      });
	},
	render:function() {
        var navIndex =  2;
        util.getSession('uname')?$('.header_nav > li').eq(5).find('p').html(util.getSession('uname')):'';
        $('#nav_shade').css('left', $('.header_nav > li').eq(navIndex).position().left + ($('.header_nav > li').eq(navIndex).width()-110)/2 );
        //nav 被选中 样式
        
        $('.header_nav > li').on('click', function(event) {
            event.preventDefault();
            switch($(this).index()){
              case 0: location.href = '/index.html';
                      util.setCookie('nac_index',0);
              break;
              case 1: location.href = '/html/investment.html';
                      util.setCookie('nac_index',1);
              break;
              case 2 :location.href = '/html/website.html';
                      util.setCookie('nac_index',2);
              break;
              case 3: location.href = '/html/enter.html';
                      util.setCookie('nac_index',3);
              break;
              case 4: location.href = '/html/about.html';
                      util.setCookie('nac_index',4);
              break;
              case 5: 
                    if( util.getSession('uname') ) {
                          alert("您已登录成功,非常抱歉,此页正在建设中")
                    }else {
                      location.href = '/html/register.html';
                      util.setCookie('nac_index',5);
                    }
              break;
              default:
              console.log('这个页面目前没有做');
            };
      });
	}
}
websiteObj.init();

var aboutObj = {
    init:function(){
    	
    	this.render();
    },
    bindEvent:function(){
        // 数据渲染后 
        var _index ;
        $('.at_cnt_nav > li').click(function(event) {
            if( _index != $(this).index() ) {
                $('.at_cnt_nav > .at_cnt_nav_active').removeClass('at_cnt_nav_active');
                $(this).addClass('at_cnt_nav_active');
                _index = $(this).index();
                $('.at_cnt_content_right > .actived').removeClass('actived');
                $('.at_cnt_content_right > div').eq(_index).addClass('actived');
            }
            else {
            	 console.log('已经展现出来 您想要的了')
            };
        });
    },
    render:function() {   	
            var navIndex =  4;
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
        this.bindEvent();
    }
}
aboutObj.init();

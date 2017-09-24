var enterObj = {
    
    init:function(){
    	this.bindEvent();
    	this.render();
    },
    bindEvent:function(){
        // 数据 渲染之后 
        var aLidom = $('.en_content_list');
        var _index; // 优化 dom 操作
        aLidom.click(function(event) {
            event.preventDefault();
            if( $(this).index() != _index ) {
                _index = $(this).index();
                $('.en_content_list_actived').removeClass('en_content_list_actived');
                $(this).removeClass('en_content_list_hover').addClass('en_content_list_actived');
            }else {
                _index = null;
                $('.en_content_list_actived').removeClass('en_content_list_actived');
            };
        });
        aLidom.mouseenter(function(event) {
         if( $(this).index() != _index ) {
            $(this).addClass('en_content_list_hover');
          
            $(this).mouseleave(function(event) {
                  $(this).removeClass('en_content_list_hover');
            });
          }else {
            $(this).addClass('en_content_list_active_hover');
          
            $(this).mouseleave(function(event) {
                  $(this).removeClass('en_content_list_active_hover');
            });        
          }
        });

    },
    render:function() {
/*        util.setCookie('nac_index',3);
        $('body').append('<link rel="stylesheet" href="/css/head.css">');
        $('#enter_head').load( '/html/head.html' ,function(){
            $('body').append('<script src="/js/head.js"></script>');
        }); */
        var navIndex =  3;
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
                          dailog("您已登录成功,非常抱歉,此页正在建设中")
                    }else {
                      location.href = '/html/register.html';
                      util.setCookie('nac_index',5);
                    }
              break;
              default:
              console.log('这个页面目前没有做');
            };
        });
/*        var myurl = 'http://ld.zhaolin365.com/Api/Official/';
        $.get(myurl+'join_us', function(req, textStatus, xhr) {
           if(req.code == 200 ) {
          
           };
      
        });
        function (){

        };*/
                 
    }

}
enterObj.init();
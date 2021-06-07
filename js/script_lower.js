/** ハンバーガーメニューボタン動作 */
$(function(){
    var scroll =  $(window).scrollTop();
	var windowHeight = $(window).height();

    /* ハンバーガーメニュークリック時アニメーション*/
    $('.burger-btn').on('click',function(){
        $('.burger-btn').toggleClass('open');
        $('.gl-nav-wrapper').fadeToggle(1100);
        $('body').toggleClass('noscroll');
        $('.header-logo').toggleClass('onmenu');
    });

    /**パララックスアニメーション */
    //初期設定
    var wh = window.innerHeight,
    reg = 4;//調整値、正の数だとスクロール時に上に動き、負の数だと下に動く。絶対値が大きいほど動く量が小さくなる。

    window.addEventListener('load', update_window_size);
    window.addEventListener('resize', update_window_size);
    function update_window_size() {
        wh = window.innerHeight;
    }

    var paraItems = document.querySelectorAll('.para-item');//対象
    paraItems = Array.prototype.slice.call(paraItems, 0);

    //トリガー部分
    if (paraItems.length) {
        parallax();
        window.addEventListener('load', parallax);
        window.addEventListener('resize', parallax);
        window.addEventListener('scroll', parallax, { passive: true });
    }

    //本体 
    function parallax() {
        paraItems.forEach(function (paraItem, i) {

            //動きなどもっと自由に決めたい場合はこのあたりを好きに修正する。
            paraItem.style.transform = '';
            var nowpos = paraItem.getBoundingClientRect().top - wh,
                myreg = paraItem.getAttribute('data-reg') ? Number(paraItem.getAttribute('data-reg')) : reg;
            if (nowpos < 0) {
                paraItem.style.transform = 'translate(0,' + (nowpos / myreg) + 'px)';
            }

        });
    }
    /*** parallax用　ここまで */
	/*** スクロール到達時にふわっと表示するエフェクト ***/
    function scroll_effect(scroll, windowHeight){
        $('.effect-fade').each(function(){
            var elemPos = $(this).offset().top;
            // デバッグ用
            console.log("elemPos="+ elemPos);
            console.log("scroll="+ scroll);
            console.log("windowHeight="+ windowHeight);
    
            if (scroll - 200 > elemPos - windowHeight){
    
                //スクロールエフェクトON
                $(this).addClass('effect-scroll');
            }
        });
    }
    
	/**ヘッダロゴ、メニューボタン、「予約はこちら」アニメーション用定義 */
    /* mainタグがウィンドウのtopを過ぎたら表示する **/
    /* footerタグの近くにいったらウィンドウ外に移動する **/
    var ost = $('main').offset();
	var oet = $('footer').offset();
	
    /** 画面表示時の処理 */
    window.onload = function() {
        scroll_effect(scroll, windowHeight);
        /*inviewクラスを付与。 (予約はこちら用)*/
        $('.side').addClass('inview black');
        /*inviewクラスを付与。 (ハンバーガーメニュー用)*/
        $('.header-menu-btn').addClass('inview');
        /*inviewクラスを付与。 (ヘッダーロゴ用)*/
        $('.header-logo').addClass('inview');
    }

    /** スクロール時の処理 */
    $(window).scroll(function(){
        scroll =  $(window).scrollTop();
		windowHeight = $(window).height();

		/* mainタグ要素が画面の最上部から300pxの位置に到達したら*/
        if(scroll > ost.top-50){
            /*inviewクラスを付与。 (予約はこちら用)*/
            $('.side').addClass('inview black');
            /*inviewクラスを付与。 (ハンバーガーメニュー用)*/
            $('.header-menu-btn').addClass('inview black');
            /*inviewクラスを付与。 (ヘッダーロゴ用)*/
            $('.header-logo').addClass('inview black');
			
			/* footerタグ要素が画面の最上部から300pxの位置に到達したらinviewクラスを削除。*/
			if(scroll > oet.top - 300){
				$('.side').removeClass('inview');
                $('.header-menu-btn').removeClass('inview');
                $('.header-logo').removeClass('inview');
			} else {
				$('.side').addClass('inview');
                $('.header-menu-btn').addClass('inview');
                $('.header-logo').addClass('inview');
			}
            /* ヒーローヘッダ内表示時 */
        } else {
            $('.header-menu-btn').removeClass('black');
            $('.header-logo').removeClass('black');
        }
        /* End スクロール時アニメーション */
		
		/*** ふわっとエフェクト処理呼び出し */
        scroll_effect(scroll, windowHeight);

    }); /* End スクロール時アニメーション */

    /*** topページへ戻るボタン押下時の処理 */
    $('.footer__to-top-btn').click(function(){
        $('body,html').animate({
            scrollTop: 0 }, 500);
        return false;
    });
    
});


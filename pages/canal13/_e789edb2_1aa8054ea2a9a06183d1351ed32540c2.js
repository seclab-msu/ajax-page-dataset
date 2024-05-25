
function hidethesearchbox()
	{
		 document.getElementById("searchmobile").style.display="none";
		
	}
	
	function displaythesearchbox()
	{
		 document.getElementById("searchmobile").style.display="block";
		
	}
addthis_widget();
var bs_ajax_paginate_1943046941 = '{"query":{"category":"","tag":"","taxonomy":"","post_ids":"","post_type":"","count":"15","order_by":"date","order":"DESC","time_filter":"","offset":"","style":"listing-classic-3","show_excerpt":"0","cats-tags-condition":"and","cats-condition":"in","tags-condition":"in","featured_image":"0","ignore_sticky_posts":"1","author_ids":"","disable_duplicate":"0","ad-active":"1","ad-after_each":"5","ad-type":"banner","ad-banner":"none","ad-campaign":"none","ad-count":"","ad-columns":"1","ad-orderby":"date","ad-order":"ASC","ad-align":"center","paginate":"infinity","pagination-show-label":"0","columns":"1","listing-settings":{"title-limit":"0","excerpt-limit":"189","excerpt-limit-2col":"150","excerpt-limit-3col":"100","subtitle":"0","subtitle-limit":"0","subtitle-location":"before-meta","format-icon":"0","term-badge":"1","term-badge-count":"1","term-badge-tax":"category","meta":{"show":"1","author":"0","date":"1","date-format":"standard","view":"0","share":"0","comment":"0","review":"0"},"read-more":"0"},"override-listing-settings":"1","_layout":{"state":"1|1|0","page":"2-col-right"}},"type":"bs_post_listing","view":"Publisher_Classic_Listing_3_Shortcode","current_page":1,"ajax_url":"\/ajax-calls.php","remove_duplicates":"1","remove_duplicates_ids":"14962,15000,14989,14986,14983,14979,14976","columns":"1","show_excerpt":"0","paginate":"infinity","pagination-show-label":"0","ad-active":"1","ad-after_each":"5","ad-type":"banner","ad-banner":"none","ad-campaign":"none","ad-count":"","ad-columns":"1","ad-orderby":"date","ad-order":"ASC","ad-align":"center","override-listing-settings":"1","listing-settings":{"title-limit":"0","excerpt-limit":"189","excerpt-limit-2col":"150","excerpt-limit-3col":"100","subtitle":"0","subtitle-limit":"0","subtitle-location":"before-meta","format-icon":"0","term-badge":"1","term-badge-count":"1","term-badge-tax":"category","meta":{"show":"1","author":"0","date":"1","date-format":"standard","view":"0","share":"0","comment":"0","review":"0"},"read-more":"0"},"_layout":{"state":"1|1|0","page":"2-col-right"},"_bs_pagin_token":"359e5c0"}';
(function () {

    function appendFbScript() {
        var js, id = 'facebook-jssdk',
            fjs = document.getElementsByTagName('script')[0];

        if (document.getElementById(id)) return;
        js = document.createElement('script');
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=1009384732869742&version=v2.0";
        fjs.parentNode.insertBefore(js, fjs);

        window.fbAsyncInit = function () {
            FB.init({
                appId: '1009384732869742',
                xfbml: true,
                version: 'v2.0'
            });
            FB.Event.subscribe('comment.create', function (comment_data) {
                console.log(comment_data);
                update_comments_count();
            });
            FB.Event.subscribe('comment.remove', function (comment_data) {
                update_comments_count();
            });

            function update_comments_count(comment_data, comment_action) {
                jQuery.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: 'https://www.canal13.ma/ajax-calls.php',
                        data: {
                            action: 'clear_better_facebook_comments',
                            post_id: '14901'
                        },
                        success: function (data) {
                            // todo sync comments count here! data have the counts
                        },
                        error: function (i, b) {
                            // todo
                        }
                    }
                )
            };
        };

        appendFbScript();
    }

    appendFbScript();

})();
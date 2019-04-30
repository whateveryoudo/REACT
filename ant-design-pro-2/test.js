    jQuery(window).ready(function() {
    window.onload = function(){
        var $businessWrapper = jQuery('#dhb-business-wrapper');
        if($businessWrapper.length > 0){
            $fusionColumns = $businessWrapper.find('.fusion-column.content-box-column');
            $fusionColumns.eq(0).find('.icon-left').removeClass('selected').addClass('selected');
            $fusionColumns
                .hover(function(){

                },function(){

                })
                .click(function(e){
                    if(e.target.tagName.toUpperCase() === 'IMG'){
                        var $this = jQuery(this);
                        var $iconLeft = $this.find('.icon-left');
                        $fusionColumns.each(function(index,el){
                            var $tempElem = jQuery(el).find('.icon-left');
                            var $img =  $tempElem.find('.image>img');
                            var newSrc = oldSrc = $img.attr('src');
                            if($tempElem.hasClass('selected')){
                                newSrc = oldSrc.split('.png')[0] + '_def.png';
                            }
                            $tempElem.removeClass('selected');
                            $img.attr('src',newSrc);
                        });
                        $iconLeft.addClass('selected');
                        var $img =  $iconLeft.find('.image>img');
                        var newSrc = oldSrc = $img.attr('src');
                        newSrc = oldSrc.split('_def')[0] + '.png';
                        $img.attr('src',newSrc);
                    }
            })
        }
    }
})

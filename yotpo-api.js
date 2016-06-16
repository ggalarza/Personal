
<!-- Yotpo GET Api Request -->
var yotpoApp = {};
yotpoApp.addWidgetAndBottomLine = function() {
    
    var title_encoded = "How you doin'? pencil";
    title_encoded = yotpoApp.encodeString(title_encoded);
    
    if (typeof title_encoded === 'undefined') {
        var title_encoded = '';
    }
    var widget_html = "<div class='yotpo yotpo-main-widget html_content' data-product-id='gvsf' data-name='" + title_encoded + "' data-url='http://46thstreet.tictail.com/product/how-you-doin-pencil' data-image-url='http://images.ttcdn.co/media/i/product/90651-a9977b871c474933ab86785ae2c733c3.jpeg?size=300' data-description='" + title_encoded + "' </div>";
    widget_location = jQuery(".tictail_add_to_cart_button").parents('#product_info');
    if(widget_location.length == 0) {
       widget_location = jQuery(".out_of_stock").parents('#product_info'); 
    }
    if(widget_location.length == 0) {
       widget_location = jQuery("#product_info"); 
    }    
    widget_location.append(widget_html);
}

yotpoApp.encodeString = function(string) {
    return string.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
yotpoApp.safeConsole = function(message) {
  if(window.console) {
    console.log(message);
  }
}

yotpoApp.appKeyResponse = function(data) {
    if(data.status.code == 200) {
      if(data.response && data.response.app && data.response.app.app_key) {
        if(document.getElementById("yotpoCustomInstall") == null) {
          yotpoApp.addWidgetAndBottomLine();
        }        
        yotpoApp.loadScript('//staticw2.yotpo.com/' + data.response.app.app_key + '/widget.js',null);
      }
      else {
        yotpoApp.safeConsole("Unable to find app key for store id 'wUM' and host '" + window.location.hostname + "'");
      }
    }
    else {
      yotpoApp.safeConsole('Unable to retrieve Yotpo app key');
    }
}; 

yotpoApp.getAppKey = function() {
  jQuery.ajax({url:'https://api.yotpo.com/apps/show_by_account_platform/tictail/wUM', success: yotpoApp.appKeyResponse, timeout: 2000, dataType: 'jsonp', type: 'GET', always: yotpoApp.appKeyResponse});  
};

yotpoApp.loadScript = function(url, callback) {
    var head = document.getElementsByTagName('head')[0]; 
    var js = document.createElement('script'); 
    js.async = true;  
    js.src = url;
    head.appendChild(js);
    if(callback) {
      if (js.addEventListener) { 
        js.addEventListener('load', callback);
      } 
      else {
        js.onreadystatechange = function() { 
          if (js.readyState in {loaded: 1, complete: 1}) {
            js.onreadystatechange = null;
            callback();
          }
        };
      }
    }
};
(function() {
  try{
    if(typeof jQuery == 'undefined'){
      yotpoApp.loadScript('//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js', yotpoApp.getAppKey); 
    }
    else {
      yotpoApp.getAppKey();
    }
  }
  catch (e) {yotpoApp.safeConsole(e.message);}
}());

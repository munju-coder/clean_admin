var COMMON = {};

/**
 * @brief 현재 날짜 시간 구하는 함수
 * @retruns  {string}    date string
 */
COMMON.date = {
    todayYMD : function()
    {
        var date    = new Date();

        var year    = date.getFullYear();
        var month   = date.getMonth() + 1;
        var day     = date.getDate();
        var hours   = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }    
};

/**
 * @brief cookie object
 */
COMMON.cookie = {
    /**
     * @brief 쿠카값 가져오기
     * @param {string} cName 
     * @returns {string} unescape value
     */
    getCookie : function (cName)
    {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    },
    /**
     * @brief 쿠키 설정
     * @param {string} cName
     * @param {string} cValue
     * @param {number} cDay
     */
    setCookie : function (cName, cValue, cDay)
    {
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    },
    /**
     * @brief cookie delete
     * @param {string} name 
     */
    delCookie : function (name)
    {
        var today = new Date();

        today.setTime(today.getTime() - 1);
        var value = get_cookie(name);
        if(value != "")
        {
            document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
        }
    }
};


/**
 * @brief   form data check & change
 */
COMMON.form = {
    /**
     * @brief 콤마찍기
     * @param {string} str 
     */
    comma : function(str)
    {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    /**
     * @brief   콤마 풀기
     * @param {string} str 
     */
    uncomma : function(str) 
    {
        str = String(str);
        return str.replace(/[^\d]+/g, '');        
    },
    inputNumComma : function(obj) //input num comma
    {
        obj.value = this.comma(this.uncomma(obj.value));
    },
    /**
     * @brief   숫자만 추출
     * @param {string} str 
     */
    str_num : function(str)
    {
        var res = str.replace(/[^0-9]/g,"");    
        return res;
    },
    /**
     * @biref 자리수 채우기
     * @param {string} n 
     * @param {number} width
     * @returns {string} 
     */
    left_pad : function(n, width)
    {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;        
    },
    /**
     * @brief   공백제거
     * @param {string} stringToTrim 
     * @returns {string} trim string
     */
    trim : function(stringToTrim)
    {
        var str = stringToTrim.replace(/^\s+|\s+$/g,"");
	
        if(str == "" || str == "undefined")
        {
            str = null;
        }
        
        return str;
    },
    /**
     * 
     * @param {string} str 
     * @param {number} limit 
     */
    limitText : function(str, limit)
    {        
        if(str.length > limit)
        {
            alert("글자수가 " + limit + " 자로 제한되어 있습니다.");
        }
    }
};

/**
 * @brief   url Object
 */
COMMON.url = {
    /**
     * @brief   url parameter 가져오기
     * @param {string} parameter 
     */
    urlParameter : function (parameter)
    {
        var results = new RegExp('[\?&]' + parameter + '=([^&#]*)').exec(window.location.href);
        if(results==null)
        {
           return null;
        }
        else
        {
           return results[1] || 0;
        }
    },
    urlFileName : function ()
    {
        var filename = document.location.href.split("/").slice(-1).pop();
        var newName = filename.split("?");
        
        return newName[0];
    }
};

COMMON.popup = {
    /**
     * @brief   popup open
     * @param {string} url 
     * @param {number} _top 
     * @param {number} _left 
     * @param {number} width 
     * @param {number} height 
     */
    windowOpen : function (url, _top, _left, width, height) 
    {
        window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=" + _top +",left=" + _left +",width=" + width + ",height=" + height);
    }    
};

/**
 * @brief   kakao api
 */
COMMON.kakao = {
    /**
     * @param {string} devide   구분값으로 사용
     */
    DaumPostcode : function (devide){
        daum.postcode.load(function () {
            new daum.Postcode({
                oncomplete: function (data) {
                    
                    var fullAddr = ''; 
                    var extraAddr = '';    
                    
                    if (data.userSelectedType === 'R') 
                    { 
                        fullAddr = data.roadAddress;    
                    } else 
                    { 
                        fullAddr = data.jibunAddress;
                    }    
                    
                    if (data.userSelectedType === 'R') 
                    {                        
                        if (data.bname !== '') 
                        {
                            extraAddr += data.bname;
                        }
                        
                        if (data.buildingName !== '') 
                        {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        
                        fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                    }				
                    
                    if(devide == "mb_zip_btn")
                    {
                        document.getElementById('mb_zip').value = data.zonecode;
                        document.getElementById('mb_addr_1').value = fullAddr;
                        document.getElementById('mb_addr_2').focus();
                    }                                    
                }
            }).open();
        });
    }
};

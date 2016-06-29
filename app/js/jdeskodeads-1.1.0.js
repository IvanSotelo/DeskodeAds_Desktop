/**
 * jQuery Plugin - JDeskodeAds v@VERSION
 * A jQuery plugin to fetch videos and user data from the DeskodeAds API,
 * http://ads.deskode.com
 *
 * Copyright (c) 2013 Ivan Sotelo
 * http://deskode.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Build Date: @DATE
 *
 */

;(function($, window, document, undefined) {
	'use strict';

    $.jdeskodeads = {};

		var ACCESS_TOKEN = null;
		var API_URL = 'http://ads.deskode.com/api/v1';

    var jsonpGET = function (path,args) {
        $.ajax({
            type: 'GET',
            url:  API_URL + path,
            dataType: 'json',
            success: function (data) {
                 args[0](data);
            }
        });
    };

		var jsonpPOST = function (path,dataPost,args) {
				$.ajax({
						type: 'POST',
						url:  API_URL + path,
						data: JSON.stringify(dataPost),
						contentType: 'application/json',
						dataType: 'json',
						success: function (data) {
								 args[0](data);
						}
				});
		};

    var methodsGET = {
        'getCliente': '/clientes/$',
				'getClientes': '/clientes',
        'getPantallaVideos': '/pantallas/$/videos',
        'getUserLikes': '/$/likes.json',
        'getUserAppearsIn': '/$/appears_in.json',
        'getUserAllVideos': '/$/all_videos.json',
        'getUserSubscriptions': '/$/subscriptions.json',
        'getUserAlbums': '/$/albums.json',
        'getUserChannels': '/$/channels.json',
        'getUserGroups': '/$/groups.json',
        'getVideo': '/video/$.json'
    };

		var methodsPOST = {
				'postCliente': '/clientes/$',
				'postClientes': '/clientes',
				'postPantalla': '/pantallas',
				'postUserLikes': '/$/likes.json',
				'getUserAppearsIn': '/$/appears_in.json',
				'getUserAllVideos': '/$/all_videos.json',
				'getUserSubscriptions': '/$/subscriptions.json',
				'getUserAlbums': '/$/albums.json',
				'getUserChannels': '/$/channels.json',
				'getUserGroups': '/$/groups.json',
				'getVideo': '/video/$.json'
		};

    var createAPIMethodGET = function (urlPattern) {
        return function () {
            var
                args = [].slice.call(arguments),
                url = urlPattern.replace('$', args.shift());
								jsonpGET(url,args);

        };
    };

		var createAPIMethodPOST = function (urlPattern) {
				return function () {
						var
								args = [].slice.call(arguments),
								data = args.shift(),
								url = urlPattern;
								jsonpPOST(url,data,args);
				};
		};

    for (var method in methodsGET) {
        $.jdeskodeads[method] = createAPIMethodGET(methodsGET[method]);
    }

		for (var method in methodsPOST) {
				$.jdeskodeads[method] = createAPIMethodPOST(methodsPOST[method]);
		}

})(jQuery, window , document);

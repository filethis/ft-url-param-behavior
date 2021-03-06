/*
Copyright 2018 FileThis, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

// Make sure the "FileThis" namespace exists
window.FileThis = window.FileThis || {};

/**
 * `<ft-url-param-behavior>`
 *
 * A behavior that lets components use parameters in the page URL.
 *
 * @demo
 * @polymerBehavior FileThis.UrlParamBehavior
 */
FileThis.UrlParamBehavior = {

    properties: {

        _urlParams:
        {
            type: Object
        }
    },

    getUrlParam: function(name)
    {
        if (!this._urlParams)
            this._loadUrlParams();

        var value = this._urlParams[name];
        return value;
    },

    _loadUrlParams: function()
    {
        this._urlParams = {};

        var url = window.location.href;
        var querySeparatorIndex = url.indexOf('?');
        var hasNoQuery = (querySeparatorIndex === -1);
        if (hasNoQuery)
            return;
        var queryStartIndex = querySeparatorIndex + 1;
        var rawQuery = url.slice(queryStartIndex);
        hasNoQuery = (rawQuery.length === 0);
        if (hasNoQuery)
            return;
        var query = decodeURIComponent(rawQuery);
        var parameters = query.split('&');
    
        parameters.forEach(function(parameter)
        {
            var parts = parameter.split('=', 2);
            var name = parts[0];
            var value = parts[1];
            this._urlParams[name] = value;
        }.bind(this));
    }

}
